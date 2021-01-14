<template>
  <div class="home-container">
    <a-spin :spinning="loading">
      <div class="search-bar flex">
        <div class="flex" style="width: 52%">
          <a-input
            ref="userNameInput"
            v-model="query.key_word"
            placeholder="请输入内容"
            size="large"
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
          <a-button type="primary" size="large" @click="changeParams"> 搜索 </a-button>
        </div>
        <div class="search-item flex">
          <span class="label"> 筛选 </span>
          <a-select placeholder="请选择筛选条数" size="large" v-model="query.select" @change="changeParams">
            <a-select-option :value="10">10条</a-select-option>
            <a-select-option :value="20">20条</a-select-option>
            <a-select-option :value="30">30条</a-select-option>
            <a-select-option :value="40">40条</a-select-option>
            <a-select-option :value="50">50条</a-select-option>
            <a-select-option :value="60">60条</a-select-option>
            <a-select-option :value="70">70条</a-select-option>
          </a-select>
        </div>
        <div class="search-item flex" v-if="query.content === '供应商'">
          <span class="label">交易类型</span>
          <a-select placeholder="请选择" size="large" v-model="query.transType" @change="changeParams">
            <a-select-option value="软件">软件</a-select-option>
            <a-select-option value="硬件">硬件</a-select-option>
            <a-select-option value="服务">服务</a-select-option>
          </a-select>
        </div>
      </div>

      <div class="content">
        <div class="left">
          <home-left-side :companyInfo="companyInfo"/>
        </div>
        <div class="center">
          <div class="left-chart">
            <a-radio-group default-value="a" button-style="solid" v-model="query.content" @change="changeCustom">
              <a-radio-button value=""> 全部 </a-radio-button>
              <a-radio-button value="供应商"> 供应商 </a-radio-button>
              <a-radio-button value="客户"> 客户 </a-radio-button>
            </a-radio-group>
            <!-- <home-charts :companyList="allList" v-if="allList && allList.length"/> -->
            <echarts-company :companyList="allList" @chartClick="chooseCompany"/>
            
            <div class="left-slider">
              <p class="tip">交易金额(单位：万)</p>
              <a-slider :marks="moneyMarks" v-model="query.money" :max="maxMoney" @afterChange="changeParams"/>
            </div>
          </div>
          <div class="right-slider">
            <p class="tip">交易频次(单位：次)</p>
            <a-slider :marks="timeMarks" v-model="query.times" vertical :max="maxTimes" @afterChange="changeParams"/>
          </div>
        </div>
        <div class="right">
          <home-right-side :companyInfo="companyInfo"/>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import HomeLeftSide from './components/HomeLeftSide'
import HomeRightSide from './components/HomeRightSide'
// import HomeCharts from "./components/HomeCharts";
import EchartsCompany from './components/EchartsCompany'
import { getBaseInfo } from '@/api/company.js'
const resetQuery = () => {
  return {
    key_word: '',
    money: 0,
    times: 0,
    content: '',
    select: 10,
    transType: undefined // 交易类型
  }
}

export default {
  components: {
    HomeLeftSide,
    HomeRightSide,
    // HomeCharts,
    EchartsCompany
  },
  data() {
    return {
      query: resetQuery(),
      allList: [],
      loading: false,
      companyInfo: {},
      timeMarks: {},
      moneyMarks: {},
      maxTimes: 0,
      maxMoney: 0
    }
  },
  created() {
    this.changeCustom()
  },
  methods: {
    chooseCompany(name) {
      this.companyInfo = this.allList.find(item => item.name === name) || {}
      console.log(this.companyInfo)
    },
    // 切换客户类型，清空搜索条件，便于计算 marks值
    changeCustom(e) {
      if (e && e.target.value) {
        this.query.content = e.target.value
      }
      this.search(true)
    },
    getParams() {
      let params = JSON.parse(JSON.stringify(this.query))
      if (params.content === '供应商' && params.transType) {
        params.content = params.transType
      }
      params.select = params.select || ''
      params.money = params.money * 10000 || 0 
      delete params.transType
      return params
    },
    changeParams() {
      this.search()
    },
    search(init) {
      this.loading = true
      const params = this.getParams()
      getBaseInfo(params).then(res => {
        this.loading = false
        this.allList = res.get_company
        if (init) { // 如果是初始化，计算一下mark值
          this.maxTimes = Math.ceil(this.getMax(this.allList, 'times') / 5) * 5
          this.maxMoney = Math.ceil(this.getMax(this.allList, 'money') / 1000 / 10000) * 1000
          
          this.timeMarks = this.getMarks(this.maxTimes, 5)
          this.moneyMarks = this.getMarks(this.maxMoney, 1000)
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getMarks (num, scale) { // num 数字 scale比例
      const max = Math.ceil(num / scale) * scale
      let data = {}
      const p = Math.floor(max / 5)
      for (let index = 0; index < 5; index++) {
        const key = (p * (index + 1)) + ''
        data[key] = key
      }
      return data
    },
    getMax (list, key) {
      if (!list.length) return 100
      return Math.max.apply(Math, list.map(item => { return item[key] }))
    }
  }
};
</script>
<style lang="less">
.home-container {
  margin: 10px 23px;
  .flex {
    display: flex;
    align-items: center;
  }
  .search-bar {
    background: #fff;
    height: 88px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 0 20%;
    .ant-btn {
      width: 92px;
      margin: 0 5px;
    }
    .search-item {
      width: 24%;
      .label {
        width: auto;
        font-size: 16px;
        color: #4d4d4d;
        padding: 0 10px;
      }
      .ant-select {
        flex: 1;
        height: 38px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 10px;
    .left,
    .right {
      width: 20%;
      height: 820px;
    }
    .center {
      flex: 1;
      background: #fff;
      margin: 0 10px;
      padding: 23px 20px;
      height: 820px;
      display: flex;
      .tip {
        font-size: 12px;
        color: #333333;
        line-height: 48px;
      }
      .left-chart {
        flex: 1;
        .tip {
          margin-right: 10px;
        }
        .ant-slider {
          flex: 1;
        }
        .ant-slider-dot {
          top: 0;
          height: 10px;
          width: 10px;
        }
        .ant-slider-rail {
          height: 10px;
        }
        .ant-slider-track {
          height: 10px;
          background-color: #409eff;
        }
        .ant-slider-handle {
          margin-top: -4px;
          height: 18px;
          width: 18px;
        }
        .left-slider {
          display: flex;
        }
      }
      .right-slider {
        width: 120px;
        height: 680px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .ant-slider-dot {
          left: 4px;
          height: 10px;
          width: 10px;
        }
        .ant-slider-rail {
          width: 10px;
        }
        .ant-slider-track {
          width: 10px;
          background-color: #409eff;
        }
        .ant-slider-handle {
          margin-left: -4px;
          height: 18px;
          width: 18px;
        }
      }
    }
  }
}
</style>
