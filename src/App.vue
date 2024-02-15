<script setup>
import { ref, reactive } from "vue";
import { data, fn } from "./data";
import AddNewPost from "./components/AddNewPost.vue";
import Posts from "./components/Posts.vue";
import Pagination from "./components/Pagination.vue";
import Loader from "./components/Loader.vue";

const addNewPost = ref(false);
const loading = ref(false);
const posts = ref([]);

const getPostsFromServer = () => {
  loading.value = true;
  const res = fn.fetchPublicApi("/posts", {}, "GET");
  res.then((response) => {
    loading.value = false;
    data.posts = response;
    posts.value = JSON.parse(JSON.stringify(data.posts));
  });
};
getPostsFromServer();

const getPosts = () => {
  let indexNumber = 0;
  if(data.page > 1) {
    indexNumber = (data.page*6);
  }
  posts.value = JSON.parse(JSON.stringify(data.posts));
  return posts.value.splice(indexNumber, 6);
}

</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <h1 class="font-bold text-xl mb-2">Simple Blog</h1>
    <button
      @click="addNewPost = !addNewPost"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      Add New Post
    </button>
  </div>

  <AddNewPost v-if="addNewPost" v-model:status="addNewPost" v-model:loading="loading" />
  <Posts v-if="!loading" :posts="getPosts()" />
  <Pagination v-if="!loading" />
  <Loader v-if="loading" />
</template>

<style scoped>
</style>
