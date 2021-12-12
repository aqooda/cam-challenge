import React from 'react';
import { Button, Form, Select } from 'antd';
import brokers from '@/data/brokers.json';
import productTypes from '@/data/productTypes.json';
import type { Rule } from 'antd/lib/form';
import type { LabeledValue } from 'antd/lib/select';
import type { SearchCriteria } from '@/types/common';
import type { Broker, ProductType } from '@/types/models';

interface Props {
  onSearch: (criteria: SearchCriteria) => void;
}

const initialValues: SearchCriteria = {
  productTypeId: undefined,
  brokerId: undefined,
};

const rules: Rule[] = [{ required: true, message: 'This is a required criteria.' }];

const mapToOption = ({ id, name }: Broker | ProductType): LabeledValue => ({
  key: id.toString(),
  value: id,
  label: name,
});

const brokerOptions = brokers.map(mapToOption);

const productTypeOptions = productTypes.map(mapToOption);

const TradeRecordSearchForm: React.FC<Props> = ({ onSearch }) => (
  <Form layout="vertical" initialValues={initialValues} onFinish={onSearch} requiredMark={false}>
    <Form.Item label="Product Type" name="productTypeId" rules={rules}>
      <Select placeholder="Please select one" options={productTypeOptions} />
    </Form.Item>

    <Form.Item label="Broker" name="brokerId" rules={rules}>
      <Select placeholder="Please select one" options={brokerOptions} />
    </Form.Item>

    <Button type="primary" htmlType="submit">
      Search
    </Button>
  </Form>
);

export default React.memo(TradeRecordSearchForm);
