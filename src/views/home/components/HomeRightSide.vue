<template>
  <div class="home-right-container">
    <h3 class="title">
      <a-icon type="unordered-list" />
      相关事件
    </h3>
    <div class="info" v-if="isStringAndShow || isArrayAndShow">
      <a-timeline v-if="isStringAndShow">
        <a-timeline-item>
          <p class="timer">
            <!-- <i class="iconfont">&#xe64f;</i> -->
            <!-- 未知时间 -->
          </p>
          <p class="values">{{ companyInfo.things }}</p>
        </a-timeline-item>
      </a-timeline>
      <a-timeline v-if="isArrayAndShow">
        <a-timeline-item v-for="(item, index) in companyInfo.things" :key="index">
          <p class="values">{{ item.name }}：{{ item.things }} </p>
        </a-timeline-item>
      </a-timeline>
    </div>
    <div v-else style="margin-top: 50px">
      <a-empty />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyInfo: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    isStringAndShow () {
      const things = this.companyInfo.things
      return things && things !== '未记录' && typeof things === 'string'
    },
    isArrayAndShow () {
      const things = this.companyInfo.things
      return things.length && typeof things === 'object'
    }
  }
}
</script>

<style scoped lang="less">
.home-right-container {
  position: relative;
  background: #fff;
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
  border-radius: 4px;
  .title {
    font-size: 16px;
    color: #4d4d4d;
    line-height: 60px;
    border-bottom: 1px solid #d7d7d7;
    i {
      color: #999999;
    }
  }
  @media screen and (min-width:768px) and (max-width: 1680px) {
    .title{
      line-height: 50px!important;
    }
  }
  .info {
    padding-top: 15px;
    line-height: 28px;
    font-size: 14px;
    .timer {
      font-size: 13px;
      color: #666666;
      .iconfont {
        font-size: 13px;
      }
    }
    .value {
      color: #333333;
      font-size: 14px;
    }
    .more {
      color: #999999;
      font-size: 13px;
      text-align: center;
      margin-bottom: 10px;
      .iconfont {
        font-size: 10px;
      }
    }
  }
}
</style>
