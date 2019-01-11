import Controller from '@ember/controller';
import { set } from '@ember/object';
import { AnimationItem } from 'lottie-web';

export default class ApplicationController extends Controller {
  animation!: AnimationItem;

  afterRender(animation: AnimationItem) {
    set(this, 'animation', animation);
  }
}
