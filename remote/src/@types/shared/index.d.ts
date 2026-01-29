declare module 'shared/DataTable' {
  import { FC } from 'react';
  import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
  
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
  
  const DataTable: FC<DataTableProps>;
  export default DataTable;
}

declare module 'shared/Button' {
  import { FC } from 'react';
  import { ButtonProps as MuiButtonProps } from '@mui/material';
  
  export interface ButtonProps extends MuiButtonProps {
    label?: string;
  }
  
  const Button: FC<ButtonProps>;
  export default Button;
}

declare module 'shared/types' {
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
  }
}
