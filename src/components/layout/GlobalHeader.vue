<script setup lang="ts">
import { gnbList } from '@/constants/header/gnbMenu'

const props = defineProps<{
  activeIndex: number
  goToSlide: (id: number) => void
}>()
</script>

<template>
  <header id="header">
    <div class="page_inner">
      <h3 class="logo">WEB <span>PORTFOLIO</span></h3>
      <ul class="gnb_wrap">
        <li
          v-for="gnb in gnbList"
          :key="gnb.index"
          class="gnb"
          :class="[gnb.className, activeIndex === gnb.index ? 'on' : '']"
        >
          <a href="#" @click.prevent="props.goToSlide(gnb.index)">
            {{ gnb.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
#header {
  position: fixed;
  width: 100%;
  top: 0;
  border-bottom: 1px solid var(--border-color);
  z-index: 2;
  background-color: #0a0a0ae6;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(4px);
}
.page_inner {
  padding: 1.6rem 2rem;
  justify-content: space-between;
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
}
.logo span {
  color: var(--main-color);
}
.gnb_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.75rem;
}

.gnb_wrap .gnb a {
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 0.4s ease;
}
.gnb_wrap .gnb:hover a {
  color: var(--main-color);
}
.gnb_wrap .gnb.on a:after {
  content: '';
  position: absolute;
  top: -10px;
  width: 4px;
  height: 4px;
  background: var(--main-color);
  border-radius: 50%;
}
</style>
