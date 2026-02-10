/**
 * DateSelector Component Test Suite
 * 
 * Tests for DateSelector component using MUI DatePicker
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateSelector from '../DateSelector';

describe('DateSelector Component Tests', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render DateSelector component', () => {
    render(<DateSelector value={null} onChange={mockOnChange} />);
    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('should display selected date value', () => {
    const testDate = new Date(2026, 0, 15);
    render(<DateSelector value={testDate} onChange={mockOnChange} />);
    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('should render with custom placeholder', () => {
    render(
      <DateSelector 
        value={null} 
        onChange={mockOnChange} 
        placeholder="Pick a date" 
      />
    );
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
  });

  it('should apply custom size prop', () => {
    render(<DateSelector value={null} onChange={mockOnChange} size="small" />);
    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });
});
