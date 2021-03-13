export default {
  title: "不方科技ui",
  description: `站在风口，猪都会飞`,
  chainWebpack(memo) {
    memo.plugins.delete("copy");
  },
  mode: "site",
  outputPath: "dist",
  navs: [
    {
      title: "组件库",
      path: "/components"
    },
    {
      title: "GitHub",
      path: "https://github.com/wmjchf/bufang-ui.git"
    }
  ]
};
