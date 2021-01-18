<template>
  <div class="home-charts-container">
      <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  props: {
    companyList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      graph: '',
      data: {
        nodes: [{ id: '长城控股', label: '长城控股', description: '长城控股', size: 70, style: { fill: '#579480' }}],
        edges: []
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    getDetailNode(nodeInfo) {
      const keyMap = [{
        key: 'loc',
        value: '地址'
      }, {
        key: 'money',
        value: '交易金额(万)'
      }, {
        key: 'times',
        value: '交易频次'
      }, {
        key: 'simple',
        value: '简称'
      }]
      let data = JSON.parse(JSON.stringify(this.data))
      keyMap.forEach(item => {
        if (nodeInfo[item.key]) {
          data.nodes.push({
            id: nodeInfo.name + '-' + item.key,
            label: this.fittingString(nodeInfo[item.key], 30, 12),
            size: 55,
            style: { fill: '#0590FA' },
          })
          data.edges.push({
            id: 'edge' +  nodeInfo.name + '-' + item.key,
            target: nodeInfo.name,
            source: nodeInfo.name + '-' + item.key,
            label: item.value,
            tag: 'sub'
          })
        }
      })
      return data
    },
    initCharts() {
      this.resetData()
      // 直接修改原生数据中的label字段
      if (this.companyList.length) {
        let someCom = this.companyList.slice(0, 190)
        someCom.forEach(item => {
          this.data.nodes.push({
            id: item.name,
            label: this.fittingString(item.name, 40, 12),
            size: 50,
            style: { fill: '#1C66BB' },
          })
          this.data.edges.push({
            id: 'edge' + item.name,
            target: '长城控股',
            source: item.name,
            label: '供应商'
          })
        })
      }
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 900,
        height: 650,
        fitView: {
          autoSize: true
        },
        animate: false,
        // 连线默认样式
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
            style: {
              fill: '#666',
              fontSize: 12,
              background: {
                fill: '#fff',
                padding: [0, 0, 0, 0]
              },
            },
          },
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#56C7E3',
            },
            lineWidth: 1,
            stroke: '#56C7E3'
          }
        },
        // 节点默认样式
        defaultNode: {
          labelCfg: {
            style: {
              fill: '#fff',
              fontSize: 12
            }
          }
        },
        // 关系图布局类型及参数
        layout: {
          type: "force",
          nodeStrength: -1000,
          linkDistance: 120,
          layoutAnimation: false
        }
      });
      graph.read(this.data);
      
      // graph.on('click', (ev) => {
      //   if (!ev.item || ev.item._cfg.type === 'edge') return
      //   const itemModel = ev.item.getModel();
      //   const itemInfo = this.companyList.find(com => com.name === itemModel.id)
      //   if (!itemModel.tag && itemInfo) {
      //     const newData = this.getDetailNode(itemInfo)
      //     graph.changeData(newData)
      //   }
      // })

    },
    resetData() {
      this.data = {
        nodes: [{ id: '长城控股', label: '长城控股', description: '长城控股', size: 70, style: { fill: '#579480' }}],
        edges: []
      }
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
      var ellipsis = '…';
      if (width > maxWidth) {
        var actualLen = Math.floor((maxWidth - 10) / fontWidth);
        var result = str.substring(0, actualLen) + ellipsis;
        return result;
      }
      return str;
    }
  }
};
</script>

<style scoped lang="less">
.home-charts-container{
  height: 650px;
}
#mountNode{
  text-align: center;
}
</style>
