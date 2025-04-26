export function getLabel(field: string, listName: string[]): string {
  return listName?.[field] ? listName[field] : field;
}

export function reviewData<T>(arr: T[]): T[] {
  // spread the array for the demonstration
  return Array(10)
    .fill(null)
    .flatMap((_, outerIndex) =>
      arr.map((item, innerIndex) => ({
        ...item,
        id: outerIndex * arr.length + innerIndex + 1,
      }))
    );
}

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  if (!chunkSize || chunkSize <= 0) {
    return [arr];
  }
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}
