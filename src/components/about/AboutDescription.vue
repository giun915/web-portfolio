<script setup lang="ts">
import { IconGithub, IconLinkedIn } from '@/components/icons'
import IconResume from '@/components/icons/about/IconResume.vue'
</script>

<template>
  <div class="about_description_area">
    <div class="about_description_wrap">
      <h2 class="description_title">About <span>Me</span></h2>
      <div class="about_description">
        <p>
          안녕하세요! 웹 개발자이자 퍼블리셔로 활동하고 있는 이기운입니다. 약 7년간의 실무 경험을
          바탕으로 HTML, CSS, JavaScript를 기반으로 한 사용자 중심의 반응형 웹사이트를 제작하고
          있습니다.
        </p>
        <p>
          개발자 경험을 통해 기획 단계의 요구사항을 이해하고 기획팀과 원활하게 소통하며 구조적인
          구현이 가능하며, 퍼블리셔 경력을 바탕으로 디자인 의도를 정확히 파악해 디자인팀과의 협업
          또한 강점으로 가지고 있습니다.
        </p>
        <p>
          보이는 결과물뿐 아니라 유지보수와 확장성을 고려한 코드, 그리고 팀 간 협업이 매끄러운 웹
          개발을 지향합니다.
        </p>
      </div>
      <div class="description_icon_wrap">
        <a
          href="https://www.linkedin.com/in/%EC%96%84%EB%A3%A8-%EC%9D%B4-6a20313a2/"
          class="linked_icon"
          target="_blank"
        >
          <i>
            <IconLinkedIn />
          </i>
        </a>
        <a href="resume/resume.pdf" target="_blank" class="resume_icon">
          <i>
            <IconResume />
          </i>
        </a>
        <a href="https://github.com/giun915" class="github_icon" target="_blank">
          <i>
            <IconGithub />
          </i>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about_description_wrap {
  transition: all 1s ease;
  transform: translateX(-105%);
}
.swiper-slide-active .about_description_wrap {
  transform: translateX(0);
}
.about_description_area {
  overflow: hidden;
}
.description_title {
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 1.5rem;
}
.description_title span {
  color: var(--main-color);
}
.about_description {
  /*height: 118px; overflow-y: auto; padding-right: 1rem;*/
  margin-bottom: 2rem;
}
p {
  margin-bottom: 1.5rem;
  color: var(--gray-color);
  font-size: 1.125rem;
  line-height: 1.5;
  word-break: keep-all;
}
.description_icon_wrap {
  display: flex;
  gap: 1.5rem;
}
a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #374151;
  transition: all 0.4s ease;
}
a:hover {
  border-color: var(--main-color);
  color: var(--main-color);
}

i {
  line-height: 0;
  font-size: 1.25rem;
}

/* 반응형 */
@media (max-width: 1200px) {
  .description_title {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .description_title {
    font-size: 2.25rem;
  }

  p {
    font-size: 0.875rem;
  }

  a {
    width: 2.5rem;
    height: 2.5rem;
  }

  i {
    font-size: 1rem;
  }
}
</style>
