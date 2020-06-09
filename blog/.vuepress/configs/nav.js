module.exports = [
  // 前端进阶之路 architect
  {
    text: '技术提升2123',
    items: [
      // javaScript基础 base
      { 
        text: '前端进阶之路', 
        items: [
          { text: 'javaScript基础', link: '/pages/architect/base/' },
          { text: '计算机网络', link: '/pages/architect/network/' },
          { text: 'Vue.js', link: '/pages/architect/vue/' },
          { text: 'React', link: '/pages/architect/react/' },
          { text: 'node', link: '/pages/architect/node/' },
          { text: '前端工程化', link: '/pages/architect/engineering/' },
        ]
      },
      // 计算机网络 network
      {
        text: '计算机网络',
        items: [
          { text: '网络协议', link: '/pages/architect/network/函数式编程/' },
          { text: '网络请求', link: '/pages/architect/network/函数式编程/' },
          { text: '网络安全', link: '/pages/architect/network/函数式编程/' },
          { text: '模块加载', link: '/pages/architect/network/函数式编程/' },
        ]
      },
      // Vue
      { 
        text: 'Vue.js', 
        items: [
          { text: 'Vue.js', link: '/pages/architect/vue/函数式编程/' },
          { text: 'Nuxt.js', link: '/pages/architect/vue/函数式编程/' },
          { text: 'Vue源码解读', link: '/pages/architect/vue/函数式编程/' },
          { text: '组件架构', link: '/pages/architect/vue/函数式编程/' },
        ]
      },
      // React
      { text: 'React.js', link: '/pages/architect/react/函数式编程/' },
      // node 
      { 
        text: 'node.js', 
        items: [
          { text: '基础', link: '/pages/architect/node/函数式编程/' },
          { text: 'web服务express', link: '/pages/architect/node/函数式编程/' },
        ]
      },
      // engineering 前端工程化
      {  
        text: '前端工程化', 
        items: [
          { text: 'webpack', link: '/pages/architect/engineering/函数式编程/' },
          { text: 'babel', link: '/pages/architect/engineering/函数式编程/' },
          { text: 'CI/CD', link: '/pages/architect/engineering/函数式编程/' },
          { text: '质量检测', link: '/pages/architect/engineering/函数式编程/' },
          { text: '编码规范', link: '/pages/architect/engineering/函数式编程/' },
        ]
      },
    ]
  },
  // 面试 interview
  { 
    text: '面试', 
    items: [
      { text: 'js基础', link: '/pages/interview/js-base/' },
    ]
  },
  // 随笔 essay
  { 
    text: '随笔',
    items: [
      { text: '随笔1', link: '/pages/essay/jenkins.md' },
    ]
  },
  { text: '关于', link: '/pages/about/' },
  { text: 'GitHub', link: 'https://github.com/guestccc' },
];
