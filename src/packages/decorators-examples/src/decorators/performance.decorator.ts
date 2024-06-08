export const PerfCheck = (
  originalMethod: Function,
  context: ClassMethodDecoratorContext
) => {
  const methodName = String(context.name);

  function ReplacementMethod(this: any, ...args: any[]) {
    const p1 = performance.now();
    const result = originalMethod.call(this, ...args);
    const p2 = performance.now();
    console.log(`${methodName}: ${p2 - p1}ms`);
    return result;
  }
  return ReplacementMethod;
};
