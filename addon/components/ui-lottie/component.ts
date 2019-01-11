// @ts-ignore
import template from '@choiceform/ui-lottie/components/ui-lottie/template';
import { attribute, layout } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { overridableReads } from '@ember-decorators/object/computed';
import Component from '@ember/component';
import { camelize, capitalize, htmlSafe } from '@ember/string';
import { localClassNames } from 'ember-css-modules';
import { SafeString } from 'handlebars';
import lottie, { AnimationItem, LottieOptions } from 'lottie-web';

// prettier-ignore
const EVENTS: string[] = [
  'complete', 'loopComplete', 'enterFrame', 'segmentStart', 'config_ready',
  'data_ready', 'data_failed', 'loaded_images', 'DOMLoaded', 'destroy',
];

@layout(template)
@localClassNames('wrapper')
class UiLottieComponent extends Component {
  [index: string]: any;

  width!: string;

  height!: string;

  @attribute('style')
  @computed('width', 'height')
  get style(): SafeString | null {
    const width = `${parseFloat(this.width)}px`;
    const height = `${parseFloat(this.height)}px`;

    if (this.width || this.height) {
      return htmlSafe(`width: ${width}; height: ${height}`);
    } else return null;
  }

  @overridableReads('elementId') name!: string;

  path!: string;

  data!: any;

  loop!: boolean;

  autoplay!: boolean;

  renderAs!: 'svg' | 'canvas' | 'html';

  hidden: boolean | undefined;

  @computed('name', 'path', 'data', 'loop', 'autoplay', 'renderer')
  get options(): LottieOptions {
    return {
      name: this.name,
      path: this.path,
      animationData: this.data,
      loop: this.loop,
      autoplay: typeof this.autoplay === 'undefined' ? true : this.autoplay,
      renderer: this.renderAs,
      container: this.element as HTMLElement,
    };
  }

  lottie!: AnimationItem;

  afterRender!: (lottie: AnimationItem) => void;

  REGISTED_EVENTS: { event: string; handler: Function }[] = [];

  registerEventHandlers() {
    EVENTS.forEach((event: any) => {
      const handlerName = `on${capitalize(camelize(event))}`;

      if (this[handlerName]) {
        this.lottie.addEventListener(event, this[handlerName]);
        this.REGISTED_EVENTS.push({ event, handler: this[handlerName] });
      }
    });
  }

  unregisterEventHandlers() {
    // if animation was been destroyed from outside, its renderer will be null,
    // and that is the hint to bypass event unregistration
    if (this.lottie.renderer === null) return;

    this.REGISTED_EVENTS.forEach(({ event, handler }) => {
      this.lottie.removeEventListener(event, handler);
    });
  }

  didRender() {
    if (this.lottie) {
      this.unregisterEventHandlers();
      this.lottie.destroy(this.name);
    }

    this.lottie = lottie.loadAnimation(this.options);
    this.registerEventHandlers();

    if (this.afterRender) {
      this.afterRender(this.lottie);
    }

    if (typeof this.hidden === 'boolean') {
      this.lottie[this.hidden ? 'hide' : 'show']();
    }
  }

  willDestroy() {
    if (typeof this.lottie !== 'undefined') {
      this.unregisterEventHandlers();
      this.lottie.destroy(this.name);
    }
  }
}

export default UiLottieComponent;
