<template>
  <div class="about">
    <h1>关于我们</h1>
    <div class="content">
      <p>这是一个使用Vue 3和Vue Router构建的示例应用。</p>
      <p>主要功能包括：</p>
      <ul>
        <li>路由导航</li>
        <li>页面组件</li>
        <li>响应式布局</li>
        <li>组件化开发</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #42b983;
  margin-bottom: 30px;
}

.content {
  text-align: left;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.content p {
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
}

.content ul {
  padding-left: 30px;
}

.content li {
  margin: 10px 0;
  color: #555;
}
</style>
