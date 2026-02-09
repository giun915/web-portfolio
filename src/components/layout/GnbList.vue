<script setup lang="ts">
import type { GnbItem } from '@/constants/header/gnbMenu'

const props = defineProps<{
  list: GnbItem[]
  activeIndex: number
  goToSlide: (id: number) => void
  onAfterSelect?: () => void
}>()

function handleClick(index: number) {
  props.goToSlide(index)
  props.onAfterSelect?.()
}
</script>

<template>
  <ul class="gnb_wrap">
    <li
      v-for="gnb in props.list"
      :key="gnb.index"
      class="gnb"
      :class="[gnb.className, props.activeIndex === gnb.index ? 'on' : '']"
    >
      <a href="#" @click.prevent="handleClick(gnb.index)">
        {{ gnb.label }}
      </a>
    </li>
  </ul>
</template>

<style scoped>
.gnb_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.75rem;
}

a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;
}
.gnb:hover a {
  color: var(--main-color);
}
.on a:after {
  content: '';
  position: absolute;
  top: -0.625rem;
  width: 0.25rem;
  height: 0.25rem;
  background: var(--main-color);
  border-radius: 50%;
}

.mobile_gnb .gnb_wrap {
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5rem;
}

.mobile_gnb a {
  font-size: 1.25rem;
}
.mobile_gnb .on a:after {
  top: initial;
  left: -1rem;
  width: 0.5rem;
  height: 0.5rem;
}
</style>
