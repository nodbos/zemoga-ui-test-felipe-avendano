import { DOMHelper } from '../utilities/DOMHelper.js';
import { VoteBoxesHelper } from '../utilities/vote-boxes-helper.js';
// Vote - Like or Dislike Vote Interaction
export class VoteSelection extends VoteBoxesHelper {
   constructor(id, mockDataLength) {
      super();
      this.voteButton = DOMHelper.getEle(`vote__btn-${id}`);
      this.voteLike = DOMHelper.getEle(`vote__radio--1-${id}`);
      this.voteDislike = DOMHelper.getEle(`vote__radio--2-${id}`);
      this.votingPool = [];
      const retrievedData = localStorage.getItem('votingPool');
      this.votingPool = JSON.parse(retrievedData) || [];
      this.increment = 1;
      this.likeCount = 0;
      this.dislikeCount = 0;
      this.mockDataLength = mockDataLength;

      DOMHelper.eventListenerHelper(this.voteLike, 'change', this.disableVoteButton);
      DOMHelper.eventListenerHelper(this.voteDislike, 'change', this.disableVoteButton);
      DOMHelper.eventListenerHelper(this.voteButton, 'click', this.voting.bind(this, true));
   }
   // Disable Vote Button till User selects Like or Dislike
   disableVoteButton = () => {
      this.voteLike.checked || this.voteDislike.checked
         ? (this.voteButton.disabled = false)
         : (this.voteButton.disabled = true);
   };
   // Vote Interaction, increase or decrease the like and dislike count
   voting = setup => {
      if (this.votingPool.length > 0) {
         for (let i = 0; i < this.votingPool.length; i++) {
            if (
               this.votingPool[i].id.toString() === this.voteButton.id.split('-')[1] &&
               this.votingPool[i].like <= 100 &&
               this.votingPool[i].like >= 0
            ) {
               if (setup === true) {
                  this.voteLike.checked
                     ? (this.votingPool[i].like += this.increment)
                     : (this.votingPool[i].dislike += this.increment);
               }
               this.pcrCalculation(this.votingPool[i]);
            }
         }
         localStorage.setItem('votingPool', JSON.stringify(this.votingPool));
      } else {
         this.createVotingPool();
      }
   };
   // Calculate the Distribution of Votes in Percentage(PCT)
   pcrCalculation = votingPoolData => {
      const { id, like, dislike } = votingPoolData;
      let pctArray = [like, dislike];
      let pctDifference = Math.abs(like - dislike);
      let pctMaxIndex = pctArray.indexOf(Math.max(...pctArray));
      pctMaxIndex === 0
         ? VoteBoxesHelper.setPctDislike(id, 50 + pctDifference, 50 - pctDifference)
         : VoteBoxesHelper.setPctDislike(id, 50 - pctDifference, 50 + pctDifference);
   };
   // Create Vote Object, 1 per Person Inside Voting Pool Array
   createVotingPool = () => {
      this.likeCount = 0;
      this.dislikeCount = 0;
      this.voteLike.checked ? this.likeCount++ : this.dislikeCount++;
      for (let i = 0; i < this.mockDataLength; i++) {
         this.votingPool.push({
            id: i,
            like: this.likeCount,
            dislike: this.dislikeCount,
         });
      }
      this.voting(true);
      localStorage.setItem('votingPool', JSON.stringify(this.votingPool));
   };
   render() {
      if (this.votingPool.length > 0) {
         this.voting(false);
      }
   }
}
