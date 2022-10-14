import { DataGrid } from "@mui/x-data-grid";

import { columns } from "./columns";

export const DataTable = ({ rows }) => (
  <DataGrid
    style={{ minHeight: 590, width: "100%" }}
    getRowId={(row) => row.Id}
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10, 50, 100, 300]}
    checkboxSelection
  />
);
