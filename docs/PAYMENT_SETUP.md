# 支付系统配置说明

## 概述

本项目已集成 Square 支付系统，支持信用卡支付。支付流程包括前端 Square SDK 集成和后端 API 调用。

## 环境变量配置

在项目根目录创建 `.env.local` 文件，配置以下环境变量：

```bash
# API配置
NEXT_PUBLIC_API_URL=http://localhost:5257

# 支付配置
NEXT_PUBLIC_PAYMENT_DOMAIN=hotelwellies.jp

# Square配置
NEXT_PUBLIC_SQUARE_APP_ID=your_square_app_id
NEXT_PUBLIC_SQUARE_LOCATION_ID=your_square_location_id
```

### 配置说明

- `NEXT_PUBLIC_API_URL`: 后端 API 基础 URL
- `NEXT_PUBLIC_PAYMENT_DOMAIN`: 支付域名配置，对应后端 Square 配置
- `NEXT_PUBLIC_SQUARE_APP_ID`: Square 应用 ID
- `NEXT_PUBLIC_SQUARE_LOCATION_ID`: Square 位置 ID

## 支付流程

### 1. 前端流程

1. **初始化 Square SDK**: 加载 Square Web Payments SDK
2. **创建支付表单**: 渲染信用卡输入界面
3. **数据验证**: 验证用户输入的预订和客户信息
4. **获取支付令牌**: 调用 Square SDK 获取支付令牌(nonce)
5. **构建支付请求**: 组装支付请求数据
6. **调用后端 API**: 发送支付请求到后端
7. **处理响应**: 根据支付结果显示成功或失败页面

### 2. 后端 API

后端 API 端点: `POST /api/payment/charge`

请求格式:

```json
{
  "nonce": "string",
  "amount": 10000,
  "currency": "JPY",
  "domain": "hotelwellies.jp",
  "booking": {
    "roomTypeCode": "STD",
    "roomTypeName": "Standard Room",
    "checkInDate": "2024-01-01",
    "checkOutDate": "2024-01-02",
    "guests": "2",
    "capacity": 2,
    "totalPrice": 11000
  },
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+81-90-1234-5678",
    "address": "Japan",
    "specialRequests": "Late check-in"
  }
}
```

响应格式:

```json
{
  "success": true,
  "paymentId": "payment_id",
  "status": "COMPLETED",
  "amount": 10000,
  "currency": "JPY",
  "receiptUrl": "https://...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 数据映射

### 房间类型映射

| 前端 roomId | roomTypeCode | roomTypeName  |
| ----------- | ------------ | ------------- |
| standard    | STD          | Standard Room |
| deluxe      | DLX          | Deluxe Room   |
| family      | FAM          | Family Room   |

### 预订信息映射

- `roomId` → `roomTypeCode` (房间类型代码)
- `roomId` → `roomTypeName` (房间类型名称)
- `checkInDate` → `checkInDate` (入住日期，YYYY-MM-DD 格式)
- `checkOutDate` → `checkOutDate` (退房日期，YYYY-MM-DD 格式)
- `adults + children` → `guests` (客人总数，字符串格式)
- `adults + children` → `capacity` (房间容量，数字格式)
- `price * 1.1` → `totalPrice` (总价格，包含税费)

### 客户信息映射

- `firstName` + `lastName` → 客户姓名
- `email` → 邮箱地址
- `phone` → 电话号码
- `country` → 地址信息
- `specialRequests` → 特殊要求（必填，如为空则使用空字符串）

## 错误处理

系统支持以下错误类型的处理：

1. **数据验证错误**: 必填字段缺失或格式错误
2. **网络错误**: API 调用失败或超时
3. **服务器错误**: 后端处理异常
4. **支付错误**: Square 支付处理失败

每种错误都有对应的多语言提示信息。

## 测试

### 测试环境配置

使用 Square 提供的测试环境配置：

- App ID: `sq0idp-vHpcsRYlmu4NS9oIvzPh1A`
- Location ID: `L30PM4WEJ0WAK`

### 测试卡号

Square 提供的测试卡号：

- 成功支付: `4111 1111 1111 1111`
- 失败支付: `4000 0000 0000 0002`

## 生产环境部署

1. 替换 Square 配置为生产环境的 App ID 和 Location ID
2. 确保后端 API URL 指向生产环境
3. 配置正确的支付域名
4. 测试完整的支付流程

## 安全注意事项

1. 敏感信息（如 Square 密钥）只在后端配置，不暴露给前端
2. 支付令牌(nonce)只能使用一次
3. 所有支付请求都通过 HTTPS 传输
4. 实施适当的错误处理，避免泄露敏感信息

## 故障排除

### 常见问题

1. **Square SDK 加载失败**

   - 检查网络连接
   - 确认 Square CDN 可访问

2. **支付初始化失败**

   - 验证 App ID 和 Location ID 配置
   - 检查浏览器控制台错误信息

3. **API 调用失败**

   - 确认后端 API 服务运行正常
   - 检查 API URL 配置
   - 验证请求数据格式

4. **支付处理失败**
   - 检查后端日志
   - 验证 Square 配置
   - 确认支付金额和货币设置
