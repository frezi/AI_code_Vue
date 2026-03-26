/**
 * 通用工具函数库
 * 包含常用的校验规则和数据转换器
 */

// ==================== 校验规则 ====================

/**
 * 校验规则对象
 */
export const validate = {
  /**
   * 验证邮箱格式
   * @param {string} email - 邮箱地址
   * @returns {boolean} 是否为有效邮箱
   */
  email(email) {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return reg.test(email);
  },

  /**
   * 验证手机号格式（中国大陆）
   * @param {string} phone - 手机号码
   * @returns {boolean} 是否为有效手机号
   */
  phone(phone) {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
  },

  /**
   * 验证身份证号码（中国大陆）
   * @param {string} idCard - 身份证号码
   * @returns {boolean} 是否为有效身份证号
   */
  idCard(idCard) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(idCard);
  },

  /**
   * 验证URL格式
   * @param {string} url - URL地址
   * @returns {boolean} 是否为有效URL
   */
  url(url) {
    const reg = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return reg.test(url);
  },

  /**
   * 验证密码强度（至少8位，包含大小写字母和数字）
   * @param {string} password - 密码
   * @returns {boolean} 是否符合强度要求
   */
  password(password) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return reg.test(password);
  },

  /**
   * 验证是否为纯数字
   * @param {string} value - 待验证值
   * @returns {boolean} 是否为纯数字
   */
  number(value) {
    const reg = /^\d+$/;
    return reg.test(value);
  },

  /**
   * 验证是否为整数
   * @param {string|number} value - 待验证值
   * @returns {boolean} 是否为整数
   */
  integer(value) {
    const reg = /^-?\d+$/;
    return reg.test(String(value));
  },

  /**
   * 验证是否为小数
   * @param {string|number} value - 待验证值
   * @returns {boolean} 是否为小数
   */
  decimal(value) {
    const reg = /^-?\d+\.\d+$/;
    return reg.test(String(value));
  },

  /**
   * 验证中文字符
   * @param {string} value - 待验证值
   * @returns {boolean} 是否为中文
   */
  chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/;
    return reg.test(value);
  },

  /**
   * 验证邮政编码
   * @param {string} code - 邮政编码
   * @returns {boolean} 是否为有效邮政编码
   */
  postalCode(code) {
    const reg = /^[1-9]\d{5}$/;
    return reg.test(code);
  },

  /**
   * 验证IP地址
   * @param {string} ip - IP地址
   * @returns {boolean} 是否为有效IP地址
   */
  ip(ip) {
    const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    return reg.test(ip);
  },

  /**
   * 验证是否为空
   * @param {*} value - 待验证值
   * @returns {boolean} 是否为空
   */
  isEmpty(value) {
    return value === null || value === undefined || value === '' || 
           (Array.isArray(value) && value.length === 0) ||
           (typeof value === 'object' && Object.keys(value).length === 0);
  }
};

// ==================== 数据转换器 ====================

/**
 * 日期格式化
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @param {string} format - 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 金额格式化（千分位）
 * @param {number|string} amount - 金额
 * @param {number} decimals - 小数位数，默认2位
 * @param {string} symbol - 货币符号，默认 '¥'
 * @returns {string} 格式化后的金额字符串
 */
export function formatMoney(amount, decimals = 2, symbol = '¥') {
  if (amount === null || amount === undefined || amount === '') return '';
  
  const num = Number(amount);
  if (isNaN(num)) return '';

  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return symbol + (parts[1] ? `${integerPart}.${parts[1]}` : integerPart);
}

/**
 * 手机号脱敏
 * @param {string} phone - 手机号
 * @returns {string} 脱敏后的手机号
 */
export function maskPhone(phone) {
  if (!phone) return '';
  return String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 身份证号脱敏
 * @param {string} idCard - 身份证号
 * @returns {string} 脱敏后的身份证号
 */
export function maskIdCard(idCard) {
  if (!idCard) return '';
  return String(idCard).replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
}

/**
 * 邮箱脱敏
 * @param {string} email - 邮箱地址
 * @returns {string} 脱敏后的邮箱
 */
export function maskEmail(email) {
  if (!email) return '';
  return String(email).replace(/(.{2}).*(@.*)/, '$1***$2');
}

/**
 * 文件大小格式化
 * @param {number} bytes - 字节数
 * @param {number} decimals - 小数位数，默认2位
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * 数字补零
 * @param {number|string} num - 数字
 * @param {number} length - 总长度，默认2位
 * @returns {string} 补零后的字符串
 */
export function padZero(num, length = 2) {
  return String(num).padStart(length, '0');
}

/**
 * 首字母大写
 * @param {string} str - 字符串
 * @returns {string} 首字母大写的字符串
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 驼峰转下划线
 * @param {string} str - 驼峰命名字符串
 * @returns {string} 下划线命名字符串
 */
export function camelToSnake(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 下划线转驼峰
 * @param {string} str - 下划线命名字符串
 * @returns {string} 驼峰命名字符串
 */
export function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * 去除字符串空格
 * @param {string} str - 字符串
 * @param {string} type - 类型：all-全部，left-左侧，right-右侧，both-两侧
 * @returns {string} 处理后的字符串
 */
export function trim(str, type = 'both') {
  if (!str) return '';
  
  switch (type) {
    case 'all':
      return str.replace(/\s+/g, '');
    case 'left':
      return str.replace(/^\s+/, '');
    case 'right':
      return str.replace(/\s+$/, '');
    case 'both':
    default:
      return str.trim();
  }
}

/**
 * 深拷贝
 * @param {*} obj - 待拷贝对象
 * @returns {*} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloneObj = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
}

/**
 * 防抖函数
 * @param {Function} func - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} func - 需要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(func, delay = 300) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 生成随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
export function randomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 获取URL参数
 * @param {string} name - 参数名
 * @param {string} url - URL地址，默认为当前页面URL
 * @returns {string|null} 参数值
 */
export function getUrlParam(name, url = window.location.href) {
  const reg = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
  const match = url.match(reg);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * 对象转URL参数
 * @param {Object} obj - 参数对象
 * @returns {string} URL参数字符串
 */
export function objectToQuery(obj) {
  if (!obj || typeof obj !== 'object') return '';
  
  return Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

/**
 * URL参数转对象
 * @param {string} query - URL参数字符串
 * @returns {Object} 参数对象
 */
export function queryToObject(query) {
  if (!query) return {};
  
  const params = {};
  const pairs = query.replace(/^\?/, '').split('&');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
}

// 默认导出所有工具
export default {
  validate,
  formatDate,
  formatMoney,
  maskPhone,
  maskIdCard,
  maskEmail,
  formatFileSize,
  padZero,
  capitalize,
  camelToSnake,
  snakeToCamel,
  trim,
  deepClone,
  debounce,
  throttle,
  randomString,
  getUrlParam,
  objectToQuery,
  queryToObject
};
