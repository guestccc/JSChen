# apply call bind 模拟实现

## apply 模拟实现

```js
var obj = {
  name: "ccc",
}
function JSChen (age){
  console.log(`我的${this.name}，今天${age}岁`)
}
JSChen.apply(obj,[18])
```

### 首先，整理下我们需要实现的细节哈

- 1. 属于函数的静态方法

- 2. 传入两个参数新的 `this` 、 `arr` 原函数需要的参数（以数组的形式）

- 3. 改变函数，让函数的 `this` 指向 传入的 `this`

- 4. 返回函数的执行结果

<!-- ### 1. 属于函数的静态方法 -->

```js
Function.prototype.jschenApply = function (context,arr){
  context = context || window
  context._fn = this
  let args = []
  for(let i = 0; i < arr.length; i += 1) {
    args.push('arr[' + i + ']')
  }
  let result = eval('context._fn(' + args + ')')
  delete context._fn
  return result
}

// 测试用例
var obj = {name: 'jsChen'};
function test(a,b,c){
  console.log(a,b,c,this)
}
test.jschenApply(obj,[1,2,3])
// 1,2,3,{name: 'jsChen'}
```

::: tip 重点

1. context 添加一个新的属性 `fn` ，让函数的 `this` 指向， `context`

2. 用 `for` 遍历 `arr` ,生成一个数组，元素为字符串型的引用语句，例如： `arr[1]`

3. 使用 `eval` 函数执行函数

4. `delete context.fn`

5. 返回结果
:::

## call 模拟实现


```js
Function.prototype.jschenCall = function(context){
  context = context || window
  context._fn = this
  let args = []
  for(let i = 1; i < arguments.length; i += 1) {
    args.push('arguments[' + i + ']')
  }
  let result = eval('context._fn(' + args + ')')
  delete context._fn
  return result
}

// 测试用例
var obj = {name: 'jsChen'};
function test(a,b,c){
  console.log(a,b,c,this)
}
test.jschenCall(obj,1,2,3)
// 1,2,3,{name: 'jsChen'}
```

::: tip 重点
1. context 添加一个新的属性 `fn` ，让函数的 `this` 指向， `context`

2. 用 `for` 遍历 `arguments` ,生成一个数组，元素为字符串型的引用语句，例如： `arguments[1]`

3. 使用 `eval` 函数执行函数

4. `delete context.fn`

5. 返回结果
:::

## bind 模拟实现

简单版，不适配 `new`

```js
Function.prototype.jschenBind = function(context){
  let fn = this
  let args = Array.prototype.slice.call(arguments,1)
  return function(){
    return fn.apply(context,args.concat(Array.prototype.slice.call(arguments)))
  }
}

// 测试用例
var obj = {name: 'jsChen'};
function test(a,b,c){
  console.log(a,b,c,this)
}
test.jschenBind(obj,1,2)(3)
// 1,2,3,{name: 'jsChen'}
```

::: 重点

1. 把函数存为变量 fn

2. 拿到剩余参数

3. 拿到参数

4. 使用 apply 执行函数

5. 返回结果
:::

## 相关链接

[《JavaScript深入之call和apply的模拟实现 #11》](https://github.com/mqyqingfeng/Blog/issues/11)