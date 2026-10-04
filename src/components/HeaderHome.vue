<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { t } from "../i18n/utils/translate";
import { translations } from "../i18n/store";
import { lenis } from "../composables/useScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { projectId } from "../composables/useRouteObserver";

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

type ActiveLink = "about" | "experience" | "certificates" | "projects" | "contact";
const activeLink = ref<ActiveLink | null>(null);
const sections: ActiveLink[] = ["about", "experience", "certificates", "projects", "contact"];
const ariaLabels = computed<Record<ActiveLink, string>>(() => ({
  about: t("about"),
  experience: t("experience"),
  certificates: t("certificates"),
  projects: t("projects"),
  contact: t("contact"),
}));

const isMounted = ref(false);

const barStyle = ref({ transform: "", width: "0px" });
const linkElements = ref<HTMLElement[]>([]);

const setLinkRef = (el: unknown, index: number) => {
  const element = (el as { $el?: HTMLElement } | HTMLElement | null) ?? null;
  const node = element && "$el" in element ? element.$el : (element as HTMLElement | null);
  if (node) linkElements.value[index] = node;
};

const { isDarkTheme, hasScrolledIntoView } = useHeaderTheme();

// Labels differ in length per language, so the pill is measured from the DOM
// rather than assuming a fixed item width.
const updateBarPosition = () => {
  const index = sections.indexOf(activeLink.value as ActiveLink);
  const element = linkElements.value[index];
  if (!element) return;

  barStyle.value = {
    transform: `translateX(${element.offsetLeft}px)`,
    width: `${element.offsetWidth}px`,
  };
};

watch(translations, () => nextTick(updateBarPosition));

onMounted(() => {
  window.addEventListener("resize", updateBarPosition);
  document.fonts?.ready.then(() => updateBarPosition());

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: `#${section}`,
      start: section === "about" ? "top 22.5%" : "top center",
      end: "bottom center",
      onEnter: () => {
        activeLink.value = section;
        updateBarPosition();
      },
      onEnterBack: () => {
        activeLink.value = section;
        updateBarPosition();
      },
      onLeave: () => (activeLink.value = null),
      onLeaveBack: () => (activeLink.value = null),
    });
  });

  ScrollTrigger.refresh();

  isMounted.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", updateBarPosition);
});
</script>

<template>
  <div :class="['header-home', { 'header-home-mounted': isMounted, 'header-home-isProjectPage': projectId !== null }]">
    <div :class="['header-home-links', { 'header-home-links-dark': isDarkTheme }]">
      <div
        :class="[
          'header-home-bar',
          { 'header-home-bar-active': activeLink !== null && hasScrolledIntoView, 'header-home-bar-dark': isDarkTheme },
        ]"
        :style="barStyle"
      ></div>
      <HeaderLink
        v-for="(section, index) in sections"
        :key="section"
        :ref="(el) => setLinkRef(el, index)"
        :is-active="activeLink === section"
        :class="[
          'header-home-link',
          { 'header-home-link-active': activeLink === section && hasScrolledIntoView },
          'children-unclickable',
        ]"
        @click="handleLinkClick('#' + section)"
        :is-dark-theme="isDarkTheme"
        :aria-label="ariaLabels[section]"
        data-sound="click"
        data-hoversound="hover"
      >
        {{ t(section) }}
      </HeaderLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-home {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-index-header-home);
  height: var(--height-header);
  align-items: center;
  justify-content: center;
  display: none;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    transform var(--transition-route-duration) var(--transition-route-ease);

  &-isProjectPage {
    transform: translateX(-50%) translateY(-100%);
  }

  &-mounted {
    opacity: 1;
  }

  @include mixins.mq("lg") {
    display: flex;
  }

  &-links {
    position: relative;
    display: flex;
    padding: 3px;
    background-color: var(--color-beige-500);
    border-radius: 100px;
    color: var(--color-text-400);
    transition:
      color 0.1s ease-in-out,
      background-color 0.1s ease-in-out;

    &-dark {
      background-color: var(--color-dark-blue-500);
      color: var(--color-white-400);
    }
  }

  &-bar {
    position: absolute;
    top: 3px;
    left: 0;
    height: calc(100% - 6px);
    background: var(--color-orange-400);
    border-radius: 100px;
    transition:
      transform 0.3s var(--ease-smooth),
      width 0.3s var(--ease-smooth),
      opacity 0.1s ease-in-out,
      background-color 0.1s ease-in-out;
    z-index: 1;
    opacity: 0;

    &-dark {
      background-color: var(--color-cyan-500);
    }

    &-active {
      opacity: 1;
    }
  }

  &-link {
    position: relative;
    z-index: 2;
    letter-spacing: 0.02em;
    font-weight: 700;
    border: none;
    background: none;
    transition: color 0.1s ease-in-out;
    font-size: var(--font-size-md);
    white-space: nowrap;
    text-transform: uppercase;

    &-active {
      color: var(--color-white-400);
    }
  }
}
</style>
