import templates from './ui-template';
import menu from './menu';

var ui = {};

ui.initUI = function(anchordiv) {
  anchordiv = typeof anchordiv !== 'undefined' ? anchordiv : 'app';
  ui.createTopNavigation(anchordiv);
  ui.createModalBoxes(anchordiv);
  menu._activateTopNav();
}

ui.createTopNavigation = function(anchordiv) {
  anchordiv = typeof anchordiv !== 'undefined' ? anchordiv : 'app';
  let anchorSelector = document.getElementById('app');
  anchorSelector.insertAdjacentHTML('beforebegin', templates.topNavigation());
}

ui.createModalBoxes = function(anchordiv) {
  anchordiv = typeof anchordiv !== 'undefined' ? anchordiv : 'app';
  let anchorSelector = document.getElementById('app');
  anchorSelector.insertAdjacentHTML('afterend', templates.modalBoxes());
}

export default ui;