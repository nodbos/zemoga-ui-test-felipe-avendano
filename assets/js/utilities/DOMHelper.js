export class DOMHelper {
   // GetElementById Helper / Shorthand
   static getEle(id) {
      return document.getElementById(id);
   }
   // Event Listener Helper with Fallback
   static eventListenerHelper(ele, event, func) {
      if (ele.addEventListener) {
         ele.addEventListener(event, func, false);
      } else if (el.attachEvent) {
         ele.attachEvent('on' + event, func);
      }
   }
   // Toggle Display Block/None of an Element
   static toggleDisplay(element, display) {
      element.style.display === 'none'
         ? (element.style.display = display)
         : (element.style.display = 'none');
   }
}
