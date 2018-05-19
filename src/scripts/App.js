'use strict';

import $ from 'jquery';
import ClickFn from './modules/AppearOnClick';
import List from './modules/List';
import Reaction from './modules/Reaction';
import { initCanvas } from './modules/canvas/Canvas';
import events from './events';
import { getInFocusMark } from './globalHelper';

events();

const clickFn = new ClickFn(
  $('#append-div'),
  $('.click-box'),
  "<div class='appear-on-click'></div>"
);
const list = new List();
const reaction = new Reaction();

window.addEventListener('load', () => {
  initCanvas();
  getInFocusMark();
});
