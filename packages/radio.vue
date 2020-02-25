<template>
  <label class="hm-radio" :class="{'is-checked':label == model}">
    <span class="hm-radio__input">
      <span class="hm-radio__inner"></span>
      <input
        class="hm-radio__original"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
      >
    </span>
    <!-- 真正控制的是父组件的gender -->
    <span class="hm-radio__label" @click="hand">
       <slot></slot>
       <!-- 如果radio没有传内容我们就把label当内容 -->
       <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'WgRadio',
  // 接收就是接收RadioGroup 如果没传那么就给默认为空
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  computed: {
    model: {
      // 这里的作用就是让父组件绑定的值gender和父组件传过来的label值一样
      // 单选框实现原理，就是你点击会改变value传给父组件的值，(其实就是label),但是父组件的label总是不一样的，只有点击才触发传值
      get () {
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      // 这里的value是input上的value
      set (value) {
        //   触发父组件给当前组件注册的input事件
        //   this.RadioGroup.value下面这样写就错了
        // 点女的时候，label=0,那么上面input框的value就会为0，这时候这里把0返回给父组件的value,进而达到控制gender的目的
        this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    isGroup () {
    // 用于判断radio是否被radiogroup所包裹 !!两个感叹号可以将其他值改成布尔值
      return !!this.RadioGroup
    }
  },
  props: {
    label: {
      type: [String, Boolean, Number],
      default: ''
    },
    value: null,
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    // v-model="model"不能绑定value,因为value是父子间绑定传进来的值，根据单项数据流，子组件不能
    //    改变父组件传进来的值，只能读取值，所以需要在子组件中定义数据，并且可以把值传给父组件
    hand () {
      console.log(this.$slots)
      console.log(this)
    }
  }
}
</script>
<style lang="scss">
.hm-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  .hm-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .hm-radio__inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%) scale(0);
        transition: transform .15s ease-in;
      }
    }
    .hm-radio__original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .hm-radio__label {
    font-size: 14px;
    padding-left: 10px;
  }
}
.hm-radio.is-checked {
  .hm-radio__input {
    .hm-radio__inner {
      border-color: #409eff;
      background: #409eff;
      &:after {
        transform: translate(-50%,-50%) scale(1);
      }
    }
  }
  .hm-radio__label {
    color: #409eff;
  }
}
</style>
