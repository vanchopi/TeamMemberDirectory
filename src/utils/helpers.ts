export function getLabel(field: string, listName: string[]): string {
  return listName?.[field] ? listName[field] : field;
}

export function reviewData<T>(arr:T[]): T[] { // spread the array for the demonstration
  return Array(10)
    .fill(null)
    .flatMap((_, outerIndex) => 
      arr.map((item, innerIndex) => ({
        ...item,
        id: outerIndex * arr.length + innerIndex + 1
      }))
    );
}