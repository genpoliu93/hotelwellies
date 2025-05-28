import { format } from "date-fns";
import { PaymentRequest, PaymentResponse } from "./types/payment";

// API响应类型定义
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 房间信息接口
export interface Room {
  roomCode: string;
  roomName: string;
  roomType: string;
  category: string;
  price: number;
  discountPrice: number | null;
  maxOccupancy: number;
  maxChildren: number;
  size: number;
  sizeUnit: string;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  availableCount: number;
}

// 房间查询结果接口
export interface RoomQueryResult {
  rooms: Room[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

// 环境判断，根据环境选择不同的API基础URL
const getApiBaseUrl = () => {
  // 判断是否为生产环境
  const isProduction = process.env.NODE_ENV === "production";

  // 优先使用环境变量中配置的API URL，如果没有设置则使用默认值
  const productionUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://api.fuyosankyo.jp";
  const developmentUrl = "http://localhost:5257";

  return isProduction ? productionUrl : developmentUrl;
};

// API配置
const API_CONFIG = {
  baseURL: getApiBaseUrl(),
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

// 基础请求方法
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.baseURL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: API_CONFIG.defaultHeaders,
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as ApiResponse<T>;
  } catch (error) {
    console.error("API请求错误:", error);
    throw error;
  }
}

// 查询可用房间
export async function fetchAvailableRooms(
  checkInDate: Date,
  checkOutDate: Date,
  adults: number
): Promise<ApiResponse<RoomQueryResult>> {
  // 格式化日期为 YYYY-MM-DD 格式
  const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
  const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");

  // 构建查询参数
  const queryParams = new URLSearchParams({
    CheckInDate: formattedCheckIn,
    CheckOutDate: formattedCheckOut,
    Adults: adults.toString(),
  });

  // 发送请求
  return fetchApi<RoomQueryResult>(
    `/api/room_occupancy/available-rooms?${queryParams.toString()}`
  );
}

// 处理支付
export async function processPayment(
  paymentRequest: PaymentRequest
): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/api/payment/charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentRequest),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `支付请求失败: ${response.status}`);
    }

    return data as PaymentResponse;
  } catch (error) {
    console.error("支付处理错误:", error);
    throw error;
  }
}
