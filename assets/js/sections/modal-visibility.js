import { DOMHelper } from '../utilities/DOMHelper.js';
// Modal - Create Thank You Modal
export class Modal {
   constructor(mockDataLength) {
      this.modal = DOMHelper.getEle('modal');
      this.modalClose = DOMHelper.getEle('modal__close');
      this.modalContent = DOMHelper.getEle('modal__content');
      for (let i = 0; i < mockDataLength; i++) {
         DOMHelper.eventListenerHelper(
            DOMHelper.getEle(`vote__btn-${i}`),
            'click',
            this.toggleModal
         );
      }
      DOMHelper.eventListenerHelper(this.modalClose, 'click', this.toggleModal);
      DOMHelper.eventListenerHelper(DOMHelper.getEle('modal'), 'click', this.clickHandler);
      DOMHelper.eventListenerHelper(document, 'keydown', this.keyHandler);
   }
   // Toggle Display Block/None of Modal
   toggleModal = e => {
      if (this.modalContent.style.display === 'none') {
         this.modal.className = 'overlay';
         this.modalContent.style.display = 'block';
         this.modalContent.style.marginTop = -this.modalContent.offsetHeight / 2 + 'px';
         this.modalContent.style.marginLeft = -this.modalContent.offsetWidth / 2 + 'px';
      } else {
         this.modal.className = '';
         this.modalContent.style.display = 'none';
      }
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
   };
   // Close Modal if Clicked Outside of modalContent
   clickHandler = e => {
      if (e.target.tagName == 'SECTION') {
         if (e.target.id == 'modal') {
            this.toggleModal(e);
         }
      }
   };
   // Close Modal by Pressing ESc key
   keyHandler = e => {
      if (e.keyCode == 27) {
         this.toggleModal(e);
      }
   };

   render() {
      this.toggleModal(this);
   }
}
