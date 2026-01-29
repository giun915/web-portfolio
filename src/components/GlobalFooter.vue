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
