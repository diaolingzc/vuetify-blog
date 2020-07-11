import storage from 'good-storage'

const CategoriesKey = 'coser_categories'

export function getCategories () {
  return storage.get(CategoriesKey)
}

export function setCategories (categories) {
  return storage.set(CategoriesKey, categories)
}

export function removeCategories () {
  return storage.remove(CategoriesKey)
}
