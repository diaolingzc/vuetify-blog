<template>
  <v-fab-transition>
    <v-btn
      v-show="isActive"
      :style="styles"
      color="#81D4FA"
      fab
      fixed
      right
      bottom
      title="BackTop"
      @click="$vuetify.goTo(0)"
    >
      <v-icon>
        mdi-chevron-up
      </v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  export default {
    name: 'CoreCta',

    data () {
      return {
        isActive: false,
      }
    },

    computed: {
      styles () {
        return {
          marginTop: `${this.$vuetify.application.top}px`,
        }
      },
    },

    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },

    methods: {
      handleScroll () {
        if (document.documentElement.scrollTop > 50) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
    },
  }
</script>
