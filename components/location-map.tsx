"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/lib/i18n/context"

// 更新HOTEL_LAT和HOTEL_LNG变量以匹配实际位置
// 这些坐标是轻井沢的大致位置，您可能需要根据实际地址进行调整
const HOTEL_LAT = 36.3485
const HOTEL_LNG = 138.6312

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    // 确保只在客户端执行，并且只执行一次
    if (!mapRef.current || (mapRef.current as any).mapInitialized) return

    // 动态加载Leaflet库
    const loadLeaflet = async () => {
      // 加载Leaflet CSS
      const linkEl = document.createElement("link")
      linkEl.rel = "stylesheet"
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkEl.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkEl.crossOrigin = ""
      document.head.appendChild(linkEl)

      // 等待CSS加载
      await new Promise((resolve) => setTimeout(resolve, 100))

      // 加载Leaflet JS
      const L = await import("leaflet")

      // 初始化地图
      if (mapRef.current) {
        const map = L.map(mapRef.current).setView([HOTEL_LAT, HOTEL_LNG], 15)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // 添加标记
        const icon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          shadowSize: [41, 41],
        })

        L.marker([HOTEL_LAT, HOTEL_LNG], { icon })
          .addTo(map)
          .bindPopup("Hotel Wellies")
          .openPopup()

        // 标记地图已初始化
        ;(mapRef.current as any).mapInitialized = true
      }
    }

    loadLeaflet()

    // 清理函数
    return () => {
      if (mapRef.current && (mapRef.current as any).mapInitialized) {
        // 如果需要清理地图实例
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-md"
      aria-label={t("gallery.mapAriaLabel")}
    ></div>
  )
}
