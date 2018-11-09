<template>
  <div class="purchase-item row">
    <div class="col-md-1">
      {{item.id}}
    </div>
    <div class="col-md-3">
      {{item.name}}
    </div>
    <div class="col-md-6">
      {{item.description}}
    </div>
    <div class="col-md-1 pointer" @click="remove">
      remove
    </div>
    <div class="col-md-1 pointer" @click="update">
      upd.
    </div>
  </div>
</template>

<script>

import ItemAPI from '../../api/Item';

export default {
  name: 'PurchaseItem',
  props: {
    item: Object,
  },
  methods: {
    async update() {
      const newName = prompt('enter new name');
      if (!newName) return false;
      const newDesc = prompt('enter new description');
      if (!newDesc) return false;
      await ItemAPI.updateItem({
        id: this.item.id,
        name: newName,
        description: newDesc,
      });
    },
    async remove() {
      const conf = confirm('Remove item?');
      if (conf) {
        await ItemAPI.removeItem(this.item.id);
      }
    },
  },
};
</script>

<style>
  .purchase-item {
    border-radius: 5px;
    min-height: 40px;
    line-height: 40px;
    background: #e74c3c;
    margin-bottom: 20px;
    color: #fff;
  }
  .pointer {
    cursor: pointer;
  }
</style>
