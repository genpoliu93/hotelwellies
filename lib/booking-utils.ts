/**
 * 酒店预订系统工具函数
 * 统一管理外部预订系统跳转的最佳实践
 */

// 外部预订系统URL
const BOOKING_SYSTEM_URL = 'https://rsv.temanasi.jp/165/room/search';

/**
 * 跳转到外部预订系统的最佳实践函数
 * @param source - 来源标识，用于统计和分析
 * @param params - 可选的URL参数
 */
export const openBookingSystem = (
  source: 'hero' | 'sidebar' | 'mobile-menu' | 'contact' = 'hero',
  params?: Record<string, string>
) => {
  try {
    let url = BOOKING_SYSTEM_URL;

    // 添加来源跟踪参数
    const urlParams = new URLSearchParams();
    urlParams.set('source', source);
    urlParams.set('referrer', 'hotelwellies');

    // 添加其他可选参数
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        urlParams.set(key, value);
      });
    }

    // 构建完整URL
    const fullUrl = `${url}?${urlParams.toString()}`;

    // 安全地打开新窗口
    const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');

    // 检查弹窗是否被阻止
    if (!newWindow || newWindow.closed) {
      console.warn('Booking system popup was blocked. Redirecting in current window.');
      window.location.href = fullUrl;
    }

    // 可选：发送跟踪事件（如果有分析工具）
    if (typeof gtag !== 'undefined') {
      gtag('event', 'booking_system_click', {
        event_category: 'engagement',
        event_label: source,
        value: 1
      });
    }

  } catch (error) {
    console.error('Failed to open booking system:', error);
    // 降级处理：直接跳转到预订页面
    window.location.href = BOOKING_SYSTEM_URL;
  }
};

/**
 * 获取预订系统URL（用于链接预览等场景）
 */
export const getBookingSystemUrl = () => BOOKING_SYSTEM_URL;

/**
 * 检查预订系统是否可用
 */
export const checkBookingSystemAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(BOOKING_SYSTEM_URL, { method: 'HEAD', mode: 'no-cors' });
    return true; // 如果没有抛出错误，说明可以访问
  } catch (error) {
    console.warn('Booking system availability check failed:', error);
    return false;
  }
};