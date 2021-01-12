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
      companys: [
        {
          id: "北京讯利创城科技",
          label: "北京讯利创城科技",
          size: 70,
          style: { fill: "#1C66BB" },
        }
      ],
      companysInfo: [
        { id: "软件", label: "软件", size: 70, style: { fill: "#0590FA" } },
        { id: "10", label: "10", size: 70, style: { fill: "#0590FA" } },
        { id: "北京", label: "北京", size: 70, style: { fill: "#0590FA" } },
        { id: "昆仑联通", label: "昆仑联通", size: 70, style: { fill: "#0590FA" } },
        { id: "否", label: "否", size: 70, style: { fill: "#0590FA" } },
        { id: "钻石", label: "钻石", size: 70, style: { fill: "#4C6D90" } },
        { id: "24552", label: "24552", size: 70, style: { fill: "#0590FA" } },
        { id: "11111", label: "11111", size: 70, style: { fill: "#0590FA" } },
        { id: "22222", label: "22222", size: 70, style: { fill: "#0590FA" } },
      ],
      data: {
        nodes: [
          {
            id: "长城控股",
            label: "长城控股",
            description: '长城控股',
            size: 70,
            style: { fill: "#579480" }
          }
        ],
        edges: [
          // {
          //   id: "edge1",
          //   target: "长城控股",
          //   source: "北京讯利创城科技",
          //   shape: "self-line",
          //   label: '自定义箭头路径'
          // },
        ],
      },
    };
  },
  mounted() {
    this.registerClick()
    this.initCharts()
  },
  methods: {
    // 注册click事件
    registerClick() {
       // 封装点击添加边的交互
      let that = this
      G6.registerBehavior('click-add-node', {
        getEvents: function getEvents() {
          return {
            'node:click': 'onClick'
          };
        },
        onClick: function onClick(ev) {
          var itemModel = ev.item.getModel();
          var graph = this.graph;
          var nodes = graph.getNodes();
          var edges = graph.getEdges();
          console.log(itemModel);
          var newNodeModels = that.companys;
          var newEdgeModels = []
          that.companys.forEach((item, index) => {
            newEdgeModels.push({
              id: "edge" + index,
              target: itemModel.label,
              source: item.id
            })
          })
          var allNodeModels = [],
            allEdgeModels = [];

          nodes.forEach(function(n) {
            var model = n.getModel();
            model.fixed = true;
            model.fx = model.x;
            model.fy = model.y;
            allNodeModels.push(model);
          });

          newNodeModels.forEach(function(nodeModel) {
            // if it does not exist in nodes
            var exist = false;
            nodes.forEach(function(n) {
              if (n.getModel().id == nodeModel.id) {
                exist = true;
                return;
              }
            });
            // then add it into graph
            if (!exist) {
              // set the initial positions of the new nodes at the clicked node
              nodeModel.x = itemModel.x;
              nodeModel.y = itemModel.y;
              var node = graph.addItem('node', nodeModel);
              allNodeModels.push(nodeModel);
              nodes.push(node);
            }
          });

          newEdgeModels.forEach(function(em) {
            var exist = false;
            edges.forEach(function(e) {
              var eModel = e.getModel();
              if (eModel.source == em.source && eModel.target == em.target) {
                exist = true;
                return;
              }
            });
            if (!exist) {
              var edge = graph.addItem('edge', em);
              edges.push(edge);
            }
          });
          edges.forEach(function(e) {
            allEdgeModels.push(e.getModel());
          });
          graph.changeData({
            nodes: allNodeModels,
            edges: allEdgeModels
          });
        }
      });
    },
    initCharts() {
      this.resetData()
      // 直接修改原生数据中的label字段
      if (this.companyList.length) {
        let someCom = this.companyList.slice(0, 8)
        someCom.forEach(item => {
          this.data.nodes.push({
            id: item.name,
            label: this.fittingString(item.name, 50, 12),
            size: 70,
            style: { fill: "#1C66BB" },
          })
          this.data.edges.push({
            id: 'edge' + item.name,
            target: "长城控股",
            source: item.name,
            label: '供应商'
          })
        })
      }
      const graph = new G6.Graph({
        container: "mountNode",
        width: 900,
        height: 650,
        animateCfg: false,
        // 连线默认样式
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
            style: {
              fill: '#666666',
              fontSize: 12,
              background: {
                fill: '#ffffff',
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
          nodeStrength: -1500,
          linkDistance: 130,
          gravity: 300
        },
        modes: {
          default: ['click-add-node']
        },
        // modes: {
        //   default: ['drag-node', {
        //     type: 'tooltip',
        //     formatText: function formatText(model) {
        //       console.log(model,99);
        //       var text = 'description: ' + model.description;
        //       return text;
        //     },

        //     shouldUpdate: function shouldUpdate() {
        //       return true;
        //     }
        // }, {
        //     type: 'edge-tooltip',
        //     formatText: function formatText(model) {
        //       var text = 'description: ' + model.description;
        //       return text;
        //     },

        //     shouldUpdate: function shouldUpdate() {
        //       return true;
        //     }
        //   }]
        // }
      });
      graph.read(this.data);
      return graph
    },
    resetData() {
      this.data = {
        nodes: [
          {
            id: "长城控股",
            label: "长城控股",
            description: '长城控股',
            size: 70,
            style: { fill: "#579480" }
          }
        ],
        edges: [
          // {
          //   id: "edge1",
          //   target: "长城控股",
          //   source: "北京讯利创城科技",
          //   shape: "self-line",
          //   label: '自定义箭头路径'
          // },
        ],
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
// @media (min-width: 1280px) {
//   #mountNode{
//     transform: scale(0.7);
//   }
// }

// @media (min-width: 1366px) {
//   #mountNode{
//     transform: scale(0.8);
//   }
// }  

// @media (min-width: 1440px) {
//   #mountNode{
//     transform: scale(0.9);
//   }
// } 

// @media (min-width: 1680px) {
//   #mountNode{
//     transform: scale(1);
//   }
// } 
// @media (min-width: 1920px) {
//   #mountNode{
//     transform: scale(1);
//   }
// }

</style>
