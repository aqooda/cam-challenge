import React, { useCallback, useMemo, useState } from 'react';
import { Divider, Typography } from 'antd';
import ExportButton from './components/ExportButton';
import TradeRecordSearchForm from './components/TradeRecordSearchForm';
import TradeRecordTable from './components/TradeRecordTable';
import tradeRecords from './data/tradeRecords.json';
import { findProduct } from './utils/data';
import { exportTradeRecords } from './utils/export';
import type { ExportType, SearchCriteria } from './types/common';
import type { TradeRecord } from './types/models';

import styles from './styles.module.css';

const App: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const records = useMemo(
    () =>
      searchCriteria &&
      (tradeRecords as TradeRecord[]).filter(
        ({ productId, brokerId }) =>
          brokerId === searchCriteria.brokerId &&
          findProduct({ id: productId })?.typeId === searchCriteria.productTypeId,
      ),
    [searchCriteria],
  );
  const onExport = useCallback(
    (type: ExportType) => {
      const data = new Blob(
        [exportTradeRecords(searchCriteria?.productTypeId as number, records as TradeRecord[], type)],
        { type: type === 'csv' ? 'text/csv' : 'application/json' },
      );
      const element = document.createElement('a');

      element.download = `trade-record.${type}`;
      element.href = URL.createObjectURL(data);

      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    [searchCriteria, records],
  );

  return (
    <div className={styles.container}>
      <Typography.Title level={3}>Search Trade Records</Typography.Title>

      <TradeRecordSearchForm onSearch={setSearchCriteria} />

      {searchCriteria && (
        <>
          <Divider />

          <ExportButton onExport={onExport} />

          <TradeRecordTable records={records as TradeRecord[]} />
        </>
      )}
    </div>
  );
};

export default App;
