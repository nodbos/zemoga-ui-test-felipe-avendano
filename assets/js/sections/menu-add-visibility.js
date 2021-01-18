import { DOMHelper } from '../utilities/DOMHelper.js';
// Menu & Advice - Show / Hide an Element
export class MenuAddVisibility {
   constructor() {
      this.menuXBtn = document.querySelectorAll('.menu-x__btn');
      this.menuMobile = DOMHelper.getEle('menu-mobile');
      this.menuMobileBtn = DOMHelper.getEle('menu-mobile__btn');
      this.adviceBtn = DOMHelper.getEle('advice__close');
      this.adviceElement = DOMHelper.getEle('advice');

      DOMHelper.eventListenerHelper(
         this.menuMobileBtn,
         'click',
         DOMHelper.toggleDisplay.bind(this, this.menuMobile, 'block')
      );
      DOMHelper.eventListenerHelper(
         this.menuXBtn[0],
         'click',
         DOMHelper.toggleDisplay.bind(this, this.menuMobile, 'block')
      );
      DOMHelper.eventListenerHelper(
         this.menuXBtn[1],
         'click',
         DOMHelper.toggleDisplay.bind(this, this.menuMobile, 'block')
      );
      DOMHelper.eventListenerHelper(
         this.adviceBtn,
         'click',
         DOMHelper.toggleDisplay.bind(this, this.adviceElement, 'block')
      );
   }
   // INIT
   render() {
      DOMHelper.toggleDisplay(this.menuMobile, 'block');
   }
}
