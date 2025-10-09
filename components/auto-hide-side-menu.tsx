"use client";

import { useEffect, useState } from "react";
import { SideMenu } from "./side-menu";
import { ChevronRight } from "lucide-react";
import { Z_INDEX } from "@/lib/z-index";

const EDGE_TRIGGER_WIDTH = 30;
const HIDE_DELAY = 500;

export function AutoHideSideMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    let isOverMenu = false;
    let isOverEdge = false;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;

      if (mouseX <= EDGE_TRIGGER_WIDTH) {
        isOverEdge = true;

        if (hideTimer) {
          clearTimeout(hideTimer);
          setHideTimer(null);
        }

        if (!isVisible) {
          setIsVisible(true);
          setShowHint(false);
        }
      } else {
        isOverEdge = false;
      }

      if (mouseX <= 256 && window.innerWidth >= 1024) {
        isOverMenu = true;

        if (hideTimer) {
          clearTimeout(hideTimer);
          setHideTimer(null);
        }
      } else {
        isOverMenu = false;

        if (!isOverEdge && !isOverMenu && isVisible && !hideTimer) {
          const timer = setTimeout(() => {
            setIsVisible(false);
            setHideTimer(null);
          }, HIDE_DELAY);
          setHideTimer(timer);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [isVisible, hideTimer]);

  return (
    <>
      <SideMenu autoHide={true} isVisible={isVisible} />

      {/* 边缘触发提示 - 仅在桌面端显示 */}
      {showHint && !isVisible && (
        <div
          className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 pointer-events-none animate-pulse"
          style={{ zIndex: Z_INDEX.NAVIGATION - 1 }}
        >
          <div className="flex items-center gap-1 bg-stone-800/80 text-white px-2 py-3 rounded-r-lg backdrop-blur-sm">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      )}
    </>
  );
}
