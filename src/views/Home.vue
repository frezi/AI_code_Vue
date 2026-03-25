<template>
  <div class="home">
    <h1>首页</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="欢迎来到Vue.js应用"/>
    <div class="navigation-hint">
      <p>使用顶部导航栏切换不同页面</p>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.navigation-hint {
  margin-top: 40px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.navigation-hint p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
