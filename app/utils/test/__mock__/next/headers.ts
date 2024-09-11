const store: { [key: string]: { value: unknown } } = {};
export function cookies() {
  return {
    set: (key: string, value: unknown) => {
      store[key] = {
        value,
      };
      console.log(store[key]);
    },
    get: (key: string) => {
      return store[key];
    },
  };
}
