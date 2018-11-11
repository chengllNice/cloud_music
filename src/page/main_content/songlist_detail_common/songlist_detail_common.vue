<template>
  <div class="songlist_detail_common">
    <songlist-detail></songlist-detail>
  </div>
</template>

<script>
  import songlistDetail from './songlist_detail/songlist_detail.vue'
  export default {
    name: "songlist_detail_common",
    data() {
      return {}
    },
    computed: {},
    components: {
      songlistDetail
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>
.songlist_detail_common{
  width: 100%;
}
</style>
