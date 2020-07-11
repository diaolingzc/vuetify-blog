const getters = {
  categories: state => state.app.categories,
  drawer: state => state.app.drawer,
  categoryid: state => state.app.categoryid,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
}
export default getters
