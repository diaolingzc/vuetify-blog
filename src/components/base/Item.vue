<template>
  <v-list-item
    active-class="black--text"
    @click="onClick(item)"
  >
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="child">
      <v-list-item-subtitle v-text="item.title" />
    </v-list-item-content>

    <v-list-item-content v-else>
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'
  import { mapActions } from 'vuex'

  export default {
    name: 'Item',

    mixins: [Themeable],

    props: {
      item: {
        type: Object,
        default: () => ({
          href: undefined,
          icon: undefined,
          subtitle: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      child: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      ...mapActions({
        toggleDrawer: 'app/toggleDrawer',
        setCategoryId: 'app/setCategoryId',
      }),
      onClick (item) {
        this.toggleDrawer()
        this.setCategoryId(item.id)
        if (this.$route.name !== 'home') {
          this.$router.push({ name: 'home' })
        }
      },
    },
  }
</script>
