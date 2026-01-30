<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps<{
  active: boolean
}>()

const introTextEl = ref<HTMLElement | null>(null)

const initIntroSection = () => {
  const el = introTextEl.value

  if (!el) return

  const text = el.textContent?.trim() ?? ''
  el.dataset.text = text
  el.style.setProperty('--steps', String(text.length))

  setTimeout(() => el.classList.add('on'), 1000)
}

onMounted(async () => {
  await nextTick()

  if (props.active) {
    initIntroSection()
  }
})

watch(
  () => props.active,
  (isActive) => {
    if (isActive) {
      initIntroSection()
    } else {
      introTextEl.value?.classList.remove('on')
    }
  },
)
</script>

<template>
  <h4 class="blind">인트로 섹션</h4>
  <div class="bg_wrap">
    <div class="bg_circle left_circle"></div>
    <div class="bg_circle right_circle"></div>
  </div>
  <div class="page_inner">
    <div class="badge_icon_wrap">
      <div class="badge_icon common_trans_attr">WEB DEVELOPER</div>
    </div>
    <div class="txt_area">
      <div class="txt_wrap">
        <h3 class="common_trans_attr intro_txt">User Centered</h3>
      </div>
      <div class="txt_wrap">
        <h4 class="common_trans_attr sub_intro_txt">Beautiful and Functional Web</h4>
      </div>
      <div class="txt_wrap">
        <p ref="introTextEl" class="common_trans_attr intro_txt_kr">
          사용자 경험을 최우선으로 생각하며, 아름답고 기능적인 웹사이트를 제작합니다.
        </p>
      </div>
    </div>
    <div class="button_wrap">
      <a class="portfolio_btn common_trans_attr" href="#project" data-menuanchor="portfolio"
        >View Portfolio</a
      >
      <a class="contact_btn common_trans_attr" href="#contact" data-menuanchor="contact"
        >Contact Me</a
      >
    </div>
    <div class="common_mouse_icon_wrap">
      <div class="mouse_icon common_trans_attr">
        <i class="mouse_circle"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* intro */
.intro_section .bg_wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, #0a0a0a 0%, #121212 50%, #0a0a0a 100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}
.intro_section.on .bg_wrap {
  opacity: 0.2;
  visibility: visible;
}
.intro_section .bg_circle {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(4rem);
}
.intro_section .left_circle {
  top: 8rem;
  left: 5rem;
  background-color: #06b6d4;
}
.intro_section .right_circle {
  bottom: 5rem;
  right: 5rem;
  background-color: #a855f7;
}

.intro_section .badge_icon_wrap {
  overflow: hidden;
  margin-bottom: 2rem;
  padding: 2px 0;
}
.intro_section .badge_icon_wrap .badge_icon {
  color: var(--main-color);
  background-color: #22d3ee1a;
  padding: 0.6rem 1rem;
  border: 1px solid var(--main-color);
  border-radius: 9999px;
  box-sizing: border-box;
}
.intro_section .txt_area {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3.125rem;
}
.intro_section .txt_wrap {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  font-size: 4.5rem;
  font-weight: 700;
}
.intro_section .txt_wrap:last-child {
  margin-top: 1.875rem;
}
.intro_section .sub_intro_txt {
  background: linear-gradient(90deg, var(--main-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.intro_section .intro_txt_kr {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--gray-color);
}
.intro_section.on .intro_txt_kr.on::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  color: transparent;
  background: linear-gradient(90deg, var(--basic-color) 0%, var(--basic-color) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  overflow: hidden;
  white-space: nowrap;
  animation: colorReveal 3s steps(var(--steps)) forwards;
}

.intro_section .button_wrap {
  display: flex;
  margin-bottom: 5rem;
  gap: 1.25rem;
  overflow: hidden;
}
.intro_section .button_wrap a {
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.4s ease;
}
.intro_section .button_wrap a:hover {
  background-color: var(--main-color);
  color: #0a0a0a;
}
.intro_section .button_wrap .portfolio_btn {
  background-color: #67e8f9;
  color: #0a0a0a;
}
.intro_section .button_wrap .contact_btn {
  border: 1px solid var(--main-color);
  color: var(--main-color);
}
</style>
