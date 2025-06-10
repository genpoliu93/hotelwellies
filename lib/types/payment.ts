// 支付请求相关类型定义

export interface PaymentRequest {
  /** Square Web Payments SDK生成的支付令牌 */
  nonce: string;
  /** 支付金额（日元） */
  amount: number;
  /** 货币代码，固定为JPY */
  currency: string;
  /** 域名，默认为hotelwellies.jp */
  domain?: string;
  /** 预订信息 */
  booking?: BookingInfo;
  /** 客户信息 */
  customer?: CustomerInfo;
}

export interface BookingInfo {
  /** 房型代码 */
  roomTypeCode: string;
  /** 房型名称 */
  roomTypeName: string;
  /** 入住日期 */
  checkInDate: string;
  /** 退房日期 */
  checkOutDate: string;
  /** 客人数量 */
  guests: string;
  /** 房间容量 */
  capacity: number;
  /** 总价格 */
  totalPrice: number;
  /** 套餐代码 */
  packageCode?: string;
  /** 套餐名称 */
  packageName?: string;
}

export interface CustomerInfo {
  /** 名 */
  firstName: string;
  /** 姓 */
  lastName: string;
  /** 邮箱 */
  email: string;
  /** 电话 */
  phone: string;
  /** 地址 */
  address?: string;
  /** 特殊要求（必填） */
  specialRequests: string;
}

export interface PaymentResponse {
  /** 是否成功 */
  success: boolean;
  /** 支付ID */
  paymentId?: string;
  /** 支付状态 */
  status?: string;
  /** 支付金额 */
  amount?: number;
  /** 货币 */
  currency?: string;
  /** 收据URL */
  receiptUrl?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 错误信息 */
  error?: string;
  /** 错误详情 */
  message?: string;
}

export interface PaymentError {
  success: false;
  error: string;
  message: string;
}
