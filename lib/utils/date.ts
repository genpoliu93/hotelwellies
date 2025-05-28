import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  isSameWeek,
  isSameMonth,
} from "date-fns";
import { ja, enUS, zhCN } from "date-fns/locale";

export type SupportedLocale = "en" | "ja" | "zh";

// 获取date-fns locale对象
export const getDateFnsLocale = (locale: SupportedLocale) => {
  switch (locale) {
    case "ja":
      return ja;
    case "zh":
      return zhCN;
    case "en":
    default:
      return enUS;
  }
};

// 获取本地化的日期格式
export const getLocalizedDateFormat = (locale: SupportedLocale) => {
  switch (locale) {
    case "ja":
      return "yyyy年M月d日";
    case "zh":
      return "yyyy年M月d日";
    case "en":
    default:
      return "PPP"; // 使用date-fns的预定义格式
  }
};

// 获取简短的日期格式
export const getShortDateFormat = (locale: SupportedLocale) => {
  switch (locale) {
    case "ja":
      return "M月d日";
    case "zh":
      return "M月d日";
    case "en":
    default:
      return "MMM d";
  }
};

// 格式化日期显示
export const formatDateDisplay = (
  date: Date,
  locale: SupportedLocale,
  options?: {
    showRelative?: boolean;
    useShortFormat?: boolean;
  }
) => {
  const { showRelative = true, useShortFormat = false } = options || {};
  const dateLocale = getDateFnsLocale(locale);

  // 如果启用相对日期显示
  if (showRelative) {
    if (isToday(date)) {
      return getRelativeDateLabel("today", locale);
    }
    if (isTomorrow(date)) {
      return getRelativeDateLabel("tomorrow", locale);
    }
    if (isYesterday(date)) {
      return getRelativeDateLabel("yesterday", locale);
    }
  }

  // 使用标准格式
  const formatString = useShortFormat
    ? getShortDateFormat(locale)
    : getLocalizedDateFormat(locale);

  return format(date, formatString, { locale: dateLocale });
};

// 获取相对日期标签
export const getRelativeDateLabel = (
  type:
    | "today"
    | "tomorrow"
    | "yesterday"
    | "thisWeek"
    | "nextWeek"
    | "thisMonth"
    | "nextMonth",
  locale: SupportedLocale
) => {
  const labels = {
    en: {
      today: "Today",
      tomorrow: "Tomorrow",
      yesterday: "Yesterday",
      thisWeek: "This week",
      nextWeek: "Next week",
      thisMonth: "This month",
      nextMonth: "Next month",
    },
    zh: {
      today: "今天",
      tomorrow: "明天",
      yesterday: "昨天",
      thisWeek: "本周",
      nextWeek: "下周",
      thisMonth: "本月",
      nextMonth: "下月",
    },
    ja: {
      today: "今日",
      tomorrow: "明日",
      yesterday: "昨日",
      thisWeek: "今週",
      nextWeek: "来週",
      thisMonth: "今月",
      nextMonth: "来月",
    },
  };

  return labels[locale][type];
};

// 格式化日期范围显示
export const formatDateRange = (
  startDate: Date,
  endDate: Date,
  locale: SupportedLocale,
  options?: {
    showRelative?: boolean;
    separator?: string;
  }
) => {
  const { showRelative = true, separator = " - " } = options || {};

  const startFormatted = formatDateDisplay(startDate, locale, { showRelative });
  const endFormatted = formatDateDisplay(endDate, locale, { showRelative });

  return `${startFormatted}${separator}${endFormatted}`;
};

// 检查日期是否在同一周/月（用于相对日期判断）
export const getDateRelation = (
  date: Date,
  referenceDate: Date = new Date()
) => {
  return {
    isToday: isToday(date),
    isTomorrow: isTomorrow(date),
    isYesterday: isYesterday(date),
    isSameWeek: isSameWeek(date, referenceDate),
    isSameMonth: isSameMonth(date, referenceDate),
  };
};
