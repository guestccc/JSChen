# 笔试题

## 1. 容器包含若干浮动元素时如何清理(包含)浮动

1. 使用 clear 

<div style="background:red" class="baba">
  <div 
    style="background:yellow;width:100px;height:100px;float:right">
  </div>
  <span>asdfsdf</span>
</div>

<style type="text/css">
.baba:after{
  content:'';
  display:block;
  clear:both;
}
</style>

```html
<div style="background:red" class="baba">
  <div 
    style="background:yellow;width:100px;height:100px;float:right">
  </div>
  <span>asdfsdf</span>
</div>

<style type="text/css">
.baba:after{
  content:'';
  display:block;
  clear:both;
}
</style>
```
2. 使用 块级格式化上下文



<div style="background:red" class="baba2">
  <div 
    style="background:yellow;width:100px;height:100px;float:left">
  </div>
  <span>asdfsdf</span>
</div>

<style type="text/css">
.baba2{
  display:flow-root;
}
</style>

```html
<div style="background:red" class="baba2">
  <div 
    style="background:yellow;width:100px;height:100px;float:left">
  </div>
  <span>asdfsdf</span>
</div>

<style type="text/css">
.baba2{
  display:flow-root;
}
</style>
```

## 前端性能


- 网络传输性能

- 页面渲染性能

- JS阻塞性能

### Connection: keep-alive

保持连接特性

http 1.1 开始才有这种持久连接，tpc 连接(三次握手)可以持久化，不需要每次发起请求都得做一次 tcp 连接

### Cache-Control（控制缓存）


### Expires（缓存校验）

日期，与当前客户端对比，大于当前时间为未过期，下于当前时间为过期

来张两年前我看完懵逼的一张图，现在是真的懂了呀

### Last-Modified / If-Modified-Since

第一次请求，看 response headers 的 last-modified ，标示着 该资源最后被修改的时间,接口返回 200

第二次请求，看 request headers 的 If-Modified-Since ， 标示着第一次请求获取到的 last-modified 如果该时间后没有被修改，自动返回 304 

### Etag / If-None-Match(缓存校验)

第一次请求，看 response headers 的 Etag ，存放着服务器端生成的一个序列值.

![navigation timing监测指标图](/assets/img/navigation_timing监测指标图.png)

::: tip 流程
重定向 → 拉取缓存 → DNS查询 → 建立TCP链接 → 发起请求 → 接收响应 → 处理HTML元素 → 元素加载完成
:::

### 请求流程

![请求流程.png](/assets/img/请求流程.png)

1. `from memory cache` 和 `from disk cache`

资源请求，`from memory cache`指缓存来自内存， `from disk cache`指缓存来自硬盘

2. 控制缓存存放位置的 `Etag`

如果有 `Etag` 字段，那么浏览器就会将本次缓存写入硬盘中。
