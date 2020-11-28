<template>
  <div class="layout">
    <div>
      <v-app-bar app dark>
        <v-toolbar-title>Tensorflow.js Demo</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        dark
        app
        class="elevation-4"
        mobile-break-point="960"
        width="240"
        permanent
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              TensorFlow.js
            </v-list-item-title>
            <v-list-item-subtitle>
              demo
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-navigation-drawer>
    </div>

    <v-content>
      <router-view/>
    </v-content>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class Layout extends Vue {
    items = [
      {title: 'Home', icon: 'fa-user', path: '/home'},
      {title: 'y = kx + b', icon: 'fa-ad', path: '/first-example'},
      {title: 'About', icon: 'fa-address-book'},
    ]
  }

</script>

<style scoped>

</style>
