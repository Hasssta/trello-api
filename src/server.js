/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment.js'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware.js'

const START_SERVER = () => {
  const app = express()

  // app.get('/', (req, res) => {
  //   console.log(process.env)
  //   res.end('<h1>Hello World!</h1><hr>')
  // })

  // enable req.body json data
  app.use(express.json())

  // Use API v1 với "/v1"
  app.use('/v1', APIs_V1)

  // Middleware xu li loi tap trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Back-end server is running successfully at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`)
  })

  // Thuc hien tac dung clean up truoc khi thoat ung dung https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    console.log('4. Server is shutting down')
    CLOSE_DB()
    console.log('5. Disconnected from Database')
  })
}

// Chi khi ket noi toi database thanh cong thi moi bat dau server
// Immediately Invoked Function Expression (IIFE)
(async () => {
  try {
    console.log('1. Connecting to Cloud Atlas...')
    await CONNECT_DB()
    console.log('2.Connected to Cloud Atlas successfully!')
    // Khoi dong server sau khi ket noi db thanh cong
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Chi khi ket noi toi database thanh cong thi moi bat dau server
// console.log('1. Connecting to Cloud Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2.Connected to Cloud Atlas successfully!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })


