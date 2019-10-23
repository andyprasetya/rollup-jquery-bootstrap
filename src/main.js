import './jquery-global.js';
import 'bootstrap';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../node_modules/leaflet/dist/leaflet.css';
import './stylesheet/custom.css';
import './stylesheet/font-awesome.min.css';
// UI entry point
import commonui from './ui';
// jQuery
var $ = jQuery;
// App's UI initialization
commonui.initUI('app');