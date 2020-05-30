# 计算机网络


# 同源策略，跨域规避方案

## cookie

###  一、一级域名相同 -- 拿 `cookie`

`A` 网页 `https://xiaoai.dankal.cn` ， `B` 网页 `https://xiaoai-admin.dankal.cn` ， `C` 网页 `https://dankal.cn` ， `AB` 网页都是二级域名 ， `C` 网页是顶级域名

3 个分别窗口访问 `A` 、 `B` 、 `C` ， 或者 互相嵌入 `iframe`

通过设置 `cookie` 规避跨域

```js
// 在任意页面
document.cookie = "test=i'm test cookie;domain=dankal.cn"
```

```js
// 在任意页面
document.cookie
// test=i'm test cookie
```

## iframe

### 二、 一级域名相同 -- 内嵌 `iframe` -- 拿 `DOM` 

`A` 网页 `https://xiaoai.dankal.cn` ， `iframe` 页面 `https://xiaoai-admin.dankal.cn` ，

设置 `A` 页面和 `iframe` 页面的 `domain` 为顶级域名 `dankal.cn`

```js
//  `A` 页面和 `iframe` 页面
document.domain = 'dankal.cn'
```


```js
// `A` 页面
document.getElementById('iframeId').contentWindow.document
// # document
```

```js
// iframe 页面
window.parent.document
// # document
```


### 三、 给iframe设置hash

```js
// iframe
window.onhashchange = function (){
  console.log(window.location.hash)
}
```

```js
// 页面
document.getElementById('xxx').src += '#name=ccc'
```

### 四、postMessage

窗口之间通讯，主窗口和iframe之间通讯

### 五、LocalStorage

通过 postMessage 实现

## Ajax

### jsonp

### webSocket

### cors

#### 非简单请求

凡是不同时满足下面面两个条件，就属于非简单请求。

```h
1) 请求方法是以下三种方法之一：

HEAD
GET
POST

2）HTTP的头信息不超出以下几种字段：

Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

node 设置 cors

```js
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,GET,OPTION')
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Access-Control-Allow-Credentials,Accept');
  res.header('Access-Control-Allow-Credentials','true')
  if (req.method == "OPTIONS") {
    res.send(200);
  }
  else {
    next();
  }
})
```

## 相关链接

