<template>
  <div class="home-right-container">
    <h3 class="title">
      <a-icon type="unordered-list" />
      相关事件
    </h3>
    <div class="info">
       <a-timeline>
            <a-timeline-item>
                <p class="timer">
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p class="values">与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>
                    <i class="iconfont">&#xe64f;</i>
                    2020年-12月-30日
                </p>
                <p>与长城汽车合作建设XXX项目，项目金额100万</p>
            </a-timeline-item>
        </a-timeline>
        <p class="more">
            加载更多
            <i class="iconfont">&#xe628;</i>
        </p>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home-right-container {
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
    .timer{
        font-size: 13px;
        color: #666666;
        .iconfont{
            font-size: 13px;
        }
    }
    .value{
        color: #333333;
        font-size: 14px;
    }
    .more{
        color: #999999;
        font-size: 13px;
        text-align: center;
        padding-bottom: 10px;
        .iconfont{
            font-size: 10px;
        }
    }
  }
}
</style>
