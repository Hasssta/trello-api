/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
const createNew = async (reqBody) => {
  try {
    // throw new ApiError(401, 'Hasssta test error') // tham số 1 là status code, tham số 2 là message lỗi tùy chỉnh (có thể không cần thiết vì thư viện đã có sẵn message chuẩn theo status code rồi)

    // Xử lí logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới tầng Model để xử lí lưu bản ghi newBoard vào trong Database
    // ...

    // Làm thêm cá xử lí logic khác với các Collection kahcs tùy đặc thù dự án ... v.v
    // Bắn email, noti về cho admin khi có 1 cái board mới được tạo ...v.v

    // Trả kết quả về, trong service luôn phải có return...
    // để trả về kết quả cho controller, nếu không có return thì controller sẽ nhận được undefined và không thể trả về kết quả cho client được
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}