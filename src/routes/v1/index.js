import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'

// file v1/index.js sẽ là file đại diện cho tất cả các route của API v1

const Router = express.Router()

// Check APIs v1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs V1 are ready to use.',
    code : StatusCodes.OK
  })
})

// Board APIs - những API liên quan tới Board sẽ được tách riêng ra một file boardRoute.js để dễ quản lý và bảo trì, sau đó import vào đây và sử dụng như bình thường
Router.use('/boards', boardRoute)

export const APIs_V1 = Router
