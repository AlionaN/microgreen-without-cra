export interface IProductFilters {
  category: string,
  minPrice: number,
  maxPrice: number
};

export interface IProductPaginate {
  page: number,
  limit: number,
};

export interface IProductQuery {
  sorting?: '',
  filters?: IProductFilters,
  paginate?: IProductPaginate,
};
