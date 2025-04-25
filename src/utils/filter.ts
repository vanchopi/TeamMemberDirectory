const chunkSize = 100;
const delay = 1000;

function optionMatch(filter: string, item: any): boolean {
  return item === filter;
}

function stringMatch(filter: string, item: string): boolean {
  return item.toLowerCase().indexOf(filter.toLowerCase()) > -1;
}

function searchBy(filter: string, row: any, props: string[]): boolean {
  let str = "";
  props.forEach(prop => {
    str+= Array.isArray(row[prop]) ? row[prop].join(" ") : row[prop] 
  })
  return stringMatch(filter, str);
}

function matchByProp(item: any, filter: string, prop: string, row: any): boolean {
  switch (true) {
    case prop === "search":
      return searchBy(filter, row, ["name", "skills"]);
    case prop === "department":
      return optionMatch(filter, item);
    default:
      return false;
  }
}

function isMatch(item: any, filter: string, prop: string, row: any): boolean {
  if (!filter) return true;
  if (item === undefined) return false;
  return matchByProp(item, filter, prop, row);
}

export function filterBy<FilterType extends Record<string, any>, RowType extends Record<string, any>>(filter: FilterType, rows: RowType[]): Promise<RowType[]> {
  return new Promise((resolve) => {
    let currentIndex = 0;
    const filteredArray: RowType[] = [];
    function processChunk(): void {
      const endIndex = Math.min(currentIndex + chunkSize, rows.length);
      const chunk = rows.slice(currentIndex, endIndex);
      const filteredChunk: RowType[] = chunk.filter((item) => {
        for (const prop in filter) {
          const key = prop as keyof RowType;
          const match: boolean = isMatch(
            item[key] || null,
            filter[prop],
            prop,
            item
          );
          if (!match) return false;
        }
        return true;
      });
      filteredArray.push(...filteredChunk);
      currentIndex = endIndex;
      if (currentIndex < rows.length) {
        setTimeout(processChunk, delay);
      } else {
        console.log("Filtering complete!");
        resolve(filteredArray);
      }
    }
    processChunk();
  });
}
