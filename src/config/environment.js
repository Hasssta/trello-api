// Tổ chức biến môi trường ENV trong một file riêng biệt để dễ quản lý và bảo mật
import 'dotenv/config' // thư viện dotenv

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

  BUILD_MODE: process.env.BUILD_MODE,

  AUTHOR: process.env.AUTHOR
}