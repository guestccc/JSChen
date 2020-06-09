---
tags: 
  - 原型链
  - 主题
  - 索引
---

# 原型链

首先来看下 [MDN 对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes) 这句

> JavaScript 常被描述为一种基于原型的语言 (prototype-based language)

## 带着问题整理思路

1. new 的用法,直接查阅mdn [MDN new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

2. 原型对象是什么

3. constructor 属性

4. 什么是原型链

## 原型是什么

### 1. 先来理解一句话哈 [MDN 对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)

> 在javascript中，函数可以有属性。 每个函数都有一个特殊的属性叫作原型

每一个函数，都存在一个 prototype 属性， 而这个 prototype 属性指向就是原型（也叫做原型对象）

**下面是我个人的理解哈：👇**

原型是个对象，创建一个函数，我们可以通过访问该函数的 prototype 属性，拿到这个原型对象

```js
function JSChen () {

}
console.log(JSChen.prototype)
// {
//   constructor: ƒ JSChen() // 构造函数，指向函数本身
//   __proto__: Object // 创建这个
// }
```

也就是说 `JSChen.prototype` 指向的就是这个对象

![prototype1](/assets/img/prototype1.png)

### 2. 再来理解一句话 [MDN 继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

> `JavaScript` 只有一种结构：对象。每个实例对象（ `object` ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（ `prototype` ）。该原型对象也有一个自己的原型对象( `__proto__` ) ，

:::tip
我感觉是mdn翻译错了哈

讲道理，构造函数也有可能是其他构造函数的实例

所以应该说是 `实例的原型` 而不是 `构造函数的原型`
:::

我们先来实例一个对象看看哈


```js
function JSChen () {

}
console.log(JSChen.prototype)
var ccc = new JSChen()
console.log(ccc.__proto__)
```

再来判断一下 实例对象的 `__proto__` 是否 全等于 其构造函数的 `prototype`


```js
function JSChen () {

}
var ccc = new JSChen()
JSChen.prototype === ccc.__proto__
// true
```

![prototype2](/assets/img/prototype2.png)

### 3. 原型类似一个模版

> 每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性

先来两个概念

* 对象是引用类型的

  ccc.__proto__ 和 JSChen.prototype 引用的是用一个对象

* 属性的访问机制

  当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

  `a.b` 读不到，就去 `a.__proto__` 找 `b` ,如果在找不到并且 `a.__proto__` 不是最顶层，就继续去 `a.__proto__.__proto__` 以此类推

---

试一下哈

```js
function JSChen () {

}
JSChen.prototype.name = '啊城'
var ccc = new JSChen()
console.log(ccc.name)
// 啊城
```
先给函数 `JSChen` 的 `prototype` 加一个 `name` ，再用函数 `JSChen` 实例化一个对象 `ccc` ， `ccc.name` 找不到， `ccc.__proto__.name` 找到了

再来一个

```js
function JSChen () {

}
var ccc = new JSChen()
JSChen.prototype.name = '啊城'
console.log(ccc.name)
// 啊城
```

先用函数 `JSChen` 实例化一个对象 `ccc` ，给函数 `JSChen` 的 `prototype` 加一个 `name` ，由于 `JSChen.prototype` 和 `ccc.__proto__` 引用的是同一个对象，所以 `ccc.name` 找不到， `ccc.__proto__.name` 找到了


  也就是说 ccc.name 实际上是 ccc.__proto__.name

### 4. **突如其来一个小问题 ———— `对象` 是怎么来的？当然是 `实例化` 出来的啦**

```js
var a = {} // 语法糖
var b = new Object() // 实例化操作
```

其实这里的 `{}` 不过是个语法糖而已，实质上就是一个实例化操作 `new Object()`

所以呢，对象都是实例化出来了，所有的对象都有某个构造函数的实例化对象

所以，所有对象都有一个 `__proto__` 属性，指向 其构造函数的原型对象，而其构造函数的 `prototype` 属性，也指向其构造函数的原型

### 5. **结论：**

- 原型是个对象
- 函数 的 `prototype` 属性 指向一个 原型对象，实例对象 的 `__proto__` 属性 也指向指向一个 原型对象
- 其实实例对象的原型对象就是其构造函数的原型
- 原型其实就相当于一个模版


```js
{
  constructor: ƒ JSChen() // 构造函数，指向函数本身
  __proto__: Object // 创建这个
}
```


## constructor属性

每一个原型对象都有一个 `constructor` 属性， 指向构造函数本身

```js
function JSChen () {

}
var ccc = new JSChen()
JSChen.prototype.constructor === JSChen
ccc.__proto__.constructor === JSChen
```

`JSChen` 函数实例化了一个对象 `ccc` ，那么 `ccc.__proto__` 和 `JSChen.prototype` 指向实例对象 `ccc` 的原型

而原型对象有一个 `constructor` 指向 实例对象的构造函数本身，也就是 `ccc.__proto__.constructor` 指向 `JSChen`

也就是 `JSChen.prototype.constructor` 指向 `JSChen` 

## 什么是原型链

对象的 `__proto__` 属性指向他原型 也就是构造函数的 `prototype` 属性 `，prototype` 也是个对象，那么 `prototype` 的 `__proto__` 也指向他原型，这样，一层一层往上追溯，这种关系，就被称为 `原型链`

例如： 

```js
function JSChen () {

}
var ccc = new JSChen()
ccc.__proto__ === JSChen.prototype;
JSChen.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
// true
```
![原型链](/assets/img/prototype3.png)

实例对象 `ccc` 的 `__proto__` 指向他的原型，也就是 `JSChen.prototype` , `JSChen.prototype` 的 `__proto__` 指向他的原型， 也就是 `Object.prototype` , `Object.prototype` 的 `__proto__` 指向他的原型 也就是 `null`


## 完整的原型构造函数关系图


![原型链](/assets/img/prototype4.png)

