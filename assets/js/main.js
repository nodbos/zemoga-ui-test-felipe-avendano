import { MenuAddVisibility } from './sections/menu-add-visibility.js';
import { LoaderTimer } from './sections/loader-timer.js';
import { HeadlineScroll } from './sections/headline-scroll.js';
import { VoteBoxesCreation } from './sections/vote-boxes-creation.js';
import { AddName } from './sections/add-name.js';

// Initialization of the Scripts
class INIT {
   constructor() {
      const menuAddVisibility = new MenuAddVisibility();
      menuAddVisibility.render();
      //
      const loaderTimer = new LoaderTimer();
      loaderTimer.render();
      //
      const headlineScroll = new HeadlineScroll();
      //
      const voteBoxesCreation = new VoteBoxesCreation();
      voteBoxesCreation.render();
      //
      const addName = new AddName();
   }
}
// INIT
new INIT();
