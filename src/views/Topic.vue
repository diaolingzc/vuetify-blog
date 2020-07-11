<template>
  <div id="topic">
    <v-container fluid>
      <v-row
        v-for="(img, i) in imgs"
        :key="i"
        justify="center"
      >
        <v-col
          class="col-padding-0"
          cols="0"
          :md="3"
        />
        <v-col
          cols="12"
          :md="6"
        >
          <v-lazy min-height="200px">
            <v-img
              v-image-preview
              :src="img.img"
              width="100%"
            />
          </v-lazy>
        </v-col>
        <v-col
          class="col-padding-0"
          cols="0"
          :md="3"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { showTopic } from '@/api/topics.js'
  export default {
    name: 'Topic',
    props: {
      topicId: [Number, String],
    },

    data () {
      return {
        imgs: [],
      }
    },

    watch: {
      topicId () {
        this.getTopic(this.topicId)
      },
    },

    created () {
      this.getTopic(this.topicId)
    },

    methods: {
      getTopic (topicId) {
        showTopic(topicId).then((res) => {
          this.imgs = res.data.data
        }).catch((e) => {
          this.$router.push({ name: 'home' })
        })
      },
    },
  }
</script>

<style>
.col-padding-0 {
  padding: 0px
}
</style>
