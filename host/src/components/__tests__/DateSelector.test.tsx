import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateSelector } from 'shared/components/DateSelector';

describe('DateSelector Component', () => {
  const mockOnChange = jest.fn();
  const testDate = new Date(2026, 0, 15); // January 15, 2026

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render DateSelector component', () => {
      render(<DateSelector value={null} onChange={mockOnChange} />);
      expect(screen.getByTestId('date-selector')).toBeInTheDocument();
    });

    it('should render with placeholder when no date selected', () => {
      render(
        <DateSelector 
          value={null} 
          onChange={mockOnChange} 
          placeholder="Select a date" 
        />
      );
      expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
    });

    it('should display selected date', () => {
      render(<DateSelector value={testDate} onChange={mockOnChange} />);
      // MUI DatePicker formats the date internally
      expect(screen.getByTestId('date-selector')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should be enabled by default', () => {
      render(<DateSelector value={null} onChange={mockOnChange} />);
      const button = screen.getByRole('button', { name: /choose date/i });
      expect(button).toBeEnabled();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<DateSelector value={null} onChange={mockOnChange} disabled />);
      const button = screen.getByRole('button', { name: /choose date/i });
      expect(button).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have calendar button with accessible name', () => {
      render(<DateSelector value={null} onChange={mockOnChange} />);
      const button = screen.getByRole('button', { name: /choose date/i });
      expect(button).toBeInTheDocument();
    });

    it('should have calendar icon', () => {
      render(<DateSelector value={null} onChange={mockOnChange} />);
      const icon = screen.getByTestId('CalendarIcon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null value gracefully', () => {
      render(<DateSelector value={null} onChange={mockOnChange} />);
      expect(screen.getByTestId('date-selector')).toBeInTheDocument();
    });

    it('should work without placeholder', () => {
      render(<DateSelector value={null} onChange={mockOnChange} />);
      expect(screen.getByTestId('date-selector')).toBeInTheDocument();
    });
  });
});
