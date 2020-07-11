import storage from 'good-storage'

const TokenKey = 'coser_token'

export function getToken () {
  return storage.get(TokenKey)
}

export function setToken (token) {
  return storage.set(TokenKey, token)
}

export function removeToken () {
  return storage.remove(TokenKey)
}
