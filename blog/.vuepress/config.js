const sidebar = require('./configs/sidebars');
const nav = require('./configs/nav.js');
const head = require('./configs/heads');


module.exports = {
  title: `JSChen`,
  base:'', // 如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"
  head, // head 头部引入 js meta icon
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: '更新时间', // string | boolean
    logo: '/assets/img/LOGO.png',
    // sidebar: 'auto',
    displayAllHeaders:false,
    sidebar:{
      // 前端架构 javaScript基础
      '/pages/technology/architect/base/': [
        {
          title: '基础知识',
          collapsable: true,
          sidebarDepth: 1,
          children:[
            '',
            'this',
            'execution_scope',
            'new',
            'apply_call_bind',
            'type',
            'event-loop',
            'code',
            'css',
            'html',
          ]
        },
        {
          title: 'es6',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'es6',
            'export',
          ]
        },   /* /foo/one.html */
        {
          title: '函数式编程',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'fp'
          ]
        }, 
        {
          title: '设计模式',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'design',
          ]
        }, 
      ],
      // 前端架构 计算机网络
      '/pages/technology/architect/network/': [
        {
          title: '网络协议',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'status',
          ]
        },  /* /foo/one.html */
        {
          title: '网络请求',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
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
          ]
        }, 
      ],
      // 前端架构 vue
      '/pages/technology/architect/vue/': [
        {
          title: 'Vue.js',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
            'router'
          ]
        },  /* /foo/one.html */
        {
          title: 'Nuxt.js',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'nuxt',
          ]
        }, 
        {
          title: 'Vue源码解读',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: '组件架构',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
      ],
      // 前端架构 计算机网络
      '/pages/technology/architect/react/': [
        {
          title: 'react基础',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'redux',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
        {
          title: 'Next',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'react native',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
      ],
      // 前端架构 node
      '/pages/technology/architect/node/': [
        {
          title: 'node基础',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'web服务express',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
      ],
      // 前端架构 前端工程化
      '/pages/technology/architect/engineering/': [
        {
          title: 'webpack',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'babel',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
        {
          title: 'CI/CD',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
        {
          title: '质量检测',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
        {
          title: '编码规范',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        }, 
      ],
      // 运维小兴趣 linux
      '/pages/technology/ops/linux/': [
        {
          title: 'linux常用命令',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'linux其他',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },
      ],
      // 运维小兴趣 nginx
      '/pages/technology/ops/nginx/': [
        {
          title: 'nginx常用命令',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'nginx配置',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },
      ],
      // 运维小兴趣 docker
      '/pages/technology/ops/docker/': [
        {
          title: 'docker基本操作',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'jenkins + docker 之持续构建持续部署(CI/CD)',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'jenkins',
          ]
        },
      ],
      // 面试 面试题收录
      '/pages/interview/included/': [
        {
          title: 'js基础类型',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },  /* /foo/one.html */
        {
          title: 'es6类型',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },
        {
          title: '计算机网络类型',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '',
          ]
        },
      ],
      // 面试 面试准备
      '/pages/interview/plan/': [
        {
          title: '简历',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            '4-8',
            '',
            'pen',
          ]
        },  /* /foo/one.html */
        {
          title: 'markdown',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'js-base',
          ]
        },
      ],
      // 随笔
      '/pages/essay/': [
        {
          title: '随笔',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'about_talk',
            'expression_statement',
            'jenkins',
            'incongruent_operator',
            'bad_time',
            'area_code',
          ]
        }, 
        {
          title: '房极客',
          collapsable: true,
          sidebarDepth: 2,
          children:[
            'FJK1',
            'FJK2',
          ]
        }, 
      ],
    },
    nav:[
      // 技术提升 technology
      {
        text: '技术提升',
        items: [
          // 前端进阶之路 architect
          { 
            text: '前端进阶之路', 
            items: [
              { text: 'javaScript基础', link: '/pages/technology/architect/base/' },
              { text: '计算机网络', link: '/pages/technology/architect/network/' },
              { text: 'Vue.js', link: '/pages/technology/architect/vue/' },
              { text: 'React', link: '/pages/technology/architect/react/' },
              { text: 'node', link: '/pages/technology/architect/node/' },
              { text: '前端工程化', link: '/pages/technology/architect/engineering/' },
            ]
          },
          // 运维小兴趣 OPS
          { 
            text: '运维小兴趣', 
            items: [
              { text: 'linux', link: '/pages/technology/ops/linux/' },
              { text: 'nginx', link: '/pages/technology/ops/nginx/' },
              { text: 'docker', link: '/pages/technology/ops/docker/' },
            ]
          },
        ]
      },
      // 面试 interview
      { 
        text: '面试', 
        items: [
          { 
            text: '面试题收录', 
            link: '/pages/interview/included/'
          },
          { 
            text: '面试准备', 
            link: '/pages/interview/plan/4-8/'
          },
        ]
      },
      {
        text:'更多',
        items: [
          { text: '随笔', link: '/pages/essay/'},
          { text: '名言小课堂', link: '/pages/saying/'},
          { text: '关于', link: '/pages/about/' },
          { text: '收藏书籍', link: '/pages/pdf/' },
          { text: '友情链接', link: '/pages/blogroll/' },
          { text: '故事', link: '/pages/story/' },
          { text: 'GitHub', link: 'https://github.com/guestccc/guestccc.github.io' },
        ]
      },
      // 随笔 essay
    ],
  },
  plugins: {
    // 谷歌收录
    // 'sitemap': {
    //   hostname: 'https://blog.jschen.cc'
    // },
    // 百度收录 -- 准备自己开源一个
  }
}