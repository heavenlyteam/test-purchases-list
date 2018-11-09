<template>
  <div class="container-fluid">
    <div class="row header">
      <div class="col-md-12 col">
        <h1>Purchase items</h1>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>

<style>
  .header {
    background: #8e44ad;
    height: 50px;
    text-align: center;
  }

  .header > .col > h1 {
    text-align: center;
    color: #FFF;
    text-transform: uppercase;
    font-size: 3em;
  }
</style>
