<template>
  <v-app-bar
    app
    flat
    fixed
    hide-on-scroll
    color="#ffffff"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <!-- <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        /> -->
        <div
          v-for="(category, i) in categories"
          :key="i"
          class="hidden-sm-and-down"
        >
          <v-menu
            v-if="category.children"
            open-on-hover
            rounded="lg"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                text
                v-on="on"
              >
                {{ category.title }}

                <v-icon
                  right
                >
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, ci) in category.children"
                :key="ci"
                @click="onClick(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            v-else
            v-bind="category"
            class="hidden-sm-and-down"
            text
            @click="onClick(category)"
          >
            {{ category.title }}
          </v-btn>
        </div>
        <v-spacer />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
// Utilities
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CoreAppBar',

    computed: {
      ...mapGetters(['categories', 'categoryid']),
    },

    created () {
      if (!this.categories) {
        this.setCategories()
      }
    },

    methods: {
      ...mapActions({
        toggleDrawer: 'app/toggleDrawer',
        setCategoryId: 'app/setCategoryId',
        setCategories: 'app/setCategories',
      }),
      onClick (item) {
        console.log(item)
        this.setCategoryId(item.id)
        if (this.$route.name !== 'home') this.$router.push({ name: 'home' })
      },
    },
  }
</script>
