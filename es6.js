import {a,b,changeNode} from './node.js'
import moduleName from './node.js'

console.log(a.name,'node')
a.name = 'ccc'
console.log(a.name,b,'node')

console.log(moduleName,'moduleName')

window.changeNode = function () {
  changeNode()
  console.log(b,'back_b')
  b= 4
  console.log(b,'back_b')
}


function debounce (fn,time,immediate) {
  let timer = null
  let result
  return function (...val){
    clearTimeout(timer)
    if(immediate){
      if (!timer) {
        result = fn.apply(this,val)
      }
      timer = setTimeout(() => {
        timer = null
      },time * 1000)
    } else {
      timer = setTimeout(() => {
        result = fn.apply(this,val)
      },time * 1000)
    }
    return result
  }
}

function throttle(fn,s){
  let result
  let start = 0
  return function (...val){
    if(+new Date > start + s*1000) {
      result = fn.apply(this,val)
      start = + new Date()
    }
    return result
  }
}

Function.jschenApply = function (context,arr){
  context = context || window
  context.fn = this
  return context.fn(...arr)
}


Function.jschenApply = function (context,arr){
  context = context || window
  context.fn = this
  let args
  for (let i = 0; i < arr.length; i+=1) {
    args.push('arr[' + i + ']')
  }
  let result = eval('context.fn('+ args +')')
  delete context.fn
  return result
}

Function.prototype.jschenCall = function(context){
  context = context || window
  context.fn = this
  let result
  let args
  for (let i = 0; i < arguments.length; i+=1) {
    if(!i) return
    args.push('arguments[' + i +']')
  }
  result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}

Function.prototype.jschenBind = function(context){
  let self = this
  let args1 = Array.prototype.slice.call(arguments,1)
  return function(){
    let args2 = Array.prototype.slice.call(arguments)
    return self.apply(context,args1.concat(args2))
  }
}
