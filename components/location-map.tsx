"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Z_INDEX } from "@/lib/z-index";

// 酒店和车站的准确坐标
// 酒店地址：長野県北佐久郡軽井沢町長倉2350-160
// 中轻井泽站：〒389-0111 Nagano, Kitasaku District, Karuizawa, Nagakura
const HOTEL_LAT = 36.350164242959764;
const HOTEL_LNG = 138.59845617665812;
const STATION_LAT = 36.34787075863807;
const STATION_LNG = 138.59258273313165;

// 酒店和车站的完整地址
const HOTEL_ADDRESS = "〒389-0111長野県北佐久郡軽井沢町長倉2350-160";
const STATION_ADDRESS = "中軽井沢駅";

// 检测设备类型
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 检测iOS设备
function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// 打开系统级导航
function openSystemNavigation(
  destinationAddress: string,
  destinationName: string = "Hotel Wellies"
): void {
  const encodedAddress = encodeURIComponent(destinationAddress);

  if (isMobileDevice()) {
    if (isIOS()) {
      // iOS设备：优先使用Apple Maps
      const appleMapsUrl = `maps://maps.google.com/maps?daddr=${encodedAddress}&directionsmode=walking`;
      const fallbackUrl = `https://maps.apple.com/?daddr=${encodedAddress}&dirflg=w`;

      // 尝试打开Apple Maps，如果失败则使用网页版
      window.location.href = appleMapsUrl;

      // 如果Apple Maps没有安装，1秒后跳转到网页版
      setTimeout(() => {
        window.open(fallbackUrl, "_blank");
      }, 1000);
    } else {
      // Android设备：使用Google Maps
      const googleMapsUrl = `https://maps.google.com/maps?daddr=${encodedAddress}&dirflg=w`;
      window.open(googleMapsUrl, "_blank");
    }
  } else {
    // 桌面设备：使用Google Maps网页版
    const googleMapsUrl = `https://maps.google.com/maps?daddr=${encodedAddress}&dirflg=w`;
    window.open(googleMapsUrl, "_blank");
  }
}

// 从OSRM API获取路径规划
async function getWalkingRoute(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): Promise<number[][]> {
  // 定义多个OSRM服务器作为备用
  const osrmServers = [
    "https://router.project-osrm.org/route/v1/foot",
    "https://routing.openstreetmap.de/routed-foot/route/v1/foot",
  ];

  let lastError: Error | null = null;

  // 尝试每个服务器
  for (const serverUrl of osrmServers) {
    try {
      console.log(`Trying OSRM server: ${serverUrl}`);

      // 创建一个带超时的请求
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

      try {
        const response = await fetch(
          `${serverUrl}/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.routes && data.routes.length > 0 && data.routes[0].geometry) {
          // 获取路径的几何坐标
          const coordinates = data.routes[0].geometry.coordinates;
          if (coordinates && coordinates.length > 0) {
            console.log(`Successfully got route from ${serverUrl}`);
            // 转换为 [lat, lng] 格式
            return coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          }
        }

        throw new Error("No valid routes found in response");
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.warn(`Failed to get route from ${serverUrl}:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      // 继续尝试下一个服务器
      continue;
    }
  }

  console.warn("All OSRM servers failed, using fallback manual route");
  console.error("Last error:", lastError);

  // 如果所有API都失败，返回备用的手动路径（更精确的路径）
  return [
    [STATION_LAT, STATION_LNG], // 起点：中轻井泽站
    [36.348245, 138.592583], // 出站后沿车站前道路
    [36.34858, 138.59352], // 左转进入主要道路
    [36.3492, 138.5951], // 沿主要道路北行
    [36.3498, 138.5968], // 继续北行
    [36.3501, 138.5975], // 右转进入酒店所在街道
    [36.3502, 138.5981], // 沿酒店街道前行
    [36.3503, 138.5988], // 接近酒店
    [HOTEL_LAT, HOTEL_LNG], // 终点：酒店
  ];
}

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  // 检查用户是否选择了"不再询问"
  const shouldShowDialog = () => {
    try {
      const dontAskAgain = sessionStorage.getItem(
        "hotelwellies-map-dialog-dont-ask"
      );
      return dontAskAgain !== "true";
    } catch {
      return true;
    }
  };

  // 保存用户选择（仅在当前会话有效）
  const saveDontAskAgain = () => {
    try {
      sessionStorage.setItem("hotelwellies-map-dialog-dont-ask", "true");
    } catch {
      // 忽略存储错误
    }
  };

  // 处理导航请求
  const handleNavigationRequest = (lat: number, lng: number, name: string) => {
    if (shouldShowDialog()) {
      setPendingNavigation({ lat, lng, name });
      setShowMapDialog(true);
    } else {
      // 用户选择了"不再询问"，直接返回，不显示弹窗也不打开地图
      return;
    }
  };

  // 处理弹窗确认
  const handleMapDialogConfirm = () => {
    if (pendingNavigation) {
      // 根据名称选择对应的地址
      const address =
        pendingNavigation.name === "Hotel Wellies"
          ? HOTEL_ADDRESS
          : STATION_ADDRESS;

      openSystemNavigation(address, pendingNavigation.name);
    }
    setShowMapDialog(false);
    setPendingNavigation(null);
  };

  // 处理弹窗取消
  const handleMapDialogCancel = () => {
    setShowMapDialog(false);
    setPendingNavigation(null);
  };

  // 处理"不再询问"
  const handleDontAskAgain = () => {
    saveDontAskAgain();
    // 不打开地图，只是关闭弹窗并保存选择
    setShowMapDialog(false);
    setPendingNavigation(null);
  };

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
        if (mapRef.current) {
          // 计算两个地点的中心点
          const centerLat = (HOTEL_LAT + STATION_LAT) / 2;
          const centerLng = (HOTEL_LNG + STATION_LNG) / 2;

          // 创建地图实例
          const map = (leaflet as any).map(mapRef.current, {
            center: [centerLat, centerLng],
            zoom: 15,
            scrollWheelZoom: false,
            zoomControl: true,
            attributionControl: false,
            layers: [],
          });

          // 定义多个地图图层
          const standardLayer = (leaflet as any).tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 19,
            }
          );

          const topoLayer = (leaflet as any).tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            {
              attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
              maxZoom: 17,
            }
          );

          const satelliteLayer = (leaflet as any).tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
              maxZoom: 19,
            }
          );

          // 添加默认图层
          standardLayer.addTo(map);

          // 添加图层控制器
          const baseLayers = {
            "标准地图 / Standard": standardLayer,
            "地形图 / Topographic": topoLayer,
            "卫星图 / Satellite": satelliteLayer,
          };

          (leaflet as any).control.layers(baseLayers).addTo(map);

          // 酒店地址文本
          const hotelAddress = "Hotel Wellies";
          const stationAddress = "中轻井泽站";

          // 创建自定义图标
          const hotelIcon = (leaflet as any).divIcon({
            html: '<div class="custom-marker hotel-marker">🏨</div>',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            className: "custom-div-icon",
          });

          const stationIcon = (leaflet as any).divIcon({
            html: '<div class="custom-marker station-marker">🚂</div>',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            className: "custom-div-icon",
          });

          // 添加标记
          const hotelMarker = leaflet
            .marker([HOTEL_LAT, HOTEL_LNG], { icon: hotelIcon })
            .addTo(map)
            .bindTooltip(hotelAddress, {
              permanent: true,
              direction: "top",
              offset: [0, -20],
              className: "custom-tooltip hotel-tooltip",
            });

          const stationMarker = leaflet
            .marker([STATION_LAT, STATION_LNG], { icon: stationIcon })
            .addTo(map)
            .bindTooltip(stationAddress, {
              permanent: true,
              direction: "top",
              offset: [0, -20],
              className: "custom-tooltip station-tooltip",
            });

          // 添加点击事件处理程序
          hotelMarker.on("click", () => {
            handleNavigationRequest(HOTEL_LAT, HOTEL_LNG, "Hotel Wellies");
          });

          stationMarker.on("click", () => {
            // 直接打开导航，不显示确认弹窗
            openSystemNavigation(STATION_ADDRESS, "中轻井泽站");
          });

          // 添加地图点击事件处理程序
          map.on("click", (e: any) => {
            // 无论点击地图任何地方，都导航到酒店地址
            handleNavigationRequest(HOTEL_LAT, HOTEL_LNG, "Hotel Wellies");
          });

          // 获取并添加真实的步行路径
          const addWalkingPath = async () => {
            try {
              const walkingPath = await getWalkingRoute(
                STATION_LAT,
                STATION_LNG,
                HOTEL_LAT,
                HOTEL_LNG
              );

              const pathLine = (leaflet as any)
                .polyline(walkingPath, {
                  color: "#059669", // 绿色，表示步行路线
                  weight: 4,
                  opacity: 0.8,
                  dashArray: "8, 12",
                })
                .addTo(map);

              // 添加步行距离文本
              const midLat = (HOTEL_LAT + STATION_LAT) / 2;
              const midLng = (HOTEL_LNG + STATION_LNG) / 2;

              leaflet
                .marker([midLat, midLng], {
                  icon: (leaflet as any).divIcon({
                    html: '<div style="background: rgba(5, 150, 105, 0.9); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">徒歩7分</div>',
                    iconSize: [60, 20],
                    iconAnchor: [30, 10],
                    className: "custom-div-icon",
                  }),
                })
                .addTo(map);
            } catch (error) {
              console.error("Failed to add walking path:", error);
            }
          };

          // 添加路径
          addWalkingPath();

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
    <div className="w-full h-full bg-gray-100 relative">
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{
          minHeight: "350px",
          zIndex: Z_INDEX.MAP,
        }}
      />

      {/* 地图导航弹窗 */}
      {showMapDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {t("contact.mapDialog.title")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("contact.mapDialog.message")}
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleMapDialogConfirm}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {t("contact.mapDialog.openMap")}
              </button>
              <button
                onClick={handleMapDialogCancel}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                {t("contact.mapDialog.cancel")}
              </button>
              <div className="text-center">
                <button
                  onClick={handleDontAskAgain}
                  className="bg-gray-50 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm w-full"
                >
                  {t("contact.mapDialog.dontAskAgain")}
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  {t("contact.mapDialog.dontAskAgainHint")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
