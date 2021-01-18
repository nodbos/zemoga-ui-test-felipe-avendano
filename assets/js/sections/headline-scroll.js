import { DOMHelper } from '../utilities/DOMHelper.js';
// Headline - Scroll from headline to votes section
export class HeadlineScroll {
   constructor() {
      this.votes = DOMHelper.getEle('votes');
      this.headlineVotes = DOMHelper.getEle('headline__votes');
      DOMHelper.eventListenerHelper(this.headlineVotes, 'click', this.smoothScroll);
   }
   // Smooth Scroll
   smoothScroll = e => {
      e.preventDefault();
      this.votes.scrollIntoView({
         behavior: 'smooth',
      });
   };
}
