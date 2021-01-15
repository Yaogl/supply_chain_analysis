<template>
  <div class="home-charts-container">
    <div id="mountNode" :style="`height: 100%; width: 100%`"></div>
  </div>
</template>

<script>
const getName = (name) => {
  return name && name.split('***')[0]
}
const resetData = () => {
  return {
    nodes: [
      { name: '长城控股', itemStyle: { color: '#579480' }, symbolSize: 90 },
    ],
    edges: []
  }
}
export default {
  props: {
    companyList: {
      type: Array,
      default: () => [],
    }
  },
  watch: {
    companyList() {
      this.initCharts()
    }
  },
  data() {
    return {
      graph: '',
      data: resetData(),
      instance: null,
      zoom: '',
      chartName: ''
    };
  },
   created () {
    // const width = document.documentElement.clientWidth || document.body.clientWidth
    // this.zoom = 1 / (width / 1920)
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.instance && this.instance.dispose()
      this.instance = this.$echarts.init(document.getElementById('mountNode'))
      this.getChartData()
      let option = this.getChartOption()
      this.createChart(option)
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject('没有实例化')
      }
      this.instance.setOption(option)
      this.instance.off('click')
      window.addEventListener('resize', this.chartResize)
      this.instance.on('click', (params) => {
        if (params.dataType === 'node' && params.name !== '长城控股') {
          this.$emit("chartClick",  getName(params.name))
        }
      })
    },
    getChartOption() {
      let that = this;
      const len = this.companyList.length || 0
      return {
        tooltip: {
          formatter(params) {
            if (params.dataType === 'node' && params.data.name !== '长城控股') {
              return (params.data.category ? '供应商' : '客户') + '：' + getName(params.data.name)
            }
            return getName(params.data.name)
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            zoom:  len < 10 ? 1.3 : len < 20 ? 1.1 : (len < 40 ? 1 : (len < 70 ? 0.75 : 0.6)),
            roam: true,
            edgeSymbol: ['', 'arrow'],
            edgeSymbolSize: [10, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  backgroundColor: '#fff',
                  padding: [8, 2, 0, 2],
                  color: '#666',
                  verticalAlign: 'middle',
                  align: 'center',
                  background: '#fff',
                  fontSize: 11,
                },
                formatter(params) {
                  return params.data.name
                }
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter(x) {
                    if (x.data.name === '长城控股') return x.data.name;
                    return that.fittingString(getName(x.data.name), 35, 12);
                  },
                  color: '#fff'
                },
                color: function (params) {
                  if (that.checkName === params.name) {
                    return '#4C6D90';
                  } else {
                    return params.data.category ? '#006acc' : '#0590FA'
                  }
                },
                shadowColor: function(params) {
                  return that.checkName === params.name ? 'rgba(0, 0, 0, 0.8)' : 'transparent'
                },
                shadowBlur: function(params) {
                  return that.checkName === params.name ? 10 : 0
                }
              }
            },
            
            force: {
              initLayout: 'circular',
							layoutAnimation: false,
              repulsion: 500,
              edgeLength: len < 10 ? 150 : len < 20 ? 120 : (len < 40 ? 100 : (len < 70 ? 90 : 80)),
            },
            data: that.data.nodes,
            links: that.data.edges,
          }
        ]
      }
    },
    getChartData() {
      this.data = resetData();
      this.companyList.map((com, index) => {
        // 防止有重复名称
        com.name &&
          this.data.nodes.push({
            name: com.name + '***' + index,
            symbolSize: 55,
            category: com.types ? 1 : 0
          });
        com.name &&
          this.data.edges.push({
            source: com.name + '***' + index,
            target: "长城控股",
            name: com.types ? '供应商' : '客户',
            lineStyle: {
              opacity: 1,
              color: "#56C7E3",
            },
          });
      });
    },
    // 屏幕变化，数据过多resize会卡顿，暂时关掉
    chartResize () {
      // this.instance.resize()
    },
    calcStrLen(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    },
    fittingString(str, maxWidth, fontSize) {
      var fontWidth = fontSize * 1.3; //字号+边距
      maxWidth = maxWidth * 2; // 需要根据自己项目调整
      var width = this.calcStrLen(str) * fontWidth;
      var ellipsis = "…";
      if (width > maxWidth) {
        var actualLen = Math.floor((maxWidth - 10) / fontWidth);
        var result = str.substring(0, actualLen) + ellipsis;
        return result;
      }
      return str;
    },
  },
  beforeDestroy() {
    this.instance && this.instance.dispose();
    window.removeEventListener('resize', this.chartResize, false)
  },
};
</script>

<style scoped lang="less">
.home-charts-container {
  height: 680px;
}
#mountNode {
  text-align: center;
}
</style>
