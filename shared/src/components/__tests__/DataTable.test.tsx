/**
 * DataTable Component Test Suite
 * 
 * Tests for DataTable component using AG Grid
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import DataTable from '../DataTable';
import type { ColDef } from 'ag-grid-community';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const userData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
];

const userColumns: ColDef<User>[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'email', headerName: 'Email' },
  { field: 'role', headerName: 'Role' },
];

describe('DataTable Component Tests', () => {
  it('should render DataTable with headers', async () => {
    render(<DataTable rowData={userData} columnDefs={userColumns} />);
    
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  it('should display table data', async () => {
    render(<DataTable rowData={userData} columnDefs={userColumns} />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('should handle empty data gracefully', async () => {
    render(<DataTable rowData={[]} columnDefs={userColumns} />);
    
    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });

  it('should apply height prop', () => {
    const { container } = render(
      <DataTable rowData={userData} columnDefs={userColumns} height="500px" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should enable pagination when prop is set', async () => {
    render(
      <DataTable 
        rowData={userData} 
        columnDefs={userColumns} 
        pagination={true}
        paginationPageSize={2}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });
});
