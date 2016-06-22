# vue-hot-reload-bug
错误重现

npm install

node dev-server.js

访问 http://localhost:8080/test/index.html

任意修改 
components/commons/test-header/index.vue 或 components/commons/test-footer/index.vue
可重现 hot reload 错误

将 components/commons/test-header/index.vue 改为 components/commons/test-header/index1.vue
同时修改 components/commons/index.js 和 pages/test/index.js 中对 components/commons/test-header/index.vue 的引用

重新执行 node dev-server.js

任意修改
components/commons/test-header/index.vue 或 components/commons/test-footer/index.vue
hot reload 错误不再出现
