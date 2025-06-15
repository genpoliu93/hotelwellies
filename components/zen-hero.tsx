"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Users,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  formatDateDisplay,
  getDateFnsLocale,
  type SupportedLocale,
} from "@/lib/utils/date";

// 轮播图片配置
const carouselImages = [
  {
    src: "/images/banner/1631749382675_.pic.jpg",
    alt: "Hotel Wellies Banner 1",
  },
  {
    src: "/images/banner/1641749382677_.pic.jpg",
    alt: "Hotel Wellies Banner 2",
  },
  {
    src: "/images/banner/1651749382678_.pic.jpg",
    alt: "Hotel Wellies Banner 3",
  },
  {
    src: "/images/banner/1661749382679_.pic.jpg",
    alt: "Hotel Wellies Banner 4",
  },
  {
    src: "/images/banner/1671749382679_.pic.jpg",
    alt: "Hotel Wellies Banner 5",
  },
  {
    src: "/images/banner/1691749382681_.pic.jpg",
    alt: "Hotel Wellies Banner 6",
  },
];

// 定义卡片属性类型
type InfoCardProps = {
  titleKey: string; // 翻译键
  descKey: string; // 翻译键
  // Removed initialDelay as animation is now parent-controlled for scroll effect
};

// 快速搜索组件
const QuickSearch = () => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [tempCheckIn, setTempCheckIn] = useState<Date | undefined>(undefined);
  const [tempCheckOut, setTempCheckOut] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateLocale = getDateFnsLocale(locale as SupportedLocale);

  // 计算住宿天数
  const calculateNights = (
    checkIn: Date | undefined,
    checkOut: Date | undefined
  ) => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(checkInDate, checkOutDate);
  const tempNights = calculateNights(tempCheckIn, tempCheckOut);

  // 处理搜索
  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      return;
    }

    const searchParams = new URLSearchParams({
      checkIn: checkInDate.toISOString().split("T")[0],
      checkOut: checkOutDate.toISOString().split("T")[0],
      adults: adults.toString(),
      children: children.toString(),
    });

    router.push(`/${locale}/booking?${searchParams.toString()}`);
  };

  // 格式化日期显示
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return formatDateDisplay(date, locale as SupportedLocale, {
      useShortFormat: true,
    });
  };

  // 处理日期选择器打开
  const handleDatePickerOpen = (open: boolean) => {
    if (open) {
      setTempCheckIn(checkInDate);
      setTempCheckOut(checkOutDate);
    }
    setIsDatePickerOpen(open);
  };

  // 重置临时日期
  const handleDateReset = () => {
    setTempCheckIn(undefined);
    setTempCheckOut(undefined);
  };

  // 确认日期选择
  const handleDateConfirm = () => {
    setCheckInDate(tempCheckIn);
    setCheckOutDate(tempCheckOut);
    setIsDatePickerOpen(false);
  };

  // 获取主按钮显示文本
  const getDateButtonText = () => {
    if (checkInDate && checkOutDate) {
      return `${formatDate(checkInDate)} - ${formatDate(
        checkOutDate
      )} (${nights} ${
        nights === 1 ? t("booking.night") : t("booking.nights")
      })`;
    }
    return t("booking.selectDates");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-6 w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 日期选择 */}
        <div className="md:col-span-2">
          <Popover open={isDatePickerOpen} onOpenChange={handleDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm",
                  !checkInDate && "text-white/70"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-xs text-white/70 mb-0.5">
                    {t("booking.stayDates")}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {getDateButtonText()}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="bg-white rounded-lg overflow-hidden">
                {/* 头部 */}
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {t("booking.selectDates")}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDateReset}
                      className="text-gray-500 hover:text-gray-700 h-6 px-2 text-xs"
                    >
                      {t("booking.reset")}
                    </Button>
                  </div>
                </div>

                {/* 日历 */}
                <div className="p-3">
                  <Calendar
                    mode="range"
                    selected={{
                      from: tempCheckIn,
                      to: tempCheckOut,
                    }}
                    onSelect={(range) => {
                      if (range?.from) setTempCheckIn(range.from);
                      if (range?.to) setTempCheckOut(range.to);
                    }}
                    disabled={(date) => date < today}
                    locale={dateLocale}
                    numberOfMonths={2}
                    className="rounded-md border-0"
                    classNames={{
                      months:
                        "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button:
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell:
                        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected:
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle:
                        "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />

                  {/* 当前选择预览 */}
                  {tempCheckIn && tempCheckOut && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-md"
                    >
                      <div className="text-center">
                        <p className="text-sm text-primary font-medium">
                          {formatDate(tempCheckIn)} → {formatDate(tempCheckOut)}
                        </p>
                        <p className="text-xs text-primary/70 mt-1">
                          {tempNights}{" "}
                          {tempNights === 1
                            ? t("booking.night")
                            : t("booking.nights")}{" "}
                          • {tempNights + 1} {t("booking.days")}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 底部操作 */}
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDatePickerOpen(false)}
                      className="flex-1 h-8 text-xs"
                    >
                      {t("booking.back")}
                    </Button>
                    <Button
                      onClick={handleDateConfirm}
                      disabled={!tempCheckIn || !tempCheckOut}
                      className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                    >
                      {t("booking.confirm")}
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 人数选择 */}
        <div>
          <Popover open={isGuestPickerOpen} onOpenChange={setIsGuestPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Users className="mr-2 h-4 w-4" />
                {adults + children > 0
                  ? `${adults + children} ${t("booking.guests")}`
                  : t("booking.guests")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("booking.adults")}</p>
                    <p className="text-sm text-gray-500">
                      {t("booking.age13Plus")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdults(Math.min(6, adults + 1))}
                      disabled={adults >= 6}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("booking.children")}</p>
                    <p className="text-sm text-gray-500">
                      {t("booking.age0To12")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{children}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChildren(Math.min(4, children + 1))}
                      disabled={children >= 4}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => setIsGuestPickerOpen(false)}
                  className="w-full"
                >
                  {t("booking.apply")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 搜索按钮 */}
        <div>
          <Button
            onClick={handleSearch}
            disabled={!checkInDate || !checkOutDate}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            <Search className="mr-2 h-4 w-4" />
            {t("booking.searchRooms")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// 卡片子组件 (修改为竖向文字布局)
const InfoCard = ({ titleKey, descKey }: InfoCardProps) => {
  const { t } = useLanguage();

  return (
    <div // This div is what gets animated by the parent motion.div
      className="bg-black/50 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/20 shadow-lg w-28 h-64 md:w-32 md:h-72 flex flex-col items-center justify-center"
    >
      <motion.div // Inner content fade-in
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }} // Quick fade for content after card appears
        className="h-full flex flex-col justify-around items-center text-center"
      >
        <h3 className="text-white text-lg md:text-xl font-light writing-vertical">
          {t(titleKey)}
        </h3>
        <hr className="w-1/2 border-white/30 my-2" />
        <p
          className="text-white/80 font-extralight text-xs md:text-sm leading-snug writing-vertical"
          style={{ maxHeight: "120px", overflowY: "auto" }}
        >
          {t(descKey)}
        </p>
      </motion.div>
    </div>
  );
};

export function ZenHero() {
  const { t, locale } = useLanguage();
  const { scrollY } = useScroll();
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const backgroundBrightness = useTransform(scrollY, [0, 400], [0.85, 0.7]);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, []);

  // 手动切换到指定图片
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 上一张/下一张
  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  // Helper for card animation properties
  const cardAnimationProps = (delay: number) => ({
    initial: { opacity: 0, x: 60 }, // Start off-screen to the right and transparent
    whileInView: { opacity: 1, x: 0 }, // Animate to fully visible and original position
    viewport: { once: true, amount: 0.4 }, // Trigger animation when 40% of the card is visible
    transition: { duration: 0.9, delay },
  });

  return (
    <section
      className="relative h-screen overflow-hidden flex flex-col"
      id="hero"
    >
      {/* 轮播背景图片 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: backgroundScale,
          filter: useTransform(
            backgroundBrightness,
            (v) => `brightness(${v}) saturate(0.9)`
          ),
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[currentIndex].src}
              alt={carouselImages[currentIndex].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
      </motion.div>

      {/* 轮播控制按钮 */}
      <div className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-all duration-200"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2">
        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-all duration-200"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* 轮播指示器 - 调整位置避免与搜索栏重叠 */}
      <div className="absolute bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* 主要内容容器 - 占据剩余空间，并让内容垂直居中, 分为左右两栏 */}
      <div className="relative z-10 flex-grow flex items-stretch justify-between container px-6 md:px-10 py-10 md:py-16 pb-32 md:pb-40">
        {/* 左侧竖排标题/副标题 */}
        <motion.div
          // Removed absolute positioning and parallax style
          className="flex flex-col items-start justify-center max-w-[50vw] md:max-w-none" // Added justify-center
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "6rem" }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="w-px bg-white/70 mb-8 overflow-hidden"
          />
          <div
            className="writing-vertical text-white space-y-8 text-right"
            style={{ textOrientation: "mixed", whiteSpace: "normal" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 1.2,
              }}
              className="text-4xl md:text-5xl font-extralight tracking-widest leading-tight"
              style={{ maxHeight: "60vh" }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1.2,
              }}
              className="text-base md:text-lg text-white/80 font-light max-w-[45ch]"
              style={{ maxHeight: "40vh" }}
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-light rounded-full px-6"
              asChild
            >
              <Link href={`/${locale}/booking`}>
                <CalendarIcon className="h-4 w-4" />
                {t("common.bookNow")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* 右侧区域: 竖排信息卡片 */}
        <motion.div className="flex flex-row space-x-4 md:space-x-5 items-end justify-center relative z-20">
          <motion.div {...cardAnimationProps(0.7)}>
            <InfoCard
              titleKey="hero.cardTitle1"
              descKey="hero.convenientLocationDesc"
            />
          </motion.div>
          <motion.div {...cardAnimationProps(0.85)} className="mb-6 md:mb-8">
            {" "}
            {/* Middle card higher */}
            <InfoCard
              titleKey="hero.cardTitle2"
              descKey="hero.comfortableRoomsDesc"
            />
          </motion.div>
          <motion.div {...cardAnimationProps(1.0)}>
            <InfoCard
              titleKey="hero.cardTitle3"
              descKey="hero.attentiveServiceDesc"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 快速搜索栏 - 底部固定，调整位置 */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6 md:px-10">
        <QuickSearch />
      </div>

      {/* 底部水平信息卡片 - 此区域已移除并整合到右侧 */}
    </section>
  );
}
