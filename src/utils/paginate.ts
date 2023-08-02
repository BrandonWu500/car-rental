export function paginate<T>(items: T[], pageNumber: number, pageSize: number) {
  const newItems = items.slice(0, pageNumber * pageSize);
  return newItems;
}
