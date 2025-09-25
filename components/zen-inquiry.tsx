"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Calendar,
  Clock
} from "lucide-react";
import { openBookingSystem } from "@/lib/booking-utils";

// 表单数据类型
interface InquiryFormData {
  inquiryType: "reservation" | "other";
  name: string;
  kana: string;
  email: string;
  emailConfirm: string;
  phone: string;
  checkInDate: string;
  adults: string;
  children: string;
  checkInTime: string;
  shuttle: "not_needed" | "needed" | "";
  message: string;
  privacyConsent: boolean;
  confirmationConsent: boolean;
  reservationNote: boolean;
}

export function ZenInquiry() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // 流动视差效果
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  const flowY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // 表单状态
  const [formData, setFormData] = useState<InquiryFormData>({
    inquiryType: "reservation",
    name: "",
    kana: "",
    email: "",
    emailConfirm: "",
    phone: "",
    checkInDate: "",
    adults: "",
    children: "",
    checkInTime: "",
    shuttle: "",
    message: "",
    privacyConsent: false,
    confirmationConsent: false,
    reservationNote: false,
  });

  // 错误状态
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [showErrors, setShowErrors] = useState(false);

  // 生成邮件内容
  const generateEmailContent = () => {
    const subject = encodeURIComponent(`Hotel Wellies - ${formData.inquiryType === "reservation" ? "ご予約" : "お問い合わせ"}`);

    // 使用简洁清晰的格式，避免特殊字符在某些邮件客户端中显示问题
    let body = `Hotel Wellies お問い合わせ\n`;
    body += `=======================================\n\n`;

    body += `お問い合わせ区分: ${formData.inquiryType === "reservation" ? "ご予約" : "一般お問い合わせ"}\n\n`;

    if (formData.inquiryType === "reservation") {
      body += `--- ご予約詳細 ---\n`;
      body += `ご宿泊希望日: ${formData.checkInDate}\n`;
      body += `ご利用人数: 大人${formData.adults}名、子供${formData.children}名\n`;
      body += `チェックイン時間: ${formData.checkInTime}\n`;
      body += `無料送迎: ${formData.shuttle === "needed" ? "送迎希望" : "不要"}\n\n`;
    }

    body += `--- お客様情報 ---\n`;
    body += `お名前: ${formData.name}\n`;
    if (locale === 'ja' && formData.kana) {
      body += `フリガナ: ${formData.kana}\n`;
    }
    body += `メールアドレス: ${formData.email}\n`;
    body += `電話番号: ${formData.phone}\n\n`;

    body += `--- お問い合わせ内容 ---\n`;
    body += `${formData.message}\n\n`;

    body += `=======================================\n`;
    body += `Hotel Wellies 軽井沢\n`;
    body += `〒389-0111 長野県北佐久郡軽井沢町長倉2148\n`;
    body += `TEL: 0267-46-6400\n`;
    body += `WEB: https://hotelwellies.jp\n`;
    body += `=======================================`;

    return {
      subject,
      body: encodeURIComponent(body)
    };
  };

  // 详细表单验证
  const validateForm = () => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    // 基本必填字段验证
    if (!formData.name.trim()) {
      newErrors.name = t('inquiry.form.validation.required');
    }
    if (locale === 'ja' && !formData.kana.trim()) {
      newErrors.kana = t('inquiry.form.validation.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('inquiry.form.validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'メールアドレスの形式が正しくありません';
    }
    if (!formData.emailConfirm.trim()) {
      newErrors.emailConfirm = t('inquiry.form.validation.required');
    } else if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = t('inquiry.form.validation.emailMismatch');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('inquiry.form.validation.required');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('inquiry.form.validation.required');
    }

    // 预约专用字段验证
    if (formData.inquiryType === "reservation") {
      if (!formData.checkInDate) {
        newErrors.checkInDate = t('inquiry.form.validation.required');
      }
      if (!formData.adults) {
        newErrors.adults = t('inquiry.form.validation.required');
      }
      if (!formData.children) {
        newErrors.children = t('inquiry.form.validation.required');
      }
      if (!formData.checkInTime.trim()) {
        newErrors.checkInTime = t('inquiry.form.validation.required');
      }
      if (!formData.shuttle) {
        newErrors.shuttle = t('inquiry.form.validation.required');
      }
      if (!formData.reservationNote) {
        newErrors.reservationNote = '予約確定に関する了承が必要です';
      }
    }

    // 同意项验证
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = '個人情報の取り扱いに同意してください';
    }
    if (!formData.confirmationConsent) {
      newErrors.confirmationConsent = '入力内容の確認が必要です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 表单提交 - 调用系统邮件应用
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (!validateForm()) {
      // 滚动到第一个错误字段
      setTimeout(() => {
        const firstErrorField = document.querySelector('.error-field');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    const { subject, body } = generateEmailContent();
    const mailtoLink = `mailto:info@hotelwellies.jp?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  // 清除特定字段错误
  const clearFieldError = (fieldName: keyof InquiryFormData) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // 获取字段样式
  const getFieldClassName = (fieldName: keyof InquiryFormData, baseClassName: string) => {
    const hasError = showErrors && errors[fieldName];
    return `${baseClassName} ${hasError ? 'error-field border-red-400 focus:border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-stone-400 bg-transparent'}`;
  };

  return (
    <section
      id="inquiry"
      ref={sectionRef}
      className="relative py-32 bg-stone-50 overflow-hidden"
    >
      {/* 流线条装饰背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左侧流线 */}
        <motion.div
          className="absolute left-0 top-1/4 w-96 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-60"
          style={{ x: lineX }}
        />
        <motion.div
          className="absolute left-0 top-1/2 w-64 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-40"
          style={{ x: lineX, transition: "0.2s" }}
        />
        <motion.div
          className="absolute left-0 top-3/4 w-80 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-50"
          style={{ x: lineX, transition: "0.3s" }}
        />

        {/* 右侧流线 */}
        <motion.div
          className="absolute right-0 top-1/3 w-72 h-px bg-gradient-to-l from-transparent via-stone-200 to-transparent opacity-60"
          style={{ x: lineX, scaleX: -1 }}
        />
        <motion.div
          className="absolute right-0 top-2/3 w-56 h-px bg-gradient-to-l from-transparent via-stone-300 to-transparent opacity-40"
          style={{ x: lineX, scaleX: -1, transition: "0.2s" }}
        />

        {/* 垂直流线 */}
        <motion.div
          className="absolute left-1/4 top-0 w-px h-32 bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30"
          style={{ y: flowY }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 w-px h-40 bg-gradient-to-t from-transparent via-stone-200 to-transparent opacity-30"
          style={{ y: flowY, scaleY: -1 }}
        />
      </div>

      <div className="container max-w-6xl relative z-10">
        {/* 优化标题区域 - 更流线的设计 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-32"
          style={{ y: titleY }}
        >
          {/* 流线式标题装饰 */}
          <div className="relative mb-12">
            <div className="flex items-center justify-center gap-8 mb-2">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent to-stone-300"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <div className="w-2 h-2 bg-stone-400 rounded-full opacity-60"></div>
              <motion.div
                className="h-px bg-gradient-to-l from-transparent to-stone-300"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <h2 className="text-5xl font-extralight text-stone-800 tracking-wider mb-8 leading-tight">
            {t('inquiry.title')}
          </h2>

          <p className="text-stone-600 font-light max-w-2xl mx-auto leading-loose text-lg">
            {t('inquiry.description').split('\n').map((line, index) => (
              <span key={index}>
                {index > 0 && <br />}
                <span className="tracking-wide">{line}</span>
              </span>
            ))}
          </p>

          {/* 底部流线装饰 */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* 流线式联系方式布局 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative mb-32"
        >
          {/* 连接线装饰 */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-40 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* 电话 */}
            <motion.div
              className="text-center p-8 group relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* 背景流线装饰 */}
              <div className="absolute inset-0 rounded-full border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>

              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-stone-700 transition-all duration-300 relative z-10">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-stone-800 font-medium mb-3 tracking-wide">{t('inquiry.phone.title')}</h3>
              <a
                href={`tel:${t('inquiry.phone.number')}`}
                className="text-xl font-light text-stone-700 hover:text-stone-900 transition-colors block mb-3"
              >
                {t('inquiry.phone.number')}
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
                <Clock className="h-4 w-4" />
                <span>{t('inquiry.phone.hours')}</span>
              </div>
            </motion.div>

            {/* 在线预订 */}
            <motion.div
              className="text-center p-8 group relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>

              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-stone-700 transition-all duration-300 relative z-10">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-stone-800 font-medium mb-4 tracking-wide">{t('inquiry.online.title')}</h3>
              <p className="text-stone-600 text-sm mb-4">{t('inquiry.online.description')}</p>
              <Button
                onClick={() => openBookingSystem('inquiry')}
                className="bg-stone-800 hover:bg-stone-700 text-white font-light px-8 py-2 text-sm tracking-wider transition-all duration-300"
              >
                {t('inquiry.online.button')}
              </Button>
            </motion.div>

            {/* 邮件 */}
            <motion.div
              className="text-center p-8 group relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>

              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-stone-700 transition-all duration-300 relative z-10">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-stone-800 font-medium mb-3 tracking-wide">{t('inquiry.email.title')}</h3>
              <p className="text-stone-600 text-sm mb-2">{t('inquiry.email.description')}</p>
              <p className="text-stone-500 text-xs">{t('inquiry.email.note')}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* 流线式表单设计 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto relative"
        >
          {/* 表单背景装饰线条 */}
          <div className="absolute -top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-60"></div>

          <div className="bg-white border border-stone-200 rounded-sm shadow-lg shadow-stone-200/50 overflow-hidden">
            {/* 表单头部装饰 */}
            <div className="h-1 bg-gradient-to-r from-stone-300 via-stone-400 to-stone-300"></div>

            <div className="p-20">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* お問い合わせ区分 */}
                <div className="space-y-5">
                  <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                    {t('inquiry.form.inquiryType')} *
                  </label>
                  <div className="flex gap-8">
                    {[
                      { value: "reservation", label: t('inquiry.form.reservation') },
                      { value: "other", label: t('inquiry.form.other') }
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={option.value}
                          checked={formData.inquiryType === option.value}
                          onChange={(e) => setFormData({...formData, inquiryType: e.target.value as any})}
                          className="w-4 h-4 text-stone-800 border-stone-300 focus:ring-stone-500 focus:ring-1"
                        />
                        <span className="text-stone-700 font-light tracking-wide group-hover:text-stone-900 transition-colors">{option.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* 预约专用字段 */}
                {formData.inquiryType === "reservation" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-12 pt-12 border-t border-stone-200 relative"
                  >
                    {/* 装饰线 */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="space-y-3">
                        <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                          {t('inquiry.form.checkInDate')} *
                        </label>
                        <div>
                          <input
                            type="date"
                            value={formData.checkInDate}
                            onChange={(e) => {
                              setFormData({...formData, checkInDate: e.target.value});
                              clearFieldError('checkInDate');
                            }}
                            className={getFieldClassName('checkInDate', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                          />
                          {showErrors && errors.checkInDate && (
                            <p className="text-red-500 text-xs mt-2 font-light">{errors.checkInDate}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                          {t('inquiry.form.checkInTime')} *
                        </label>
                        <div>
                          <input
                            type="text"
                            placeholder={t('inquiry.form.checkInTimePlaceholder')}
                            value={formData.checkInTime}
                            onChange={(e) => {
                              setFormData({...formData, checkInTime: e.target.value});
                              clearFieldError('checkInTime');
                            }}
                            className={getFieldClassName('checkInTime', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light placeholder:text-stone-400 transition-colors')}
                          />
                          {showErrors && errors.checkInTime && (
                            <p className="text-red-500 text-xs mt-2 font-light">{errors.checkInTime}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                          {t('inquiry.form.adults')} *
                        </label>
                        <div>
                          <select
                            value={formData.adults}
                            onChange={(e) => {
                              setFormData({...formData, adults: e.target.value});
                              clearFieldError('adults');
                            }}
                            className={getFieldClassName('adults', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                          >
                          <option value="">{t('inquiry.form.selectOption')}</option>
                            {[1,2,3,4].map(num => (
                              <option key={num} value={num}>{num}名</option>
                            ))}
                          </select>
                          {showErrors && errors.adults && (
                            <p className="text-red-500 text-xs mt-2 font-light">{errors.adults}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="space-y-3">
                        <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                          {t('inquiry.form.children')} *
                        </label>
                        <div>
                          <select
                            value={formData.children}
                            onChange={(e) => {
                              setFormData({...formData, children: e.target.value});
                              clearFieldError('children');
                            }}
                            className={getFieldClassName('children', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                          >
                          <option value="">{t('inquiry.form.selectOption')}</option>
                            {[0,1,2,3,4].map(num => (
                              <option key={num} value={num}>{num}名</option>
                            ))}
                          </select>
                          {showErrors && errors.children && (
                            <p className="text-red-500 text-xs mt-2 font-light">{errors.children}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-5 md:col-span-2">
                        <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                          {t('inquiry.form.shuttle')} *
                        </label>
                        <div>
                          <div className="flex gap-8">
                            {[
                              { value: "not_needed", label: t('inquiry.form.shuttleNotNeeded') },
                              { value: "needed", label: t('inquiry.form.shuttleNeeded') }
                            ].map((option) => (
                              <motion.label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer group"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <input
                                  type="radio"
                                  name="shuttle"
                                  value={option.value}
                                  checked={formData.shuttle === option.value}
                                  onChange={(e) => {
                                    setFormData({...formData, shuttle: e.target.value as any});
                                    clearFieldError('shuttle');
                                  }}
                                  className="w-4 h-4 text-stone-800 border-stone-300 focus:ring-stone-500 focus:ring-1"
                                />
                                <span className="text-stone-700 font-light tracking-wide group-hover:text-stone-900 transition-colors">{option.label}</span>
                              </motion.label>
                            ))}
                          </div>
                          {showErrors && errors.shuttle && (
                            <p className="text-red-500 text-xs mt-2 font-light">{errors.shuttle}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 基本情報 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-3">
                    <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                      {t('inquiry.form.name')} *
                    </label>
                    <div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          clearFieldError('name');
                        }}
                        className={getFieldClassName('name', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                      />
                      {showErrors && errors.name && (
                        <p className="text-red-500 text-xs mt-2 font-light">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  {locale === 'ja' && (
                    <div className="space-y-3">
                      <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                        {t('inquiry.form.kana')} *
                      </label>
                      <div>
                        <input
                          type="text"
                          value={formData.kana}
                          onChange={(e) => {
                            setFormData({...formData, kana: e.target.value});
                            clearFieldError('kana');
                          }}
                          className={getFieldClassName('kana', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                        />
                        {showErrors && errors.kana && (
                          <p className="text-red-500 text-xs mt-2 font-light">{errors.kana}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                      {t('inquiry.form.phone')} *
                    </label>
                    <div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({...formData, phone: e.target.value});
                          clearFieldError('phone');
                        }}
                        className={getFieldClassName('phone', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                      />
                      {showErrors && errors.phone && (
                        <p className="text-red-500 text-xs mt-2 font-light">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-3">
                    <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                      {t('inquiry.form.email')} *
                    </label>
                    <div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          clearFieldError('email');
                        }}
                        className={getFieldClassName('email', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                      />
                      {showErrors && errors.email && (
                        <p className="text-red-500 text-xs mt-2 font-light">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                      {t('inquiry.form.emailConfirm')} *
                    </label>
                    <div>
                      <input
                        type="email"
                        value={formData.emailConfirm}
                        onChange={(e) => {
                          setFormData({...formData, emailConfirm: e.target.value});
                          clearFieldError('emailConfirm');
                        }}
                        className={getFieldClassName('emailConfirm', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light transition-colors')}
                      />
                      {showErrors && errors.emailConfirm && (
                        <p className="text-red-500 text-xs mt-2 font-light">{errors.emailConfirm}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-stone-800 font-medium text-sm tracking-wider uppercase">
                      {t('inquiry.form.message')} *
                    </label>
                    <div>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({...formData, message: e.target.value});
                          clearFieldError('message');
                        }}
                        className={getFieldClassName('message', 'w-full px-0 py-4 border-0 border-b focus:ring-0 text-stone-800 font-light resize-none transition-colors')}
                      />
                      {showErrors && errors.message && (
                        <p className="text-red-500 text-xs mt-2 font-light">{errors.message}</p>
                      )}
                    </div>
                  </div>
                </div>


                {/* 同意チェックボックス */}
                <div className="space-y-5 pt-10 border-t border-stone-200 relative">
                  <div className="absolute top-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

                  <div>
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => {
                          setFormData({...formData, privacyConsent: e.target.checked});
                          clearFieldError('privacyConsent');
                        }}
                        className="mt-1 w-4 h-4 text-stone-800 border-stone-300 rounded-sm focus:ring-stone-500 focus:ring-1"
                      />
                      <span className="text-sm text-stone-700 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
                        {t('inquiry.form.privacyConsent')}
                      </span>
                    </label>
                    {showErrors && errors.privacyConsent && (
                      <p className="text-red-500 text-xs mt-2 font-light ml-8">{errors.privacyConsent}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.confirmationConsent}
                        onChange={(e) => {
                          setFormData({...formData, confirmationConsent: e.target.checked});
                          clearFieldError('confirmationConsent');
                        }}
                        className="mt-1 w-4 h-4 text-stone-800 border-stone-300 rounded-sm focus:ring-stone-500 focus:ring-1"
                      />
                      <span className="text-sm text-stone-700 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
                        {t('inquiry.form.confirmationConsent')}
                      </span>
                    </label>
                    {showErrors && errors.confirmationConsent && (
                      <p className="text-red-500 text-xs mt-2 font-light ml-8">{errors.confirmationConsent}</p>
                    )}
                  </div>

                  {formData.inquiryType === "reservation" && (
                    <div>
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.reservationNote}
                          onChange={(e) => {
                            setFormData({...formData, reservationNote: e.target.checked});
                            clearFieldError('reservationNote');
                          }}
                          className="mt-1 w-4 h-4 text-stone-800 border-stone-300 rounded-sm focus:ring-stone-500 focus:ring-1"
                        />
                        <span className="text-sm text-stone-700 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
                          {t('inquiry.form.reservationNote')}
                        </span>
                      </label>
                      {showErrors && errors.reservationNote && (
                        <p className="text-red-500 text-xs mt-2 font-light ml-8">{errors.reservationNote}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 送信ボタン */}
                <div className="pt-12 text-center relative">
                  <div className="absolute top-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-700 text-white font-light px-16 py-4 text-sm tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {t('inquiry.form.submit')}
                    </Button>
                  </motion.div>
                </div>

                <div className="text-center pt-6">
                  <p className="text-xs text-stone-500 font-light tracking-wide">
                    {t('inquiry.form.required')}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* 流线式结尾装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-stone-300"></div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-stone-300"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}