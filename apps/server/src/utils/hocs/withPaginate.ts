import { Model } from 'sequelize'
import { FindAndCountOptions } from 'sequelize/types/model'

interface PaginationI {
  page?: number
  limit?: number
  order?: string | 'ASC' | 'DESC'
  orderBy?: string
}

export const withPaginate =
  <M extends Model>(
    model: {
      findAndCountAll: (
        options: FindAndCountOptions
      ) => Promise<{ count: number; rows: M[] }>
    },
    pagination: PaginationI
  ) =>
  async (options?: FindAndCountOptions) => {
    const page = pagination.page || 1
    const limit = pagination.limit || 10
    const offset = (page - 1) * limit

    const data = await model.findAndCountAll({
      order: [[pagination.orderBy ?? 'createdAt', pagination.order ?? 'DESC']],
      ...options,
      offset,
      limit,
    })
    const totalPages = Math.ceil(data.count / limit)
    return {
      data: data.rows as M[],
      totalPages,
      currentPage: +page,
      count: data.count,
    }
  }
