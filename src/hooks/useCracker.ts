// @ts-nocheck

import { onMounted, Ref } from 'vue';
import { usePixi } from './usePixi';
import Proton from 'proton-engine';

export function useCracker(el: Ref<HTMLElement | undefined>) {
  const app = usePixi(el);
  const proton = new Proton();
  const emitter = new Proton.Emitter({} as any);

  const createProton = () => {
    // 粒子数量：25~40，间隔：0~0.5s
    emitter.rate = new Proton.Rate(new Proton.Span(25, 40), new Proton.Span(0, 0.5));

    // 粒子重量 1
    emitter.addInitialize(new Proton.Mass(1));
    // 粒子半径
    // emitter.addInitialize(new Proton.Radius(1, 12));
    // 粒子生存时间：2~3
    emitter.addInitialize(new Proton.Life(2, 3));
    // 速度：3-9，角度：0-30
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(3, 9), new Proton.Span(0, 30, true), 'polar'));

    emitter.addInitialize(
      new Proton.Body([
        'https://si.geilicdn.com/img-256b00000186bafdb59b0a20e35c-unadjust_244_244.png?w=20&h=20',
        'https://si.geilicdn.com/img-3faa00000185a53b1ef50a231179-unadjust_48_48.png?w=20&h=20',
        'https://si.geilicdn.com/img-2d2200000185004f651e0a22d30f-unadjust_150_150.png?w=20&h=20',
      ])
    );

    // 重力
    emitter.addBehaviour(new Proton.Gravity(8));
    // 缩放 从 1~3 缩小到 0.3
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(1, 3), 0.3));
    // 透明度 从 1 渐变到 0.5
    emitter.addBehaviour(new Proton.Alpha(1, 0.5));
    // 转动角度与速度
    emitter.addBehaviour(new Proton.Rotate(0, Proton.getSpan(-8, 9), 'add'));

    //set emitter position
    emitter.p.x = innerWidth / 2;
    emitter.p.y = innerHeight / 2;

    //add emitter to the proton
    proton.addEmitter(emitter);

    proton.addRenderer(new Proton.PixiRenderer(app.stage));
  };

  onMounted(() => {
    createProton();

    app.ticker.add(animate);
  });

  const animate = () => {
    proton.update();
  };

  return {
    play: (x: number, y: number) => {
      emitter.p.x = x;
      emitter.p.y = y;
      emitter.emit(0.5);
    },
  };
}
