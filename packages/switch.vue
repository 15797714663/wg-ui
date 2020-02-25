<template>
   <label class="hm-switch" @click="changeswitch" :class="{'is-checked':value}">
    <span class="hm-switch__core" ref="core">
      <span class="hm-switch__button"></span>
    </span>
  </label>
</template>
<script>
export default {
  name: 'WgSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    async changeswitch () {
      this.$emit('input', !this.value)
      //   点击的时候改变颜色
      //   点击之后value在props虽然变成了true,但是下面的打印值为false
      //   值改了，父组件还没有吧值改掉，就调用setcolor()函数是有问题的
      console.log(this.value)
      // await 表示等一下，等value值发生了改变,等这个函数
      //  数据修改后,等待dom更新
      await this.$nextTick()
      this.setcolor()
    },
    // 封装设置颜色的方法
    setcolor () {
      if (this.activeColor || this.inactiveColor) {
        var color = this.value ? this.activeColor : this.inactiveColor
        // $ref用法
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    }
  },
  mounted () {
    this.setcolor()
  }
}
</script>
<style lang="scss">
.hm-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  .hm-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
    .hm-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
.hm-switch.is-checked {
  .hm-switch__core {
    border-color: #409eff;
    background-color: #409eff;
    .hm-switch__button {
      transform: translateX(20px);
    }
  }
}
</style>
