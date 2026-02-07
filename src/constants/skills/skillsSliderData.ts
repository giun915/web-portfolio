import { IconHtml } from '@/components/icons'
import IconBack from '@/components/icons/skills/IconBack.vue'
import IconDatabase from '@/components/icons/skills/IconDatabase.vue'
import IconFront from '@/components/icons/skills/IconFront.vue'
import type { Component } from 'vue'

export type SkillLevel = {
  name: string
  percent: number
}

export type SkillItem = {
  id: number
  customClass: string
  title: string
  content: string
  icon: Component
  levels: SkillLevel[]
}

export const skillList: SkillItem[] = [
  {
    id: 1,
    customClass: 'publishing_box',
    title: 'Publishing',
    content: '시맨틱 마크업과 최신 CSS 기술을 활용한 웹 표준 및 접근성 기반 퍼블리싱 구현',
    icon: IconHtml,
    levels: [
      { name: 'HTML5', percent: 95 },
      { name: 'CSS3', percent: 90 },
      { name: 'Responsive', percent: 90 },
    ],
  },
  {
    id: 2,
    customClass: 'front_box',
    title: 'Front-End',
    content: 'JavaScript 기반 인터랙션과 사용자 경험을 고려한 프론트엔드 기능 구현',
    icon: IconFront,
    levels: [
      { name: 'Vanilla JS', percent: 90 },
      { name: 'jQuery', percent: 95 },
      { name: 'Typescript', percent: 85 },
      { name: 'Vue.js', percent: 85 },
    ],
  },
  {
    id: 3,
    customClass: 'back_box',
    title: 'Back-End',
    content: 'Java 기반 백엔드 구조 이해를 바탕으로 한 API 연동 및 데이터 흐름 처리',
    icon: IconBack,
    levels: [
      { name: 'Java', percent: 85 },
      { name: 'SpringBoot', percent: 85 },
      { name: 'SSR (JSP/Thymeleaf)', percent: 90 },
      { name: 'JPA', percent: 90 },
    ],
  },
  {
    id: 4,
    customClass: 'database_box',
    title: 'Database',
    content: '데이터베이스 구조 이해를 바탕으로 한 데이터 설계 및 서비스 연계',
    icon: IconDatabase,
    levels: [
      { name: 'MySQL', percent: 85 },
      { name: 'MongoDB', percent: 85 },
    ],
  },
]
