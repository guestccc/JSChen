# html 基础篇

## 语义化

## 属性

### title 和 alt 的区别

```html
<img src="#" alt="alt信息" />
```
当图片不输出信息的时候，会显示alt信息 鼠标放上去没有信息，当图片正常读取，不会出现alt信息

```html
<img src="#" alt="alt信息" title="title信息" />
```

当图片不输出信息的时候，会显示alt信息,鼠标放上去会出现title信息

当图片正常输出的时候，不会出现alt信息，鼠标放上去会出现title信息

::: tip title
title属性可以用在除了base，basefont，head，html，meta，param，script和title之外的所有标签
`title属性的功能是提示`。额外的说明信息和非本质的信息请使用title属性。title属性值可以比alt属性值设置的更长
title属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的。

:::

## dom 操作

### addEventListener

事件机制、事件流、事件传播

- 冒泡
- 捕获

1. 冒泡，从 `dom` 树 `指定层` 往 `上层` 追溯

```js
// 默认false 冒泡
node.addEventListener(
  'click',
  function() {
    alert('我是冒泡')
  },
  false
)
```

冒泡的终点，window，下面引入 [wayne zhu 的一篇博文](https://www.cnblogs.com/zhuzhenwei918/p/6139880.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JSChen</title>
  </head>
  <body>
    <div id="first">
      <div id="second">
        <button id="button">冒泡</button>
      </div>
    </div>
    <script>
      var button = document.getElementById('button'),
        second = document.getElementById('second'),
        first = document.getElementById('first'),
        body = document.body,
        html = document.documentElement
      button.addEventListener('click', function() {
        alert('button')
      })
      second.addEventListener('click', function() {
        alert('second')
      })
      first.addEventListener('click', function() {
        alert('first')
      })
      body.addEventListener('click', function() {
        alert('body')
      })
      html.addEventListener('click', function() {
        alert('html')
      })
      window.addEventListener('click', function() {
        alert('window')
      })
    </script>
  </body>
</html>
```

`button -> div1 -> div2 -> body -> html -> window`。 即最终可以冒泡到 window 上，即使是有 iframe 的话，也是不影响的，比如，我们把这个页面嵌入到另外一个页面中， 最终也是会冒泡到这个页面的 window，即使是在 iframe 上添加一个 click 事件，也是不会冒泡到这个 iframe 上的，即事件的冒泡是相互独立的。

2. 捕获，从 `dom` 树 `上层` 往 `指定层` 追溯

```js
// 设置true 捕获
node.addEventListener(
  'click',
  function() {
    alert('我是冒泡')
  },
  true
)
```

3. 阻止冒泡和捕获 `stopPropagation` 、 `stopImmediatePropagation` 两种

stopPropagation， stopImmediatePropagation 都可以阻止冒泡和捕获，但是 stopImmediatePropagation 是把指定元素剩下的同类型的的事件和追溯下去的事件都阻止掉

**`(1). stopPropagation`**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>JSChen</title>
    <style>
      #myDiv {
        background-color: coral;
        border: 1px solid;
        padding: 50px;
      }
    </style>
  </head>
  <body>
    <p>该实例演示了在添加事件监听时冒泡与捕获阶段的不同。</p>
    <div id="myDiv">
      <p id="myP">点击该段落， 我是冒泡</p>
    </div>
    <br />
    <script>
      document.getElementById('myP').addEventListener('click', function() {
        event.stopPropagation()
        alert('你点击了 P 元素!')
      })
      document.getElementById('myP').addEventListener('click', function() {
        alert('你点击了 P2 元素!')
      })
      document.getElementById('myDiv').addEventListener('click', function() {
        alert('你点击了 DIV 元素!')
      })
      document.getElementById('myP2').addEventListener(
        'click',
        function() {
          alert('你点击了 P 元素!')
          event.stopImmediatePropagation()
        },
        true
      )
    </script>
  </body>
</html>
```

<html>
<head>
<meta charset="utf-8">
<title>JSChen</title>
<style>
#myDiv{
    background-color: coral;
    border: 1px solid;
    padding: 50px;
}
</style>
</head>
  <body>
    <div id="myDiv">
      <p id="myP">点击该段落， 我是冒泡</p>
    </div><br>
    <script>
      document.getElementById("myP").addEventListener("click", function() 
      {
        event.stopPropagation();
          alert("你点击了 P 元素!");
      });
      document.getElementById("myP").addEventListener("click", function() 
      {
          alert("你点击了 P2 元素!");
      });
      document.getElementById("myDiv").addEventListener("click", function()
      {
          alert("你点击了 DIV 元素!");
      });
      document.getElementById("myP2").addEventListener("click", function() 
      {
          alert("你点击了 P 元素!");
        event.stopImmediatePropagation()
      },true);
    </script>
  </body>
</html>

指定元素 myP 绑定的两个事件都可以触发，并且阻止了向外层冒泡

**`(2). stopImmediatePropagation`**

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>JSChen</title>
    <style>
      #myDiv2 {
        background-color: yellow;
        border: 1px solid;
        padding: 50px;
      }
    </style>
  </head>
  <body>
    <div id="myDiv2">
      <p id="myP2">点击该段落， 我是冒泡</p>
    </div>
    <br />
    <script>
      document.getElementById('myP2').addEventListener('click', function() {
        alert('你点击了 P 元素!')
        event.stopImmediatePropagation()
      })
      document.getElementById('myP2').addEventListener('click', function() {
        alert('你点击了 P2 元素!')
      })
      document.getElementById('myDiv2').addEventListener('click', function() {
        alert('你点击了 DIV 元素!')
      })
    </script>
  </body>
</html>
```

<html>
<head>
<meta charset="utf-8">
<title>JSChen</title>
<style>
#myDiv2{
    background-color: yellow;
    border: 1px solid;
    padding: 50px;
}
</style>
</head>
  <body>
    <div id="myDiv2">
      <p id="myP2">点击该段落， 我是冒泡</p>
    </div><br>
    <script>
      document.getElementById("myP2").addEventListener("click", function() 
      {
        alert("你点击了 P 元素!");
        event.stopImmediatePropagation()
      });
      document.getElementById("myP2").addEventListener("click", function() 
      {
        alert("你点击了 P2 元素!");
      });
      document.getElementById("myDiv2").addEventListener("click", function()
      {
        alert("你点击了 DIV 元素!");
      });
    </script>
  </body>
</html>

指定元素 myP ，阻止了向外层冒泡，并且阻止了剩下的一个绑定事件

### 事件代理

把子组件需要触发的相同事件注册在父节点上
