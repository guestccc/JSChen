# event-loop 事件循环

## 进程

## 线程

## 宏任务

## 微任务


| 宏任务                | 浏览器 | node | 备注                               |
| --------------------- | ------ | ---- | ---------------------------------- |
| setTimeout            | ✅     | ✅   |                                    |
| setInterval           | ✅     | ✅   |                                    |
| setImmediate          | ❌     | ✅   |                                    |
| requestAnimationFrame | ✅     | ❌   | 请求下次重绘前调用回调函数更新动画 |
| I/O                   | ✅     | ✅   |                                    |

| 微任务           | 浏览器 | node | 备注                      |
| ---------------- | ------ | ---- | ------------------------- |
| process.nextTick | ❌     | ✅   |                           |
| promise          | ✅     | ✅   |                           |
| MutationObserver | ✅     | ❌   | 监听指定 dom 更改后的回调 |