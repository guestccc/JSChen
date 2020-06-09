
# 路由

三种

- hash
- history
- abstract

## hash

- hash 其实就是锚点，跳转到锚点指定的位置而不会真的跳转页面

- 通过监听 hashchange 做页面更换处理

## history

- 利用 html5 history 维护一个页面栈

- 路由跳转实际上并不是真的跳转页面，需要在服务端配置重定向

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="jschen"></div>
  <ul>
    <li href="/cc1">ccc1</li>
    <li href="/cc2">ccc2</li>
    <li href="/cc3">ccc3</li>
  </ul>
</body>
<script>
  class Router {
    constructor(){
      this.router = {}
    }
    push(url,query){
      history.pushState({query},'title_cc1',url)
      this.router[url] && this.router[url]()
    }
    replace(url,query){
      history.replaceState({query,},'title_cc1',url)
      this.router[url] && this.router[url]()
    }
    init(...val){
      this.replace(...val)
    }
    setConfig(optionList){
      optionList.forEach(pageOption => {
        this.router[pageOption.router] = pageOption.cb // 这个cb就是用来切换页面的 
      });
    }
  }
  let router = new Router()
  router.setConfig([
    {
      router:'/html.html',
      cb:() => {console.log('加载主页')}
    },
    {
      router:'/cc1',
      cb:() => {console.log('加载cc1')}
    },
    {
      router:'/cc2',
      cb:() => {console.log('加载cc2')}
    },
    {
      router:'/cc3',
      cb:() => {console.log('加载cc3')}
    }
  ])
  router.init(location.pathname,{name:'我是主页'}) // 这里很重要哈，因为history模式下跳转的页面实际上是不存在的，如果用户在其他路由下刷新页面那么nginx接到的请求页面是找不到的，所以这里需要在nginx配置重定向
  document.querySelector('ul').addEventListener('click',(e) => {
    console.log(e,'e');
    e.preventDefault()
    console.log(e.target.getAttribute('href'));
    
    router.push(e.target.getAttribute('href'),{name:'asdf'})
  })
</script>
</html>
```


## abstract

这个是在 node.js 跑的
