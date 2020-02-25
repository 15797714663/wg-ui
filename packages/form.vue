<template>
  <div class="hm-form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WgForm',
  props: {
    model: {
      type: Object,
      require: true
    },
    labelWidth: {
      label: String,
      default: '80px'
    }
  },
  provide () {
    return {
      Form: this
    }
  }
}
</script>
<style lang="scss">

</style>
