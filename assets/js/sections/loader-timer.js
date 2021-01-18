import { DOMHelper } from '../utilities/DOMHelper.js';
// Loader - Show Loader for 2 seconds
export class LoaderTimer {
   render() {
      setInterval(function () {
         const loader = DOMHelper.getEle('loader');
         loader.style.opacity = 0;
         setInterval(function () {
            loader.hidden = true;
         }, 500);
      }, 1500);
   }
}
