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
        <div class="modern-mobile-content" style="gap: 36px; display: flex">
          <h1
            :class="{
              'opacity-0 -translate-x-10': showModal,
              'opacity-100 translate-x-0': !showModal,
            }"
            class="hero-title"
          >
            Explore
          </h1>

          <span style="color: white; padding-top: 16px">
            Mobile version of the keyframe transition is NOT built out. Please view it in desktop or
            <router-link to="/" style="color: #add8e6; text-decoration: underline">
              switch to the CSS Transition version</router-link
            >.
          </span>
          <div class="modern-social-icons-pill">
            <!-- Clean SVG for Facebook -->
            <svg
              class="social-icon social-icon-white"
              viewBox="0 0 74 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M34.0481 67.9883C53.5399 68.4874 69.1078 52.9741 68.9989 34.5363C69.089 16.2649 54.197 1.50209 36.0007 1.01407C17.2174 0.483175 1.55347 15.0455 1.01429 33.5399C0.475103 52.0343 15.2649 67.4574 34.0481 67.9883ZM42.9736 34.7175H38.2874C38.2874 35.0973 38.2874 35.476 38.2874 35.8539C38.2871 40 38.2868 44.033 38.3212 48.0753C38.3212 48.7065 38.3171 49.3372 38.3129 49.9677C38.3045 51.2285 38.2962 52.4887 38.3212 53.7505C38.3362 54.5195 38.0359 54.782 37.2623 54.782C35.0695 54.745 32.8804 54.7339 30.6912 54.782C29.7976 54.8005 29.5648 54.464 29.5648 53.6359C29.5817 50.6504 29.5817 47.6659 29.5817 44.6818C29.5817 41.6977 29.5817 38.7141 29.5986 35.7305C29.5986 34.8727 29.3658 34.5659 28.4721 34.6805C27.7222 34.7306 26.9699 34.738 26.2191 34.7027C25.6784 34.7101 25.4118 34.5178 25.4118 33.9226C25.4394 32.0617 25.4394 30.2008 25.4118 28.3398C25.4043 27.7557 25.6259 27.556 26.1966 27.556C26.5394 27.5651 26.8828 27.5606 27.2259 27.5561C27.7245 27.5497 28.2223 27.5432 28.7162 27.5782C29.3958 27.6263 29.6023 27.4119 29.6023 26.7427C29.6023 26.5071 29.6018 26.2714 29.6013 26.0356C29.5979 24.4722 29.5944 22.9034 29.7413 21.3485C30.1092 17.4036 33.0681 14.7306 37.0896 14.5827C38.1684 14.5476 39.2473 14.5263 40.3256 14.5051C41.4054 14.4838 42.4847 14.4625 43.5631 14.4274C44.3441 14.4015 44.6257 14.6899 44.6032 15.4626C44.5544 17.1152 44.5356 18.7716 44.6032 20.4242C44.6407 21.3263 44.2653 21.5334 43.4467 21.4853C42.6176 21.4304 41.7788 21.4551 40.9454 21.4796C40.8804 21.4815 40.8155 21.4834 40.7507 21.4853C39.0084 21.5444 38.3851 22.1175 38.2574 23.8219C38.2168 24.4031 38.2128 24.987 38.2087 25.5712C38.206 25.9605 38.2033 26.3501 38.1898 26.739C38.1673 27.349 38.4639 27.4784 39.0196 27.4784C39.5304 27.4784 40.0408 27.4809 40.5511 27.4833C41.5712 27.4883 42.5907 27.4932 43.6119 27.4784C44.2765 27.471 44.5093 27.7002 44.4305 28.3768C44.2152 30.2205 44.035 32.0691 43.8898 33.9226C43.841 34.5474 43.5556 34.7175 42.9736 34.7175Z"
                fill="white"
              />
            </svg>
            <!-- Clean SVG for Instagram -->
            <svg
              class="social-icon social-icon-white"
              viewBox="0 0 73 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M50.5531 23.2838C49.4511 19.9746 46.5787 18.0037 43.012 18H24.9874C24.0753 17.9979 23.1684 18.1368 22.2986 18.4119C19.0111 19.5149 17.0202 22.3683 17.0129 25.9128C16.9957 31.97 16.9957 38.0247 17.0129 44.0769C16.9442 46.6449 18.1681 49.0758 20.271 50.5483C21.6493 51.535 23.312 52.0437 25.0058 51.9971H33.9979H42.9569C43.8983 52.0195 44.8365 51.879 45.7301 51.5816C48.9993 50.416 50.9865 47.5994 50.9902 44.0475C50.9902 42.0338 50.9927 40.02 50.9951 38.0063C51 33.9788 51.0049 29.9513 50.9902 25.9239C50.9826 25.0264 50.8351 24.1357 50.5531 23.2838ZM33.9721 45.658C29.6617 45.658 25.776 43.0576 24.1286 39.0704C22.4811 35.0831 23.3965 30.495 26.4476 27.4471C29.4987 24.3992 34.0841 23.4924 38.0639 25.1498C42.0437 26.8072 44.6334 30.7021 44.6245 35.0169C44.5943 40.8899 39.8392 45.6399 33.9721 45.658ZM42.6173 24.9482C43.0285 25.9519 44.0036 26.6085 45.0873 26.6114C46.5568 26.5997 47.7486 25.4165 47.7725 23.9457C47.7784 22.8609 47.1306 21.8794 46.1313 21.4595C45.1321 21.0395 43.9785 21.2639 43.2091 22.0278C42.4396 22.7917 42.206 23.9446 42.6173 24.9482Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.55204 21.9859C8.73829 9.28123 20.9546 0.998482 34.5042 1C53.004 1.00207 68 16.2236 68 34.9995C68 48.7514 59.8377 61.1491 47.3193 66.4113C34.801 71.6736 20.392 68.764 10.8115 59.0395C1.23095 49.3149 -1.63421 34.6905 3.55204 21.9859ZM55.2679 45.4317C55.2754 45.3815 55.2829 45.3315 55.2916 45.2819L55.2731 24.6683C55.2368 24.4666 55.206 24.2617 55.175 24.0556C55.1115 23.633 55.0473 23.2057 54.933 22.792C53.6425 18.0673 50.6217 15.174 45.911 14.0969C45.6392 14.0359 45.361 13.9955 45.0827 13.9551C44.9334 13.9334 44.7839 13.9117 44.6354 13.8868H24.336C24.128 13.9269 23.9155 13.9604 23.7015 13.9941C23.2957 14.058 22.8843 14.1228 22.4873 14.2358C17.8432 15.5492 14.9776 18.6002 13.946 23.3811C13.7908 24.1604 13.7164 24.9541 13.7241 25.7491C13.7069 31.901 13.7069 38.0542 13.7241 44.2086C13.7352 48.3254 15.3917 51.6165 18.6973 54.0107C20.6115 55.387 22.9074 56.1098 25.253 56.0747C26.9061 56.0767 28.5593 56.0828 30.2124 56.0888C34.7302 56.1053 39.2475 56.1219 43.7628 56.0559C48.71 55.9884 52.2671 53.5529 54.3377 49.0046C54.6562 48.296 54.8184 47.5268 54.9805 46.7584C55.0536 46.4118 55.1266 46.0653 55.214 45.7247C55.2384 45.628 55.2532 45.5295 55.2679 45.4317Z"
                fill="white"
              />
            </svg>
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
        <ModalButton :show-modal="showModal" />

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
import ModalButton from '@/components/ModalButton/ModalButton.vue'
import { ref } from 'vue'
const showModal = ref(false)
</script>

<style src="@/assets/keyframe-page.css"></style>
