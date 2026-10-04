<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { t } from "../../../i18n/utils/translate";
import { lenis } from "../../../composables/useScroll";
import PlusIcon from "../../../components/icons/Plus.vue";
import DownloadIcon from "../../../components/icons/Download.vue";

const props = defineProps<{
  certificate: {
    title: string;
    preview: string;
    file: string;
    downloadName: string;
  } | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const closeRef = ref<HTMLButtonElement | null>(null);
const imageLoaded = ref(false);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") emit("close");
};

watch(
  () => props.certificate,
  (certificate) => {
    if (certificate) {
      imageLoaded.value = false;
      lenis.value?.stop();
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeydown);
      // Wait for the dialog to render before moving focus into it.
      requestAnimationFrame(() => closeRef.value?.focus());
    } else {
      lenis.value?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    }
  },
);

onBeforeUnmount(() => {
  lenis.value?.start();
  document.documentElement.style.overflow = "";
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="props.certificate"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="props.certificate.title"
        @click.self="emit('close')"
      >
        <div class="lightbox-panel">
          <header class="lightbox-head">
            <p class="lightbox-head-title">{{ props.certificate.title }}</p>
            <button
              ref="closeRef"
              type="button"
              class="lightbox-close"
              :aria-label="t('close')"
              data-sound="click"
              data-hoversound="hover"
              @click="emit('close')"
            >
              <PlusIcon class="lightbox-close-icon" />
            </button>
          </header>

          <div class="lightbox-body">
            <div class="lightbox-document" :class="{ 'lightbox-document-loaded': imageLoaded }">
              <span v-if="!imageLoaded" class="lightbox-spinner" aria-hidden="true"></span>
              <img
                :src="props.certificate.preview"
                :alt="props.certificate.title"
                class="lightbox-document-image"
                width="1400"
                height="1980"
                decoding="async"
                @load="imageLoaded = true"
              />
            </div>
          </div>

          <footer class="lightbox-foot">
            <a
              :href="props.certificate.file"
              target="_blank"
              rel="noopener noreferrer"
              class="lightbox-action lightbox-action-primary"
              data-sound="click"
              data-hoversound="hover"
            >
              {{ t("open-pdf") }}
            </a>
            <a
              :href="props.certificate.file"
              :download="props.certificate.downloadName"
              class="lightbox-action"
              data-sound="click"
              data-hoversound="hover"
            >
              <DownloadIcon class="lightbox-action-icon" />
              {{ t("download-pdf") }}
            </a>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-preloader);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-outer);
  padding-top: max(var(--space-outer), env(safe-area-inset-top));
  padding-bottom: max(var(--space-outer), env(safe-area-inset-bottom));
  background: rgba(21, 17, 12, 0.72);
  backdrop-filter: blur(6px);

  &-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 760px;
    // A definite height is what lets the document below be bounded by the
    // panel instead of overflowing past the header and footer.
    height: 100%;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background: var(--color-beige-400);
    border: 1px solid rgba(92, 76, 58, 0.18);
    box-shadow: 0 32px 80px rgba(23, 16, 8, 0.38);
  }

  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-sm) var(--space-sm) var(--space-md);
    border-bottom: 1px solid rgba(92, 76, 58, 0.14);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.2));

    &-title {
      font-size: var(--font-size-md);
      font-weight: 700;
      line-height: 1.25;
      color: var(--color-text-400);

      @include mixins.mq("md") {
        font-size: var(--font-size-lg);
      }
    }
  }

  &-close {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(52, 91, 124, 0.2);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.72);
    cursor: pointer;
    transition:
      background-color 0.18s ease,
      transform 0.18s ease;

    &-icon {
      width: var(--icon-size-xs);
      --icon-color: var(--color-text-400);
      transform: rotate(45deg);
    }

    @include mixins.hover {
      &:hover {
        background: var(--color-text-400);
        transform: rotate(90deg);

        .lightbox-close-icon {
          --icon-color: var(--color-beige-400);
        }
      }
    }
  }

  // The document is centred and bounded by the panel, so the whole page is
  // always visible without scrolling — at any viewport size.
  &-body {
    position: relative;
    flex: 1;
    min-height: 0;
    padding: var(--space-md);
    background:
      radial-gradient(circle at top, rgba(52, 91, 124, 0.08), transparent 55%),
      var(--color-beige-500);
  }

  &-document {
    // Absolute insets give the box a definite size, so the image's
    // max-height below has something to resolve against.
    position: absolute;
    inset: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: center;

    &-image {
      display: block;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      border-radius: var(--radius-sm);
      box-shadow: 0 18px 44px rgba(45, 33, 18, 0.22);
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    &-loaded &-image {
      opacity: 1;
    }
  }

  &-spinner {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid rgba(52, 91, 124, 0.22);
    border-top-color: var(--color-text-300);
    animation: lightbox-spin 0.8s linear infinite;
  }

  &-foot {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    padding-bottom: max(var(--space-sm), env(safe-area-inset-bottom));
    border-top: 1px solid rgba(92, 76, 58, 0.14);
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.2));
  }

  &-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    flex: 1 1 auto;
    min-height: 44px;
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid rgba(52, 91, 124, 0.22);
    background: rgba(255, 255, 255, 0.64);
    color: var(--color-text-400);
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-decoration: none;
    transition:
      transform 0.18s ease,
      background-color 0.18s ease,
      border-color 0.18s ease;

    &-icon {
      width: var(--icon-size-xs);
      --icon-color: currentColor;
    }

    &-primary {
      background: var(--color-text-400);
      border-color: var(--color-text-400);
      color: var(--color-beige-400);
    }

    @include mixins.hover {
      &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.86);
      }

      &-primary:hover {
        background: var(--color-dark-blue-500);
        border-color: var(--color-dark-blue-500);
        color: var(--color-white-400);
      }
    }
  }
}

@keyframes lightbox-spin {
  to {
    transform: rotate(360deg);
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;

  .lightbox-panel {
    transition: transform 0.28s var(--ease-smooth);
  }
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .lightbox-panel {
    transform: translateY(16px) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active,
  .lightbox-leave-active {
    transition: none;

    .lightbox-panel {
      transition: none;
    }
  }

  .lightbox-spinner {
    animation: none;
  }
}
</style>
