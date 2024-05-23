// [1,2,3,'...',15]
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // si el numero total de paginas es menor a 7
  // mostrar todas las paginas sin los '...'
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // si la paginaActual se encuentra entre el final
  // mostrar 1,2,...,48,49,50
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  // si la paginaActual se encuentra entre los primeros
  // mostrar 1,2,3,...,49,50
  if (currentPage <= 3) {
    return [1, 2, , 3, "...", totalPages - 1, totalPages];
  }
  // si la paginaActual se encuentra entre el medio
  // mostrar 1,...,23,24,25,...,50
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
