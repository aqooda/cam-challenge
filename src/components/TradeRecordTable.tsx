import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { findProduct } from '@/utils/data';
import type { TradeRecord } from '@/types/models';

interface Props {
  records: TradeRecord[];
}

const renderTimeColumn = (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss');

const renderProductNameColumn = (productId: number) => {
  const { id, name } = findProduct({ id: productId }) ?? {};

  return (
    <>
      <div>{`ID: ${id}`}</div>
      <div>{`Name: ${name}`}</div>
    </>
  );
};

const renderBuySellColumn = (buySell: TradeRecord['buySell']) => (buySell === 'B' ? 'Buy' : 'Sell');

const TradeRecordTable: React.FC<Props> = ({ records }) => (
  <Table
    rowKey="ref"
    dataSource={records}
    locale={{ emptyText: 'No trade record found.' }}
    pagination={{
      position: ['topRight', 'bottomRight'],
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
    }}
    bordered
  >
    <Table.Column dataIndex="date" title="Time" render={renderTimeColumn} />
    <Table.Column dataIndex="ref" title="Ref" />
    <Table.Column dataIndex="productId" title="Product" render={renderProductNameColumn} />
    <Table.Column dataIndex="qty" title="Qty" />
    <Table.Column dataIndex="buySell" title="BuySell" render={renderBuySellColumn} />
    <Table.Column dataIndex="price" title="Price" />
  </Table>
);

export default React.memo(TradeRecordTable);
