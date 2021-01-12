<template>
  <div class="home-charts-container">
      <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  data() {
    return {
      data: {
        nodes: [
          {
            id: "长城控股",
            label: "长城控股",
            size: 50,
            style: { fill: "#579480" },
          },
          {
            id: "北京讯利创城科技",
            label: "北京讯利创城科技",
            size: 50,
            style: { fill: "#1C66BB" },
          },
          {
            id: "阿里云计算",
            label: "阿里云计算",
            size: 50,
            style: { fill: "#1C66BB" },
          },
          {
            id: "北京昆仑联通科技",
            label: "北京昆仑联通科技",
            size: 50,
            style: { fill: "#1C66BB" },
          },
          { id: "软件", label: "软件", size: 50, style: { fill: "#0590FA" } },
          { id: "10", label: "10", size: 50, style: { fill: "#0590FA" } },
          { id: "北京", label: "北京", size: 50, style: { fill: "#0590FA" } },
          {
            id: "昆仑联通",
            label: "昆仑联通",
            size: 50,
            style: { fill: "#0590FA" },
          },
          { id: "否", label: "否", size: 50, style: { fill: "#0590FA" } },
          { id: "钻石", label: "钻石", size: 50, style: { fill: "#4C6D90" } },
          { id: "24552", label: "24552", size: 50, style: { fill: "#0590FA" } },
        ],
        edges: [
          {
            id: "edge1",
            target: "长城控股",
            source: "北京讯利创城科技",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge2",
            target: "长城控股",
            source: "阿里云计算",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge3",
            target: "长城控股",
            source: "北京昆仑联通科技",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge4",
            target: "北京昆仑联通科技",
            source: "软件",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge5",
            target: "北京昆仑联通科技",
            source: "10",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge6",
            target: "北京昆仑联通科技",
            source: "北京",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge7",
            target: "北京昆仑联通科技",
            source: "昆仑联通",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge8",
            target: "北京昆仑联通科技",
            source: "否",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge9",
            target: "北京昆仑联通科技",
            source: "钻石",
            shape: "self-line",
            label: "",
          },
          {
            id: "edge10",
            target: "北京昆仑联通科技",
            source: "24552",
            shape: "self-line",
            label: "",
          },
        ],
      },
    };
  },
  mounted() {
    const graph = new G6.Graph({
      container: "mountNode",
      width: 500,
      height: 500,
      layout: {
				type: "force",
				clusterEdgeDistance: 200,
				nodeStrength: -300,
        // linkDistance: () => 100,
      },
    });
    graph.read(this.data);
  },
};
</script>

<style scoped lang="less">
</style>
