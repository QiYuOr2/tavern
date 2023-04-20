import { Assets, Sprite } from 'pixi.js';
import { onMounted, ref, Ref } from 'vue';
import { Tween, Easing, update } from '@tweenjs/tween.js';
import { usePixi } from './usePixi';

function shuffleArray<T>(array: T[]) {
  const source = array.slice();
  for (let i = source.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [source[i], source[j]] = [source[j], source[i]];
  }
  return source;
}

const imgs = [
  'https://si.geilicdn.com/img-53770000018648d65a310a20e2c5-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-57f60000018648d65a330a22d1c8-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-59970000018648d65a350a21146b-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-4b6b0000018648d65a300a2104c1-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-4a450000018648d65a340a231179-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-52eb0000018648d65a330a23132e-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-505c0000018648d65a340a22d3fa-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-570c0000018648d65a330a2313e0-unadjust_216_216.png?w=100',
  'https://si.geilicdn.com/img-4a8a0000018648d65a300a22d30f-unadjust_216_216.png?w=100',
];

export function useLike(el: Ref<HTMLElement | undefined>) {
  const app = usePixi(el);

  const zero = ref([innerWidth / 2 - 216 / 2, innerHeight / 2 - 216 / 2]);
  const distance = 120;
  const duration = 800;

  const spriteToNextPosition = (sprites: any[][], r = 200) => {
    sprites
      .map((s, j) =>
        s.map((sprite, i) => {
          const angle = Math.floor(360 / s.length);
          const offset = angle / 12;
          const [x, y] = [
            zero.value[0] + Math.sin((angle + offset * j) * i) * (r + j * distance + 200),
            zero.value[1] + Math.cos((angle + offset * j) * i) * (r + j * distance + 200),
          ];
          return new Tween(sprite)
            .to({ x, y }, duration)
            .easing(Easing.Linear.None)
            .onStart(() => {
              const opacityDuration = 0.2 * duration;
              sprite.alpha = 1;
              // setTimeout(() => {
              //   sprite.alpha = 1
              // })

              setTimeout(() => {
                new Tween(sprite)
                  .to({ alpha: 0 }, opacityDuration)
                  .onComplete(() => {
                    app.stage.removeChild(sprite);
                  })
                  .start();
              }, duration - opacityDuration);
            });
        })
      )
      .flat()
      .forEach((item) => item.start());
  };

  const createCircle = (textures: Record<string, any>) => {
    const sprites = [];

    const source = imgs;

    for (let i = 0; i < source.length; i++) {
      const texture = Object.values(textures)[i];
      const sprite = Sprite.from(texture);

      const x = Math.sin(Math.random() * i + i);
      const y = Math.cos(Math.random() * i + i);

      sprite.position.set(zero.value[0] + x, zero.value[1] + y);
      sprite.alpha = 0;

      app.stage.addChild(sprite);
      sprites.push(sprite);
    }

    return shuffleArray(sprites);
  };

  const createPoint = async () => {
    const textures = await Assets.load(imgs);

    const sprites = [
      createCircle(textures),
      [...createCircle(textures), ...createCircle(textures)],
      [...createCircle(textures), ...createCircle(textures), ...createCircle(textures)],
    ];

    spriteToNextPosition(sprites);
  };

  onMounted(async () => {
    await Assets.load(imgs);

    requestAnimationFrame(animate);
    el.value && (el.value.className = 'like-container hidden');
  });

  const animate = (time: number) => {
    requestAnimationFrame(animate);

    update(time);
  };

  let timer: NodeJS.Timeout;
  const play = (x: number, y: number) => {
    if (!el.value) {
      return;
    }

    el.value.className = 'like-container';
    zero.value = [x, y];

    createPoint();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      el.value!.className = 'like-container hidden';
    }, duration);
  };

  return { play };
}
