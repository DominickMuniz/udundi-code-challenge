let isAnimating = false
let currentSetShowModal = null // 🔧 Store the setShowModal reference

/**
 * @param {(val: boolean) => void} setShowModal
 */
export function customClick(setShowModal) {
  if (isAnimating) return
  isAnimating = true
  currentSetShowModal = setShowModal // 🔧 Store it for later use

  // Get the button's position on screen
  const button = document.querySelector('.custom-button')

  const buttonIcon = document.getElementById('plusIcon')
  const buttonIconSquircle = document.getElementById('squircle')
  const modalContent = document.getElementById('modal')
  const modalInner = document.querySelector('.modal-button-content')

  // Set squircle position based on button position (for mobile)
  if (window.innerWidth < 768) {
    // Detach squircle and append to body if not already done
    if (!buttonIconSquircle.classList.contains('mobile-detached')) {
      document.body.appendChild(buttonIconSquircle)
      buttonIconSquircle.classList.add('mobile-detached')
    }

    // Get bounding box of the button
    const rect = button.getBoundingClientRect()

    // Position squircle centered on button (viewport-relative)
    buttonIconSquircle.style.position = 'fixed'
    buttonIconSquircle.style.left = `${rect.left + rect.width / 2}px`
    buttonIconSquircle.style.top = `${rect.top + rect.height / 2}px`
    buttonIconSquircle.style.transform = 'translate(-50%, -50%)'
    buttonIconSquircle.style.zIndex = '9999'
  }

  const contentHeight = modalInner.scrollHeight

  // Reset reverse animation classes
  buttonIcon.classList.remove('custom-animation-d-reverse')
  buttonIconSquircle.classList.remove('custom-animation-shape-change-reverse')
  modalContent.classList.remove('custom-animation-modal-reverse')

  // Set squircle height
  buttonIconSquircle.style.setProperty('height', `${contentHeight}px`)

  // Force reflow
  void buttonIcon.offsetWidth
  void buttonIconSquircle.offsetWidth
  void modalContent.offsetWidth

  // Apply forward animations
  buttonIcon.classList.remove('custom-animation-d')
  buttonIconSquircle.classList.remove('custom-animation-shape-change')
  modalContent.classList.remove('custom-animation-modal')

  buttonIcon.classList.add('custom-animation-d')
  modalContent.classList.add('custom-animation-modal')
  buttonIconSquircle.classList.add('custom-animation-shape-change')

  // Add outside click listener
  document.addEventListener('click', outsideClickListener)

  // Add outside click listener
  document.addEventListener('click', outsideClickListener)

  // Notify modal opened
  if (typeof setShowModal === 'function') setShowModal(true)

  // Reset flag after open animation ends (match total animation duration)
  setTimeout(() => {
    isAnimating = false
  }, 2000)
}

/**
 * @param {(val: boolean) => void} [setShowModal]
 */
export function closeModal(setShowModal) {
  setShowModal = setShowModal || currentSetShowModal
  if (typeof setShowModal !== 'function') return
  if (isAnimating) return
  isAnimating = true

  const buttonIcon = document.getElementById('plusIcon')
  const buttonIconSquircle = document.getElementById('squircle')
  const modalContent = document.getElementById('modal')

  const contentHeight = modalContent.scrollHeight
  buttonIconSquircle.style.setProperty('--start-height', `${contentHeight}px`)

  // Ensure squircle is visible for reverse animation
  buttonIconSquircle.style.opacity = '1'
  buttonIconSquircle.style.zIndex = '3'

  // Remove forward animation classes
  buttonIcon.classList.remove('custom-animation-d')
  buttonIconSquircle.classList.remove('custom-animation-shape-change')
  modalContent.classList.remove('custom-animation-modal')

  // Add reverse animation classes
  buttonIcon.classList.add('custom-animation-d-reverse')
  buttonIconSquircle.classList.add('custom-animation-shape-change-reverse')
  modalContent.classList.add('custom-animation-modal-reverse')

  modalContent.addEventListener(
    'animationend',
    () => {
      document.removeEventListener('click', outsideClickListener)

      setTimeout(() => {
        // Fully reset all inline styles and animation classes
        buttonIconSquircle.removeAttribute('style')
        modalContent.removeAttribute('style')

        buttonIcon.classList.remove('custom-animation-d-reverse')
        buttonIconSquircle.classList.remove('custom-animation-shape-change-reverse')
        modalContent.classList.remove('custom-animation-modal-reverse')

        // Force reflow to flush styles
        void buttonIcon.offsetWidth
        void buttonIconSquircle.offsetWidth
        void modalContent.offsetWidth
        // Notify modal closed
        if (typeof setShowModal === 'function') setShowModal(false)

        isAnimating = false
      }, 1500)
    },
    { once: true },
  )
}

export function outsideClickListener(e) {
  const modal = document.getElementById('modal')
  const button = document.querySelector('.custom-button')
  console.log('Click target:', e.target)
  console.log('Matches close?', e.target.closest('.modal-close'))
  const clickedOutsideModal = !modal.contains(e.target) && !button.contains(e.target)
  const clickedCloseIcon = e.target.closest('.modal-close') !== null
  if (typeof currentSetShowModal === 'function') {
    closeModal(currentSetShowModal)
  }
  if ((clickedOutsideModal || clickedCloseIcon) && typeof currentSetShowModal === 'function') {
    closeModal(currentSetShowModal)
  }
  // Always close the modal on any click (ignore specific targets)
}
