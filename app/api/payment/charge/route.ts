import { NextRequest, NextResponse } from "next/server";
import { PaymentRequest, PaymentResponse } from "@/lib/types/payment";

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const paymentRequest: PaymentRequest = await request.json();

    console.log("收到支付请求:", JSON.stringify(paymentRequest, null, 2));

    // 验证必要字段
    if (!paymentRequest.nonce) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_REQUEST",
          message: "支付令牌缺失",
        },
        { status: 400 }
      );
    }

    if (!paymentRequest.amount || paymentRequest.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_AMOUNT",
          message: "无效的支付金额",
        },
        { status: 400 }
      );
    }

    // 提取套餐信息
    const packageInfo = {
      packageCode: paymentRequest.booking?.packageCode || "ROOM_ONLY",
      packageName: paymentRequest.booking?.packageName || "Room Only",
    };

    console.log("=".repeat(50));
    console.log("🍽️  套餐信息详情:");
    console.log(`   套餐代码: ${packageInfo.packageCode}`);
    console.log(`   套餐名称: ${packageInfo.packageName}`);
    console.log("=".repeat(50));

    // 提取预订信息
    const bookingInfo = paymentRequest.booking;
    if (bookingInfo) {
      console.log("📋 预订详情:");
      console.log(
        `   🏨 房型: ${bookingInfo.roomTypeCode} (${bookingInfo.roomTypeName})`
      );
      console.log(`   📅 入住: ${bookingInfo.checkInDate}`);
      console.log(`   📅 退房: ${bookingInfo.checkOutDate}`);
      console.log(`   👥 客人: ${bookingInfo.guests}人`);
      console.log(
        `   🍽️  套餐: ${packageInfo.packageCode} (${packageInfo.packageName})`
      );
      console.log(`   💰 总价: ¥${bookingInfo.totalPrice.toLocaleString()}`);
      console.log("=".repeat(50));
    }

    // 提取客户信息
    const customerInfo = paymentRequest.customer;
    if (customerInfo) {
      console.log("👤 客户信息:");
      console.log(
        `   📝 姓名: ${customerInfo.firstName} ${customerInfo.lastName}`
      );
      console.log(`   📧 邮箱: ${customerInfo.email}`);
      console.log(`   📞 电话: ${customerInfo.phone}`);
      console.log(`   🏠 地址: ${customerInfo.address}`);
      console.log(`   💬 特殊要求: ${customerInfo.specialRequests}`);
      console.log("=".repeat(50));
    }

    // 这里应该调用实际的支付处理逻辑
    // 例如调用 Square 的支付 API
    const isPaymentSuccessful = await processSquarePayment(paymentRequest);

    if (isPaymentSuccessful) {
      // 支付成功，保存预订信息到数据库
      const bookingId = await saveBookingToDatabase({
        ...bookingInfo,
        packageCode: packageInfo.packageCode,
        packageName: packageInfo.packageName,
        customer: customerInfo,
        paymentAmount: paymentRequest.amount,
        paymentCurrency: paymentRequest.currency,
      });

      const response: PaymentResponse = {
        success: true,
        paymentId: `payment_${Date.now()}`,
        status: "COMPLETED",
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        receiptUrl: `https://example.com/receipt/${bookingId}`,
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "PAYMENT_FAILED",
          message: "支付处理失败",
        },
        { status: 402 }
      );
    }
  } catch (error) {
    console.error("支付处理错误:", error);

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "服务器内部错误",
      },
      { status: 500 }
    );
  }
}

// 模拟 Square 支付处理
async function processSquarePayment(
  paymentRequest: PaymentRequest
): Promise<boolean> {
  // 这里应该调用 Square 的实际 API
  // 现在返回模拟结果
  console.log("处理 Square 支付...", {
    nonce: paymentRequest.nonce,
    amount: paymentRequest.amount,
    currency: paymentRequest.currency,
  });

  // 模拟异步处理
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 90% 成功率（用于测试）
  return Math.random() > 0.1;
}

// 模拟保存预订到数据库
async function saveBookingToDatabase(bookingData: any): Promise<string> {
  console.log("保存预订到数据库:", bookingData);

  // 生成唯一的预订ID
  const bookingId = `booking_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // 这里应该调用实际的数据库保存逻辑
  // 例如使用 Prisma、MongoDB 等

  console.log(`预订已保存，预订ID: ${bookingId}`);

  return bookingId;
}
