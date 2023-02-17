declare global {
  type ValuesOf<T extends Record<string, any>> = T[keyof T];
}

export { }