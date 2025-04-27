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

export function chunkArray<T>(
  arr: T[],
  chunkSize: number
): { id: number; data: T[] }[] {
  const result: { id: number; data: T[] }[] = [];
  if (!chunkSize || chunkSize <= 0) {
    return [{ id: 0, data: arr }];
  }
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push({
      id: i / chunkSize,
      data: arr.slice(i, i + chunkSize),
    });
  }
  return result;
}
