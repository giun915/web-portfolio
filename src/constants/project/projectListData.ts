import type { Component } from 'vue'
import { IconHtml, IconCss, IconResponsive, IconVue } from '@/components/icons'

export type ProjectSkillItem = {
  icon: Component
  className: string
}

export interface ProjectItem {
  id: number
  client: string
  clientTheme: 'dark' | 'light'
  type: string
  title: string
  desc: string
  image: string
  skills: ProjectSkillItem[]
}

export const projectList: ProjectItem[] = [
  {
    id: 1,
    client: 'JungIn',
    clientTheme: 'dark',
    type: 'Web Site',
    title: '정인 인테리어',
    desc: '인테리어 업체 반응형 웹사이트 퍼블리싱 작업',
    image: '/assets/imgs/portfolio/jungin/main_display.png',
    skills: [
      { icon: IconHtml, className: 'html_icon' },
      { icon: IconCss, className: 'css_icon' },
      { icon: IconVue, className: 'vue_icon' },
      { icon: IconResponsive, className: 'responsive_icon' },
    ],
  },
]
