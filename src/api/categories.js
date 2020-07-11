import request from '@/utils/request'

export function getCategories () {
  return request({
    url: '/coser_categories',
    method: 'get',
  })
}
