# new 实现

首先来看下 new 关键字执行了哪些步骤

```js
function JSChen(){
  this.name = 'ccc'
}
JSChen.prototype.age = 18
var objC = new JSChen()
console.log(objC)
// JSChen {name: "ccc"}
//   name: "ccc"
//   __proto__:
//     age: 18
//     constructor: ƒ JSChen()
//     __proto__: Object
```

## 分4步走

1. 创建一个对象，这里我们暂时叫做`obj`

2. 把 `obj` 的 `__proto__` 属性指向 `JSChen.prototype` 指向的内存地址，也就是 `obj.__proto__ = JSChen.prototype`

3. 把构造函数的 `this` 指向对象 `obj`

4. 如果构造函数有返回值并且是引用类型的值，那么返回该引用类型的值，否则返回对象 `obj`

## 1. 要优雅

首先我们要优雅，咱们直接让每个函数都可以直接调用我们写的 `fakeNew` 伪造的 `new` 方法

```js
// 构造函数 JSChen
function JSChen () {

}

// 伪造的 new 方法
Function.prototype.fakeNew = function(){

}

// 使用 伪造的 new 方法

var objC = JSChen.fakeNew()
```

## 2. 创建一个对象，这里我们暂时叫做`obj`

```js
// 构造函数 JSChen
function JSChen () {

}

// 伪造的 new 方法
Function.prototype.fakeNew = function(){
  var obj = {}
}

// 使用 伪造的 new 方法

var objC = JSChen.fakeNew()
```

## 3. 把 `obj` 的 `__proto__` 属性指向 `JSChen.prototype` 指向的内存地址，也就是 `obj.__proto__ = JSChen.prototype`


```js
// 构造函数 JSChen
function JSChen () {

}

// 伪造的 new 方法
Function.prototype.fakeNew = function(){
  var obj = {}
  obj.__proto__ = this.prototype // 这里的 this 指向的是 JSChen
}

// 使用 伪造的 new 方法

var objC = JSChen.fakeNew()
```

## 4. 把构造函数的 `this` 指向对象 `obj`


```js
// 构造函数 JSChen
function JSChen () {

}

// 伪造的 new 方法
Function.prototype.fakeNew = function(...val){
  var obj = {}
  obj.__proto__ = this.prototype // 这里的 this 指向的是 JSChen
  this.apply(obj,val)
}

// 使用 伪造的 new 方法

var objC = JSChen.fakeNew()
```

## 5. 如果构造函数有返回值并且是引用类型的值，那么返回该引用类型的值，否则返回对象 `obj`



```js
// 构造函数 JSChen
function JSChen () {

}

// 伪造的 new 方法
Function.prototype.fakeNew = function(...val){
  var obj = {}
  obj.__proto__ = this.prototype // 这里的 this 指向的是 JSChen
  var result =  this.apply(obj,val)
  return result instanceof Object?result:obj
}

// 使用 伪造的 new 方法

var objC = JSChen.fakeNew()
```
