/**
 * @name 获取当前年的临界值，返回
 *
 * @returns [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028]
 */

const produceYearList = function () {
  let date = new Date(new Date().getTime()).getFullYear();
  return Array.from({
    length: 20
  }).reduce((arr, val, i) => {
    i < 11 ? arr.unshift(date - i) : arr.push(date + i - 10) + "年"
    return arr
  }, [])
}

/**
 *
 * @name 数组转树结构
 * @param {* 数组 } list
 * @param {* 字符串：子节点的KEY名} id_Key
 * @param {* 字符串：父节点的KEY名} parent_Key
 * @returns {* 树状结构}
 */
const parserTree = function (list, id_Key, parent_Key) {
  if (list.length == 0) return list
  let root = null;
  if (list && list.length) {
    root = {
      parentId: null,
      children: []
    };
    root[id_Key] = 0
    const group = {};
    for (let index = 0; index < list.length; index += 1) {
      if (list[index][parent_Key] !== null && list[index][parent_Key] !== undefined) {
        if (!group[list[index][parent_Key]]) {
          group[list[index][parent_Key]] = [];
        }
        group[list[index][parent_Key]].push(list[index]);
      }
    }

    const queue = [];
    queue.push(root);
    while (queue.length) {
      const node = queue.shift();
      node.children = group[node[id_Key]] && group[node[id_Key]].length ? group[node[id_Key]] : null;
      if (node.children) {
        queue.push(...node.children);
      }
    }
  }
  return root.children
}

/**
 *
 * @name 生成斐波那契数组
 * @param {* 生成多少个数组元素} num
 * @returns {* 数组}
 */
const parserFBLQ = function (num) {
  let n = Math.ceil(
    Math.log(num * Math.sqrt(5) + 1 / 2) /
    Math.log((Math.sqrt(5) + 1) / 2)
  );
  return Array.from({ length: n }).reduce(
    (arr, val, i) => {
      return arr.concat(i > 1 ? arr[i - 1] + arr[i - 2] : i)
    },
    [2018]
  );
};


/**
 *
 * @name KEY值相同，分为一组
 * @param {* 数组} arr
 * @param {* KEY名} key
 * @returns {* 数组}
 */
const parserKey = function (arr, key) {
  let map = {},
    dest = [];
  for (let i of arr) {
    if (!map[i[key]]) {
      dest.push({
        [key]: i[key],
        data: [i]
      });
      map[i[key]] = i;
    } else {
      for (let item of dest) {
        if (item[key] == i[key]) {
          item.data.push(i);
          break;
        }
      }
    }
  }
  return dest;
}

/**
 *
 * @name 数组分组
 * @param {* 数组本身} _array
 * @param {* 几个为一组} _size
 * @returns {* 数组}
 */
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
/**
 *
 * @param {* 时间戳} date
 * @returns {* 时间字符串:2019-07-08}
 */
const convertDate = function (date) {
  let dateObject = new Date(date);
  let m = dateObject.getMonth() + 1;
  let d = dateObject.getDate();
  if (m < 10) {
    m = "0" + m
  }
  if (d < 10) {
    d = "0" + d
  }
  let parseDate = (dateObject.getFullYear()) + "-" +
    m + "-" + d
  return parseDate
};


/**
 *
 * @name 时间转换
 * @param {* 时间戳} time
 * @param {* 格式：yyyy-MM-dd hh:mm:ss} cFormat
 * @returns
 */
const parseTime = function (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 *
 *
 * @export
 * @param {*} time
 * @param {*} option
 * @returns
 */
const formatTime = function (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

const getQueryObject = function (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
const getByteLen = function (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

const cleanArray = function (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

const param = function (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

const param2Obj = function (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

const html2Text = function (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

const objectMerge = function (target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

const scrollTo = function (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

//class切换
const toggleClass = function (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

const pickerOptions = [{
  text: '今天',
  onClick(picker) {
    const end = new Date()
    const start = new Date(new Date().toDateString())
    end.setTime(start.getTime())
    picker.$emit('pick', [start, end])
  }
},
{
  text: '最近一周',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
},
{
  text: '最近一个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
},
{
  text: '最近三个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}
]

//过滤路由表，动态修改component
var filterRouter = (data, mapRouters) => {
  const map = {
    ...mapRouters
  }
  data.forEach((n, i) => {
    n.component && (n.component = map[n.component])
    n["children"] && filterRouter(n["children"], map);
  })

  return data
}

/**
 *
 * @param {* 数组} nodes
 * @param {* ID名} id
 * @param {* children名} children
 * @param {*} [items=[]]
 */
var parser = (nodes, id, children, items = []) => {
  if (nodes.length == 0) return
  nodes.forEach((n, i) => {
    const _items = [...items];
    _items.push(n[id]);
    n.items = _items;
    n[children] && parser(n[children], id, children, [...n.items]);
  })
}
//根据nodeId 递归数据 找出对应的那一条数据
var getNode = (json, menuId, nodeId) => {
  let node;
  for (let i = 0; i < json.length; i++) {
    if (node) {
      break;
    }
    let obj = json[i];
    if (!obj || !obj[menuId]) {
      continue;
    }
    if (obj[menuId] == nodeId) {
      node = {
        ...obj
      };
      break;
    } else {
      if (obj.children && obj.children.length > 0) {
        // parentNode = obj;
        return getNode(obj.children, menuId, nodeId);
      } else {
        continue;
      }
    }
  }
  return node
}

function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

//Set去重，然後转成数組 
function uniqueArr(arr) {
  return Array.from(new Set(arr))
}
