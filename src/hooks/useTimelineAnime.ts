import { MaybeComputedRef, resolveRef } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";

type TimelineNodeWithPosition = TimelineNode & Position;
export type TimelineNode = {
  label: string;
  time?: string;
  delay?: string;
};
export type Position = {
  x: number;
  y: number;
};
export type TimelineAnimeOptions = {
  start: Position;
  distance: Position;
  r: number;
  list: TimelineNode[];
  maxWidth: number;
  /**
   * 延时 - ms
   */
  delay?: number;
};

export default function useTimelineAnime(el: MaybeComputedRef<HTMLElement | null | undefined>, options: TimelineAnimeOptions) {
  const target = resolveRef(el);
  const lineLength = ref(0);
  onMounted(() => {
    lineLength.value = target.value?.querySelector("path")?.getTotalLength() ?? 0;
  });

  const { start, distance, r, list, maxWidth, delay } = options;

  const maxCountInLine = Math.floor(maxWidth / distance.x) - 1;

  const level = ref(-1);
  /**
   * - 向左 `l`
   * - 向右 `r`
   */
  const direction = ref<"r" | "l">("l");

  /**
   * 点
   */
  const point = (item: TimelineNode, i: number) => {
    return {
      ...item,
      x: (direction.value === "r" ? i : maxCountInLine - i) * distance.x + start.x,
      y: start.y + level.value * distance.y,
    };
  };

  /**
   * 拐点时的延长线目标节点
   */
  const getNextPoint = (current: any) => ({ x: current.x, y: current.y - distance.y });
  /**
   * 线
   */
  const line = (item: any) => `${item.x},${item.y} `;
  /**
   * 半圆
   */
  const semicirclePath = (x: number, y: number) =>
    direction.value === "r" ? `A ${r} ${r} 0 1 1 ${x} ${y} ` : `A ${-r} ${-r} 0 1 0 ${x} ${y} `;

  const nodesAndLine = computed(() => {
    level.value = -1;
    direction.value = "l";
    const timelineNodes = list.reduce<TimelineNodeWithPosition[]>((result, current, i) => {
      if (i % 3 === 0) {
        level.value += 1;
        direction.value = direction.value === "l" ? "r" : "l";
      }
      current.delay = `${i * (delay || 0)}ms`;
      result.push(point(current, i % maxCountInLine));
      return result;
    }, []);

    level.value = -1;
    direction.value = "l";
    const pathD = timelineNodes.reduce((result, current, i) => {
      if (i % 3 === 0 && i !== 0) {
        // 拐点延长
        result += line(getNextPoint(current));

        level.value += 1;
        direction.value = direction.value === "l" ? "r" : "l";

        // 弧线
        result = result + semicirclePath(current.x, current.y) + "L ";
      }

      result = result + line(current);
      return result;
    }, "M ");

    return { timelineNodes, pathD };
  });

  return {
    timelineNodes: computed(() => nodesAndLine.value.timelineNodes),
    pathD: computed(() => nodesAndLine.value.pathD),
    lineLength,
  };
}
