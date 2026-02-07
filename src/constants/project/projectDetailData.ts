import type { Component } from 'vue'
import { IconResponsive } from '@/components/icons'
import { markRaw } from 'vue'
import IconDuration from '@/components/icons/project/IconDuration.vue'
import IconTechnology from '@/components/icons/project/IconTechnology.vue'
import IconRole from '@/components/icons/project/IconRole.vue'
import IconGallery from '@/components/icons/project/IconGallery.vue'

/* 메인 스킬 배지 */
export type ProjectMainSkill = {
  label: string
  className: string
}

/* Summary */
export type ProjectSummaryItem = {
  title: string
  icon: Component
  content: string
  className: string
}

/* Key Feature */
export type ProjectKeyFeature = {
  title: string
  desc: string
  icon: Component
}

/* Link */
export interface ProjectLinks {
  demo?: string
  github?: string
}

/* Detail 전체 */
export interface ProjectDetail {
  id: number

  title: string
  client: string

  mainImage: string
  mainSkills: ProjectMainSkill[]

  summary: ProjectSummaryItem[]
  overview: string[]
  keyFeatures: ProjectKeyFeature[]
  gallery: string[]
  links?: ProjectLinks
}

export const projectDetailList: ProjectDetail[] = [
  {
    id: 1,

    title: '정인 인테리어',
    client: 'JungIn',

    mainImage: '/assets/imgs/portfolio/jungin/main_display.png',

    mainSkills: [
      { label: 'HTML/CSS', className: 'html_badge' },
      { label: 'JQuery', className: 'javascript_badge' },
      { label: 'Responsive', className: 'responsive_badge' },
    ],

    summary: [
      {
        title: 'Duration',
        icon: markRaw(IconDuration),
        content: '1 Week',
        className: 'project_duration_item',
      },
      {
        title: 'Technologies',
        icon: markRaw(IconTechnology),
        content: 'HTML5, CSS3, JQuery',
        className: 'project_technologies_item',
      },
      {
        title: 'Role',
        icon: markRaw(IconRole),
        content: 'Web Publishing',
        className: 'project_role_item',
      },
    ],

    overview: [
      '정인 인테리어의 브랜드 이미지를 담아 제작한 반응형 웹사이트입니다. 회사 소개와 함께 그동안 진행한 다양한 시공 사례를 한눈에 확인할 수 있도록 구현했습니다.',
      '',
      'PC, 태블릿, 모바일 등 모든 디바이스에서 편안하게 볼 수 있도록 반응형 레이아웃을 적용했으며, 사진 중심의 구성과 절제된 인터랙션으로 시공 결과가 돋보이도록 구현했습니다. 사용자에게 필요한 정보만을 명확하게 전달하는 것을 목표로, 신뢰감과 전문성이 느껴지는 UI/UX에 중점을 두었습니다.',
    ],

    keyFeatures: [
      {
        title: '반응형 웹',
        desc: 'PC · 태블릿 · 모바일 환경 대응',
        icon: markRaw(IconResponsive),
      },
      {
        title: '시공 사례 갤러리',
        desc: '다양한 인테리어 작업 결과 제공',
        icon: markRaw(IconGallery),
      },
    ],

    gallery: [
      '/assets/imgs/portfolio/jungin/section1.png',
      '/assets/imgs/portfolio/jungin/section2.png',
      '/assets/imgs/portfolio/jungin/section3.png',
    ],
    links: {
      demo: 'https://jungin-interior.co.kr',
      github: 'https://jungin-interior.co.kr',
    },
  },
  {
    id: 2,

    title: '정인 인테리어111',
    client: 'JungIn',

    mainImage: '/assets/imgs/portfolio/jungin/main_display.png',

    mainSkills: [
      { label: 'HTML/CSS', className: 'html_badge' },
      { label: 'JQuery', className: 'javascript_badge' },
      { label: 'Responsive', className: 'responsive_badge' },
    ],

    summary: [
      {
        title: 'Duration',
        icon: markRaw(IconDuration),
        content: '1 Week',
        className: 'project_duration_item',
      },
      {
        title: 'Technologies',
        icon: markRaw(IconTechnology),
        content: 'HTML5, CSS3, JQuery',
        className: 'project_technologies_item',
      },
      {
        title: 'Role',
        icon: markRaw(IconRole),
        content: 'Web Publishing',
        className: 'project_role_item',
      },
    ],

    overview: [
      '정인 인테리어의 브랜드 이미지를 담아 제작한 반응형 웹사이트입니다. 회사 소개와 함께 그동안 진행한 다양한 시공 사례를 한눈에 확인할 수 있도록 구현했습니다.',
      '',
      'PC, 태블릿, 모바일 등 모든 디바이스에서 편안하게 볼 수 있도록 반응형 레이아웃을 적용했으며, 사진 중심의 구성과 절제된 인터랙션으로 시공 결과가 돋보이도록 구현했습니다. 사용자에게 필요한 정보만을 명확하게 전달하는 것을 목표로, 신뢰감과 전문성이 느껴지는 UI/UX에 중점을 두었습니다.',
    ],

    keyFeatures: [
      {
        title: '반응형 웹',
        desc: 'PC · 태블릿 · 모바일 환경 대응',
        icon: markRaw(IconResponsive),
      },
      {
        title: '시공 사례 갤러리',
        desc: '다양한 인테리어 작업 결과 제공',
        icon: markRaw(IconGallery),
      },
    ],

    gallery: [
      '/assets/imgs/portfolio/jungin/section1.png',
      '/assets/imgs/portfolio/jungin/section2.png',
      '/assets/imgs/portfolio/jungin/section3.png',
    ],
    links: {
      demo: 'https://jungin-interior.co.kr',
      github: 'https://jungin-interior.co.kr',
    },
  },
]
