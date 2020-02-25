<template>
  <label class="hm-checkbox" :class="{'is-checked':ischeck}">
    <span class="hm-checkbox__input">
      <span class="hm-checkbox__inner"></span>
      <input type="checkbox" class="hm-checkbox__original"
      :name="name"
      v-model="model"
      :value="label"
      />
    </span>
    <span class="hm-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'CheckBox',
  inject: {
    // 同理组件被checkboxgroup包裹就会有CheckboxGroup传进来
    CheckboxGroup: {
      default: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    model: {
      // v-model本来是要双向绑定传进来的数据，但是选择不同的按钮传进来值不一样，而
    //   父组件传进来的值是只读的，所以需要自己定义一个model
      get () {
        return this.CheckboxGroup ? this.CheckboxGroup.value : this.value
      },
      set (value) {
        // this.$emit('input', value)
        this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    isGroup () {
    // 用于判断checkbox是否被checkboxgroup所包裹 !!两个感叹号可以将其他值改成布尔值
      return !!this.CheckboxGroup
    },
    // 如果是group包裹，判断label是否在model中
    // 如果没有group包裹，直接使用model
    ischeck () {
      return this.isGroup ? this.model.includes(this.label) : this.model
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.hm-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  .hm-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .hm-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .hm-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      left: 10px;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .hm-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}
.hm-checkbox.is-checked {
  .hm-checkbox__input {
    .hm-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
  .hm-checkbox__label {
    color: #409eff;
  }
}
</style>
