<script setup lang="ts">
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps<{
  active: boolean
  goToSlide: (id: number) => void
  anchors: string[]
}>()

const moveTo = (anchor: string) => {
  const index = props.anchors.indexOf(anchor)
  if (index === -1) return
  props.goToSlide(index)
}

const introTextEl1 = ref<HTMLElement | null>(null)
const introTextEl2 = ref<HTMLElement | null>(null)

let cleanupEndListener: (() => void) | null = null
let timer1: number | null = null

const setupText = (el: HTMLElement) => {
  const text = el.textContent?.trim() ?? ''
  el.dataset.text = text
  el.style.setProperty('--steps', String(text.length))
}

const runIntro = async () => {
  await nextTick()

  const el1 = introTextEl1.value
  const el2 = introTextEl2.value
  if (!el1 || !el2) return

  el1.classList.remove('on')
  el2.classList.remove('on')

  setupText(el1)
  setupText(el2)

  if (timer1) window.clearTimeout(timer1)
  timer1 = window.setTimeout(() => el1.classList.add('on'), 1000)

  const onEnd = (e: AnimationEvent) => {
    if (e.animationName !== 'colorReveal') return
    el2.classList.add('on')
  }

  cleanupEndListener?.()
  el1.addEventListener('animationend', onEnd)

  cleanupEndListener = () => {
    el1.removeEventListener('animationend', onEnd)
    cleanupEndListener = null
  }
}

onMounted(async () => {
  if (props.active) await runIntro()
})

onBeforeUnmount(() => {
  cleanupEndListener?.()
  if (timer1) window.clearTimeout(timer1)
})

watch(
  () => props.active,
  async (isActive) => {
    if (isActive) {
      await runIntro()
      return
    }
    introTextEl1.value?.classList.remove('on')
    introTextEl2.value?.classList.remove('on')
  },
)
</script>

<template>
  <section class="swiper-slide section_slide intro_section" data-anchor="intro">
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
        <div class="txt_wrap intro_txt_wrap">
          <p ref="introTextEl1" class="common_trans_attr intro_txt_kr intro_line1">
            사용자 경험을 최우선으로 생각하며,
          </p>
          <p ref="introTextEl2" class="common_trans_attr intro_txt_kr intro_line2">
            아름답고 기능적인 웹사이트를 제작합니다.
          </p>
        </div>
      </div>
      <div class="button_wrap">
        <button class="portfolio_btn common_trans_attr" type="button" @click="moveTo('project')">
          View Portfolio
        </button>
        <button class="contact_btn common_trans_attr" type="button" @click="moveTo('contact')">
          Contact Me
        </button>
      </div>
      <div class="common_mouse_icon_wrap">
        <div class="mouse_icon common_trans_attr">
          <i class="mouse_circle"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* intro */
.bg_wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.bg_circle {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(4rem);
  opacity: 0.2;
}
.left_circle {
  top: 8rem;
  left: 5rem;
  background-color: #06b6d4;
}
.right_circle {
  bottom: 5rem;
  right: 5rem;
  background-color: #a855f7;
}

.badge_icon_wrap {
  overflow: hidden;
  margin: 5rem 0 2rem;
  padding: 2px 0;
}
.badge_icon_wrap .badge_icon {
  color: var(--main-color);
  background-color: #22d3ee1a;
  padding: 0.6rem 1rem;
  border: 1px solid var(--main-color);
  border-radius: 9999px;
  box-sizing: border-box;
}
.txt_area {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3.125rem;
}
.txt_wrap {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  font-size: 4.5rem;
  font-weight: 700;
}
.txt_wrap:last-child {
  margin-top: 1.875rem;
}
.sub_intro_txt {
  background: linear-gradient(90deg, var(--main-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.intro_txt_wrap {
  gap: 0.5rem;
}

.intro_txt_kr {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--gray-color);
  word-break: keep-all;
}
.swiper-slide-active .intro_txt_kr.on::after {
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
  animation: colorReveal 2s steps(var(--steps)) forwards;
}

.button_wrap {
  display: flex;
  margin-bottom: 5rem;
  gap: 1.25rem;
  overflow: hidden;
}
.button_wrap button {
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.4s ease;
}
.button_wrap button:hover {
  background-color: var(--main-color);
  color: #0a0a0a;
}
.button_wrap .portfolio_btn {
  background-color: #67e8f9;
  color: #0a0a0a;
}
.button_wrap .contact_btn {
  border: 1px solid var(--main-color);
  color: var(--main-color);
}

/* 반응형 */
@media (max-width: 1200px) {
  .badge_icon_wrap {
    margin: 3.5rem 0 2rem;
  }

  .bg_circle {
    width: 18rem;
    height: 18rem;
  }

  .txt_wrap {
    font-size: 3rem;
  }

  .intro_txt_kr {
    font-size: 1rem;
  }

  .button_wrap {
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .badge_icon_wrap .badge_icon {
    font-size: 0.75rem;
  }

  .txt_wrap {
    font-size: 2.5rem;
  }

  .intro_txt_kr {
    font-size: 0.875rem;
  }
}

@media (max-width: 600px) {
  .intro_txt_wrap {
    flex-direction: column;
    align-items: center;
  }

  .intro_txt_kr {
    transform: translateY(225%);
  }
}
</style>
