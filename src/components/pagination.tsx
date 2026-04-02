import React from 'react';
import { Pagination } from 'antd';

const PaginationComponent = (props: any) => {

  const { total, defaultPageSize, defaultCurrent, onChangeCall } = props;

  return (
    <Pagination
      total={total}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={defaultPageSize}
      defaultCurrent={defaultCurrent}
      onChange={(currentPage, size) => onChangeCall(currentPage, size)}
      onShowSizeChange={(currentPage, size) => onChangeCall(currentPage, size)}
    />
  );

}

export default PaginationComponent;