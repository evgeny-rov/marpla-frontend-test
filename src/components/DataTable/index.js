import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';

import { columns } from './columns';

export const DataTable = React.memo(({ rows }) => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <DataGrid
      style={{ minHeight: 590, width: '100%' }}
      getRowId={(row) => row.Id}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 50, 100, 300]}
      checkboxSelection
    />
  );
});
