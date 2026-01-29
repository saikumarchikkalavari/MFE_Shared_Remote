import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, GridApi, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules once
ModuleRegistry.registerModules([AllCommunityModule]);

export interface DataTableProps<TData = any> {
  rowData: TData[];
  columnDefs: ColDef<TData>[];
  pagination?: boolean;
  paginationPageSize?: number;
  rowSelection?: 'singleRow' | 'multiRow';
  onSelectionChanged?: (selectedRows: TData[]) => void;
  onGridReady?: (api: GridApi) => void;
  defaultColDef?: ColDef;
  height?: string;
  animateRows?: boolean;
  gridOptions?: GridOptions;
}

export const DataTable = <TData extends Record<string, any>>({
  rowData,
  columnDefs,
  pagination = true,
  paginationPageSize = 10,
  rowSelection,
  onSelectionChanged,
  onGridReady,
  defaultColDef,
  height = '500px',
  animateRows = true,
  gridOptions,
}: DataTableProps<TData>) => {
  const defaultColDefMemo = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      ...defaultColDef,
    }),
    [defaultColDef]
  );

  const gridOptionsMemo = useMemo<GridOptions>(
    () => ({
      pagination,
      paginationPageSize,
      rowSelection: rowSelection ? { mode: rowSelection } : undefined,
      animateRows,
      ...gridOptions,
    }),
    [pagination, paginationPageSize, rowSelection, animateRows, gridOptions]
  );

  const handleGridReady = (params: { api: GridApi }) => {
    onGridReady?.(params.api);
  };

  const handleSelectionChanged = (event: any) => {
    if (onSelectionChanged) {
      const selectedRows = event.api.getSelectedRows();
      onSelectionChanged(selectedRows);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDefMemo}
        gridOptions={gridOptionsMemo}
        onGridReady={handleGridReady}
        onSelectionChanged={handleSelectionChanged}
      />
    </div>
  );
};

export default DataTable;
