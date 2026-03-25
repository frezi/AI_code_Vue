<template>
  <div class="contact">
    <h1>联系我们</h1>
    <div class="contact-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">姓名：</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            placeholder="请输入您的姓名"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="email">邮箱：</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            placeholder="请输入您的邮箱"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="message">留言：</label>
          <textarea 
            id="message" 
            v-model="formData.message" 
            placeholder="请输入您的留言"
            rows="5"
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn">提交</button>
      </form>
      
      <div v-if="submitted" class="success-message">
        感谢您的留言！我们会尽快回复您。
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ContactView',
  setup() {
    const formData = ref({
      name: '',
      email: '',
      message: ''
    })
    
    const submitted = ref(false)
    
    const handleSubmit = () => {
      console.log('表单提交:', formData.value)
      submitted.value = true
      
      // 3秒后重置表单
      setTimeout(() => {
        formData.value = {
          name: '',
          email: '',
          message: ''
        }
        submitted.value = false
      }, 3000)
    }
    
    return {
      formData,
      submitted,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #42b983;
  margin-bottom: 30px;
}

.contact-form {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #35a372;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
}
</style>
