// head 头部引入 js meta icon
module.exports = [
  // ['meta', { "http-equiv": 'x-dns-prefetch-control', content: 'on'}],//打开和关闭DNS预读取
  ['link', { rel: 'dns-prefetch', href: '//blog.jschen.cc'}],//强制查询特定主机名
  ['link', { rel: 'icon', href: '/assets/img/LOGO.png',type:"image/png"}],
  // 百度收录
  ['script', { type: 'text/javascript', src: '/assets/sitemap/baidu.js' }],
  ['link', { rel:"stylesheet",type: 'text/css', href: '/assets/css/app.css' }],
  ['meta', { name: 'keywords', content: 'ccc,jschen,陈程城,vue,前端,web前端,前端基础,bind,apply,call,prototype,tcp/ip,TCP/IP,webpack,nuxt,event-loop,作用域链,执行上下文,js,jschen,javaScript,new,class,es6,new 实质,node,babel,ci/cd,CI/CD,vue源码,前端进阶,' }],
  ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
];
