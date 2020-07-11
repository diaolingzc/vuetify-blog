<template>
  <mescroll-vue
    ref="mescroll"
    :down="mescrollDown"
    :up="mescrollUp"
    @init="mescrollInit"
  >
    <v-container class="container">
      <v-row>
        <feed-card
          v-for="article in dataList"
          :key="article.title"
          :value="article"
        />
      </v-row>

    <!-- <v-row align="center">
      <v-col cols="3">
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          square
          title="Previous page"
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-col>

      <v-col
        class="text-center subheading"
        cols="6"
      >
        PAGE {{ page }} OF {{ pages }}
      </v-col>

      <v-col
        class="text-right"
        cols="3"
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          square
          title="Next page"
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
      </v-col>
    </v-row> -->
    </v-container>
  </mescroll-vue>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import { getTopic } from '@/api/topics'

  export default {
    name: 'Feed',

    components: {
      FeedCard: () => import('@/components/FeedCard'),
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
        console.log('categoryid')
        this.mescroll.scrollTo(0)
        this.mescroll.resetUpScroll()
      },
    },

    beforeRouteEnter (to, from, next) {
      // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
      next(vm => {
        // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
        vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
      })
    },
    beforeRouteLeave (to, from, next) {
      // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
      // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
      this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
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
