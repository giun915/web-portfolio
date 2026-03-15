import type { Component } from 'vue'
import { IconResponsive } from '@/components/icons'
import { projectImages } from '@/utils/projectImages'
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

    mainImage: projectImages['jungin/main_display'] ?? '',

    mainSkills: [
      { label: 'HTML/CSS', className: 'html_badge' },
      { label: 'Vue3', className: 'javascript_badge' },
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
        content: 'HTML5, CSS3, Vue3',
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
      projectImages['jungin/section1'] ?? '',
      projectImages['jungin/section2'] ?? '',
      projectImages['jungin/section3'] ?? '',
    ],
    links: {
      demo: 'https://giun915.github.io/jungin',
      github: 'https://github.com/giun915/jungin',
    },
  },
  {
    id: 2,

    title: '자체제작 카페24 쇼핑몰',
    client: 'Self Project',

    mainImage: projectImages['modeliang/main_display'] ?? '',

    mainSkills: [
      { label: 'HTML/CSS', className: 'html_badge' },
      { label: 'JavaScript', className: 'javascript_badge' },
      { label: 'Responsive', className: 'responsive_badge' },
    ],

    summary: [
      {
        title: 'Duration',
        icon: markRaw(IconDuration),
        content: '1 Month',
        className: 'project_duration_item',
      },
      {
        title: 'Technologies',
        icon: markRaw(IconTechnology),
        content: 'HTML5, CSS3, JavaScript, Cafe24',
        className: 'project_technologies_item',
      },
      {
        title: 'Role',
        icon: markRaw(IconRole),
        content: 'Planning · UI Publishing · Customizing',
        className: 'project_role_item',
      },
    ],

    overview: [
      '카페24 기반으로 직접 기획하고 제작한 자체제작 쇼핑몰 프로젝트입니다. 상품 탐색부터 구매 흐름까지 사용자가 자연스럽게 이동할 수 있도록 메인/카테고리/상품 상세 페이지 중심으로 UI를 구성했습니다.',
      '',
      '템플릿 구조를 이해한 뒤 필요한 영역을 커스터마이징하고, 공통 컴포넌트(버튼/배지/카드/레이아웃) 스타일을 정리해 유지보수성을 높였습니다. PC·태블릿·모바일 전 환경에서 가독성과 터치 사용성을 고려해 반응형 레이아웃을 적용했습니다.',
    ],

    keyFeatures: [
      {
        title: '반응형 쇼핑몰 UI',
        desc: 'PC · 태블릿 · 모바일 환경 대응 및 터치 사용성 최적화',
        icon: markRaw(IconResponsive),
      },
      {
        title: '상품 리스트/상세 레이아웃',
        desc: '카테고리 탐색, 리스트 카드 구성, 상세 정보 영역 UI 정리',
        icon: markRaw(IconGallery),
      },
      {
        title: '카페24 템플릿 커스터마이징',
        desc: '기존 템플릿 기반 구조 수정 및 공통 스타일/컴포넌트 정리',
        icon: markRaw(IconTechnology),
      },
    ],

    gallery: [
      projectImages['modeliang/section1'] ?? '',
      projectImages['modeliang/section2'] ?? '',
      projectImages['modeliang/section3'] ?? '',
    ],

    links: {
      demo: 'https://ecudemo371795.cafe24.com/skin-base',
    },
  },
]
