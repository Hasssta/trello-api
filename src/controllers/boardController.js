/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // Cac loai request co ban
    // console.log('request.body: ', req.body)
    // console.log('request.query: ', req.query)
    // console.log('request.params: ', req.params)
    // console.log('request.files: ', req.files)
    // console.log('request.cookies: ', req.cookies)
    // console.log('request.jwtDecoded: ', req.jwtDecoded)

    // Dieu huong du lieu sang tang Service
    const createdBoard = await boardService.createNew(req.body)
    // Ta không đẩy req, res, next sang tầng Service vì đây là nơi xử lí logic và chỉ đưa những dữ liệu mà mình cần 

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Hasssta test error') // tham số 1 là status code, tham số 2 là message lỗi tùy chỉnh (có thể không cần thiết vì thư viện đã có sẵn message chuẩn theo status code rồi)

    // Co ket qua thi tra ve phia client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
    // next(error) -> co loi -> Goi den Middleware xu li loi tap trung (errorHandlingMiddleware) de xu ly loi 
    // Cụ thể bên phía server có 1 hàm xử lí lỗi tập trung có dạng app.use((err, req, res, next) => { ... }) -> Khi gọi next(error) thì sẽ tự động gọi đến Middleware này để xử lý lỗi
    // Việc này áp dụng cho tất cả các controller.
  }
}

export const boardController = {
  createNew
}