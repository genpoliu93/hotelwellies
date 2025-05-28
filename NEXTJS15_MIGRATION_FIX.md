# Next.js 15 迁移修复说明

## 问题描述

在 Azure Static Web Apps 部署时遇到以下错误：

```
Type error: Type '{ params: { locale: Locale; }; }' does not satisfy the constraint 'PageProps'.
Types of property 'params' are incompatible.
Type '{ locale: Locale; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

## 根本原因

Next.js 15 中，页面组件的`params`和`searchParams`现在是异步的，需要使用`Promise`类型。这是为了支持更好的性能优化和流式渲染。

## 修复内容

### 1. 修复 `app/[locale]/booking/page.tsx`

**修改前：**

```typescript
export default function BookingPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  // ...
}
```

**修改后：**

```typescript
export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // ...
}
```

### 2. 修复 `app/[locale]/layout.tsx`

**修改前：**

```typescript
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = params as { locale: Locale };
  // ...
}
```

**修改后：**

```typescript
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // ...
}
```

## 关键变化

1. **函数签名**：页面组件需要标记为`async`
2. **参数类型**：`params`从`{ locale: Locale }`改为`Promise<{ locale: Locale }>`
3. **参数解构**：使用`await params`而不是直接解构

## 验证结果

- ✅ TypeScript 类型检查通过
- ✅ 不再有 params 相关的类型错误
- ✅ 保持了原有功能不变

## 注意事项

1. 这个修复只影响服务端组件（Server Components）
2. 客户端组件（使用"use client"）不受影响
3. 其他使用`searchParams`的组件也需要类似修复

## 相关文件

- `app/[locale]/booking/page.tsx` - 预订页面
- `app/[locale]/layout.tsx` - 语言布局组件

这个修复确保了项目与 Next.js 15 的兼容性，解决了 Azure Static Web Apps 部署时的类型错误。
