import { AnimationItem } from 'lottie-web';

import Controller from '@ember/controller';
import { set } from '@ember/object';

export default class ApplicationController extends Controller {

  animation: AnimationItem;

  afterRender(animation) {
    set(this, 'animation', animation);
  }

}
