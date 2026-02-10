/**
 * AG Grid Component Test Suite
 * 
 * Tests for AG Grid functionality in shared components
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface TestData {
  id: number;
  name: string;
  value: number;
}

const sampleData: TestData[] = [
  { id: 1, name: 'Item A', value: 100 },
  { id: 2, name: 'Item B', value: 200 },
  { id: 3, name: 'Item C', value: 300 },
];

const columnDefs: ColDef<TestData>[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'value', headerName: 'Value' },
];

describe('AG Grid Tests', () => {
  it('should render AG Grid with column headers', async () => {
    render(
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact<TestData>
          rowData={sampleData}
          columnDefs={columnDefs}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });
  });

  it('should render AG Grid with row data', async () => {
    render(
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact<TestData>
          rowData={sampleData}
          columnDefs={columnDefs}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText('Item A')).toBeInTheDocument();
      expect(screen.getByText('Item B')).toBeInTheDocument();
      expect(screen.getByText('Item C')).toBeInTheDocument();
    });
  });

  it('should handle empty row data', async () => {
    render(
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact<TestData>
          rowData={[]}
          columnDefs={columnDefs}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });

  it('should apply pagination settings', async () => {
    render(
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact<TestData>
          rowData={sampleData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={2}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText('Item A')).toBeInTheDocument();
    });
  });

  it('should enable sorting on columns', async () => {
    const sortableColumns: ColDef<TestData>[] = columnDefs.map(col => ({
      ...col,
      sortable: true,
    }));

    render(
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact<TestData>
          rowData={sampleData}
          columnDefs={sortableColumns}
        />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
    });
  });
});
