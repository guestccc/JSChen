# 房极客

## event-loop

## 继承

## this

## node 配置 cors

第一题，用 es3 实现一个 bind 函数，第二题，将一个 ts 代码实现的继承，其中有私有属性和静态属性，请用 es5 来实现它，第三题，事件循环，很变态的那种，第四题，手动封装一个 jsonp 函数，要求能支持百万并发，第五题，用 node 实现一个 CORS 的中间价，以上题目全是手写代码实现，这是第一轮笔试题。

问
怎么手写 jsonp。
答
利用回调函数。
问
怎么保证 jsonp 的方法唯一。
答
使用时间戳。

二面约了，前端负责人面试，当天下午进行，还是针对面试题继续深挖，也会出一些设计模式相关手写题。最后由于个人原因，放弃了之后的流程。

第二轮，根据你的简历，开始问源码，用过 vuex，就问他怎么实现的？问的很深的那种！还有网络安全，tcp 的原理是什么，怎么实现的等。

发布订阅模式的理解及实现。

前两面都是技术面，而且耗时非常长，大概要 3 个小时。第一面笔试题，主要是前端基础，包括原型链和 vue 的框架知识。一面的考官会每一道题目都和你分析，所以会比较久。二面的是技术主管。要你解释 jsonp 的原理和原生实现。以前只理解了原理，没有动手做一次答得不好。还有 docker 的一些知识点，缓存的原理等等。并且他们主要用 vue 和 nodejs，这两个是重点。三面听说是 CTO 面试。4 面就是 HR 面了。

# bind

```js
Function.prototype.bind = function(context) {
  let fn = this
  let arrs = Array.prototype.slice.call(arguments, 1)
  return function() {
    fn.apply(context, arrs.concat(Array.prototype.slice.call(arguments)))
  }
}
```

# ts 继承

```js
class JSChen extends Object {
  constructor() {
    super() // 指向构造函数
  }
  get() {
    console.log(super) // 指向原型对象
  }
  static set() {}
}
```

# event-loop

# jsonp

```js
function Api (url){
  let s = document.createElement('script')
  s.src = url
  document.body.appendChild(s)
}
function foo(data){
  console.log(‘')
}
Api('https://baidu.com?callback=foo')

// 协商缓存

// 强制缓存
```

# cors 中间件

```js
app.all('*', function(req, res, next) {
  req.header('Access-control-Allow-Origin', '*')
  req.header('Access-control-Allow-Methods', 'GET')
  req.header('Access-control-Allow-Headers', 'cache-control,content-type')
  if (req.methods == 'OPTION') {
    res.send(200)
  } else {
    next()
  }
})
```

## 手写 jsonp

通过 script 来规避浏览器同源策略的影响，服务端通过把数据作为实际参数返回函数的调用，来完成数据的交互

```js
var util = {
  queryUrl: function(data) {
    queryStr = []
    Object.keys(data).forEach(key => {
      queryStr.push(`${key}=${data[key]}`)
    })
    queryStr = queryStr.join('&')
  }
}
function JSONP(param) {
  let script = document.createElement('script')
  script.src = param.url + param.url.indexOf('?') ? '&' : '?' + util.queryUrl(param.data)
  param.callback += script.src
  let timer = setTimeout(() => {
    param.error('超时')
    clearTimeout(timer)
  }, param.timeout)
  window[param.callback] = function(data) {
    clearTimeout(timer)
    param.success(data)
  }

  script.onload = script.onreadystatechange = function() {
    if (
      !this.readyState || //这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
      this.readyState == 'loaded' ||
      this.readyState == 'complete' // 这是IE的判断语句
    ) {
      alert('loaded')
    }
  }
}
JSONP({
  url: 'https://baidu.com',
  data: {
    name: 'cccc',
    age: 18
  },
  callback: 'getUserName',
  timeout: 100000,
  success: data => {
    console.log('成功响应数据', data)
  },
  error: data => {
    console.log('失败', data)
  }
})
```

- 超时处理
- 回调名处理
- 监听成功回调

## vue 源码 vuex v-model router

### [响应式原理](https://juejin.im/entry/5923973da22b9d005893805a)

- 通过 Object.defineProperty 遍历 data 做一个数据劫持
- 通过 发布订阅 这个设计模式，做一个访问订阅，赋值发布，为所有订阅通知更新
- 构造一个 编译器 Compile 
- 构造一个 订阅者 Watcher ，通过编译器 compile 为每个 {{xxx}} 生成一个订阅者，并且缓存自己，并且强制触发数据劫持中的 get ，把缓存的自己推入 订阅列表 ，再删除缓存中的自己

### vue-router

**hash**

- 更改 url hash 值
- 监听 hashchange 做页面更换处理

**history**

- 配置路由列表，对应路由路径，路由回调（跟换页面视图操作） 
- 利用 html5 新增的 pushState 和 replaceState 维护一个页面栈
- 通过 forward go back 做前进后退操作

### vuex

维护一份

## 网络安全

### [跨站脚本攻击（Cross-site scripting，XSS）](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)

XSS 利用的是用户对指定网站的信任

- 反射型
- 存储型
- DOM

**内容安全策略 CSP Content-Security-Policy**

### 跨站请求伪造 (Cross-site request forgery, CSRF)

CSRF 利用的是网站对用户网页浏览器的信任

**如何防御**

- Get 请求不对数据进行修改
- 不让第三方网站访问到用户 Cookie
- 阻止第三方网站请求接口
- 请求时附带验证信息，比如验证码或者 token

### 密码

**加盐** 

因为彩虹表的存在，不建议单纯的加密，需要做加盐处理

确保即使数据库泄漏，也不会暴露用户真实密码


## 性能

### 网络相关

- DNS 预解析
- 缓存
  - 强缓存
  - 协商缓存
- http 2.0
- 预加载
- 预渲染

### 优化渲染过程
- 懒执行
- 懒加载

### 文件优化

- 图片大小
- cdn

### webpack

- 压缩
- tree shaking
- hash 优化浏览器缓存
  - hash 所有文件都一样，都会修改 -- 修改后整个项目的缓存都无效
  - chunkhash 每个模块都不一样，单模块所有文件修改 -- 修改后整个模块的缓存都无效
  - contenthash 每个文件都一样，单文件修改 -- 修改后单文件的缓存无效

## tcp

三次握手

第一次握手： 服务端知道可以和客户端建立连接
第二次握手：客户端知道自己可以和服务端连接成功的反馈
第三次握手：收到反馈回应一下服务端，防止超时请求

进入连接

四次挥手

第一次挥手：客户端 fin 关闭，告诉服务端
第二次挥手：服务端回应收到 fin
第三次挥手：服务端 fin 关闭，告诉客户端
第四次挥手：客户端回应收到 fin

## http https

https = http + TLS

### post 和 get

- post 有副作用 不幂等

- get 无副作用 幂等

- post 相对 get 安全，get 请求都包含在 url 里面

- get 能缓存， post 不能

- post 不限制数据类型

### 状态码

301 永久重定向

302 临时重定向

304 缓存

401 身份验证

402 预留

404 找不到

412 未满足条件

500 服务器错误


## docker

## 缓存

### 强制缓存

**Expires：过期时间**

```js
Expires: Wed, 22 Oct 2018 08:41:00 GMT
```

**Cache-Control：过期类型（有效期）**

```js
Cache-control: max-age=30
```

如果有 cache-control 忽略 expires

过期前不请求 web 服务器

::: warning 缺陷
  过期后可能未更改
:::


### 协商缓存

**Last-Modified 和 If-Modified-Since**

Last-Modified 表示本地文件最后修改日期（ web 服务器告诉浏览器）

If-Modified-Since 表示本地文件最后修改日期 （浏览器询问 web 服务器）

::: warning 缺陷
  1. 过期后文件修改，但是文件可能没变化，比如
  2. Last-Modified 只能精确到秒级，所以在一秒内的更改会导致无法触发更新
:::

**ETag 和 If-None-Match**

ETag 表示 web服务器 最新资源 文件指纹（ web 服务器告诉浏览器）

If-None-Match 表示 web服务器 最新资源 文件指纹（浏览器询问 web 服务器）


## 冒泡排序 快速排序

### 冒泡排序

从第一个元素开始，每次与下一位做比较，大的后移继续和下一位做比较

```js
var list = [2,5,3,4,1,6,9,3,2,0]

function sort(list){
  for(let i = 0;i<list.length;i++){
    for(let j = 0;j<list.length-i-1;j++){
      if(list[j]>list[j+1]){
        list[j] += list[j+1]
        list[j+1] = list[j] - list[j+1]
        list[j] = list[j] - list[j+1]
      }
    }
  }
}
```

### 快速排序

分左右两个数组，随机取一个元素，小的扔左边，大的扔右边

```js
var list = [2,5,3,4,1,6,9,3,2,0]

function sort(list){
  if(list.length<=1) return list
  let left = []
  let right = []
  let item = list.splice(0,1)[0]
  for(let i = 0;i<list.length;i++){
    if (list[i]>=item){
      right.push(list[i])
    }else{
      left.push(list[i])
    }
  }
  return sort(left).concat([item],sort(right))
}
```