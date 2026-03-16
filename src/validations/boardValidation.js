/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định ta không cần custom message ở phía BE làm gì vì để bên FE tự validate và custom message phía FE cho đẹp.
   * Back-end chỉ cần validate Đảm Bảo Dữ Liệu Chuẩn Xác, và trả về message từ thư viện là được
   * Quan trọng: Việc Validate dữ liệu BẮT BUỘC phải có ở phía Back-end vì đây là điểm cuối để lưu dữ liệu vào Database
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là validate dữ liệu ở cả phía Back-end và Front-end
   */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (customized message)',
      'string.empty': 'Title cannot be empty (customized message)',
      'string.min': 'Title must be at least {#limit} characters (customized message)',
      'string.max': 'Title must be at most {#limit} characters (customized message)',
      'string.trim': 'Title cannot have leading or trailing spaces (customized message)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // Set abortEarly to false to show all errors instead of stopping at the first error
    await correctCondition.validateAsync(req.body, { abortEarly: false })
 
    // Validate dữ liệu hợp lệ thì cho request đi tiếp sang controller
    // Để ý trong Route
    // .post(boardValidation.createNew, boardController.createNew)
    // Validation : OK -> next() -> req đi đến controller
    // Chi tiết xem trong BE_data_flow
    next()
  } catch (error) {
    // Gom lỗi lại cùng với những thông tin cần thiết rồi sau đó truyền vào next() để gọi đến Middleware xử lý lỗi tập trung (errorHandlingMiddleware) để xử lý lỗi
    // const errorMessage = new Error(error).message
    // const customeError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    // next(customeError)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }


}

export const boardValidation = {
  createNew
}
