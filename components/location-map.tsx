"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Z_INDEX } from "@/lib/z-index";

// 酒店和车站的坐标
const HOTEL_LAT = 36.3485;
const HOTEL_LNG = 138.6312;
const STATION_LAT = 36.3476;
const STATION_LNG = 138.6298;

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // 确保只在客户端执行，并且只执行一次
    if (!mapRef.current || (mapRef.current as any).mapInitialized) return;

    // 动态加载Leaflet库
    const loadLeaflet = async () => {
      try {
        // 加载Leaflet CSS
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        linkEl.integrity =
          "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        linkEl.crossOrigin = "";
        document.head.appendChild(linkEl);

        // 添加我们的覆盖样式
        const overrideLinkEl = document.createElement("link");
        overrideLinkEl.rel = "stylesheet";
        overrideLinkEl.href = "/styles/leaflet-override.css";
        document.head.appendChild(overrideLinkEl);

        // 等待CSS加载
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 加载Leaflet JS
        const L = await import("leaflet");

        // 获取默认导出或者整个模块
        const leaflet = L.default || L;

        // 初始化地图
        if (mapRef.current && !mapRef.current.hasChildNodes()) {
          // 计算中心点（两个位置的中点）
          const centerLat = (HOTEL_LAT + STATION_LAT) / 2;
          const centerLng = (HOTEL_LNG + STATION_LNG) / 2;

          const map = leaflet
            .map(mapRef.current)
            .setView([centerLat, centerLng], 17);

          // 确保地图容器的z-index不会超出我们的控制
          if (mapRef.current) {
            mapRef.current.style.zIndex = Z_INDEX.MAP.toString();
          }

          leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            })
            .addTo(map);

          // 创建酒店标记图标（红色）
          const hotelIcon = (leaflet as any).divIcon({
            html: '<div style="background: #dc2626; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="color: white; font-size: 12px; font-weight: bold;">🏨</div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            className: "custom-hotel-icon",
          });

          // 创建车站标记图标（蓝色）
          const stationIcon = (leaflet as any).divIcon({
            html: '<div style="background: #2563eb; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="color: white; font-size: 12px; font-weight: bold;">🚂</div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            className: "custom-station-icon",
          });

          // 酒店地址信息
          const hotelAddress = "Hotel Wellies";
          const stationAddress = "中軽井沢駅";

          // 添加酒店标记
          leaflet
            .marker([HOTEL_LAT, HOTEL_LNG], { icon: hotelIcon })
            .addTo(map)
            .bindTooltip(hotelAddress, {
              permanent: true,
              direction: "top",
              offset: [0, -15],
              className: "custom-tooltip hotel-tooltip",
            });

          // 添加车站标记
          leaflet
            .marker([STATION_LAT, STATION_LNG], { icon: stationIcon })
            .addTo(map)
            .bindTooltip(stationAddress, {
              permanent: true,
              direction: "top",
              offset: [0, -15],
              className: "custom-tooltip station-tooltip",
            });

          // 添加从车站到酒店的路径线
          const pathLine = (leaflet as any)
            .polyline(
              [
                [STATION_LAT, STATION_LNG],
                [HOTEL_LAT, HOTEL_LNG],
              ],
              {
                color: "#3b82f6",
                weight: 3,
                opacity: 0.8,
                dashArray: "10, 10",
              }
            )
            .addTo(map);

          // 添加步行距离文本
          const midLat = (HOTEL_LAT + STATION_LAT) / 2;
          const midLng = (HOTEL_LNG + STATION_LNG) / 2;

          leaflet
            .marker([midLat, midLng], {
              icon: (leaflet as any).divIcon({
                html: '<div style="background: rgba(59, 130, 246, 0.9); color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; white-space: nowrap;">徒歩7分 / 7 min walk</div>',
                iconSize: [80, 20],
                iconAnchor: [40, 10],
                className: "custom-div-icon",
              }),
            })
            .addTo(map);

          // 标记地图已初始化
          (mapRef.current as any).mapInitialized = true;
        }
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    };

    loadLeaflet();

    // 清理函数
    return () => {
      if (mapRef.current && (mapRef.current as any).mapInitialized) {
        // 如果需要清理地图实例
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-md relative"
      style={{ zIndex: Z_INDEX.MAP }}
      aria-label={t("gallery.mapAriaLabel")}
    ></div>
  );
}
