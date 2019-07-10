<template>
  <div>{{test}}</div>
</template>

<script>
export default {
  props:['test'],
  data () {
    return {
      msg: ''
    };
  },
  watch: {
    test: function(newTab) {
      console.log(1);
    }
  },
  mounted () {

  }
};
</script>
