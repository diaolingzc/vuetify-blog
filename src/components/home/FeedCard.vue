<template>
  <v-col
    cols="12"
    :md="3"
  >
    <router-link :to="{name:'topic', params: {topicId: value.id}}">
      <v-lazy min-height="200px">
        <base-card
          color="grey lighten-1"
          class="rounded-lg"
          dark
        >
          <v-img
            :src="value.cover"
            width="100%"
            gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
          >
            <v-row
              class="fill-height text-right ma-0"
            >
              <v-col cols="12">
                <v-chip
                  label
                  class="mx-0 mb-2 text-uppercase"
                  color="grey darken-3"
                  text-color="white"
                  small
                  @click.stop=""
                >
                  {{ value.category.name }}
                </v-chip>

                <h3 class="title font-weight-bold mb-2">
                  {{ value.title }}
                </h3>

                <div class="caption">
                  {{ value.id }}<br>{{ value.created_at }}
                </div>
              </v-col>

              <v-col align-self="end">
                <v-chip
                  class="text-uppercase ma-0"
                  color="primary"
                  label
                  small
                >
                  浏览
                </v-chip>
              </v-col>
            </v-row>
          </v-img>
        </base-card>
      </v-lazy>
    </router-link>
  </v-col>
</template>

<script>
  export default {
    name: 'FeedCard',

    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>
