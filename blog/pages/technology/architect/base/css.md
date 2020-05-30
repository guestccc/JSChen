# css 基础篇

## BFC 块级格式化上下文

块级格式化上下文： `东西` （指的就是这个抽象的 `东西` ）通过设置特定属性而成

**变身块级格式化上下文**

[MDN--格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

::: tip 常用的
- html
- float
- position: fixed/absolute
- display: inline-block/table-cell/table-caption ...
- overflow 值不为 visible 的块元素
- **display: flow-root**(创建无副作用的BFC)
- contain: layout/content/paint
- **display: flex/inline-flex 的子元素**
- **display: grid/inline-grid 的子元素**
:::

特点：内部元素不会影响到外部元素，

## 层叠上下文 stacking context

- 层叠上下文： `东西` （指的就是这个抽象的 `东西` ）通过设置特定属性而成

- 层叠水平：`位置`（指定就是 `所有元素` 包括 `层叠上下文` 这个东西的 `位置`）

- 层叠顺序：`顺序`（指定就是 `所有元素` 包括 `层叠上下文` 这个东西 `位置`的顺序，也就是 `规则` ）


**变身为层叠上下文**

[MDN--层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

**层叠顺序**

- 高层叠低层

- 同层后来居上

**七层顺序**

1. 层叠上下文

2. 负z-index(这个元素本身也是一个层叠上下文，是 `1` 的子元素、子层叠上下文)

3. block

4. float

5. inline、inline-block

6. z-index:auto/0 

  * z-index:auto

  * z-index:0(这个元素本身也是一个层叠上下文，是 `1` 的子元素、子层叠上下文)

  * opacity/transform/mix-blend-mode/filter/isolation:isolate/will-change/flex子元素

7. z-index:正(这个元素本身也是一个层叠上下文，是 `1` 的子元素、子层叠上下文)


## 网格布局 grid (不常用)

[阮一峰--CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## 盒模型

- 标准盒子模型
- 怪异盒子模型（ie）

```html
<div style="margin:10px;border:10px solid yellow;padding:10px;width:100px;height:100px;background:red;"></div>
```
<div style="width:100px;height:100px;background:red;"> 100 * 100</div>
<div style="margin:10px;border:10px solid yellow;padding:10px;width:100px;height:100px;background:red;box-sizing:border-box"></div>

上面这个盒子在w3c标准盒子模型和IE的怪异盒子模型（ie）下面分别的宽度

```css
标准盒子模型：总宽度 = content 100px + border 10px * 2 + padding 10px * 2 + margin 10px * 2 //160px
怪异盒子模型: 总宽度 = (content 60px + border 10px * 2 + padding 10px * 2) +  margin 10px * 2// 120px
```

可以通过 css3 属性 `box-sizing` 来切换

也就是说 `ie` 盒模型相当于 `标准盒模型` 设置了 `box-sizing: border-box;`

::: tip box-sizing
`box-sizing： content-box || border-box`

`border-box` 将使用怪异盒子模型（ie）
当怪异盒子模型（ie）的宽度小于 `border+padding` 的宽度的时候， `content width` 将变为 `0` ，盒子的宽度会被 `border + padding` 的总宽度撑开
:::




## 弹性布局 flex

传统的 block 元素，采用的是垂直方向布局，inline 元素水平方向布局，而 flex 内在没有方向限制

## containing block 包含块

子元素的百分比，比较的是父元素的 `containing block`


<style>
    .parent{
        padding:50px;
        border:50px solid green;
        width:200px;
        height:200px;
        background:red;
    }
    .child{
        width:80%;
        height:80%;
        background:yellow;
    }
    .parent--e1{
        box-sizing:border-box;
    }
    .parent--e2{
        box-sizing:content-box;
    }
    .parent--e3{
        position:relative;
        box-sizing:border-box;
    }
    .child--e3{
        position:absolute;
    }
    .parent--e4{
        position:relative;
        box-sizing:content-box;
    }
</style>

1. containing block = 宽高减去padding和border = 0 0
<div class="parent parent--e1">
 <div class="child"></div>
</div>


```html
<div class="parent parent--e1">
 <div class="child"></div>
</div>
<style>
    .parent{
        padding:50px;
        border:50px solid green;
        width:200px;
        height:200px;
        background:red;
    }
    .child{
        width:80%;
        height:80%;
        background:yellow;
    }
    .parent--e1{
        box-sizing:border-box;
    }
    .parent--e2{
        box-sizing:content-box;
    }
    .parent--e3{
        position:relative;
        box-sizing:border-box;
    }
    .child--e3{
        position:absolute;
    }
    .parent--e4{
        position:relative;
        box-sizing:content-box;
    }
</style>
```


2. containing block = 宽高 = 200 200

<div class="parent parent--e2">
 <div class="child"></div>
</div>

```html
<div class="parent parent--e2">
 <div class="child"></div>
</div>
```


3. containing block = padding area = 宽高减去border = 100 100（特殊情况）

<div class="parent parent--e3">
 <div class="child child--e3"></div>
</div>

```html
<div class="parent parent--e3">
 <div class="child child--e3"></div>
</div>
```
4. containing block = padding area = 宽高加padding = 250 250（特殊情况）

<div class="parent parent--e4">
 <div class="child child--e3"></div>
</div>

```html
<div class="parent parent--e4">
 <div class="child child--e3"></div>
</div>
```

## 选择器

- id选择器
- 标签选择器
- class选择器
- 相邻选择器
- 子选择器
- 后代选择器
- 通配符选择器
- 属性选择器
- 伪类选择器

## 清除浮动

1. 最后一个元素设置 `display:block;clear:both`

2. 设置父元素为 `BFC`

## 动画

## BEM 命名规范

Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

<!-- ## 全局过滤

```html
<style>
html{
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
-webkit-filter: grayscale(100%);
}
</style>
``` -->

## 渐变画三角

<style>
#grad1 {
    height: 200px;
	width:50px;
    background-color: red; /* 不支持线性的时候显示 */
    background:
        linear-gradient(135deg, transparent 17px, pink 0) left top,
        linear-gradient(-135deg, transparent 17px, pink 0) right top,
        linear-gradient(-45deg, transparent 17px, pink 0) right bottom,
        linear-gradient(45deg, transparent 17px, pink 0) left bottom;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
</style>
<div id="grad1"></div>

```html
<style>
#grad1 {
    height: 200px;
	width:50px;
    background-color: red; /* 不支持线性的时候显示 */
    background:
        linear-gradient(135deg, transparent 17px, pink 0) left top,
        linear-gradient(-135deg, transparent 17px, pink 0) right top,
        linear-gradient(-45deg, transparent 17px, pink 0) right bottom,
        linear-gradient(45deg, transparent 17px, pink 0) left bottom;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
</style>
<div id="grad1"></div>
```

<div class="parent1">
  <div class="child1">
  </div>
</div>
<style>
.parent1 {
    width:100px;
    height:100px;
    position: relative; 
    background:yellow;
}
.child1 {
    width: 50px;
    height: 10px;
    position: absolute;
    background:red;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
