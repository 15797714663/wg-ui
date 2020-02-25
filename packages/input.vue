<template>
<!-- 第一个placeholde是这个input框里面自己的属性,加:是因为绑定传进来的placeholde数据 -->
  <!-- 不把diabled这个属性传进来，就不能判断is-disabled -->
  <div class="wg-input" :class="{'hm-input--suffix':show}">
      <!-- 如果传了showpassword 判断是否需要切换显示 如果不传，不判断-->
      <input
      class="wg-input__inner"
      :class="{'is-disabled': disabled1}"
      :placeholder="placeholder1"
      :type="showpassword ? (passwordvisiable ? 'text' :'password') : type1"
      :disabled="disabled1"
      :name="name1"
      :value="value"
      @input="handleinput"
      >
      <span class="hm-input__suffix" v-if="show">
        <i class="hm-input__icon hm-icon-circle-close" v-if="clearable && value" @click="clear"></i>
        <i class="hm-input__icon hm-icon-view" v-if="showpassword" @click="changetype"
        :class="{'hm-active':passwordvisiable}"></i>
      </span>
  </div>
</template>
<script>
export default {
  name: 'WgInput',
  data () {
    return {
    // 用于控制是否显示密码
      passwordvisiable: false
    }
  },
  props: {
    placeholder1: {
      type: String,
      default: '请输入用户名'
    },
    type1: {
      type: String,
      default: 'text'
    },
    disabled1: {
      type: Boolean,
      default: false
    },
    name1: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showpassword: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show () {
      return this.clearable || this.showpassword
    }
  },
  methods: {
    handleinput (e) {
      this.$emit('input', e.target.value)
    },
    clear () {
      this.$emit('input', '')
    },
    changetype () {
      this.passwordvisiable = !this.passwordvisiable
    }
  }
}
</script>
<style lang="scss">
.wg-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .wg-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.hm-input--suffix {
  .wg-input__inner {
    padding-right: 30px;
  }
  .hm-input__suffix {
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color .2s cubic-bezier(.645,.045,.355,1);
    }
    .hm-active {
       color: blue
    }
  }
}
</style>
