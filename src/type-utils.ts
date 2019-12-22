// From https://github.com/piotrwitek/utility-types/blob/b83fe212836284d03b5e725352d6fa947b49ca2b/src/mapped-types.ts#L599-L618
export type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
