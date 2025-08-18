export function paginateArray<T>(
  data: T[],
  page: string,
  itemsPerPage: string
) {
  const pageNumber = Number(page);
  const itemsPerPageNumber = Number(itemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPageNumber);
  const startIndex = (pageNumber - 1) * itemsPerPageNumber;
  const endIndex = startIndex + itemsPerPageNumber;
  const paginatedData = data.slice(startIndex, endIndex);

  return { paginatedData, totalItems, totalPages };
}
