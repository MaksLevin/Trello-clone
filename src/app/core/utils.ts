export const trackById = (index: number, item: any): string => {
  return item ? item.id : '' + index;
};
