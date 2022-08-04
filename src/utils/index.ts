export type RangeType = "[]" | "()" | "[)" | "(]";

export function inRange(type: RangeType, range: [number, number], value: number) {
  switch (type) {
    case "()":
      return value > range[0] && value < range[1];
    case "(]":
      return value > range[0] && value <= range[1];
    case "[)":
      return value >= range[0] && value < range[1];
    case "[]":
      return value >= range[0] && value <= range[1];
    default:
      throw new TypeError("范围类型错误");
  }
}
