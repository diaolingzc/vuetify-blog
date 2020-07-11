<!--
 * @Author: Yunli
 * @Date: 2020-07-02 16:53:26
 * @LastEditors: Yunli
 * @LastEditTime: 2020-07-02 17:36:32
 * @Description:
-->
<template>
  <v-list-group
    :group="group"
    :sub-group="subGroup"
    value="true"
    append-icon="mdi-menu-down"
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title
          @click.stop="onClick(item)"
          v-text="item.title"
        />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children">
      <base-item-sub-group
        v-if="child.children"
        :key="`sub-group-${i}`"
        :item="child"
      />

      <base-item
        v-else
        :key="`item-${i}`"
        :item="child"
        child
        text
      />
    </template>
  </v-list-group>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { mapActions } from 'vuex'

  export default {
    name: 'ItemGroup',

    inheritAttrs: false,

    props: {
      item: {
        type: Object,
        default: () => ({
          avatar: undefined,
          group: undefined,
          title: undefined,
          children: [],
        }),
      },
      subGroup: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      children () {
        return this.item.children.map(item => ({
          ...item,
          to: !item.to ? undefined : `${this.item.group}/${item.to}`,
        }))
      },
      group () {
        return this.genGroup(this.item.children)
      },
    },

    methods: {
      ...mapActions({
        toggleDrawer: 'app/toggleDrawer',
        setCategoryId: 'app/setCategoryId',
      }),
      genGroup (children) {
        return children
          .filter(item => item.to)
          .map(item => {
            const parent = item.group || this.item.group
            let group = `${parent}/${kebabCase(item.to)}`

            if (item.children) {
              group = `${group}|${this.genGroup(item.children)}`
            }

            return group
          }).join('|')
      },
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

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>
