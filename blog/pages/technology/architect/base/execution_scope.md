# 从 执行上下文栈 到 作用域链 到 闭包

* 作用域

* 执行上下文

* 执行上下文栈

* 变量对象活动对象

* 作用域链

## 作用域

作用域分静态作用域（词法作用域）和动态作用域，而JavaScript采用的是静态作用域（关于这方面的概念，可以自行google查阅）

**下面来一段js**

```js
let name = 'chen'
function JSChan(){
  console.log(name)
}
function JSChang(){
  let name = 'cheng'
  JSChan()
}
JSChang()
// chen
```

**下面来分析一下**

> 由于js采用的是静态作用域，所以函数的作用域是在定义的时候就已经确定了的

* 声明变量 name 并赋值 'chen'

* 定义函数 JSChan 确定函数作用域

* 定义函数 JSChang 确定函数作用域

* 调用函数 JSChang

* 函数 JSChang 作用域中声明一个变量 name ，并赋值 'cheng'，然后调用函数 JSChan

* 函数 JSChan 执行，在当前作用域寻找 name ， 找不到，根据书写的位置，往上找，找到了 name 为 'chen'


## 执行上下文


一个问题，JavaScript 的可执行代码(executable code)的类型有哪些了？

1. 全局代码

2. 函数代码

3. eval代码 （这个函数现在已经很少用了）

也就是说有三种执行上下文，比如 全局执行上下文 `<global execution context>`, 函数 foo 的执行上下文 `<foo execution context>`


## 变量对象和活动对象

每一个执行上下文都有一个变量对象 VO 用来放在该上下文中定义的变量

而在函数上下文中，用活动对象(activation object, AO)来表示变量对象

活动对象是什么呢，其实也是一个变量对象来的，区别在于，当进入到一个执行上下文后，这个变量对象才会被激活，所以叫活动对象（AO），这时候活动对象上的各种属性才能被访问


## 执行上下文栈


大家都应该明白，我们一个程序，函数多了去了，拿js该如何来管理这些函数呢？

用的就是我们要来研究的这个执行上下文栈 `<execution context stock>`

::: tip 栈结构
后进先出 LIFO
:::

**来一段代码**

```js
var name = 'ccc'
function JSChen(){

}
JSChen()
```
**来一波伪代码**

首先，全局执行上下文入栈

```js
<execution context stock>.push(<global execution context>)

// 当前执行栈
<execution context stock>: [
 <global execution context>: {
   VO: {
     name: 'ccc',
     JSChen:reference to function JSChen(){},
   }
 },
]
```

然后 JSChen 调用， JSChen 函数执行上下文入栈


```js
<execution context stock>.push(<JSChen execution context>)

// 当前执行栈
<execution context stock>: [
 <global execution context>: {
   VO: {
     name: 'ccc',
     JSChen:reference to function JSChen(){},
   }
 },
 <JSChen execution context>: {
   AO: {
   }
 },
]
```

函数 JSChen 栈行结束，上下文从栈中弹出

```js
<execution context stock>.pop()

// 当前执行栈
<execution context stock>: [
 <global execution context>: {
   VO: {
     name: 'ccc',
     JSChen:reference to function JSChen(){},
   }
 },
]
```
全局上下文从栈中弹出


```js
<execution context stock>.pop()

// 当前执行栈
<execution context stock>: [
]
```


## 作用域链

每一个执行上下文中都会有一个作用域链，供给当前环境查找变量,而作用域链是由执行上下文中的变量对象\活动对象所组成 `VO\AO`

直接上代码

```js
function JSChen(){
  function jschen(){

  }
}
```

这里的作用域链是这样的哈

```js
// JSChen 函数的作用域链接
<JSChen scope>: [ <global execution context>.AO, <JSChen execution context>.AO ]

// jschen 函数的作用域链接
<jschen scope>: [ <global execution context>.AO, <JSChen execution context>.AO, <jschen execution context>.AO ]
```

## with

```js
function foo(obj1, obj2) {
  with (obj2) {
    console.log(obj1)
  }
}
foo('obj1', { obj1: 'obj2' })
foo('obj1', {})
```

`with` 指定的对象是作为作用域链的顶端

如果 `with` 执行块中只是用了指定对象的变量，那么减少了作用域链查找的长度

如果 `with` 执行块中用了作用域链上非顶端的变量，那么会加长了作用域链查找的长度


## 闭包


### 理论上

《JavaScript权威指南》中就讲到：从技术的角度讲，所有的JavaScript函数都是闭包。

闭包 = 函数 + 函数能够访问的自由变量

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。

### 实践上

ECMAScript中，闭包指的是：


从实践角度：以下函数才算是闭包：

即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）

在代码中引用了自由变量

::: tip 闭包
闭包 = 函数 + 创建我这个函数的上下文已经出栈，我还在栈里`暗中观察`
:::

**老城，拉个闭包出来溜溜**

```js
var name = 'ccc'
function JSChen(name){
  var age = 18
  function oldChen(){
    var des = 'JSChen没了，我还在，哈哈哈'
    console.log(des)
  }
  return oldChen
}

JSChen(name)()
// ccc 18
```

**上来就一波分析流程**

1. 函数 `JSChen` 被创建，保存作用域到函数 `JSChen` 的内部属性 `[[scope]]`

```js
JSChen.[[scope]] = [ <global execution context>.VO ]
```

2. `JSChen` 函数执行，函数 JSChen 执行上下文入栈


```js
<execution context stock>.push(<JSChen execution context>)

// 当前执行栈
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <JSChen execution context>:{
  }
]
```

3. JSChen 并不会立刻执行哈，得先复制函数内部属性 `[[scope]]`来创建当前作用域链

```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <JSChen execution context>:{
    <scope>: JSChen.[[scope]]
  }
]

// 此时 JSChen 的作用域链
<JSChen execution context>.scope = JSChen.[[scope]] = [ <global execution context>.VO ]

```

4. 然后呢就是初始化当前函数执行上下文的活动对象啦 `AO`


```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <JSChen execution context>:{
    AO: {
      arguments:{
        name:'ccc',
        length:1,
      },
      age:undefined,
      oldChen:reference to function (){}
    },
    <scope>: [ <global execution context>.VO ]
  }
]
```

5. 然后把当前函数执行上下文的活动对象 `VO` 压入当前作用域链的顶端



```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <JSChen execution context>:{
    AO: {
      arguments:{
        name:'ccc',
        length:1,
      },
      age:undefined,
      oldChen:reference to function (){}
    },
    <scope>: [
      <JSChen execution context>.AO,
      <global execution context>.VO
    ]
  }
]
```

6. 开始执行函数，更新活动对象，途中遇到 `oldChen` 函数的定义，需要把当前执行上下文`<JSChen execution context>`中的作用域链给到 `oldChen` 函数的内部属性[[scope]]


```js
oldChen.[[scope]] = <JSChen execution context>.scope


<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <JSChen execution context>:{
    AO: {
      arguments:{
        name:'ccc',
        length:1,
      },
      age:18,
      oldChen:reference to function oldChen(){}
    },
    <scope>: [
      <JSChen execution context>.AO,
      <global execution context>.VO
    ]
  }
]
```

7. `JSChen` 函数执行完毕，`JSChen` 函数的执行上下文出栈


```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
]
```


8. `oldChen` 函数被调用，`oldChen` 函数的执行上下文入栈


```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <oldChen execution context>:{
  },
]
```

9. 复制 `oldChen` 函数内部属性 `[[scope]]` 作为函数 `oldChen` 执行上下文的作用域链


```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <oldChen execution context>:{
    <scope>:[oldChen.[[scope]]]
  },
]

// 注意
// 此时的 oldChen.[[scope]] = 
// <JSChen execution context>.scope = 
// [ <JSChen execution context>.AO, <global execution context>.VO ] = 
```

10. 函数 `oldChen` 执行上下文活动对象 AO 初始化


```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <oldChen execution context>:{
    AO:{
      arguments:{
        length:0,
      },
      des:undefined,
    },
    <scope>:[
      <JSChen execution context>.AO,
      <global execution context>.VO
    ]
  },
]
```

11. 把函数 `oldChen` 执行上下文的活动对象 `VO` 压入作用域链的顶端


```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <oldChen execution context>:{
    AO:{
      arguments:{
        length:0,
      },
      des:undefined,
    },
    <scope>:[
      <oldChen execution context>.AO,
      <JSChen execution context>.AO,
      <global execution context>.VO
    ]
  },
]
```

12. 函数 oldChen 开始执行，活动对象更新

```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
  <oldChen execution context>:{
    AO:{
      arguments:{
        length:0,
      },
      des:'JSChen没了，我还在，哈哈哈',
    },
    <scope>:[
      <oldChen execution context>.AO,
      <JSChen execution context>.AO,
      <global execution context>.VO
    ]
  },
]
```

13. 函数 oldChen 执行结束，函数 oldChen 执行上下文出栈 

```js
<execution context stock>:[
  <global execution context>:{
    VO: {
      name: 'ccc',
      JSChen: reference to function JSChen(){},
    }
  },
]
```

14. 全局执行上下文出栈

```js
<execution context stock>:[
]
```

## 相关链接

[《一道js面试题引发的思考 #18》](https://github.com/kuitos/kuitos.github.io/issues/18)

[《JavaScript深入之执行上下文 #8》](https://github.com/mqyqingfeng/Blog/issues/8)