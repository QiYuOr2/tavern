import { inRange } from "@/utils";
import { MaybeComputedRef, usePointerSwipe } from "@vueuse/core";
import { ref, computed, reactive } from "vue";

/**
 * 可忽略的速度
 */
const CanIgnoreSpeed = 0.0005;

export default function useRotationAnime(el: MaybeComputedRef<HTMLElement | null | undefined>) {
  /**
   * 缓存touchStart时的角度
   */
  const cacheRotateY = ref(0);

  const rotateY = ref(0);
  const rotateYWithDeg = computed(() => `${rotateY.value}deg`);

  const touchTime = reactive({
    start: 0,
    end: 0,
  });

  const speed = ref(0);

  const run = (rotate?: number) => {
    rotate && (rotateY.value = rotate);
    const step = (_timestamp: number) => {
      const diffRotate = rotateY.value % 180;
      const positiveDiffRotate = diffRotate < 0 ? diffRotate + 180 : diffRotate;

      // 回正速度，相当于徽章在一个水平面上会由于重力逐渐回到正面或反面
      if (inRange("[)", [90, 180], positiveDiffRotate)) {
        speed.value -= 0.008;
      } else if (inRange("[)", [0, 90], positiveDiffRotate)) {
        speed.value += 0.008;
      }

      // 减速
      speed.value *= 0.92;

      rotateY.value -= speed.value * 10;

      if (Math.abs(speed.value) > CanIgnoreSpeed) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const { distanceX } = usePointerSwipe(el, {
    threshold: 10,
    onSwipeStart() {
      touchTime.start = Date.now();
      cacheRotateY.value = rotateY.value;
    },
    onSwipe() {
      rotateY.value = cacheRotateY.value - distanceX.value;
    },
    onSwipeEnd() {
      // 松手自动回正 or 根据拖动速度计算角度
      touchTime.end = Date.now();
      speed.value = distanceX.value / (touchTime.end - touchTime.start);

      run();
    },
  });

  return {
    rotateYWithDeg,
    run,
  };
}
