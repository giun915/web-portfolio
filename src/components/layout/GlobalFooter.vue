<script setup lang="ts">
import { ref } from 'vue'
const footerPagination = ref<HTMLElement | null>(null)
defineExpose({ footerPagination })
</script>

<template>
  <footer id="footer">
    <div class="page_inner">
      <p>© 2025 WEB DEVELOPER. All rights reserved.</p>
      <div ref="footerPagination"></div>
    </div>
  </footer>
</template>

<style scoped>
/* 푸터 */
#footer {
  position: fixed;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  bottom: 0;
  border-top: 1px solid var(--border-color);
  background-color: #0a0a0ae6;
  z-index: 2;
}
.page_inner {
  justify-content: space-between;
}
p {
  color: var(--gray-color);
}
/* 반응형 */
@media (max-width: 1200px) {
  p {
    width: 100%;
    text-align: center;
  }
}
</style>
