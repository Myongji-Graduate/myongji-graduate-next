const store: { [key: string]: { value: unknown } } = {};
export function cookies() {
  return {
    set: (key: string, value: unknown) => {
      store[key] = {
        value,
      };
    },
    get: (key: string) => {
      return store[key];
    },
  };
}
