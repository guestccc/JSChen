
# 类型判断

## 应用场景： 

- 单选、多选 -- 判断传入数据的类型，Array多选，Object、Number、String。。。单选
- 函数接收参数需要检验数据类型

|原始类型|子类型|备注|
|---|---|--|
|undefined|||
|Null|||
|Number|||
||Infinity||
||NaN||
|String|||
|Boolean|||
|Symbol||es6|
|Object|Array||
||Date||
||Function||
||RegExp||
||Error||
||NaN||
||Math||
||JSON||
||...||

### 四种判断类型的方法:

1. typeof
2. constructor
3. instanceof
4. Object.prototype.toString

**typeof**

```js
function type(i) {
  if(i == void 0) {// ie6中，typeof null === 'object',toString = [object object]
    return i + ''
  }
  return typeof i !== 'object' ? typeof i : Object.prototype.toString.call(i).toLowerCase().replace('[object ','').replace(']','')
}
```

**instanceof**

> `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```
