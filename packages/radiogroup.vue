<template>
  <div class="hm-radio-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'RadioGrounp',
  provide () {
    return {
      // this的意思就是当前组件自己，没被包裹的slot这里都进不来所以不存在有RadioGroup这个参数
      RadioGroup: this
    }
  },
  props: {
    //   接收值，将来还要去触发当前组件的input事件
    // provide 与inject(vue) provider/cosumer(react)
    value: null
  }
}
</script>
<style lang="scss">
</style>
