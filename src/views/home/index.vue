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
          <a-button type="primary" size="large"> 搜索 </a-button>
        </div>
        <div class="search-item flex">
          <span class="label"> 筛选 </span>
          <a-select placeholder="请选择" size="large">
            <a-select-option value="1"> 选项1 </a-select-option>
          </a-select>
        </div>
        <div class="search-item flex">
          <span class="label"> 交易类型 </span>
          <a-select placeholder="请选择" size="large">
            <a-select-option value="1"> 选项1 </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="content">
        <div class="left">
          <home-left-side />
        </div>
        <div class="center">
          <div class="left-chart">
            <a-radio-group default-value="a" button-style="solid">
              <a-radio-button value="a"> 供应商 </a-radio-button>
              <a-radio-button value="b"> 合作伙伴 </a-radio-button>
            </a-radio-group>
            <home-charts :companyList="allList" v-if="allList && allList.length"/>
            <div class="left-slider">
              <p class="tip">交易金额(单位：万)</p>
              <a-slider
                :marks="marks"
                v-model="query.money"
                @afterChange="search"
              />
            </div>
          </div>
          <div class="right-slider">
            <p class="tip">交易频次(单位：次)</p>
            <a-slider :marks="marks" v-model="query.times" vertical />
          </div>
        </div>
        <div class="right">
          <home-right-side />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import HomeLeftSide from "./components/HomeLeftSide";
import HomeRightSide from "./components/HomeRightSide";
import HomeCharts from "./components/HomeCharts";
// import { getBaseInfo } from '@/api/company.js'

export default {
  id: "Home",
  components: {
    HomeLeftSide,
    HomeRightSide,
    HomeCharts,
  },
  data() {
    return {
      query: {
        key_word: "",
        money: 0,
        times: 0,
        content: "客户",
      },
      allList: [],
      loading: false,
      marks: {
        0: "0",
        25: "25",
        50: "50",
        75: "75",
        100: "100",
      },
    };
  },
  created() {
    // getBaseInfo(this.query).then(res => {
    //   this.allList = res.get_company
    //   console.log(this.allList);
    //   localStorage.setItem('allCompany', JSON.stringify(this.allList))
    // })
    this.search();
  },
  methods: {
    search() {
      this.loading = true;
      setTimeout(() => {
        this.allList = JSON.parse(localStorage.getItem("allCompany"));
        this.loading = false;
      }, 2000);
    },
  },
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
          height: 18px;
          width: 18px;
        }
      }
    }
  }
}
</style>
