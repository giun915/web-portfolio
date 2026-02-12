<script setup lang="ts">
import { gnbList } from '@/constants/header/gnbMenu'
import GnbList from '@/components/layout/GnbList.vue'
const props = defineProps<{
  activeIndex: number
  goToSlide: (index: number) => void
}>()
</script>

<template>
  <footer id="footer">
    <div class="page_inner">
      <p>© 2025 WEB DEVELOPER. All rights reserved.</p>
      <div class="navigation_wrap">
        <GnbList
          :list="gnbList"
          :activeIndex="props.activeIndex"
          :goToSlide="props.goToSlide"
          variant="dot"
        />
      </div>
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
  background-color: #0b0b0b;
  z-index: 2;
}
.page_inner {
  justify-content: space-between;
}
p {
  color: var(--gray-color);
}

/* 푸터 네비게이션 */
.navigation_wrap {
  display: flex;
  margin-right: 1.5rem;
  width: 120px;
  background: var(--secondary-color);
  border-radius: 6px 6px 0 0;
}

.navigation_wrap:before,
.navigation_wrap:after {
  content: '';
  position: absolute;
  transition: all 0.4s ease;
}
.navigation_wrap:before {
  transform: translateX(-100%);
  left: 0;
  bottom: 0;
  border-top: 18px solid transparent;
  border-right: 12px solid var(--secondary-color);
  border-bottom: 18px solid var(--secondary-color);
  border-left: 12px solid transparent;
}
.navigation_wrap:after {
  transform: translateX(100%);
  right: 0;
  bottom: 0;
  border-top: 18px solid transparent;
  border-left: 12px solid var(--secondary-color);
  border-bottom: 18px solid var(--secondary-color);
  border-right: 12px solid transparent;
}

.navigation_wrap .gnb_wrap {
  width: 100%;
  justify-content: space-around;
  gap: initial;
}

.navigation_wrap li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.75rem;
  height: 0.75rem;
  cursor: pointer;
}

.navigation_wrap a {
  width: 0.25rem;
  height: 0.25rem;
  background: #dbc3b1;
  border-radius: 9999px;
  font-size: 0;
}

.navigation_wrap a:after {
  display: none;
}

.navigation_wrap li:hover a {
  width: 0.625rem;
  height: 0.625rem;
}
.navigation_wrap li.on a {
  width: 0.75rem;
  height: 0.75rem;
  background: var(--basic-color);
}

/* 반응형 */
@media (max-width: 1200px) {
  #footer {
    position: relative;
  }
  .navigation_wrap {
    display: none;
  }
  p {
    width: 100%;
    text-align: center;
  }
}
</style>
