<script setup lang="ts">
import type { GnbItem } from '@/constants/header/gnbMenu'

const props = defineProps<{
  list: GnbItem[]
  activeIndex: number
  goToSlide: (id: number) => void
  onAfterSelect?: () => void
  variant?: 'text' | 'dot'
}>()

const variant = props.variant ?? 'text'

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
      <button
        v-if="variant === 'text'"
        type="button"
        :aria-current="props.activeIndex === gnb.index ? 'true' : undefined"
        @click="handleClick(gnb.index)"
      >
        {{ gnb.label }}
      </button>
      <button
        v-else
        type="button"
        class="dot"
        @click="handleClick(gnb.index)"
        :aria-current="props.activeIndex === gnb.index ? 'true' : undefined"
        aria-label="section navigation"
      ></button>
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

button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.4s ease;
}
.gnb:hover button {
  color: var(--main-color);
}
.on button:after {
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

.mobile_gnb button {
  font-size: 1.25rem;
}
.mobile_gnb .on button:after {
  top: initial;
  left: -1rem;
  width: 0.5rem;
  height: 0.5rem;
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

.navigation_wrap button {
  width: 0.25rem;
  height: 0.25rem;
  background: #dbc3b1;
  border-radius: 9999px;
  font-size: 0;
}

.navigation_wrap button:after {
  display: none;
}

.navigation_wrap li:hover button {
  width: 0.625rem;
  height: 0.625rem;
}
.navigation_wrap li.on button {
  width: 0.75rem;
  height: 0.75rem;
  background: var(--basic-color);
}
</style>
