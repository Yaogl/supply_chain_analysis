<template>
  <div class="home-left-container">
    <h3 class="title">
      <i class="iconfont">&#xe68c;</i>
      企业基本信息
    </h3>
    <div class="info" v-if="companyInfo.name">
      <h5 class="subtitle">{{ companyInfo.name }}</h5>
      <div class="desc-item" v-if="companyInfo.simple">
        <p class="label">简称：</p>
        <p class="values">{{ companyInfo.simple }}</p>
      </div>

      <div class="desc-item" v-if="companyInfo.loc">
        <p class="label">地址：</p>
        <p class="values">{{ companyInfo.loc }}</p>
      </div>

			<div class="desc-item" v-if="companyInfo.money">
        <p class="label">总交易金额：</p>
        <p class="values">{{ transferMoney(companyInfo.money) }}</p>
      </div>

			<div class="desc-item">
        <p class="label">总交易次数：</p>
        <p class="values">{{ companyInfo.times || 0 }} 次</p>
      </div>

      <div class="desc-item" v-if="companyInfo.types">
        <p class="label">客户类型：</p>
        <p class="values">{{ companyInfo.types }}</p>
      </div>
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
      default: () => {}
    }
  },
  methods: {
    transferMoney(money) {
      if (money < 10000) return money + ' 元'
      return (money / 10000).toFixed(2) + ' 万元'
    }
  }
}
</script>

<style scoped lang="less">
.home-left-container {
  background: #fff;
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
  border-radius: 4px;
  .title {
    font-size: 16px;
    color: #4d4d4d;
		line-height: 60px;
		border-bottom: 1px solid #D7D7D7;
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
  }
  .subtitle {
    color: #333;
    font-size: 14px;
  }
  .desc-item {
    display: flex;
    line-height: 22px;
    padding: 4px 0;
    .label {
      color: #333;
      width: auto;
    }
    .values {
			flex: 1;
			word-break: break-all;
      color: #666;
    }
  }
}
</style>
