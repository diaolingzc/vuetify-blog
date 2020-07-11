import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Topic from '../views/Topic.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/topic/:topicId',
      name: 'topic',
      component: Topic,
      props: true,
    },
  ],
})
