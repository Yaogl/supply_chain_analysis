<template>
  <div class="home-charts-container">
    <div id="mountNode" :style="`height: 100%; width: 100%`"></div>
  </div>
</template>

<script>
import { getBaseInfo } from '@/api/company.js'
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
      chartName: '',
      map: new Map(),
      depth: 0
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.depth = 0
      this.instance && this.instance.dispose()
      this.instance = this.$echarts.init(document.getElementById('mountNode'))
      this.getChartData(this.companyList)
      let option = this.getChartOption(this.data)
      this.map.set('长城控股', option)
      this.createChart(option)
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject('没有实例化')
      }
      this.instance.setOption(option)
      
      this.instance.on('click', (params) => {
        if (params.dataType === 'node') {
          const companyName = getName(params.name)
          if (!this.depth) this.$emit("chartClick", companyName)
          this.jumpDepth(companyName)
        }
      })
    },
    jumpDepth(companyName) {
      if (companyName !== '长城控股') {
        if (companyName === '北京迅利创成科技有限公司') {
          this.getIXLData(companyName)
          return
        }
        if (this.depth === 1) return
        this.depth = 1
        const companyInfo = this.companyList.find(item => item.name === companyName) || {}
        const itemData = this.getItemData(companyInfo)
        const option = this.map.get(companyName) || this.getChartOption(itemData)
        this.map.set(companyName, option)
        this.instance.clear()
        this.instance.setOption(option)
      } else {
        if (this.depth === 0) return
        this.depth = 0
        this.$emit('resetSome')
      }
    },
    getChartOption(data) {
      let that = this;
      const len = this.companyList.length || 0
      const zoom = this.depth === 1 ? 1.4 :  len < 10 ? 1.3 : len < 20 ? 1.1 : (len < 40 ? 1 : (len < 70 ? 0.75 : 0.6))
      const edgeLength = this.depth === 1 ? 150 :  len < 10 ? 150 : len < 20 ? 120 : (len < 40 ? 100 : (len < 70 ? 90 : 80))
      return {
        tooltip: {
          formatter(params) {
            if (params.dataType === 'node' && params.data.name !== '长城控股' && that.depth === 0) {
              return (params.data.category ? '供应商' : '客户') + '：' + getName(params.data.name)
            }
            return getName(params.data.name)
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            zoom,
            roam: true,
            draggable: len < 10 || that.depth,
            focusNodeAdjacency: len < 30 || that.depth,
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
                    if (that.depth && x.data.isSub) return that.fittingString(getName(x.data.name), x.data.symbolSize, 12);
                    return that.fittingString(getName(x.data.name), x.data.symbolSize - 25, 12);
                  },
                  color: '#fff'
                },
                color: function (params) {
                  if (params.data.isSub) {
                    return '#4C6D90'
                  }
                  if (that.checkName === params.name) {
                    return '#4C6D90';
                  } else {
                    return params.data.category ? '#006acc' : '#0590FA'
                  }
                }
              }
            },
            
            force: {
              initLayout: 'circular',
							layoutAnimation: len < 10 || that.depth,
              repulsion: 500,
              edgeLength
            },
            data: data.nodes,
            links: data.edges
          }
        ]
      }
    },
    // 点击单个元素是需要组织的数据
    getItemData(info) {
      const itemData = resetData();
      itemData.nodes.push({
        name: info.name + '***' + 1,
        symbolSize: 55,
        category: info.types ? 1 : 0
      });
      itemData.edges.push({
        source: info.name + '***' + 1,
        target: "长城控股",
        name: info.types ? '供应商' : '客户',
        lineStyle: {
          opacity: 1,
          color: "#56C7E3",
        }
      })
      Object.keys(info).map((key, index) => {
        if (info[key]) {
          itemData.nodes.push({
            name: info[key] + '***' + index,
            symbolSize: 40,
            category: index + 2,
            isSub: true
          });
          itemData.edges.push({
            source: info[key] + '***' + index,
            target: info.name + '***' + 1,
            name: key,
            lineStyle: {
              opacity: 1,
              color: "#56C7E3",
            }
          })
        }
      })
      return itemData
    },
    // 获取 北京迅利创成科技有限公司 单独展示 测试数据
    getIXLData(name) {
      if (this.depth === 1) return
      getBaseInfo({show: 'show', content: ''}).then(res => {
        this.depth = 1
        const companyInfo = this.companyList.find(item => item.name === name) || {}
  
        const itemData = resetData();
        itemData.nodes.push({
          name: companyInfo.name + '***' + 1,
          symbolSize: 55,
          category: companyInfo.types ? 1 : 0
        });
        itemData.edges.push({
          source: companyInfo.name + '***' + 1,
          target: "长城控股",
          name: companyInfo.types ? '供应商' : '客户',
          lineStyle: {
            opacity: 1,
            color: "#56C7E3",
          }
        })
        res.get_company.filter(it => it.name !== '长城控股').map((item, index) => {
          itemData.nodes.push({
            name: item.name + '***' + index,
            symbolSize: 40,
            category: index + 2,
            isSub: true
          });
          itemData.edges.push({
            source: item.name + '***' + index,
            target: companyInfo.name + '***' + 1,
            name: item.relation,
            lineStyle: {
              opacity: 1,
              color: "#56C7E3",
            }
          })
        })
        const option = this.map.get(name) || this.getChartOption(itemData)
        this.map.set(name, option)
        this.instance.clear()
        this.instance.setOption(option)
      })
    },
    getChartData(list) {
      this.data = resetData();
      list.map((com, index) => {
        // 防止有重复名称
        const scale = (com.money / 10000) * 0.05
        const symbolSize = 40 + (scale > 50 ? 50 : scale)
        com.name &&
          this.data.nodes.push({
            name: com.name + '***' + index,
            symbolSize,
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
            }
          })
      })
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
        var result = str.substring(0, actualLen || 1) + ellipsis;
        return result;
      }
      return str;
    },
  },
  beforeDestroy() {
    this.instance && this.instance.dispose()
  }
}
</script>

<style scoped lang="less">
.home-charts-container {
  height: 680px;
}
#mountNode {
  text-align: center;
}
</style>
