<template>
    <!-- wg-dialog__wrapper对话框的遮罩 self代表只有点击自己才触发-->
    <!-- 这里点击函数写clickha的话就不会触发，因为那个是在button组件里面注册的 -->
  <transition name="dialog-fade">
  <div class="wg-dialog__wrapper" v-show="visible1" @click.self="handclose">
    <div class="wg-dialog" :style="{width:width1,marginTop: top}">
      <div class="wg-dialog__header">
        <slot name="title">
            <span class="wg-dialog__title">{{title}}</span>
        </slot>
        <button class="wg-dialog__headerbtn" @click="handclose">
          <!-- 用到了字体图标 -->
          <i class="hm-icon-close"></i>
        </button>
      </div>
      <div class="wg-dialog__body">
        <!-- 默认插槽 -->
        <!-- <span>这是一段信息</span> -->
        <slot name="neirong">
        </slot>
      </div>
      <div class="wg-dialog__footer" v-if="$slots.footer">
        <!-- <wg-button>取消</wg-button>
        <wg-button type="primary">确定</wg-button> -->
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'WgDialog',
  // props是只读的
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width1: {
      type: String,
      default: '20%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible1: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handclose () {
      // console.log('1111')
      this.$emit('update:visible1', false)
    }
  }
}
</script>

<style lang="scss" scoped>
//<style lang="stylus" type="text/stylus" scoped>
// scoped会给所有模板元素中添加一个随机的属性
// 会给所有的样式添加一个唯一的 属性选择器 ，所以属性就只影响当前页面dom
.wg-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0, .5);
  .wg-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 30%;
    &__header {
      padding: 20px 20px 10px;
      .wg-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .wg-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .wg-icon-close {
          color: #909399;
        }
      }
    }
    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      /* 深度选择器 用scss的写法 ::v-deep  用less的写法 /deep/ 纯css >>> */
      // 加了这个在f12检查的时候点击父组件的footer的时候，旁边的类名不会加类名选择器
      ::v-deep .wg-button:first-child {
        margin-right: 20px;
      }
    }
  }
}
// .row {
//    margin-bottom: 20px;
//    .wg-button {
//     margin-right: 20px;
//    }
// }
.dialog-fade-enter-active {
  animation: run .3s;
}
.dialog-fade-leave-active {
  animation: run .3s reserver;
}
@keyframes run {
  0% {
    opacity:0;
    transform:translateY(-20px);
  }
  100% {
    opacity:1;
  }
}
</style>
