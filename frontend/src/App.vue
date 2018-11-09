<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
        </div>
        <div class="col-md-2">
          <atom-spinner v-if="loading" :animation-duration="1000" :size="60" :color="'#ff1d5e'"/>
        </div>
        <div class="col-md-5"></div>
      </div>
      <div v-if="!loading" class="row" style="margin-top: 5%">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <app-purchase v-for="item in items" :item="item" :key="item.id"></app-purchase>
        </div>
        <div class="col-md-2"></div>
      </div>
      <app-create-block></app-create-block>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unresolved */

import { AtomSpinner } from 'epic-spinners'
import Header from './components/header';
import PurchaseItem from './components/purchase';
import PurchaseCreateBlock from './components/purchase/CreateBlock';
import ItemAPI from './api/Item';

export default {
  name: 'App',
  data() {
    return {
      items: [],
      loading: true,
    };
  },
  methods: {
    addItem(item) {
      this.items.push(item);
    },
    removeItem(payload) {
      this.items.map((item, index) => {
        if (item.id === parseInt(payload.item_id, 10)) this.items.splice(index, 1);
        return item;
      });
    },
    updateItem(updatedItem) {
      this.items.map((item) => {
        // eslint-disable-next-line
        if (item.id === updatedItem.id) {
          item.name = updatedItem.name;
          item.description = updatedItem.description;
        }
        return item;
      });
    },
  },
  async mounted() {
    this.items = await ItemAPI.getItems();
    this.loading = false;
    this.$options.sockets.create_item = this.addItem;
    this.$options.sockets.update_item = this.updateItem;
    this.$options.sockets.delete_item = this.removeItem;
  },
  components: {
    'app-header': Header,
    'app-purchase': PurchaseItem,
    'app-create-block': PurchaseCreateBlock,
    AtomSpinner,
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
