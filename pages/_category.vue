<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-md-3 refinamets">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="refinement in refinements" :key="refinement.attribute_id">
            <label :for="refinement.attribute_id">{{ refinement.label }}</label>
            <ul class="list-group list-group-flush">
              <li class="list-group-item list-group-item-action" v-for="(value, i) in refinement.values" :key="i + refinement.attribute_id">  <a v-on:click="refresh(value.value)">{{ value.value }}</a> </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-md-9 products">
        <div class="row">
          <div class="col-md-4" v-for="product in products" :key="product.product_id">
            <div class="card">
              <img :src="product.image.link" class="card-img-top" >
              <div class="card-body">
                <h5 class="card-title">{{ product.product_name }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      response: {},
      products: [],
      refinements: []
    }
  },
  methods: {
    refresh() {
      this.$fetch()
    }
  },
  async fetch() {
    let { data } = await this.$salesforce.products(this.$route.params.category);
    this.response = data;
    this.products = data.hits;
    this.refinements = data.refinements
  },
  fetchOnServer: true,
}
</script>
