import request from '@/utils/request'

export function getTopic (params) {
  return request({
    url: '/coser_topics',
    method: 'get',
    params,
  })
}

export function showTopic (topicId) {
  return request({
    url: `/coser_topics/${topicId}`,
    method: 'get',
  })
}
