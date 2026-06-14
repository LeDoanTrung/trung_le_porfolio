<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import { lenis } from "../../../composables/useScroll";

gsap.registerPlugin(ScrollTrigger);

type ExperienceEntry = {
  role: string;
  company: string;
  project: string;
  period: string;
  client: string;
  domain: string;
  technologies: string[];
  responsibilities: string[];
};

const EXPERIENCE_EN: ExperienceEntry[] = [
  {
    role: "Test Consultant",
    company: "Netcompany",
    project: "Trader Support Service (TSS)",
    period: "12/2025 – Present",
    client: "GOV.UK",
    domain: "Government / Customs & Trade – Online Customs Declaration Support Platform",
    technologies: ["Playwright + TypeScript", "Postman", "Azure DevOps", "GitHub Copilot"],
    responsibilities: [
      "Designed and implemented a scalable Playwright + TypeScript automation framework for end-to-end testing.",
      "Created test design, scenarios, and detailed test cases from functional requirements and workflows.",
      "Collaborated with BAs and developers to align test coverage with business and regulatory needs.",
      "Executed manual, automated, API, accessibility, and AI chatbot testing; maintained a focused regression suite.",
    ],
  },
  {
    role: "Automation Test Engineer",
    company: "Nash Tech",
    project: "Digital Transformation",
    period: "10/2024 – Present",
    client: "Online Exam Registration Platform",
    domain: "Education",
    technologies: ["Robot Framework + Python", "AWS", "Jira", "GitHub Copilot"],
    responsibilities: [
      "Migrated manual test cases into automated scripts to broaden coverage and reduce manual effort.",
      "Maintained regression suites and monitored CI/CD execution reports to quickly detect failures.",
      "Integrated automation into AWS pipelines and used Jira for traceability, defect tracking, and sprint coordination.",
      "Partnered with QA and development teams to keep coverage strong on frequently changing modules.",
    ],
  },
];

const EXPERIENCE_VN: ExperienceEntry[] = [
  {
    role: "Test Consultant",
    company: "Netcompany",
    project: "Trader Support Service (TSS)",
    period: "12/2025 – Hiện tại",
    client: "GOV.UK",
    domain: "Chính phủ / Hải quan & Thương mại – Nền tảng hỗ trợ khai báo hải quan trực tuyến",
    technologies: ["Playwright + TypeScript", "Postman", "Azure DevOps", "GitHub Copilot"],
    responsibilities: [
      "Thiết kế và xây dựng framework automation với Playwright + TypeScript cho end-to-end testing.",
      "Tạo test design, test scenarios và test cases chi tiết từ yêu cầu chức năng và luồng nghiệp vụ.",
      "Phối hợp với BA và Developer để đảm bảo test coverage phù hợp với yêu cầu nghiệp vụ và quy định.",
      "Thực hiện manual, automation, API, accessibility và AI chatbot testing; duy trì bộ regression tập trung.",
    ],
  },
  {
    role: "Automation Test Engineer",
    company: "Nash Tech",
    project: "Digital Transformation",
    period: "10/2024 – Hiện tại",
    client: "Nền tảng đăng ký thi trực tuyến",
    domain: "Giáo dục",
    technologies: ["Robot Framework + Python", "AWS", "Jira", "GitHub Copilot"],
    responsibilities: [
      "Chuyển các test case manual sang automation script để mở rộng coverage và giảm công sức thủ công.",
      "Duy trì regression suite và theo dõi báo cáo CI/CD để phát hiện nhanh test fail.",
      "Tích hợp automation với pipeline AWS và dùng Jira cho traceability, bug tracking, sprint coordination.",
      "Phối hợp với QA manual và dev để đảm bảo coverage tốt ở các module thay đổi thường xuyên.",
    ],
  },
];

const entries = computed(() => (locale.value === "vn" ? EXPERIENCE_VN : EXPERIENCE_EN));
const quickNavItems = computed(() => [
  { label: t("about"), target: "#about" },
  { label: t("experience"), target: "#experience" },
  { label: t("projects"), target: "#projects" },
  { label: t("contact"), target: "#contact" },
]);

const wrapperRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);
const tlRef = ref<gsap.core.Timeline | null>(null);

const initAnimation = () => {
  if (!wrapperRef.value || !titleRef.value || !timelineRef.value) return;

  tlRef.value?.kill();

  const cardElements = Array.from(timelineRef.value.querySelectorAll<HTMLElement>(".experience-card"));
  const line = timelineRef.value.querySelector<HTMLElement>(".experience-timeline-line");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top 70%",
      once: true,
    },
  });

  tl.fromTo(titleRef.value, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0)
    .fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: "none", transformOrigin: "top center" }, 0.15)
    .fromTo(cardElements, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" }, 0.2);

  tlRef.value = tl;
};

const scrollToTarget = (target: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(target);
};

onMounted(() => {
  initAnimation();
});

onUnmounted(() => {
  tlRef.value?.scrollTrigger?.kill();
  tlRef.value?.kill();
  tlRef.value = null;
});
</script>

<template>
  <section ref="wrapperRef" class="experience">
    <div class="grid experience-grid">
      <div ref="titleRef" class="experience-header">
        <p class="experience-kicker">{{ t("experience") }}</p>
        <h2 class="experience-title">Career timeline</h2>
        <p class="experience-copy">
          Automation Test Engineer roles focused on scalable test frameworks, API validation, accessibility, and CI/CD delivery.
        </p>

        <div class="experience-quick-nav">
          <button
            v-for="item in quickNavItems"
            :key="item.target"
            type="button"
            class="experience-quick-nav-item"
            @click="scrollToTarget(item.target)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div ref="timelineRef" class="experience-timeline">
        <div class="experience-timeline-line"></div>

        <article v-for="(entry, index) in entries" :key="`${entry.company}-${entry.role}`" class="experience-card">
          <div class="experience-card-badge">{{ String(index + 1).padStart(2, "0") }}</div>

          <div class="experience-card-head">
            <div>
              <p class="experience-card-role">{{ entry.role }}</p>
              <p class="experience-card-company">{{ entry.company }}</p>
            </div>
            <p class="experience-card-period">{{ entry.period }}</p>
          </div>

          <div class="experience-card-meta">
            <p><span>Project:</span> {{ entry.project }}</p>
            <p><span>Client:</span> {{ entry.client }}</p>
            <p><span>Domain:</span> {{ entry.domain }}</p>
          </div>

          <div class="experience-card-tech">
            <span v-for="tech in entry.technologies" :key="tech" class="experience-card-tech-item">{{ tech }}</span>
          </div>

          <ul class="experience-card-list">
            <li v-for="item in entry.responsibilities" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience {
  position: relative;
  width: 100%;
  min-height: calc(var(--lvh) * 100);
  padding: 96px var(--space-outer);
  background:
    radial-gradient(circle at top left, rgba(29, 79, 112, 0.08), transparent 40%),
    linear-gradient(180deg, var(--color-beige-400) 0%, var(--color-beige-500) 100%);

  @include mixins.mq("md") {
    padding-top: 128px;
    padding-bottom: 128px;
  }

  &-grid {
    display: grid;
    gap: var(--space-xxl);
    align-items: start;

    @include mixins.mq("lg") {
      grid-template-columns: 0.9fr 1.6fr;
      gap: var(--space-xxxl);
    }
  }

  &-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-width: 540px;
    position: sticky;
    top: 96px;
    align-self: start;

    @include mixins.mq("lg") {
      top: 128px;
    }
  }

  &-kicker {
    display: inline-flex;
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background-color: var(--color-text-400);
    color: var(--color-beige-400);
    font-size: var(--font-size-sm);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  &-title {
    font-size: var(--font-size-title-lg);
    font-weight: 900;
    letter-spacing: 0.02em;

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-copy {
    max-width: 460px;
    font-size: var(--font-size-lg);
    color: var(--color-text-300);
    line-height: 1.55;
  }

  &-quick-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &-item {
      appearance: none;
      border: 1px solid rgba(52, 91, 124, 0.18);
      background: rgba(255, 255, 255, 0.58);
      color: var(--color-text-400);
      padding: 10px 14px;
      border-radius: 999px;
      font-size: var(--font-size-sm);
      font-weight: 700;
      letter-spacing: 0.03em;
      transition:
        transform 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;

      @include mixins.hover {
        &:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(52, 91, 124, 0.28);
        }
      }
    }
  }

  &-timeline {
    position: relative;
    display: grid;
    gap: var(--space-lg);
    padding-left: 16px;

    @include mixins.mq("lg") {
      padding-left: 34px;
    }

    &-line {
      position: absolute;
      left: 0;
      top: 18px;
      width: 2px;
      height: calc(100% - 18px);
      transform-origin: top center;
      background: linear-gradient(180deg, rgba(52, 91, 124, 0.95), rgba(52, 91, 124, 0.2));
    }
  }

  &-card {
    position: relative;
    padding: 28px 28px 24px;
    border-radius: var(--radius-xl);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.5)),
      var(--color-beige-400);
    border: 1px solid rgba(92, 76, 58, 0.14);
    box-shadow: 0 18px 44px rgba(77, 57, 36, 0.08);
    backdrop-filter: blur(10px);
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      left: -1px;
      top: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(180deg, #345b7c 0%, #8fc7df 100%);
    }

    @include mixins.hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 24px 54px rgba(77, 57, 36, 0.12);
      }
    }

    & + & {
      margin-top: 2px;
    }

    &-badge {
      display: inline-flex;
      width: fit-content;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(52, 91, 124, 0.12);
      color: var(--color-text-400);
      font-size: var(--font-size-sm);
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: var(--space-md);
    }

    &-head {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      margin-bottom: var(--space-md);

      @include mixins.mq("md") {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--space-md);
      }
    }

    &-role {
      font-size: var(--font-size-title-sm);
      font-weight: 900;
      line-height: 1.1;
    }

    &-company {
      font-size: var(--font-size-lg);
      color: var(--color-text-300);
      margin-top: 4px;
    }

    &-period {
      width: fit-content;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(52, 91, 124, 0.1);
      color: var(--color-text-300);
      font-size: var(--font-size-sm);
      white-space: nowrap;
    }

    &-meta {
      display: grid;
      gap: 6px;
      margin-bottom: var(--space-md);
      color: var(--color-text-300);
      line-height: 1.5;

      span {
        color: var(--color-text-400);
        font-weight: 700;
      }
    }

    &-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: var(--space-md);

      &-item {
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(16, 51, 84, 0.08);
        color: var(--color-text-400);
        font-size: var(--font-size-sm);
      }
    }

    &-list {
      display: grid;
      gap: 10px;
      padding-left: 18px;
      color: var(--color-text-300);
      line-height: 1.55;

      li {
        position: relative;
      }

      li::marker {
        color: var(--color-text-300);
      }
    }
  }
}
</style>