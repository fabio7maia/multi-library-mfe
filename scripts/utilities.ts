export const logger = (msg: any, ...rest: any[]) => {
  const time = new Date();

  if (rest.length) {
    console.log(`${time.toISOString()} :: `, msg, rest);
  } else {
    console.log(`${time.toISOString()} :: `, msg);
  }
};

type TCallback = { fn: <T>() => Promise<T>; description: string };

type TRunInput = TCallback | TCallback[];

export const run = async (input: TRunInput) => {
  if (Array.isArray(input)) {
    input.forEach(async (x) => {
      logger(`Starting running ${x.description} ...`);

      await x.fn();

      logger(`Finished running ${x.description}!`);
    });
  }
};
