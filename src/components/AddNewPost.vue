<script setup>
import { ref } from "vue";
import { data, fn } from "../data";
const newPost = ref({
  title: "",
  body: "",
  userId: 1,
});

const props = defineProps(["status", "loading"]);
const emit = defineEmits(["update:status", "update:loading"]);

const submitNewPost = () => {
  emit("update:loading", true);
  const res = fn.fetchPublicApi("/posts", newPost.value, "POST");
  res.then((response) => {
    emit("update:status", false);
    emit("update:loading", false);

    data.posts.unshift({
      ...newPost.value,
      id: response.id,
    });

    newPost.value.title = "";
    newPost.value.body = "";
  });
};
</script>

<template>
  <div class="flex flex-col justify-between items-center mb-6 gap-6">
    <div class="flex w-full">
      <div class="w-1/5">
        <label
          class="block text-gray-500 font-bold text-left mb-1 pr-4"
          for="inline-full-name"
        >
          Title
        </label>
      </div>
      <div class="w-4/5">
        <input
          v-model="newPost.title"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
        />
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <label
          class="block text-gray-500 font-bold text-left mb-1 pr-4"
          for="inline-full-name"
        >
          Body
        </label>
      </div>
      <div class="w-4/5">
        <textarea
          v-model="newPost.body"
          rows="4"
          name="comment"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        ></textarea>
      </div>
    </div>
    <button
      @click.prevent="submitNewPost()"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      Submit
    </button>
  </div>
</template>

<style scoped>
</style>
