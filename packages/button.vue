<template>
<!-- is-plain只是为了下面样式命名而已 -->
   <button class="wg-button" :class="[`wg-button--${type}`,{
       'is-plain': plain,
       'is-round': round,
       'is-circle': circle,
       'is-disabled': disabled
    }]"
    :disabled="disabled"
    @click="handleclick">
    <i v-if="icon" :class="icon"></i>
    <!-- 但我们没有传入任何内容 当我们没有传入插槽的时候，让span显示影藏 这里对应的就是app.vue按钮里面的文字内容-->
    <!-- 在只用图标的情况下，span会占据padding,所以下面写了样式 当有文字和图标一起的时候有个右padding -->
     <span v-if="$slots.default"><slot></slot></span>
   </button>
</template>
<script>
export default {
  //   起名字是为了拿到组件的时候注册用的
  name: 'WgButton',
  // 封装一个通用的组件 会对props做一个约束 做props校验
  props: {
    type: {
      type: String,
      default: 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log(this.type)
    console.log(this.$slots)
  },
  methods: {
    handleclick (e) {
    // 触发自己身上的click事件，往父组件派发了一个click事件 参数：click为父组件定义的函数
      this.$emit('clickha', e)
      // console.log(e.target)
    }
  }
}
</script>
<style lang="scss" scoped>
.wg-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
   /* 禁止元素的文字被选中 */
  /* -moz-user-select: none; */
  /* -webkit-user-select: none; */
  /* -ms-user-select: none; */
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover,&:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
.wg-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  &:hover,&:focus {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
}
.wg-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover,&:focus {
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
}
.wg-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
  &:hover,&:focus {
    background: #a6a9ad;
    border-color: #a6a9ad;
    color: #fff;
  }
}
.wg-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  &:hover,&:focus {
    background: #ebb563;
    border-color: #ebb563;
    color: #fff;
  }
}
.wg-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  &:hover,&:focus {
    background: #f78989;
    border-color: #f78989;
    color: #fff;
  }
}
/* 朴素的按钮 */
.wg-button.is-plain {
  &:hover,
  &:focus {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
}
.wg-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  &:hover,
  &:focus {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
.wg-button--success.is-plain {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
  &:hover,
  &:focus {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}

.wg-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
  &:hover,
  &:focus {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}
.wg-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
  &:hover,
  &:focus {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}
.wg-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
  &:hover,
  &:focus {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}
/* 圆角按钮 */
.wg-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}
/* 圆形按钮 */
.wg-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
 /* 按钮后的文本 */
.wg-button [class*=hm-icon-]+span {
    margin-left: 5px;
}
 /* 禁用 */
.wg-button.is-disabled,
.wg-button.is-disabled:focus,
.wg-button.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
}
.wg-button.is-disabled,
.wg-button.is-disabled:focus,
.wg-button.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
}
.wg-button--primary.is-disabled,
.wg-button--primary.is-disabled:active,
.wg-button--primary.is-disabled:focus,
.wg-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
}
.wg-button--success.is-disabled,
.wg-button--success.is-disabled:active,
.wg-button--success.is-disabled:focus,
.wg-button--success.is-disabled:hover {
    color: #fff;
    background-color: #b3e19d;
    border-color: #b3e19d;
}
.wg-button--info.is-disabled,
.wg-button--info.is-disabled:active,
.wg-button--info.is-disabled:focus,
.wg-button--info.is-disabled:hover {
    color: #fff;
    background-color: #c8c9cc;
    border-color: #c8c9cc;
}
.wg-button--warning.is-disabled,
.wg-button--warning.is-disabled:active,
.wg-button--warning.is-disabled:focus,
.wg-button--warning.is-disabled:hover {
    color: #fff;
    background-color: #f3d19e;
    border-color: #f3d19e;
}
.wg-button--danger.is-disabled,
.wg-button--danger.is-disabled:active,
.wg-button--danger.is-disabled:focus,
.wg-button--danger.is-disabled:hover {
    color: #fff;
    background-color: #fab6b6;
    border-color: #fab6b6;
}
</style>
