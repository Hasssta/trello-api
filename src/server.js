/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment.js'

const START_SERVER = () => {
  const app = express()

  app.get('/', async(req, res) => {
    console.log(process.env)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Back-end server is running successfully at Host: ${ env.APP_HOST } and Port: ${ env.APP_PORT }`)
  })

  // Thuc hien tac dung clean up truoc khi thoat ung dung
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


