import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment.js'

// Khoi tao doi tuong trelloDatabaseInstance, ban dau la null vu chua connect
let trelloDatabaseInstance = null

// Khoi tao 1 doi tuong mongoClientInstance de ket noi den MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Ket noi dtbs
export const CONNECT_DB = async () => {
  // goi ket noi toi mongodb atlas voi uri da khai bao trong mongoclientInstance
  await mongoClientInstance.connect()
  // ket noi thanh cong thi lay ra database
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Dong ket noi dtbs khi can
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Function GET_DB (khong async) nay co nhiem vu export ra Trello Database instance sau khi da connect thanh cong toi mongoDB de chung ta su dung o nhieu noi khac nhau trong code
// Luu y: phai dam bao chi luon goi GET_DB sau khi da goi CONNECT_DB thanh cong
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('You must connect to Database first!')
  return trelloDatabaseInstance
}


