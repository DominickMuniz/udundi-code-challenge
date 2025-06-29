/* views>HomePage.vue - Modal Animation Logic This component defines a morphing modal UI triggered
by a button labeled "More Details". - The modal animates from a scaled-down origin (anchored to the
button) to full size using transform: scale(). - Content inside the modal fades in from the left
with a delayed opacity + translateX transition. - The reverse animation plays on close: content
fades out, then the modal scales back down. Script Section: - `showModal`: controls modal open/close
state - `contentVisible`: controls whether modal inner content should fade in/out - `toggleModal()`:
opens the modal (with requestAnimationFrame to force proper layout frame timing) and triggers
content fade - `onModalTransitionEnd()`: hides the content after the modal is done closing to allow
transitions to complete without being cut off CSS handles the animation and scale transformation,
while Vue's state toggles the necessary classes to trigger those transitions. */

<template>
  <div class="hero-container mobile-full-vh">
    <!-- Hero image as a square on mobile, left panel on desktop -->
    <div class="hero-image-square block lg:hidden relative">
      <div class="hero-image-gradient-overlay"></div>
      <!-- Overlapping red panel for mobile, visually integrated -->
      <div class="mobile-red-panel-modern">
        <div class="modern-mobile-content">
          <h1 class="hero-title modern-mobile-title">Explore</h1>
          <button class="hero-button modern-mobile-btn" @click="toggleModal">
            <img src="@/assets/base-app-images/icon-plus.svg" class="plus-icon" alt="" />
            <span class="hero-button-label">More Details</span>
          </button>
          <!-- Mobile modal overlay -->
          <div
            v-if="!isFullyClosed"
            class="hero-modal mobile-modal-fix"
            :class="{
              'scale-100': showModal,
              'scale-0': !showModal,
            }"
            :style="{ visibility: isFullyClosed ? 'hidden' : 'visible' }"
            @transitionend="onModalTransitionEnd"
          >
            <div
              class="modal-content modern-mobile-modal-content"
              :class="{
                'fade-in': showModal && contentVisible,
                'fade-out': !showModal && contentVisible,
              }"
            >
              <img
                src="@/assets/base-app-images/icon-close.svg"
                alt="Close"
                @click="toggleModal"
                class="modal-close"
              />
              <h2 class="modal-title modern-mobile-modal-title">Explore</h2>
              <p class="modal-text modern-mobile-modal-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
                numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </p>
              <button class="modal-read-more">READ MORE</button>
            </div>
          </div>
          <div class="modern-social-icons-pill">
            <img
              src="@/assets/base-app-images/icon-facebook.svg"
              class="social-icon social-icon-white"
              alt="Facebook"
            />
            <img
              src="@/assets/base-app-images/icon-instagram.svg"
              class="social-icon social-icon-white"
              alt="Instagram"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Desktop red panel -->
    <div class="hero-left-panel mobile-hide">
      <div class="hero-content">
        <h1
          :class="{
            'opacity-0 -translate-x-10': showModal,
            'opacity-100 translate-x-0': !showModal,
          }"
          class="hero-title"
        >
          Explore
        </h1>
        <div class="hero-modal-wrapper">
          <button class="hero-button" @click="toggleModal">
            <img src="@/assets/base-app-images/icon-plus.svg" class="plus-icon" alt="" />
            <span class="hero-button-label">More Details</span>
          </button>
          <!-- Modal (works for both mobile and desktop, but overlays on mobile) -->
          <div
            class="hero-modal modern-mobile-modal"
            :class="{
              'scale-100': showModal,
              'scale-0': !showModal,
              'mobile-modal-fix': showModal, // add overlay/fixed only when open on mobile
            }"
            :style="{ visibility: isFullyClosed ? 'hidden' : 'visible' }"
            @transitionend="onModalTransitionEnd"
          >
            <div
              class="modal-content modern-mobile-modal-content"
              :class="{
                'fade-in': showModal && contentVisible,
                'fade-out': !showModal && contentVisible,
              }"
            >
              <img
                src="@/assets/base-app-images/icon-close.svg"
                alt="Close"
                @click="toggleModal"
                class="modal-close"
              />
              <h2 class="modal-title modern-mobile-modal-title">Explore</h2>
              <p class="modal-text modern-mobile-modal-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
                numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </p>
              <button class="modal-read-more">READ MORE</button>
            </div>
          </div>
        </div>
        <div class="modern-social-icons-pill desktop-social-icons">
          <img
            src="@/assets/base-app-images/icon-facebook.svg"
            class="social-icon social-icon-white"
            alt="Facebook"
          />
          <img
            src="@/assets/base-app-images/icon-instagram.svg"
            class="social-icon social-icon-white"
            alt="Instagram"
          />
        </div>
      </div>
    </div>
    <!-- Hide the right panel on mobile, only show on large screens -->
    <div class="hidden lg:block lg:w-2/3"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showModal = ref(false)
const contentVisible = ref(false)
const isFullyClosed = ref(true)

const toggleModal = () => {
  if (!showModal.value) {
    isFullyClosed.value = false
    contentVisible.value = true
    requestAnimationFrame(() => {
      showModal.value = true
    })
  } else {
    showModal.value = false
  }
}

const onModalTransitionEnd = () => {
  if (!showModal.value) {
    contentVisible.value = false
    isFullyClosed.value = true
  }
}
</script>

<style src="@/assets/main.css"></style>
