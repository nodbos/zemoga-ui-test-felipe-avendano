import { DOMHelper } from '../utilities/DOMHelper.js';
// Add - Prompt User to Enter a New Name
export class AddName {
   constructor() {
      this.addBtn = DOMHelper.getEle('add__btn');
      // Prompt Box
      DOMHelper.eventListenerHelper(this.addBtn, 'click', this.promptName);
   }
   promptName = () => {
      prompt('Hi, how are you? Please enter your name', 'Felipe');
   };
}
