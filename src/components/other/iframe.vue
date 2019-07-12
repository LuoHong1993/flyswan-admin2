<template>
  <iframe :src="url" style="width: 100%;" ref="iframe" frameborder='0'></iframe>
</template>
<script>
export default {
  data: function () {
    return {
      url: this.$route.params.url
    };
  },
  mounted () {
    this.$refs.iframe.style.height = (document.body.clientHeight*0.8)+'px';
  },
  methods: {
  }
};
</script>
