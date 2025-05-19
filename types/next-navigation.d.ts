// 为Next.js 导航API扩展类型定义
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

declare module "next/navigation" {
  export function useRouter(): AppRouterInstance;

  // 添加其他可能需要的导航API
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}
