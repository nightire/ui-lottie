declare module 'lottie-web' {

  interface LottieOptions {
    name: string;
    path: string;
    animationData: any;
    loop: boolean;
    autoplay: boolean;
    container: HTMLElement;
    renderer: 'svg' | 'canvas' | 'html';
  }

  interface AnimationItem {
    wrapper: HTMLElement;
    renderer: any;
    name: string;
    loop: boolean;
    autoplay: boolean;
    isLoaded: boolean;
    isPaused: boolean;
    firstFrame: number;
    totalFrames: number;
    currentFrame: number;
    timeCompleted: number;
    playCount: number;
    playSpeed: number;
    playDirection: 1 | -1;
    show(): void;
    hide(): void;
    play(name?: string): void;
    stop(name?: string): void;
    togglePause(name?: string): void;
    goToAndPlay(frame: number): void;
    setSpeed(speed: number, name?: string): void;
    setDirection(direction: number, name?: string): void;
    addEventListener(eventName: string, eventHandler: Function): void;
    removeEventListener(eventName: string, eventHandler: Function): void;
    destroy(name: string): void;
  }

  function loadAnimation(LottieOptions): AnimationItem;

}
