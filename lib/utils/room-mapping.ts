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
};

/**
 * 将原始房型代码映射为标准化的房型标识
 * @param roomType - 原始房型代码
 * @returns 标准化房型标识
 */
export function mapRoomType(roomType: string): string {
  return ROOM_TYPE_MAPPING[roomType] || roomType;
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
  return roomType.includes("Mt");
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
