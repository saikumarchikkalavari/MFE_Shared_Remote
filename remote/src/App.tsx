import React, { useState, useMemo } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { ColDef } from 'ag-grid-community';

// @ts-ignore
const DataTable = React.lazy(() => import('shared/DataTable'));
// @ts-ignore
const Button = React.lazy(() => import('shared/Button'));
// @ts-ignore
import type { Product } from 'shared/types';

const mockProducts: Product[] = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop', price: 1200, category: 'Electronics', inStock: true },
  { id: '2', name: 'Mouse', description: 'Wireless mouse', price: 25, category: 'Electronics', inStock: true },
  { id: '3', name: 'Keyboard', description: 'Mechanical keyboard', price: 75, category: 'Electronics', inStock: false },
  { id: '4', name: 'Monitor', description: '27-inch 4K monitor', price: 450, category: 'Electronics', inStock: true },
  { id: '5', name: 'Headphones', description: 'Noise-cancelling headphones', price: 200, category: 'Electronics', inStock: true },
  { id: '6', name: 'Webcam', description: '1080p webcam', price: 80, category: 'Electronics', inStock: true },
  { id: '7', name: 'Desk Chair', description: 'Ergonomic office chair', price: 300, category: 'Furniture', inStock: false },
  { id: '8', name: 'Standing Desk', description: 'Adjustable standing desk', price: 500, category: 'Furniture', inStock: true },
];

const App: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const columnDefs = useMemo<ColDef<Product>[]>(() => [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 120,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { 
      field: 'inStock', 
      headerName: 'In Stock', 
      width: 120,
      cellStyle: (params) => ({
        color: params.value ? 'green' : 'red',
        fontWeight: 'bold'
      })
    },
  ], []);

  const handleSelectionChanged = (rows: Product[]) => {
    setSelectedProducts(rows);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products Management
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          label="Add Product" 
          variant="contained" 
          color="primary" 
          sx={{ mr: 1 }}
          onClick={() => alert('Add Product clicked')}
        />
        <Button 
          label="Refresh" 
          variant="outlined" 
          color="primary"
          onClick={() => alert('Refresh clicked')}
        />
      </Box>

      {selectedProducts.length > 0 && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body1">
            Selected: {selectedProducts.map(p => p.name).join(', ')}
          </Typography>
        </Box>
      )}

      <React.Suspense fallback={<div>Loading table...</div>}>
        <DataTable
          rowData={mockProducts}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          rowSelection="multiRow"
          onSelectionChanged={handleSelectionChanged}
          height="500px"
        />
      </React.Suspense>
    </Container>
  );
};

export default App;
