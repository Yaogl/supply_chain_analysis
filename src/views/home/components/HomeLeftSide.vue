<template>
  <div class="home-left-container">
    <h3 class="title">
      <i class="iconfont">&#xe68c;</i>
      企业基本信息
    </h3>
    <div class="info">
      <h5 class="subtitle">沈阳雷安泰德科技发展有限公司</h5>
      <div class="desc-item">
        <p class="label">简称：</p>
        <p class="values">沈阳雷安泰德</p>
      </div>

      <div class="desc-item">
        <p class="label">地址：</p>
        <p class="values">沈阳市和平区三好街100-4号（13-12）室</p>
      </div>

      <div class="desc-item">
        <p class="label">税务登记号：</p>
        <p class="values">91210102784592680B</p>
      </div>

			<div class="desc-item">
        <p class="label">注册资本：</p>
        <p class="values">1000万</p>
      </div>

			<div class="desc-item">
        <p class="label">员工数量：</p>
        <p class="values">50人</p>
      </div>

			<div class="desc-item">
        <p class="label">合作开始日期：</p>
        <p class="values">2019年9月6日</p>
      </div>

			<div class="desc-item">
        <p class="label">总交易金额：</p>
        <p class="values">5.118.928.00元</p>
      </div>

			<div class="desc-item">
        <p class="label">总交易次数：</p>
        <p class="values">4次</p>
      </div>

			<div class="desc-item">
        <p class="label">企业风险：</p>
        <p class="values">涉诉XXX 项</p>
      </div>

      <div class="desc-item">
        <p class="label">是否黑名单：</p>
        <p class="values">否</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home-left-container {
  background: #fff;
  padding: 0 20px;
  border-radius: 4px;
  .title {
    font-size: 16px;
    color: #4d4d4d;
		line-height: 60px;
		border-bottom: 1px solid #D7D7D7;
    i {
      color: #999999;
      font-size: 20px;
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
