import { DOMHelper } from '../utilities/DOMHelper.js';
import { VoteBoxesHelper } from '../utilities/vote-boxes-helper.js';
import { Modal } from './modal-visibility.js';
import { VoteSelection } from './vote-boxes-voting.js';
// Votes - Creation of the Vote Boxes based on Json File
export class VoteBoxesCreation extends VoteBoxesHelper {
   constructor() {
      super();
      this.modal;
      this.createModal = true;
      this.mockDataLength = 0;
   }
   // Create Vote Cards from Template and Set Its Percentages (PCT)
   createCards = data => {
      const votesContainer = DOMHelper.getEle('votes-container');
      this.mockDataLength = data.length;
      for (let i = data.length - 1; i >= 0; i--) {
         votesContainer.insertAdjacentHTML('afterbegin', this.templateCard(data[i]));
         VoteBoxesHelper.setBackground(data[i]);
         VoteBoxesHelper.setPctDislike(
            data[i].id,
            100 - data[i].dislike_percentage,
            data[i].dislike_percentage
         );
      }
      // INIT
      if (this.createModal) {
         this.modal = new Modal(this.mockDataLength);
         this.createModal = false;
      }
      this.modal.render();
      for (let i = 0; i < this.mockDataLength; i++) {
         let voteSelection = new VoteSelection(i, this.mockDataLength);
         voteSelection.render();
      }
   };
   // Read data from Json File
   fetchJsonData = async file => {
      try {
         let response = await fetch(file);
         let data = await response.json();
         return data;
      } catch (error) {
         console.log(error);
         throw new Error(error);
      }
   };
   // INIT
   render() {
      this.fetchJsonData('../assets/json/MOCK_DATA.json').then(this.createCards);
   }

   // Vote Card Literal Template
   templateCard = card => {
      const {
         id,
         content: { name, time, topic, description },
         dislike_percentage,
      } = card;
      return `<article id="vote-${id}" class="vote">
                   <section class="vote__title">
                      <div class="vote__dot like">
                            <i class="fas fa-thumbs-up fa-1x"></i>
                      </div>
                      <h3>${name}</h3>
                   </section>
                   <section class="vote__text">
                      <p class="vote__subtitle"><b>${time} ago</b> in ${topic}</p>
                      <p class="vote__copy">${description}</p>
                      <div id="vote__options-${id}" class="vote__options">
                               <input
                                  type="radio"
                                  name="group-${id}"
                                  id="vote__radio--1-${id}"
                                  class="vote__radio-btn like"
                               />
                               <input
                                  type="radio"
                                  name="group-${id}"
                                  id="vote__radio--2-${id}"
                                  class="vote__radio-btn dislike"
                               />
                               <button id="vote__btn-${id}" class="tooltip vote__btn btn btn--white" disabled>
                                  <p>Vote now</p>
                                  <span class="tooltip__copy">Please select Like or Dislike first</span>
                               </button>
                      </div>
                      <button id="vote-again__btn-${id}" class="vote-again__btn vote__btn btn btn--white">
                         <p>Vote Again</p>
                      </button>
                   </section>
                   <section class="vote__spacer"></section>
                   <section class="vote__results">
                      <div id="vote__percentage--like-${id}" class="vote__percentage vote__percentage like">
                            <i class="fas fa-thumbs-up fa-1x"></i>
                            <p id="vote__result--like-${id}" class="vote__result">${
         100 - dislike_percentage
      }%</p>
                      </div>
                      <div id="vote__percentage--dislike-${id}" class="vote__percentage vote__percentage dislike">
                            <p id="vote__result--dislike-${id}" class="vote__result">${dislike_percentage}%</p>
                            <i class="fas fa-thumbs-down fa-1x"></i>
                      </div>
                   </section>
                </article>`;
   };
}
