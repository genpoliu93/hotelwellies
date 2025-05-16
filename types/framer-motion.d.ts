import React from "react";
import * as framer from "framer-motion";

// 扩展 AnimatePresence 的类型定义
declare module "framer-motion" {
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    custom?: any;
    initial?: boolean;
    onExitComplete?: () => void;
    presenceAffectsLayout?: boolean;
    mode?: "sync" | "wait" | "popLayout";
    propagate?: boolean;
    anchorX?: string;
  }

  // 修改 AnimatePresence 组件类型以匹配 Next.js 15 的要求
  export const AnimatePresence: React.FC<framer.AnimatePresenceProps>;
}
