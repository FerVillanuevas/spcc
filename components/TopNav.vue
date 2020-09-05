<template>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">
    Single Page CC
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
        <template v-if="categories">
          <template v-for="category in categories">
              <li class="nav-item dropdown" v-if="category.categories" :key="category.id">
              <a class="nav-link dropdown-toggle" href="#" :id="category.id" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ category.name }}
              </a>
              <div class="dropdown-menu" :aria-labelledby="category.id">
                <nuxt-link :to="{name: 'category', params: { category:category.id } }" class="dropdown-item">{{ category.name }}</nuxt-link>
                <nuxt-link :to="{name: 'category', params: { category:subcategory.id } }" class="dropdown-item"  v-for="subcategory in category.categories" :key="subcategory.id">{{ subcategory.name }}</nuxt-link>
              </div>
            </li>
            <li  class="nav-item" :key="category.id" v-else>
              <nuxt-link :to="{name: 'category', params: { category:category.id } }" class="nav-link">{{ category.name }}</nuxt-link>
            </li>
          </template>


        </template>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>

</template>

<script>
export default {
  props: {
    catalog: Object
  },
  data () {
    return {
      categories: this.catalog.categories.filter((category) => category.c_showInMenu == true)
    }
  }
}
</script>
