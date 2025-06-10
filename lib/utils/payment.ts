import { format } from "date-fns";
import { PaymentRequest, BookingInfo, CustomerInfo } from "../types/payment";

/**
 * 获取房间类型代码
 */
export function getRoomTypeCode(roomId: string | null): string {
  switch (roomId) {
    case "standard":
      return "STD";
    case "deluxe":
      return "DLX";
    case "family":
      return "FAM";
    default:
      return roomId || "STD";
  }
}

/**
 * 获取房间类型名称（英文）
 */
export function getRoomTypeName(roomId: string | null): string {
  switch (roomId) {
    case "standard":
      return "Standard Room";
    case "deluxe":
      return "Deluxe Room";
    case "family":
      return "Family Room";
    default:
      return roomId || "Standard Room";
  }
}

/**
 * 获取套餐名称（英文）
 */
export function getPackageName(packageCode: string): string {
  switch (packageCode) {
    case "ROOM_ONLY":
      return "Room Only";
    case "BREAKFAST":
      return "Room with Breakfast";
    case "DINNER":
      return "Room with Dinner";
    case "BREAKFAST_DINNER":
      return "Room with Breakfast & Dinner";
    default:
      return "Room Only";
  }
}

/**
 * 构建预订信息
 */
export function buildBookingInfo(
  roomId: string | null,
  checkInDate: Date | null,
  checkOutDate: Date | null,
  adults: number,
  children: number,
  totalPrice: number,
  packageCode?: string
): BookingInfo {
  const totalGuests = adults + children;
  const selectedPackage = packageCode || "ROOM_ONLY";

  return {
    roomTypeCode: getRoomTypeCode(roomId),
    roomTypeName: getRoomTypeName(roomId),
    checkInDate: checkInDate ? format(checkInDate, "yyyy-MM-dd") : "",
    checkOutDate: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "",
    guests: `${totalGuests}`,
    capacity: totalGuests, // 使用客人总数作为容量
    totalPrice: Math.round(totalPrice), // 确保价格为整数
    packageCode: selectedPackage,
    packageName: getPackageName(selectedPackage),
  };
}

/**
 * 构建客户信息
 */
export function buildCustomerInfo(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  country: string,
  specialRequests?: string
): CustomerInfo {
  return {
    firstName,
    lastName,
    email,
    phone,
    address: country, // 使用国家作为地址信息
    specialRequests: specialRequests || "", // 如果为空则使用空字符串
  };
}

/**
 * 构建完整的支付请求
 */
export function buildPaymentRequest(
  nonce: string,
  amount: number,
  bookingInfo: BookingInfo,
  customerInfo: CustomerInfo,
  domain: string = "hotelwellies.jp"
): PaymentRequest {
  return {
    nonce,
    amount: Math.round(amount), // 确保金额为整数
    currency: "JPY",
    domain,
    booking: bookingInfo,
    customer: customerInfo,
  };
}

/**
 * 验证支付请求数据
 */
export function validatePaymentData(
  checkInDate: Date | null,
  checkOutDate: Date | null,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  specialRequests?: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!checkInDate) {
    errors.push("入住日期不能为空");
  }

  if (!checkOutDate) {
    errors.push("退房日期不能为空");
  }

  if (!firstName.trim()) {
    errors.push("名字不能为空");
  }

  if (!lastName.trim()) {
    errors.push("姓氏不能为空");
  }

  if (!email.trim()) {
    errors.push("邮箱不能为空");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("邮箱格式不正确");
  }

  if (!phone.trim()) {
    errors.push("电话号码不能为空");
  }

  // 注意：specialRequests现在是必填字段，但我们在buildCustomerInfo中会提供默认值
  // 这里不需要额外验证，因为后端要求必填，我们会确保总是有值

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 生成预订参考号
 */
export function generateBookingReference(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
