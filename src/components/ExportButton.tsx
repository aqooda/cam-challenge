import React, { useCallback, useMemo } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { ExportType } from '@/types/common';

interface Props {
  onExport: (type: ExportType) => void;
}

const ExportButton: React.FC<Props> = ({ onExport }) => {
  const onMenuClick = useCallback<Exclude<MenuProps['onClick'], undefined>>(
    ({ key }) => onExport(key as ExportType),
    [onExport],
  );
  const menu = useMemo(
    () => (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="csv">CSV</Menu.Item>
        <Menu.Item key="json">JSON</Menu.Item>
      </Menu>
    ),
    [onMenuClick],
  );

  return (
    <Dropdown overlay={menu}>
      <Button>Export to</Button>
    </Dropdown>
  );
};

export default React.memo(ExportButton);
