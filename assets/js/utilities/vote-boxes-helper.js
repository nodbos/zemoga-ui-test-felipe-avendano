import { DOMHelper } from './DOMHelper.js';
// Votes - Creation of the Vote Boxes based on Json File
export class VoteBoxesHelper {
   // Set the Vote Background Image with Gradient
   static setBackground = data => {
      const { id, img } = data;
      const votesBackground = DOMHelper.getEle(`vote-${id}`);
      votesBackground.style.background = `linear-gradient(to top, rgba(12, 12, 12, 0.8) 40%, rgba(12, 12, 12, 0) 100%), 
     url('../../assets/img/${img}') center / cover no-repeat`;
   };
   // Set the Like/Dislike Percentage Width
   static setPctDislike = (id, likeCount, dislikeCount) => {
      const votePctLike = DOMHelper.getEle(`vote__percentage--like-${id}`);
      const votePctDislike = DOMHelper.getEle(`vote__percentage--dislike-${id}`);
      const votePctResLike = DOMHelper.getEle(`vote__result--like-${id}`);
      const votePctResDislike = DOMHelper.getEle(`vote__result--dislike-${id}`);
      if (likeCount <= 100 && likeCount >= 0) {
         votePctLike.style.width = `${likeCount}%`;
         votePctDislike.style.width = `${dislikeCount}%`;
         votePctResLike.innerText = `${likeCount}%`;
         votePctResDislike.innerText = `${dislikeCount}%`;
      }
   };
}
