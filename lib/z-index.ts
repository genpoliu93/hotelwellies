/**
 * Z-Index 层级管理
 *
 * 为了避免z-index冲突，我们定义了统一的层级系统：
 * - 基础内容: 1-9
 * - 地图和嵌入内容: 10-19
 * - 悬浮元素: 20-49
 * - 导航和固定元素: 50-99
 * - 模态框和覆盖层: 100-199
 * - 紧急通知: 200+
 */

export const Z_INDEX = {
  // 基础层级 (1-9)
  BASE: 1,

  // 地图和嵌入内容 (10-19)
  MAP: 10,
  EMBEDDED_CONTENT: 15,

  // 悬浮元素 (20-49)
  TOOLTIP: 20,
  POPOVER: 30,

  // 导航和固定元素 (50-99)
  STICKY_HEADER: 50,
  NAVIGATION: 60,

  // 模态框和覆盖层 (100-199)
  HEADER: 100,
  DROPDOWN: 110,
  MODAL: 120,
  OVERLAY: 130,

  // 紧急通知 (200+)
  NOTIFICATION: 200,
  EMERGENCY: 999,
} as const;

export type ZIndexLevel = (typeof Z_INDEX)[keyof typeof Z_INDEX];
