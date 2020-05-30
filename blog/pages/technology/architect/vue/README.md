
# 深入响应式

vue 深入响应式的解决方案采用的式 es6 语法提供的 Object.defineProperty 函数

::: tip 用法
`Object.definedProperty(obj, prop, descriptor)` 给对象定义属性
:::

来一个 mdn 的表，方便记忆

||configurable|	enumerable|	value|	writable|	get|	set|
|--|--|--|--|--|--|--|
|数据描述符| 可以| 可以| 可以| 可以| 不可以| 不可以|
|存取描述符| 可以| 可以| 不可以| 不可以| 可以| 可以|


## 简单模拟一个 vue 响应式
```js
// 创建一个dom
var div = document.createElement('div')
div.id = 'ccc'
div.innerText = '我是陈程城'
div.style.background = 'red'
document.body.appendChild(div)

var app = {
  data:{
    show:false
  },
  methods:{
    onUserClick(){
      this.show = true
    }
  }
}


// 初始化一下
// 搞个观察者
Object.defineProperty(
  app,
  'show',
  {
    configurable:true,
    enumerable:true,
    get(){
      return this.data.show
    },
    set(val){
      console.log('我监听到有人要改我了，我可以去改下视图了')
      div.style.display = val?'unset':'none';
      this.data.show = val;
    }
  }
)
app.show = app.data.show



// 当用户触发了 onUserClick
app.methods.onUserClick.apply(app)
```

## 检查变化

这里要注意的是什么，这里引入官方文档一句话哈

::: warning 废弃
[Vue.js](https://cn.vuejs.org/v2/guide/reactivity.html)

受现代 `JavaScript` 的限制 (而且 Object.observe 也已经被废弃)，Vue 无法检测到对象属性的添加或删除。
:::

讲的是什么呢

如果没有事先（开发中）在 `data` 中定义需要做响应式的数据，那么，页面初始化后再去给 `data` 添加新的属性，这些新添加到 `data` 上的属性是无法监听到的，因为 `js` 的这个方法 `Object.observe` 已经废弃了，当然 `vue` 是有提供一个特有的 `api` 去实现这个功能


## 完整模拟响应式流程


1. 利用了 object.definedProperty 实现一个观察者，和数据代理

2. 再通过一个发布订阅模式，在数据更改时通知所有订阅者，在初始化订阅者的时候把当前订阅者缓存起来，并且强制执行监听器的 get 函数

3. 再来一个订阅器做保存当前订阅者用

4. 匹配 `{{}}` 实现一个编译器

