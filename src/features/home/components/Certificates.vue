<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import CertificateLightbox from "./CertificateLightbox.vue";
import ExpandIcon from "../../../components/icons/Expand.vue";
import DownloadIcon from "../../../components/icons/Download.vue";

gsap.registerPlugin(ScrollTrigger);

type Certificate = {
  id: string;
  level: "advanced" | "foundation";
  levelLabel: string;
  title: string;
  acronym: string;
  issuer: string;
  authority: string;
  issued: string;
  syllabus: string;
  number: string;
  topics: string[];
  file: string;
  preview: string;
};

// Public assets must go through BASE_URL — the site is served from a sub-path on GitHub Pages.
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const CERTIFICATES_EN: Certificate[] = [
  {
    id: "ctal-tae",
    level: "advanced",
    levelLabel: "Advanced Level",
    title: "ISTQB® Certified Tester Advanced Level – Test Automation Engineering",
    acronym: "CTAL-TAE",
    issuer: "Brightest GmbH",
    authority: "Authorized by SSTQB",
    issued: "03 October 2026",
    syllabus: "Syllabus 2.0",
    number: "Brightest2026037664",
    topics: [
      "Objectives and Preparing for Test Automation",
      "Preparing for Test Automation",
      "Test Automation Architecture",
      "Implementing Test Automation",
      "Implementing Deployment Strategies for Test Automation",
      "Test Automation Reporting and Metrics",
      "Verifying the Test Automation Solution (TAS)",
      "Continuous Improvement",
    ],
    file: asset("certificates/istqb-ctal-tae.pdf"),
    preview: asset("certificates/istqb-ctal-tae.webp"),
  },
  {
    id: "ctfl",
    level: "foundation",
    levelLabel: "Foundation Level",
    title: "ISTQB® Certified Tester Foundation Level",
    acronym: "CTFL",
    issuer: "Brightest GmbH",
    authority: "Authorized by SSTQB",
    issued: "28 September 2025",
    syllabus: "Syllabus 4.0",
    number: "Brightest2025032409",
    topics: [
      "Fundamentals of Testing",
      "Testing throughout the Software Development Lifecycle",
      "Static Testing",
      "Test Analysis and Design",
      "Managing the Test Activities",
      "Test Tools",
    ],
    file: asset("certificates/istqb-ctfl.pdf"),
    preview: asset("certificates/istqb-ctfl.webp"),
  },
];

const CERTIFICATES_VN: Certificate[] = [
  {
    ...CERTIFICATES_EN[0]!,
    levelLabel: "Advanced Level",
    title: "ISTQB® Certified Tester Advanced Level – Test Automation Engineering",
    authority: "Được ủy quyền bởi SSTQB",
    issued: "03 tháng 10, 2026",
    syllabus: "Syllabus 2.0",
    topics: [
      "Mục tiêu và chuẩn bị cho kiểm thử tự động",
      "Chuẩn bị triển khai kiểm thử tự động",
      "Kiến trúc kiểm thử tự động",
      "Triển khai kiểm thử tự động",
      "Chiến lược triển khai cho kiểm thử tự động",
      "Báo cáo và chỉ số kiểm thử tự động",
      "Kiểm chứng giải pháp kiểm thử tự động (TAS)",
      "Cải tiến liên tục",
    ],
  },
  {
    ...CERTIFICATES_EN[1]!,
    levelLabel: "Foundation Level",
    title: "ISTQB® Certified Tester Foundation Level",
    authority: "Được ủy quyền bởi SSTQB",
    issued: "28 tháng 9, 2025",
    syllabus: "Syllabus 4.0",
    topics: [
      "Nền tảng kiểm thử phần mềm",
      "Kiểm thử xuyên suốt vòng đời phát triển phần mềm",
      "Kiểm thử tĩnh",
      "Phân tích và thiết kế kiểm thử",
      "Quản lý hoạt động kiểm thử",
      "Công cụ kiểm thử",
    ],
  },
];

const certificates = computed(() => (locale.value === "vn" ? CERTIFICATES_VN : CERTIFICATES_EN));

const openedId = ref<string | null>(null);
const expandedId = ref<string | null>(null);

const openedCertificate = computed(() => {
  const certificate = certificates.value.find((item) => item.id === openedId.value);
  if (!certificate) return null;

  return {
    title: `${certificate.title} (${certificate.acronym})`,
    preview: certificate.preview,
    file: certificate.file,
    downloadName: `Le-Doan-Trung-ISTQB-${certificate.acronym}.pdf`,
  };
});

const toggleTopics = (id: string) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const wrapperRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const tlRef = ref<gsap.core.Timeline | null>(null);

const initAnimation = () => {
  if (!wrapperRef.value || !titleRef.value || !listRef.value) return;

  tlRef.value?.kill();

  const cardElements = Array.from(listRef.value.querySelectorAll<HTMLElement>(".certificates-card"));

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top 70%",
      once: true,
    },
  });

  tl.fromTo(titleRef.value, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0).fromTo(
    cardElements,
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" },
    0.15,
  );

  tlRef.value = tl;
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
  <section ref="wrapperRef" class="certificates">
    <div class="grid certificates-grid">
      <div ref="titleRef" class="certificates-header">
        <p class="certificates-kicker">{{ t("certificates") }}</p>
        <h2 class="certificates-title">{{ t("certificates-title") }}</h2>
        <p class="certificates-copy">{{ t("certificates-intro") }}</p>
      </div>

      <div ref="listRef" class="certificates-list">
        <article v-for="certificate in certificates" :key="certificate.id" class="certificates-card">
          <button
            type="button"
            class="certificates-card-preview"
            :aria-label="`${t('view-certificate')} — ${certificate.title}`"
            data-sound="click"
            data-hoversound="hover"
            @click="openedId = certificate.id"
          >
            <img
              :src="certificate.preview"
              :alt="certificate.title"
              class="certificates-card-preview-image"
              width="1400"
              height="1980"
              loading="lazy"
              decoding="async"
            />
            <span class="certificates-card-preview-overlay">
              <ExpandIcon class="certificates-card-preview-overlay-icon" />
            </span>
          </button>

          <div class="certificates-card-body">
            <div class="certificates-card-tags">
              <span :class="['certificates-card-level', `certificates-card-level-${certificate.level}`]">
                {{ certificate.levelLabel }}
              </span>
              <span class="certificates-card-acronym">{{ certificate.acronym }}</span>
            </div>

            <h3 class="certificates-card-title">{{ certificate.title }}</h3>
            <p class="certificates-card-issuer">{{ certificate.issuer }} · {{ certificate.authority }}</p>

            <dl class="certificates-card-meta">
              <div class="certificates-card-meta-row">
                <dt>{{ t("issued-on") }}</dt>
                <dd>{{ certificate.issued }}</dd>
              </div>
              <div class="certificates-card-meta-row">
                <dt>{{ t("certificate-no") }}</dt>
                <dd class="certificates-card-meta-mono">{{ certificate.number }}</dd>
              </div>
              <div class="certificates-card-meta-row">
                <dt>{{ t("syllabus") }}</dt>
                <dd>{{ certificate.syllabus }}</dd>
              </div>
            </dl>

            <div class="certificates-card-topics">
              <button
                type="button"
                class="certificates-card-topics-toggle"
                :aria-expanded="expandedId === certificate.id"
                :aria-controls="`certificate-topics-${certificate.id}`"
                data-sound="click"
                data-hoversound="hover"
                @click="toggleTopics(certificate.id)"
              >
                {{ t("syllabus-content") }}
                <span class="certificates-card-topics-count">{{ certificate.topics.length }}</span>
                <span
                  class="certificates-card-topics-chevron"
                  :class="{ 'certificates-card-topics-chevron-open': expandedId === certificate.id }"
                  aria-hidden="true"
                ></span>
              </button>

              <ul
                v-show="expandedId === certificate.id"
                :id="`certificate-topics-${certificate.id}`"
                class="certificates-card-topics-list"
              >
                <li v-for="topic in certificate.topics" :key="topic">{{ topic }}</li>
              </ul>
            </div>

            <div class="certificates-card-actions">
              <button
                type="button"
                class="certificates-card-action certificates-card-action-primary"
                data-sound="click"
                data-hoversound="hover"
                @click="openedId = certificate.id"
              >
                <ExpandIcon class="certificates-card-action-icon" />
                {{ t("view-certificate") }}
              </button>
              <a
                :href="certificate.file"
                :download="`Le-Doan-Trung-ISTQB-${certificate.acronym}.pdf`"
                class="certificates-card-action"
                data-sound="click"
                data-hoversound="hover"
              >
                <DownloadIcon class="certificates-card-action-icon" />
                {{ t("download-pdf") }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>

    <CertificateLightbox :certificate="openedCertificate" @close="openedId = null" />
  </section>
</template>

<style scoped lang="scss">
.certificates {
  position: relative;
  width: 100%;
  padding: 96px var(--space-outer);
  background:
    radial-gradient(circle at top right, rgba(29, 79, 112, 0.08), transparent 42%),
    linear-gradient(180deg, var(--color-beige-500) 0%, var(--color-beige-400) 100%);

  @include mixins.mq("md") {
    padding-top: 128px;
    padding-bottom: 128px;
  }

  &-grid {
    align-items: start;
    row-gap: var(--space-xxl);

    @include mixins.mq("lg") {
      row-gap: var(--space-xxxl);
    }
  }

  &-header {
    grid-column: 1 / -1;
    // Without this, the card's min-content width inflates the 12 shared grid
    // tracks and the section scrolls sideways on narrow screens.
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-width: 540px;
    align-self: start;

    @include mixins.mq("lg") {
      grid-column: 1 / span 5;
      position: sticky;
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
    line-height: var(--line-height-title);

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

  &-list {
    grid-column: 1 / -1;
    min-width: 0;
    display: grid;
    gap: var(--space-lg);

    @include mixins.mq("lg") {
      grid-column: 6 / -1;
    }
  }

  &-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: 20px 18px;
    border-radius: var(--radius-xl);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.5)),
      var(--color-beige-400);
    border: 1px solid rgba(92, 76, 58, 0.14);
    box-shadow: 0 18px 44px rgba(77, 57, 36, 0.08);
    overflow-wrap: anywhere;

    @include mixins.mq("md") {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--space-lg);
      padding: 28px;
    }

    @include mixins.hover {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 24px 54px rgba(77, 57, 36, 0.12);
      }
    }

    // The document thumbnail doubles as the button that opens the lightbox.
    &-preview {
      position: relative;
      flex-shrink: 0;
      align-self: center;
      width: 164px;
      max-width: 100%;
      padding: 0;
      border: 1px solid rgba(92, 76, 58, 0.18);
      border-radius: var(--radius-sm);
      background: var(--color-white-400);
      box-shadow: 0 10px 26px rgba(45, 33, 18, 0.14);
      overflow: hidden;
      cursor: pointer;
      line-height: 0;

      @include mixins.mq("md") {
        align-self: flex-start;
        width: 150px;
      }

      @include mixins.mq("xl") {
        width: 178px;
      }

      &-image {
        display: block;
        width: 100%;
        height: auto;
      }

      &-overlay {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        background: rgba(21, 38, 56, 0.44);
        opacity: 0;
        transition: opacity 0.2s ease;

        &-icon {
          width: var(--icon-size-md);
          --icon-color: var(--color-white-400);
          --stroke-width: var(--stroke-lg);
        }
      }

      &:focus-visible &-overlay {
        opacity: 1;
      }

      @include mixins.hover {
        &:hover .certificates-card-preview-overlay {
          opacity: 1;
        }
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      min-width: 0;
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-xs);
    }

    &-level {
      padding: 6px 12px;
      border-radius: 999px;
      font-size: var(--font-size-xs);
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;

      &-advanced {
        background: rgba(130, 36, 94, 0.12);
        color: #7c2a5c;
      }

      &-foundation {
        background: rgba(52, 91, 124, 0.14);
        color: #2d5b7c;
      }
    }

    &-acronym {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px dashed rgba(52, 91, 124, 0.32);
      color: var(--color-text-300);
      font-size: var(--font-size-xs);
      font-weight: 700;
      letter-spacing: 0.06em;
    }

    &-title {
      font-size: var(--font-size-xl);
      font-weight: 900;
      line-height: 1.2;

      @include mixins.mq("md") {
        font-size: var(--font-size-title-sm);
      }
    }

    &-issuer {
      font-size: var(--font-size-sm);
      color: var(--color-text-300);
    }

    &-meta {
      display: grid;
      gap: 6px;
      font-size: var(--font-size-sm);

      &-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);

        dt {
          color: var(--color-text-300);
          min-width: 108px;
        }

        dd {
          color: var(--color-text-400);
          font-weight: 700;
        }
      }

      &-mono {
        font-family: "ProFontWindows", monospace;
        letter-spacing: 0.04em;
      }
    }

    &-topics {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);

      &-toggle {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        width: fit-content;
        min-height: 40px;
        padding: 8px 14px;
        border: 1px solid rgba(52, 91, 124, 0.18);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.58);
        color: var(--color-text-400);
        font-size: var(--font-size-sm);
        font-weight: 700;
        cursor: pointer;
        transition:
          background-color 0.18s ease,
          border-color 0.18s ease;

        @include mixins.hover {
          &:hover {
            background: rgba(255, 255, 255, 0.86);
            border-color: rgba(52, 91, 124, 0.3);
          }
        }
      }

      &-count {
        display: grid;
        place-items: center;
        min-width: 20px;
        height: 20px;
        padding: 0 6px;
        border-radius: 999px;
        background: rgba(52, 91, 124, 0.14);
        font-size: var(--font-size-xxs);
      }

      &-chevron {
        width: 8px;
        height: 8px;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: translateY(-2px) rotate(45deg);
        transition: transform 0.2s ease;

        &-open {
          transform: translateY(1px) rotate(225deg);
        }
      }

      &-list {
        display: grid;
        gap: 8px;
        padding-left: 18px;
        font-size: var(--font-size-sm);
        color: var(--color-text-300);
        line-height: 1.5;

        li::marker {
          color: var(--color-text-cyan-300);
        }
      }
    }

    &-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-top: var(--space-xxs);
    }

    &-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      flex: 1 1 160px;
      min-height: 44px;
      padding: 10px 18px;
      border-radius: 999px;
      border: 1px solid rgba(52, 91, 124, 0.22);
      background: rgba(255, 255, 255, 0.62);
      color: var(--color-text-400);
      font-size: var(--font-size-sm);
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition:
        transform 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;

      &-icon {
        width: var(--icon-size-xs);
        --icon-color: currentColor;
        --stroke-width: var(--stroke-md);
      }

      &-primary {
        background: var(--color-text-400);
        border-color: var(--color-text-400);
        color: var(--color-beige-400);
      }

      @include mixins.hover {
        &:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.88);
        }

        &-primary:hover {
          background: var(--color-dark-blue-500);
          border-color: var(--color-dark-blue-500);
          color: var(--color-white-400);
        }
      }
    }
  }
}
</style>
