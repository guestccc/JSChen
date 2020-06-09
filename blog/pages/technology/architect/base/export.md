
# 模块化

## node module.exports exports Common.js

可以这样理解：

在当前作用域提供了两个变量， `module` 和 `exports`

`module.exports` 和 `exports` 指向的是同一个对象地址

而最终 `require` 导入的是 `module.exports`

```js
// node.js
exports = { name: 'ccc' }
console.log(module.exports)
console.log(require('./node.js'))
// {}
// {}
```

`exports` 得到了一个新对象的地址， `module.exports` 指向的对象没有更改，require 导入的永远都是 `module.exports`

```js
// node.js
exports.name = 'ccc'
console.log(module.exports)
console.log(require('./node.js'))
// {name:'ccc'}
// {name:'ccc'}
```

`exports` 地址指向的对象添加了新的属性， `module.exports` 指向的对象发生了更改，require 导入的永远都是 `module.exports`

```js
// node.js
exports.name = 'ccc'
module.exports = 1
console.log(module.exports)
console.log(require('./node.js'))
// 1
// 1
```

`exports` 地址指向的对象添加了新的属性， `module.exports` 得到了一个新的值， `require` 导入的永远都是 `module.exports`

## es6 export export default

特点：静态分析，运行时不允许外部对引入的接口进行更改，当然接口的属性是可以修改的

::: tip 提示
import 会自动提升
:::

### 1. export import

```js
// a.js
export var a = 1
var b = 2
export { b }

// b.js
import { a, b } from './a.js'
```

上面 `a.js` 的导出，是导出指定名称的接口，不是值

而 `b.js` 是通过 `{}` 导入指定命名接口

### 2. export import \*

整体加载

```js
// a.js
export var a = 1
var b = 2
export { b }

// b.js
import * as a from './a.js'
console.log(a.a, 'a.a')
console.log(a.b, 'a.b')
```

### 3. export default

默认输出，一个模块只能有一个默认输出

> 本质上，export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。

```js
// a.js
export default function() {
  console.log('export defalut')
}
// b.js
import mode from './a.js'
console.log(mode)
```

`export default` 和 `export` 可以同时存在

```js
// a.js
export var a = 1
var b = 2
export { b }

export default function() {
  console.log('export defalut')
}

// b.js
import mode, { a, b } from './a.js'
console.log(mode, a, b)

// b.js
import mode from './a.js'
import { a, b } from './a.js'
console.log(mode, a, b)
```

### 4. export from

`export` 和 `import` 的复合写法，先输入后输出

```js
// a.js
export var a = 1
var b = 2
export { b }

// b.js
export { a, b } from './a.js'
```

### 5. 跨模块常量小技巧

目录结构

- other.js
- constants
  - config.js
  - wx.js
  - index.js

常量分文件，再由 index 做转发

```js
// config.js
export const config = {
  baseUrl: 'https://blog.jschen.cc',
  port: '8080'
}
```

```js
// wx.js
export const wx = {
  appID: 1231231231231,
  Key: 12313123131
}
```

```js
// index.js
export { config } from './config.js'
export { wx } from './wx.js'
```

其他模块引入常量

```js
// other.js
import { config, wx } from './constants/index.js'
```

## es2020 提案 `import()` 动态加载

```js
const main = document.querySelector('main')

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main)
  })
  .catch(err => {
    main.textContent = err.message
  })
```

> 这里直接抄阮一峰老师的[es6](https://es6.ruanyifeng.com/#docs/module#import)



### 总结：



|      | es6 import                                                     | node require                             | es2020 import()                                       |
| ---- | -------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| 特点 | 静态分析                                                       | 动态加载                                 | 动态加载                                              |
| 区别 | 编译时处理，所有无法实现运行时的动态加载，所以有一个提升的效果 | 到底加载的哪个模块，只有运行的时候才知道 | 运行是执行到哪就加载到哪，返回的是一个 `Promise` 对象 |

