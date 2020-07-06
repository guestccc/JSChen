
阿里云
chenchengcheng@fanggeek.onaliyun.com
bqTl|SY1b4C}yXQBq!A2jLnnYg4p)UWn

初始化相关
permission route thor-menu position


### 代码规范

1. 三元运算符，缩进

```js
var a = true ? 1 : 0
```

2. 没有内容的 选项/函数/style/script/template/删除

3. 判断语句中尽量剪短

```js
// bad
if(arr.some(item => { return item.xxxxxId === xxxxxId})) {

}
```
```js
// good
let someXxxId = arr.some(item => { return item.xxxxxId === xxxxxId})

if(someXxxId) {

}
```

4. 