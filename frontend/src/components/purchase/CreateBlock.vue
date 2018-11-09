<template>
  <div class="row" style="margin-top: 2%">
    <div class="col-md-2"></div>
    <div class="col-md-3">
      <input type="text" v-model="name" class="form-control" placeholder="Item name">
    </div>
    <div class="col-md-4">
      <input type="text" v-model="description" class="form-control" placeholder="Description">
    </div>
    <div class="col-md-">
      <div class="btn btn-primary" @click="save">Save</div>
    </div>
  </div>
</template>

<script>
import ItemAPI from '../../api/Item';

export default {
  name: 'CreateBlock',
  data() {
    return {
      name: null,
      description: null,
    };
  },
  methods: {
    async save() {
      await ItemAPI.createItem({
        name: this.name,
        description: this.description,
      });
      this.name = null;
      this.description = null;
    },
  },
};
</script>
