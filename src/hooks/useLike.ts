import { Assets, ParticleContainer, Sprite } from 'pixi.js';
import { onMounted, ref, Ref } from 'vue';
import { Tween, Easing, update } from '@tweenjs/tween.js';
import { usePixi } from './usePixi';

const imgs = [
  'https://si.geilicdn.com/img-53770000018648d65a310a20e2c5-unadjust_216_216.png',
  'https://si.geilicdn.com/img-57f60000018648d65a330a22d1c8-unadjust_216_216.png',
  'https://si.geilicdn.com/img-59970000018648d65a350a21146b-unadjust_216_216.png',
  'https://si.geilicdn.com/img-4b6b0000018648d65a300a2104c1-unadjust_216_216.png',
  'https://si.geilicdn.com/img-4a450000018648d65a340a231179-unadjust_216_216.png',
  'https://si.geilicdn.com/img-52eb0000018648d65a330a23132e-unadjust_216_216.png',
  'https://si.geilicdn.com/img-505c0000018648d65a340a22d3fa-unadjust_216_216.png',
  'https://si.geilicdn.com/img-570c0000018648d65a330a2313e0-unadjust_216_216.png',
  'https://si.geilicdn.com/img-4a8a0000018648d65a300a22d30f-unadjust_216_216.png',
];

export function useLike(el: Ref<HTMLElement | undefined>) {
  const app = usePixi(el);

  const usingParticleContainer = async (actions: (container: ParticleContainer) => void | Promise<void>) => {
    const particle = new ParticleContainer(10, { scale: true, position: true, rotation: true, uvs: true, alpha: true });

    await actions(particle);

    return particle;
  };

  const sprites = ref<Sprite[][]>([[], [], []]);

  const zero = [innerWidth / 2 - 216 / 2, innerHeight / 2 - 216 / 2];
  const angle = Math.floor(360 / imgs.length);
  const distance = 120;
  const offset = angle / 12;

  const tweens = ref<any[]>([]);

  const spriteToNextPosition = (r = 300) => {
    tweens.value = sprites.value
      .map((s, j) =>
        s.map((sprite, i) => {
          const [x, y] = [
            zero[0] + Math.sin((angle + offset * j) * i) * (r + j * j * distance),
            zero[1] + Math.cos((angle + offset * j) * i) * (r + j * j * distance),
          ];
          return new Tween(sprite)
            .to({ x, y }, 1000)
            .easing(Easing.Quadratic.InOut)
            .onComplete(() => {
              new Tween(sprite).to({ alpha: 0 }, 200).start();
            });
        })
      )
      .flat();
  };

  const createCircle = (textures: Record<string, any>, floor: number = 0) => {
    for (let i = 0; i < imgs.length; i++) {
      const texture = Object.values(textures)[i];
      const sprite = Sprite.from(texture);

      const x = Math.sin(angle * i);
      const y = Math.cos(angle * i);

      sprite.position.set(zero[0] + x, zero[1] + y);
      sprite.alpha = 0;

      app.stage.addChild(sprite);
      sprites.value[floor].push(sprite);
    }
  };

  onMounted(async () => {
    // const p = await usingParticleContainer(async (particle) => {
    //   const textures = await Assets.load(imgs);
    //   console.log(textures)
    //   for (let i = 0; i < imgs.length; i++) {
    //     const texture = Object.values(textures)[i];
    //     const sprite = Sprite.from(texture);
    //     sprite.position.set(i * 50);
    //     sprite.tint = Math.random() * 0x808080;
    //     particle.addChild(sprite);
    //   }
    // });
    // app.stage.addChild(p);

    const textures = await Assets.load(imgs);

    createCircle(textures);
    createCircle(textures, 1);
    createCircle(textures, 2);

    spriteToNextPosition();

    requestAnimationFrame(animate);
  });

  const animate = (time: number) => {
    requestAnimationFrame(animate);

    update(time);
  };

  const play = () => {
    sprites.value.forEach((s) => {
      s.forEach((sprite) => {
        sprite.alpha = 1;
        sprite.position.set(...zero);
      });
    });
    tweens.value.forEach((tween) => tween.start());

    // setTimeout(() => {
    //   play();
    // }, 1500);
  };

  return { play };
}
