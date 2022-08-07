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

export function bemCreator(block: string) {
  return (element?: string, modifier?: Record<string, boolean>) => {
    const namespace = element ? `${block}__${element}` : block;
    const states = Object.keys(modifier || {}).reduce<string[]>((classNames, currentKey) => {
      const currentState = !!modifier?.[currentKey] ? `${namespace}--${currentKey}` : "";
      return currentState ? [...classNames, currentState] : classNames;
    }, []);
    return [namespace, ...states].join(" ");
  };
}
