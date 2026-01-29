<script setup lang="ts">
import { ref } from 'vue'
import { gnbList } from '@/constants/gnbMenu'

const activeIndex = ref(1)
</script>

<template>
  <header id="header">
    <div class="page_inner">
      <h3 class="logo">WEB <span>PORTFOLIO</span></h3>
      <ul class="gnb_wrap">
        <li
          v-for="gnb in gnbList"
          :key="gnb.id"
          class="gnb"
          :class="[gnb.className, activeIndex === gnb.id ? 'on' : '']"
        >
          <a :href="gnb.anchor">
            {{ gnb.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
