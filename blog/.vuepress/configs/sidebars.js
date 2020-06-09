// sidebar 侧边栏配置
module.exports  = {
  // 前端架构 javaScript基础
  '/pages/architect/base/': [
    {
      title: '基础知识',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        'this',
        'this',
        'fp',
        'test'
      ]
    },  /* /foo/one.html */
    {
      title: '函数式编程',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
        'fp'
      ]
    }, 
    {
      title: 'es6',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
        'fp'
      ]
    }, 
    {
      title: '设计模式',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
        'fp'
      ]
    }, 
  ],
  // 前端架构 计算机网络
  '/pages/architect/network/': [
    {
      title: '网络协议',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
      ]
    },  /* /foo/one.html */
    {
      title: '网络请求',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
        'fp'
      ]
    }, 
    {
      title: '网络安全',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
      ]
    },  /* /foo/one.html */
    {
      title: '模块加载',
      collapsable: true,
      sidebarDepth: 2,
      children:[
        '',
        'fp'
      ]
    }, 
  ],
}