import { MaybeComputedRef, usePointerSwipe } from "@vueuse/core";
import { ref, computed, reactive } from "vue";

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

  const anime = () => {

  }
  
  const step = (timestamp: number) => {
    const speed = distanceX.value / (touchTime.end - touchTime.start);

    requestAnimationFrame(step);
  };

  const calculateRotate = (speed: number) => {
    requestAnimationFrame(() => {
      rotateY.value = rotateY.value - speed * 10;
    });
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

      requestAnimationFrame(step);
    },
  });

  return {
    rotateYWithDeg,
  };
}
