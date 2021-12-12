import dayjs from 'dayjs';
import { findProduct } from './data';
import type { ExportType } from '@/types/common';
import type { TradeRecord } from '@/types/models';

const exportFxForwardTradeRecords = (records: TradeRecord[], exportType: ExportType) => {
  const keys = ['tradeRef', 'productId', 'productName', 'tradeDate', 'qty', 'buySell', 'price'];
  const rows = records.map((record) => [
    record.ref,
    record.productId,
    findProduct({ id: record.productId })?.name,
    dayjs(record.date).format('YYYYMMDD'),
    record.qty,
    record.buySell,
    record.price,
  ]);

  if (exportType === 'csv') {
    return [keys, ...rows].join('\n');
  }

  return JSON.stringify(
    rows.map((row) => Object.fromEntries(keys.map((key, index) => [key, row[index]]))),
    undefined,
    2,
  );
};

const exportOtherTradeRecords = (records: TradeRecord[], exportType: ExportType) => {
  if (exportType === 'csv') {
    return records.length === 0
      ? ''
      : [Object.keys([records[0]]).join(','), ...records.map((record) => Object.values(record).join(','))].join('\n');
  }

  return JSON.stringify(records, undefined, 2);
};

export const exportTradeRecords = (productTypeId: number, records: TradeRecord[], exportType: ExportType) => {
  const exportFunc = productTypeId === 1 ? exportFxForwardTradeRecords : exportOtherTradeRecords;

  return exportFunc(records, exportType);
};
