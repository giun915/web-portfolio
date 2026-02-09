<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gnbList } from '@/constants/header/gnbMenu'
import GnbList from '@/components/layout/GnbList.vue'
import { IconXmark } from '@/components/icons'

const props = defineProps<{
  activeIndex: number
  goToSlide: (id: number) => void
}>()

const isMenuOpen = ref(false)

const toggleGnb = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}

const handleResize = () => {
  if (window.innerWidth > 1200) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header id="header">
    <div class="page_inner">
      <h3 class="logo">WEB <span>PORTFOLIO</span></h3>
      <div class="pc_gnb">
        <GnbList :list="gnbList" :activeIndex="props.activeIndex" :goToSlide="props.goToSlide" />
      </div>
      <button type="button" class="ham_btn" :class="{ on: isMenuOpen }" @click="toggleGnb">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
  <transition name="fade">
    <div v-if="isMenuOpen" class="mobile_gnb">
      <div class="page_inner">
        <h3 class="logo">WEB <span>PORTFOLIO</span></h3>
        <button class="close_btn" @click="closeMenu" type="button">
          <i>
            <IconXmark />
          </i>
        </button>
      </div>
      <div class="gnb_panel">
        <GnbList
          :list="gnbList"
          :activeIndex="props.activeIndex"
          :goToSlide="props.goToSlide"
          :onAfterSelect="closeMenu"
        />
      </div>
    </div>
  </transition>
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
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  gap: 0.5rem;
}
.logo span {
  color: var(--main-color);
}

.pc_gnb {
  display: flex;
}
.ham_btn {
  display: none;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
}
.ham_btn span {
  position: absolute;
  left: 30%;
  display: block;
  height: 2px;
  background: var(--basic-color);
  transition: all 0.3s;
}

.ham_btn span:nth-child(1) {
  width: 1rem;
  top: 35%;
}
.ham_btn span:nth-child(2) {
  width: 1.25rem;
  top: 50%;
}
.ham_btn span:nth-child(3) {
  width: 0.75rem;
  top: 65%;
}
.mobile_gnb {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: var(--box-bg-color);
}

.fade-enter-from {
  transform: translateX(100%);
}
.fade-enter-to {
  transform: translateX(0);
}
.fade-enter-active {
  transition: transform 0.4s ease;
}

.fade-leave-from {
  transform: translateX(0);
}
.fade-leave-to {
  transform: translateX(100%);
}
.fade-leave-active {
  transition: transform 0.35s ease;
}

.mobile_gnb .logo {
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
}

.close_btn {
  position: absolute;
  right: 1.6rem;
  top: 2rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #1d2229;
  transition: all 0.4s ease;
  border: 1px solid #374151;
}

.close_btn:hover {
  background-color: rgb(239 68 68 / 0.2);
  border-color: rgb(239 68 68 / 0.5);
}

.close_btn i {
  font-size: 1.125rem;
  line-height: 0;
}

.gnb_panel {
  height: 100%;
}

/* 반응형 */
@media (max-width: 1200px) {
  .pc_gnb {
    display: none;
  }

  .ham_btn {
    display: block;
  }
}
</style>
