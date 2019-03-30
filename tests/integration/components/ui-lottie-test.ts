import { render } from '@ember/test-helpers';
import { inlineAnimationData } from 'dummy/tests/fixtures/lottie';
import { timeout } from 'ember-concurrency';
import { EmberRenderingTest } from 'ember-qunit-decorators/test-support';
import hbs from 'htmlbars-inline-precompile';
import { AnimationItem } from 'lottie-web';
import { suite, test } from 'qunit-decorators';

// @ts-ignore
import styles from '@choiceform/ui-lottie/components/ui-lottie/styles';

@suite('Integration | Component | ui-lottie')
export class UiLottieComponentTest extends EmberRenderingTest {
  @test async 'renders with a local className'(assert: Assert): Promise<void> {
    await render(hbs`{{ui-lottie}}`);
    assert.dom(`.${styles.wrapper}`).exists();
  }

  @test async 'set dimensions by its direct wrapper element'(
    assert: Assert
  ): Promise<void> {
    await render(hbs`
      <section class="wrapper" style="width: 256px; height: 256px">
        {{ui-lottie}}
      </section>
    `);

    const element = this.element.querySelector(`.${styles.wrapper}`) as Element;
    const wrapper = element.parentElement as Element;
    assert.equal(element.clientWidth, wrapper.clientWidth);
    assert.equal(element.clientHeight, wrapper.clientHeight);
  }

  @test async 'set dimensions by passing specific arguments'(
    assert: Assert
  ): Promise<void> {
    await render(hbs`
      <section class="wrapper" style="width: 256px; height: 256px">
        {{ui-lottie width="100px" height=100}}
      </section>
    `);

    const element = this.element.querySelector(`.${styles.wrapper}`) as Element;
    assert.equal(element.clientWidth, 100);
    assert.equal(element.clientHeight, 100);
  }

  @test async 'renders animation with defaults'(assert: Assert): Promise<void> {
    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`{{ui-lottie path=this.path}}`);
    await timeout(1000);
    assert.dom(`.${styles.wrapper} > svg`).exists();
  }

  @test async 'renders animation with inline data'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    await render(hbs`{{ui-lottie data=this.data}}`);
    assert.dom(`.${styles.wrapper} > svg`).exists();
  }

  @test async 'renders animation with canvas renderer'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    await render(hbs`{{ui-lottie data=this.data renderAs="canvas"}}`);
    assert.dom(`.${styles.wrapper} > canvas`).exists();
  }

  @test async 'renders animation with html renderer'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    await render(hbs`{{ui-lottie data=this.data renderAs="html"}}`);
    assert.dom(`.${styles.wrapper} > div > svg`).exists();
  }

  @test async 'invoke afterRender hook in didInsertElement'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(
      hbs`{{ui-lottie data=this.data afterRender=this.afterRender}}`
    );
    assert.ok((this as any).lottie.isLoaded);
  }

  @test async 'renders animation with loop'(assert: Assert): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data loop=true afterRender=(action this.afterRender)}}
    `);
    assert.ok((this as any).lottie.loop);
  }

  @test async 'renders animation without autoplay'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data autoplay=false afterRender=(action this.afterRender)}}
    `);
    assert.notOk((this as any).lottie.autoplay);
  }

  @test async "renders animation under the same name as component's id"(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data afterRender=(action this.afterRender)}}
    `);
    assert.ok(/ember\d+/i.test((this as any).lottie.name));
  }

  @test async 'can take a specifc name as well'(assert: Assert): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data name="foo" afterRender=(action this.afterRender)}}
    `);
    assert.equal((this as any).lottie.name, 'foo');
  }

  @test async 'animation can be played and stopped'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data name="foo" afterRender=(action this.afterRender)}}
    `);
    assert.notOk((this as any).lottie.isPaused);

    (this as any).lottie.stop('foo');
    assert.ok((this as any).lottie.isPaused);

    (this as any).lottie.play('foo');
    assert.notOk((this as any).lottie.isPaused);
  }

  @test async 'animation can change its playing speed'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data name="foo" afterRender=(action this.afterRender)}}
    `);
    assert.equal((this as any).lottie.playSpeed, 1);

    (this as any).lottie.setSpeed(0.1, 'foo');
    assert.equal((this as any).lottie.playSpeed, 0.1);
  }

  @test async 'animation can change its playing direction'(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data name="foo" afterRender=(action this.afterRender)}}
    `);
    assert.equal((this as any).lottie.playDirection, 1);

    (this as any).lottie.setDirection(-1, 'foo');
    assert.equal((this as any).lottie.playDirection, -1);
  }

  @test async "animation' visibility can be specified"(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data hidden=true afterRender=(action this.afterRender)}}
    `);
    assert.equal(
      (this as any).lottie.renderer.layerElement.style.display,
      'none'
    );
  }

  @test async "animation' visibility can be toggleed"(
    assert: Assert
  ): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data afterRender=(action this.afterRender)}}
    `);
    assert.equal((this as any).lottie.renderer.layerElement.style.display, '');

    (this as any).lottie.hide();
    assert.equal(
      (this as any).lottie.renderer.layerElement.style.display,
      'none'
    );

    (this as any).lottie.show();
    assert.equal(
      (this as any).lottie.renderer.layerElement.style.display,
      'block'
    );
  }

  @test async 'animation can be destroyed'(assert: Assert): Promise<void> {
    this.set('data', inlineAnimationData);
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie data=this.data name="foo" afterRender=(action this.afterRender)}}
    `);
    assert.dom(`.${styles.wrapper} > svg`).exists();

    (this as any).lottie.destroy('foo');
    assert.dom(`.${styles.wrapper} > svg`).doesNotExist();
  }

  @test.skip
  async 'responds segmentStart event for ???'(/* assert: Assert */): Promise<
    void
  > {
    // TODO: not clear what this event does or when it got triggered
  }

  @test async 'responds config_ready event'(assert: Assert): Promise<void> {
    let fired = false;
    this.set('onConfigReady', () => (fired = true));
    assert.notOk(fired);

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`
      {{ui-lottie path=this.path onConfigReady=(action this.onConfigReady)}}
    `);

    await timeout(1000);
    assert.ok(fired);
  }

  @test async 'responds data_ready event'(assert: Assert): Promise<void> {
    let fired = false;
    this.set('onDataReady', () => (fired = true));
    assert.notOk(fired);

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`
      {{ui-lottie path=this.path onDataReady=(action this.onDataReady)}}
    `);

    await timeout(1000);
    assert.ok(fired);
  }

  @test.skip
  async 'responds loaded_images event'(/* assert: Assert */): Promise<void> {
    // TODO: can not find animation embeds with images
  }

  @test async 'responds DOMLoaded event'(assert: Assert): Promise<void> {
    let fired = false;
    this.set('onDOMLoaded', () => (fired = true));
    assert.notOk(fired);

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`
      {{ui-lottie path=this.path onDOMLoaded=(action this.onDOMLoaded)}}
    `);

    await timeout(1000);
    assert.ok(fired);
  }

  @test async 'responds enterFrame event for each time frame'(
    assert: Assert
  ): Promise<void> {
    let capturedEvent: any;
    this.set('onEnterFrame', (event: any) => (capturedEvent = event));
    assert.equal(typeof capturedEvent, 'undefined');

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`
      {{ui-lottie path=this.path onEnterFrame=(action this.onEnterFrame)}}
    `);

    await timeout(1000);
    assert.ok(capturedEvent.direction);
    assert.ok(capturedEvent.totalTime);
    assert.equal(capturedEvent.type, 'enterFrame');
    assert.equal(capturedEvent.currentTime, capturedEvent.totalTime - 1);
  }

  @test async 'responds complete event once animation stopped'(
    assert: Assert
  ): Promise<void> {
    let capturedEvent: any;
    this.set('onComplete', (event: any) => (capturedEvent = event));
    assert.equal(typeof capturedEvent, 'undefined');

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`
      {{ui-lottie path=this.path onComplete=(action this.onComplete)}}
    `);

    await timeout(1000);
    assert.ok(capturedEvent.direction);
    assert.equal(capturedEvent.type, 'complete');
  }

  @test async 'responds loopComplete event for each loop'(
    assert: Assert
  ): Promise<void> {
    let capturedEvent: any;
    this.set('onLoopComplete', (event: any) => (capturedEvent = event));
    assert.equal(typeof capturedEvent, 'undefined');

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    await render(hbs`
      {{ui-lottie path=this.path
        loop=true onLoopComplete=(action this.onLoopComplete)}}
    `);

    await timeout(1000);
    assert.ok(capturedEvent.direction);
    assert.ok(capturedEvent.totalLoops);
    assert.equal(capturedEvent.type, 'loopComplete');
    assert.equal(capturedEvent.currentLoop, 1);

    await timeout(1000);
    assert.equal(capturedEvent.currentLoop, 2);
  }

  @test async 'responds destroy event when animation got destroyed'(
    assert: Assert
  ): Promise<void> {
    let capturedEvent: any;
    this.set('onDestroy', (event: any) => (capturedEvent = event));

    this.set('path', '//media.choiceform.io/lottie/heart.json');
    this.set('afterRender', (lottie: AnimationItem) =>
      this.set('lottie', lottie)
    );
    await render(hbs`
      {{ui-lottie path=this.path name="foo"
        afterRender=(action this.afterRender)
        onDestroy=(action this.onDestroy)}}
    `);

    assert.equal(typeof capturedEvent, 'undefined');

    await timeout(1000);
    assert.ok((this as any).lottie.isLoaded);

    (this as any).lottie.destroy('foo');
    assert.equal(capturedEvent.type, 'destroy');
    assert.deepEqual(capturedEvent.target, (this as any).lottie);
  }
}
