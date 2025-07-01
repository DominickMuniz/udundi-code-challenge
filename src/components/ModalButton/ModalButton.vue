<script setup lang="ts">
import { customClick, closeModal, outsideClickListener } from './scripts-keyframes.js'

import { onMounted } from 'vue'

const emit = defineEmits(['update:showModal'])

function setIsMobileClass() {
  if (window.innerWidth < 768) {
    document.documentElement.classList.add('is-mobile')
  } else {
    document.documentElement.classList.remove('is-mobile')
  }
}

onMounted(() => {
  setIsMobileClass()
  window.addEventListener('resize', setIsMobileClass)
})
</script>

<template>
  <button
    class="custom-button"
    @click="() => customClick((val: boolean) => emit('update:showModal', val))"
  >
    <div class="button-content" style="position: relative">
      <img id="plusIcon" class="plus-icon" src="@/assets/base-app-images/icon-plus.svg" />
      <span class="button-text">More Details</span>
      <div id="squircle" class="squircle">
        <div class="modal" id="modal">
          <div class="modal-scroll-wrapper">
            <div class="modal-button-content modern-mobile-modal-content">
              <img
                src="@/assets/base-app-images/icon-close.svg"
                alt="Close"
                class="modal-close"
                style="visibility: hidden"
                @click="() => closeModal((val) => emit('update:showModal', val))"
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
              <div class="modal-read-more-button-div">READ MORE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped src="./base.css"></style>
<style scoped src="./keyframes-close.css"></style>
<style scoped src="./keyframes-open.css"></style>
