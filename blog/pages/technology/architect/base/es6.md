# ECMAScript 6 

## Reflect

Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。

1. 定义属性
```js
Object.defineProperty(target, property, attributes)
Reflect.defineProperty(target, property, attributes)

```
2. 错误捕捉
```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}


// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```
3. 让Object操作都变成函数行为
```js
'b' in obj
Reflect.has(obj,'b')

delete obj.b
Reflect.deleteProperty(obj,'b')
```

4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。

## Proxy

代理拦截器，可以对外界的访问进行过滤和改写。

```js
var obj = new Proxy(
  {},
  {
    get: function(target, propKey, receiver) {
      console.log(`getting ${propKey}!`)
      return Reflect.get(target, propKey, receiver)
    },
    set: function(target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`)
      return Reflect.set(target, propKey, value, receiver)
    }
  }
)
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```


- get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
- has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
- deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。



## set

## class

```js
class JSChen{
  name = 'jschen' // 实例属性的新写法，相当于直接在 constructor 里写 this.name = 'jschen'
  constructor (age) { // 构造函数 JSChen.prototype.constructor
    this.age = age
    this.getName = this.getName.bind(this)
  }
  getName(){ // 原型中的函数 JSChen.prototype.getName
    return this.name
  }
  static sayHi(){ // 静态方法 JSChen.sayHi
    console.log('我是静态方法，我定义在类对象上')
  }
}
```

### 私有属性

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

### 私有属性的提案 

[tc39 -- github](https://github.com/tc39/proposal-private-methods)

这个提案是第 Stage 3

也就是说如果用 babel-loader 的话 也是用的Stage 3

为class加了私有属性。方法是在属性名之前，使用#表示。

```js
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
```
### new.target

拿到 new 调用类

如果是子类继承父类，父类用了 new.target 那么 new.target 返回的是子类

### @decorator

类的装饰器

```js
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

方法的装饰器

```js
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}

function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```
## Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

## Generator

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

## async

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

1. 内置执行器。
2. 更好的语义。
3. 返回值是 Promise。