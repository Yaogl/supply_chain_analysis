<template>
  <div class="home-charts-container">
    <div id="mountNode" style="height: 650px; width: 100%"></div>
  </div>
</template>

<script>
const resetData = () => {
  return {
    nodes: [
      { name: "长城控股", itemStyle: { color: "#579480" }, symbolSize: 90 },
    ],
    edges: [],
  };
};
export default {
  props: {
    companyList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      graph: "",
      data: resetData(),
      instance: null,
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.instance && this.instance.dispose();
      this.instance = this.$echarts.init(document.getElementById("mountNode"));
      // this.instance.showLoading();
      this.getChartData();
      let option = this.getChartOption();
      this.createChart(option);
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject("没有实例化");
      }
      this.instance.setOption(option);
      this.instance.off("click");
      this.instance.on("click", (params) => {
        console.log(params);
        this.$emit("chart-click", params);
      });
      this.instance.hideLoading();
      window.addEventListener("resize", this.chartResize);
    },
    getChartOption() {
      let that = this;
      return {
        tooltip: {},
        series: [
          {
            type: "graph",
            layout: "force",
            zoom: 0.3,
            roam: true,
            edgeSymbol: ["", "arrow"],
            edgeSymbolSize: [10, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  color: "#666666",
                  verticalAlign: "middle",
                  align: "center",
                  background: "#fff",
                  fontSize: 11,
                },
                formatter(x) {
                  return x.data.name;
                },
              },
            },
            label: {
              show: true,
              formatter(x) {
                if (x.data.name === "长城控股") return x.data.name;
                return that.fittingString(x.data.name, 35, 12);
              },
            },
            force: {
							layoutAnimation: false,
              repulsion: 1500,
              edgeLength: 80,
            },
            data: that.data.nodes,
            links: that.data.edges,
          },
        ],
      };
    },
    getChartData() {
      this.data = resetData();
      this.companyList.map((com, index) => {
        if (index < 1000) {
          com.name &&
            this.data.nodes.push({
              name: com.name,
              symbolSize: 70,
              itemStyle: { color: "#006acc" },
              label: { color: "#fff" },
            });
          com.name &&
            this.data.edges.push({
              source: com.name,
              target: "长城控股",
              name: "供应商",
              lineStyle: {
                color: "#56C7E3",
              },
            });
        }
      });
    },
    chartResize() {
      this.instance.resize();
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
    window.removeEventListener("resize", this.chartResize, false);
  },
};
</script>

<style scoped lang="less">
.home-charts-container {
  height: 650px;
}
#mountNode {
  text-align: center;
}
</style>
