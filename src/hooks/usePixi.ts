import { Application } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { Ref, onMounted } from 'vue';

export function usePixi(el: Ref<HTMLElement | undefined>) {
  const app = new Application({
    width: innerWidth,
    height: innerHeight,
    antialias: true,
    resolution: devicePixelRatio,
    backgroundAlpha: 0,
    autoDensity: true,
  });
  app.stage.sortableChildren = true;

  (globalThis as any).__PIXI_APP__ = app;
  (globalThis as any).PIXI = PIXI;

  onMounted(async () => {
    app.renderer.resize(innerWidth, innerHeight);
    el.value?.appendChild(app.view as HTMLCanvasElement);
  });

  return app;
}
