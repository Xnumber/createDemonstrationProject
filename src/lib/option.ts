const getOptions = <T>(values: T[]) => values.map(o => ({label: o, value: o}));
export { getOptions };