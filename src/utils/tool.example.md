# Tool.js 使用示例文档

本文档提供了 `tool.js` 中各种工具函数的使用示例。

## 目录

- [校验规则](#校验规则)
- [数据转换器](#数据转换器)
- [实用工具](#实用工具)

---

## 校验规则

### 1. 邮箱验证

```javascript
import { validate } from '@/utils/tool';

// 验证邮箱格式
validate.email('test@example.com'); // true
validate.email('invalid-email'); // false
```

### 2. 手机号验证

```javascript
import { validate } from '@/utils/tool';

// 验证中国大陆手机号
validate.phone('13800138000'); // true
validate.phone('12345678901'); // false
```

### 3. 身份证号验证

```javascript
import { validate } from '@/utils/tool';

// 验证身份证号码
validate.idCard('110101199001011234'); // true
validate.idCard('123456'); // false
```

### 4. URL验证

```javascript
import { validate } from '@/utils/tool';

// 验证URL格式
validate.url('https://www.example.com'); // true
validate.url('not-a-url'); // false
```

### 5. 密码强度验证

```javascript
import { validate } from '@/utils/tool';

// 验证密码（至少8位，包含大小写字母和数字）
validate.password('Abc12345'); // true
validate.password('abc123'); // false
```

### 6. 其他验证

```javascript
import { validate } from '@/utils/tool';

// 验证纯数字
validate.number('12345'); // true
validate.number('123a45'); // false

// 验证整数
validate.integer('-123'); // true
validate.integer('12.5'); // false

// 验证小数
validate.decimal('12.5'); // true
validate.decimal('12'); // false

// 验证中文
validate.chinese('你好'); // true
validate.chinese('hello'); // false

// 验证邮政编码
validate.postalCode('100000'); // true
validate.postalCode('000000'); // false

// 验证IP地址
validate.ip('192.168.1.1'); // true
validate.ip('999.999.999.999'); // false

// 验证是否为空
validate.isEmpty(''); // true
validate.isEmpty(null); // true
validate.isEmpty([]); // true
validate.isEmpty({}); // true
validate.isEmpty('hello'); // false
```

---

## 数据转换器

### 1. 日期格式化

```javascript
import { formatDate } from '@/utils/tool';

// 默认格式：YYYY-MM-DD HH:mm:ss
formatDate(new Date()); // '2026-03-26 11:15:30'

// 自定义格式
formatDate(new Date(), 'YYYY-MM-DD'); // '2026-03-26'
formatDate(new Date(), 'YYYY/MM/DD HH:mm'); // '2026/03/26 11:15'

// 使用时间戳
formatDate(1711425330000); // '2026-03-26 11:15:30'

// 使用日期字符串
formatDate('2026-03-26'); // '2026-03-26 00:00:00'
```

### 2. 金额格式化

```javascript
import { formatMoney } from '@/utils/tool';

// 默认格式（人民币，2位小数）
formatMoney(1234567.89); // '¥1,234,567.89'

// 自定义小数位数
formatMoney(1234567.89, 0); // '¥1,234,568'
formatMoney(1234567.89, 3); // '¥1,234,567.890'

// 自定义货币符号
formatMoney(1234567.89, 2, '$'); // '$1,234,567.89'
formatMoney(1234567.89, 2, ''); // '1,234,567.89'
```

### 3. 数据脱敏

```javascript
import { maskPhone, maskIdCard, maskEmail } from '@/utils/tool';

// 手机号脱敏
maskPhone('13800138000'); // '138****8000'

// 身份证号脱敏
maskIdCard('110101199001011234'); // '110101********1234'

// 邮箱脱敏
maskEmail('test@example.com'); // 'te***@example.com'
```

### 4. 文件大小格式化

```javascript
import { formatFileSize } from '@/utils/tool';

formatFileSize(1024); // '1 KB'
formatFileSize(1048576); // '1 MB'
formatFileSize(1073741824); // '1 GB'
formatFileSize(1234567890); // '1.15 GB'
formatFileSize(1234567890, 0); // '1 GB'
```

### 5. 字符串处理

```javascript
import { 
  padZero, 
  capitalize, 
  camelToSnake, 
  snakeToCamel, 
  trim 
} from '@/utils/tool';

// 数字补零
padZero(5); // '05'
padZero(5, 3); // '005'

// 首字母大写
capitalize('hello'); // 'Hello'

// 驼峰转下划线
camelToSnake('userName'); // 'user_name'
camelToSnake('getUserInfo'); // 'get_user_info'

// 下划线转驼峰
snakeToCamel('user_name'); // 'userName'
snakeToCamel('get_user_info'); // 'getUserInfo'

// 去除空格
trim('  hello  '); // 'hello'
trim('  hello  ', 'left'); // 'hello  '
trim('  hello  ', 'right'); // '  hello'
trim('  h e l l o  ', 'all'); // 'hello'
```

---

## 实用工具

### 1. 深拷贝

```javascript
import { deepClone } from '@/utils/tool';

const original = {
  name: '张三',
  age: 25,
  hobbies: ['reading', 'coding'],
  address: {
    city: '北京',
    district: '朝阳区'
  }
};

const cloned = deepClone(original);
cloned.address.city = '上海';

console.log(original.address.city); // '北京'（原对象未被修改）
console.log(cloned.address.city); // '上海'
```

### 2. 防抖函数

```javascript
import { debounce } from '@/utils/tool';

// 搜索输入框防抖
const handleSearch = debounce((keyword) => {
  console.log('搜索:', keyword);
  // 执行搜索逻辑
}, 500);

// 在 Vue 组件中使用
export default {
  methods: {
    onInput(event) {
      handleSearch(event.target.value);
    }
  }
};
```

### 3. 节流函数

```javascript
import { throttle } from '@/utils/tool';

// 滚动事件节流
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
  // 执行滚动逻辑
}, 200);

window.addEventListener('scroll', handleScroll);
```

### 4. 随机字符串生成

```javascript
import { randomString } from '@/utils/tool';

// 生成8位随机字符串
randomString(); // 'aB3xY9Zk'

// 生成指定长度的随机字符串
randomString(16); // 'aB3xY9ZkLm4nP7Qr'

// 用于生成唯一ID
const uniqueId = `user_${randomString(12)}`;
```

### 5. URL参数处理

```javascript
import { getUrlParam, objectToQuery, queryToObject } from '@/utils/tool';

// 获取URL参数
// 假设当前URL为: https://example.com?id=123&name=张三
getUrlParam('id'); // '123'
getUrlParam('name'); // '张三'
getUrlParam('age'); // null

// 对象转URL参数
const params = { id: 123, name: '张三', age: 25 };
objectToQuery(params); // 'id=123&name=%E5%BC%A0%E4%B8%89&age=25'

// URL参数转对象
const query = 'id=123&name=%E5%BC%A0%E4%B8%89&age=25';
queryToObject(query); 
// { id: '123', name: '张三', age: '25' }
```

---

## Vue 组件中的完整使用示例

```vue
<template>
  <div class="user-form">
    <h2>用户注册</h2>
    
    <div class="form-group">
      <label>邮箱：</label>
      <input 
        v-model="form.email" 
        @blur="validateEmail"
        placeholder="请输入邮箱"
      />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label>手机号：</label>
      <input 
        v-model="form.phone" 
        @blur="validatePhone"
        placeholder="请输入手机号"
      />
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </div>

    <div class="form-group">
      <label>密码：</label>
      <input 
        type="password"
        v-model="form.password" 
        @blur="validatePassword"
        placeholder="至少8位，包含大小写字母和数字"
      />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <div class="form-group">
      <label>搜索：</label>
      <input 
        v-model="searchKeyword" 
        @input="handleSearch"
        placeholder="输入关键词搜索"
      />
    </div>

    <button @click="handleSubmit">提交</button>

    <div v-if="userData" class="user-info">
      <h3>用户信息</h3>
      <p>注册时间：{{ formatDate(userData.createTime) }}</p>
      <p>手机号：{{ maskPhone(userData.phone) }}</p>
      <p>邮箱：{{ maskEmail(userData.email) }}</p>
    </div>
  </div>
</template>

<script>
import { 
  validate, 
  formatDate, 
  maskPhone, 
  maskEmail,
  debounce 
} from '@/utils/tool';

export default {
  name: 'UserForm',
  data() {
    return {
      form: {
        email: '',
        phone: '',
        password: ''
      },
      errors: {
        email: '',
        phone: '',
        password: ''
      },
      searchKeyword: '',
      userData: null
    };
  },
  methods: {
    validateEmail() {
      if (!this.form.email) {
        this.errors.email = '邮箱不能为空';
      } else if (!validate.email(this.form.email)) {
        this.errors.email = '邮箱格式不正确';
      } else {
        this.errors.email = '';
      }
    },
    
    validatePhone() {
      if (!this.form.phone) {
        this.errors.phone = '手机号不能为空';
      } else if (!validate.phone(this.form.phone)) {
        this.errors.phone = '手机号格式不正确';
      } else {
        this.errors.phone = '';
      }
    },
    
    validatePassword() {
      if (!this.form.password) {
        this.errors.password = '密码不能为空';
      } else if (!validate.password(this.form.password)) {
        this.errors.password = '密码强度不够（至少8位，包含大小写字母和数字）';
      } else {
        this.errors.password = '';
      }
    },
    
    handleSearch: debounce(function(event) {
      const keyword = event.target.value;
      console.log('搜索关键词:', keyword);
      // 执行搜索逻辑
    }, 500),
    
    handleSubmit() {
      this.validateEmail();
      this.validatePhone();
      this.validatePassword();
      
      if (!this.errors.email && !this.errors.phone && !this.errors.password) {
        console.log('表单验证通过，提交数据:', this.form);
        // 提交表单逻辑
        
        // 模拟返回的用户数据
        this.userData = {
          email: this.form.email,
          phone: this.form.phone,
          createTime: new Date()
        };
      }
    },
    
    formatDate,
    maskPhone,
    maskEmail
  }
};
</script>

<style scoped>
.user-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #359268;
}

.user-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.user-info h3 {
  margin-top: 0;
}
</style>
```

---

## 注意事项

1. **按需导入**：建议使用按需导入的方式，只导入需要的函数，减少打包体积。

```javascript
// 推荐
import { validate, formatDate } from '@/utils/tool';

// 不推荐（除非需要使用所有功能）
import tool from '@/utils/tool';
```

2. **类型安全**：虽然这些函数已经包含了基本的类型检查，但在使用时仍需注意传入正确的参数类型。

3. **性能考虑**：
   - `debounce` 和 `throttle` 函数会创建闭包，注意在组件销毁时清理
   - `deepClone` 对于大型对象可能会有性能影响，谨慎使用

4. **浏览器兼容性**：这些函数使用了现代 JavaScript 特性，确保目标浏览器支持或配置相应的 polyfill。

---

## 扩展建议

如果需要添加更多工具函数，建议：

1. 保持函数的单一职责
2. 添加完整的 JSDoc 注释
3. 考虑边界情况和错误处理
4. 更新此文档的使用示例

---

**最后更新时间：** 2026-03-26
