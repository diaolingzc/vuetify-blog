<template>
  <div id="home">
    <section id="feed">
      <mescroll-vue
        ref="mescroll"
        :down="mescrollDown"
        :up="mescrollUp"
        @init="mescrollInit"
      >
        <v-container class="container">
          <v-row>
            <feed-card
              v-for="topic in dataList"
              :key="topic.id"
              :value="topic"
            />
          </v-row>
        </v-container>
      </mescroll-vue>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import { getTopic } from '@/api/topics'
  export default {
    name: 'Home',

    components: {
      FeedCard: () => import('@/components/home/FeedCard'),
      MescrollVue,
    },

    data () {
      return {
        mescroll: null, // mescroll实例对象
        mescrollDown: {},
        mescrollUp: {
          // 上拉加载的配置.
          callback: this.upCallback,
          page: {
            num: 0,
            size: 12,
          },
          toTop: {
            // src: require('@/assets/mescroll-totop.png'),
            html: '<button type="button" class="v-btn v-btn--bottom v-btn--contained v-btn--fab v-btn--fixed v-btn--right v-btn--round theme--light v-size--default" title="BackTop" style="background-color: rgb(129, 212, 250); border-color: rgb(129, 212, 250); margin-top: 64px;"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi mdi-chevron-up theme--light"></i></span></button>',
            offset: 1000,
          },
          lazyLoad: {
            use: true,
          },
        },
        dataList: [],
        scrollHeight: '0px',
      }
    },

    computed: {
      ...mapGetters(['categoryid']),
    },

    watch: {
      categoryid () {
        this.mescroll.scrollTo(0)
        this.mescroll.resetUpScroll()
      },
    },

    beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
      next(vm => {
        if (vm.mescroll) {
          // 恢复到之前设置的isBounce状态
          if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
          // 滚动到之前列表的位置(注意:路由使用keep-alive才生效)
          if (vm.mescroll.lastScrollTop) {
            vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
            setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
              vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
            }, 16)
          }
        }
      })
    },
    beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      if (this.mescroll) {
        this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
        this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
      }
      next()
    },

    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit (mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },

      upCallback (page, mescroll) {
        const params = { page: page.num, include: 'category' }

        if (this.categoryid) params.coser_category_id = this.categoryid

        // 联网请求
        getTopic(params).then((response) => {
          // 请求的列表数据
          const data = response.data
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.dataList = []
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(data.data)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endByPage(data.data.length, data.meta.last_page)
          })
        }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
    },
  }
</script>
<style scoped>
/*通过fixed固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
</style>
