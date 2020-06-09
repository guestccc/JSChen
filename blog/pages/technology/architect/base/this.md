# this

## 问题：为什么函数中的this指向执行这个函数的环境呢？

### 什么是执行函数的环境？

```js
function a(){
}
a()
```

`a()` 相当于 `window.a()`

也就是说 `a` 函数在 `window` 环境中执行

也就是 `window` 对象 访问 `a`, 然后执行 `a`

`window` 是执行 `a` 函数的环境

```js
var obj = {
  a: function (){
  }
}
obj.a()
```

`a` 函数在 `obj` 环境中执行

也就是 `obj` 对象访问 `a` ，然后执行 `a`

`obj` 是执行 `a` 函数的环境


```js
function foo (){
  var obj = {
    a: function (){
    }
  }
  return obj
}
foo().a()
```

`a` 函数在 `obj` 环境中执行

也就是 `foo` 函数返回了 `obj` 对象， `obj` 对象访问 `a` ，然后执行 `a`

`obj` 是执行 `a` 函数的环境

### 再来看下一个

现在我们知道执行某个函数的环境是什么了，那我们来看看this为什么会指向这样一个环境呢

```js
var objCC = {
  name:'objC里的name',
  JSChen:function(){
    console.log(this)
    console.log(this.name)
  }
}

// 1.objC调用JSChen函数
objC.JSChen()
// objC
// objC里的name

// 2.window 调用JSChen函数
var name = 'window下的name'
var wJSChen = objC.JSChen
wJSChen()
// window下的name
```


::: tip 概念：

对象是引用类型的，而函数是继承于对象的一个子类，函数也是引用类型的

:::

::: warning 个人理解
也就是说，函数，实际上是存在内存里面的，变量实际上拿到的只是函数的地址，而正是因为函数是单独存在内存里面的，变量取到不过是一个地址，所以在什么环境中执行都与书写这个函数的位置无关，并不是说你代码写在哪儿，这个东西就在哪儿，不是的哈
:::

```js
var objC = {
  JSChen: function(){}
}
```
可以看做

```js
var objC = {
  JSChen: 地址（匿名函数）
}
```

`objC` 拿到的是 ` { JSChen: function() {} }` 对象在内存里的地址，也就是 `objC: { JSChen: 地址（匿名函数） }`


```js
var objC = {
  JSChen: 地址（匿名函数）
}

var jschen = JSChen
objC.JSChen()
jschen()
```

由于函数是一个单独的值（value）, 所以上面两句执行语句，都是先到函数执行的环境，然后再拿着函数 `JSChen` 的地址去内存找函数 `JSChen` ，然后再执行

所以函数的 `this` 与书写这个函数的位置没有关系， `this` 指向的是这个函数执行的环境

---

## 总结：

函数是单独存在于内存的，而函数的 this 的指向与书写这个函数的位置无关，函数的 this 指向的是 `调用调用调用\执行执行执行` 这个函数的环境，


---


## 参考文章

阮一峰——[《JavaScript 的 this 原理》](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

这里推荐再看一下这篇 [JavaScript深入之从ECMAScript规范解读this #7](https://github.com/mqyqingfeng/Blog/issues/7) 品的很深

