function splitEachAt(v: string[], sep: string): string[][] {
  return v.map((x) => x.split(sep));
}

function sum(v: number[]): number {
  return v.reduce((total, current) => total + current);
}

function uniq<T>(v: T[]): T[] {
  return [...new Set(v)];
}

export { splitEachAt, sum, uniq };
