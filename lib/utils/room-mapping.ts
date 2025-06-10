// 房型名称映射工具函数

/**
 * 房型映射配置
 * 将原始房型代码映射为标准化的房型标识
 */
const ROOM_TYPE_MAPPING: Record<string, string> = {
  "St Twin(203,205,205A)": "standard_twin",
  "St Twin Mt(209,210,211)": "standard_twin_mountain",
  "Family room 2F(201,202)": "family_room",
  "Deluxe double(206)": "deluxe_double",
  "St Double Mt(207,208A,208)": "standard_double_mountain",

  // 新的API格式映射 - 支持完整房间号格式
  "St Twin Mt.View (209, 210, 211)": "standard_twin_mountain",
  "St Twin (203, 205, 205A)": "standard_twin",
  "St Double Mt.View (207, 208, 208A)": "standard_double_mountain",
  "Family Room 2F (201, 202)": "family_room_2f",
};

/**
 * 房型模式匹配映射
 * 用于匹配各种可能的房型名称变体
 */
const ROOM_TYPE_PATTERNS: Array<{
  pattern: RegExp;
  standardType: string;
}> = [
  // Standard Twin 房型
  {
    pattern: /^St\s*Twin\s*Mt[\.\s]*View/i,
    standardType: "standard_twin_mountain",
  },
  {
    pattern: /^St\s*Twin(?!\s*Mt)/i,
    standardType: "standard_twin",
  },

  // Standard Double 房型
  {
    pattern: /^St\s*Double\s*Mt[\.\s]*View/i,
    standardType: "standard_double_mountain",
  },
  {
    pattern: /^St\s*Double(?!\s*Mt)/i,
    standardType: "standard_double",
  },

  // Family Room 房型
  {
    pattern: /^Family\s*Room\s*2F/i,
    standardType: "family_room_2f",
  },
  {
    pattern: /^Family\s*Room/i,
    standardType: "family_room",
  },

  // Deluxe 房型
  {
    pattern: /^Deluxe/i,
    standardType: "deluxe_double",
  },
];

/**
 * 将原始房型代码映射为标准化的房型标识
 * @param roomType - 原始房型代码
 * @returns 标准化房型标识
 */
export function mapRoomType(roomType: string): string {
  // 首先尝试精确匹配
  if (ROOM_TYPE_MAPPING[roomType]) {
    return ROOM_TYPE_MAPPING[roomType];
  }

  // 如果没有精确匹配，使用模式匹配
  for (const { pattern, standardType } of ROOM_TYPE_PATTERNS) {
    if (pattern.test(roomType)) {
      return standardType;
    }
  }

  // 如果都没有匹配，返回原始房型的规范化版本
  return roomType
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[(),.]/g, "");
}

/**
 * 获取房型的翻译键
 * @param roomType - 原始房型代码
 * @returns 翻译键路径
 */
export function getRoomTypeTranslationKey(roomType: string): string {
  const mappedType = mapRoomType(roomType);
  return `booking.roomTypes.${mappedType}`;
}

/**
 * 检查是否为山景房型
 * @param roomType - 原始房型代码
 * @returns 是否为山景房型
 */
export function isMountainView(roomType: string): boolean {
  return /Mt[\.\s]*View|Mt\s*\(/i.test(roomType);
}

/**
 * 检查是否为家庭房型
 * @param roomType - 原始房型代码
 * @returns 是否为家庭房型
 */
export function isFamilyRoom(roomType: string): boolean {
  return roomType.toLowerCase().includes("family");
}

/**
 * 检查是否为豪华房型
 * @param roomType - 原始房型代码
 * @returns 是否为豪华房型
 */
export function isDeluxeRoom(roomType: string): boolean {
  return roomType.toLowerCase().includes("deluxe");
}

/**
 * 提取房间号码列表
 * @param roomType - 房型字符串（可能包含房间号）
 * @returns 房间号码数组
 */
export function extractRoomNumbers(roomType: string): string[] {
  const match = roomType.match(/\(([^)]+)\)/);
  if (match) {
    return match[1].split(",").map((num) => num.trim());
  }
  return [];
}

/**
 * 获取房型的基本名称（不包含房间号）
 * @param roomType - 完整房型名称
 * @returns 基本房型名称
 */
export function getRoomTypeBaseName(roomType: string): string {
  return roomType.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
