export type ExportType = 'csv' | 'json';

export interface SearchCriteria {
  productTypeId: number | undefined;
  brokerId: number | undefined;
}
