import React from 'react';

// Mock Button component
export const Button = ({ label, children, onClick, disabled, variant, color, className, style, ...props }: any) => (
  React.createElement('button', {
    onClick,
    disabled,
    'data-variant': variant,
    'data-color': color,
    className,
    style,
    ...props
  }, label || children)
);

// Mock DateSelector component
const DateSelector = ({ 
  value, 
  onChange, 
  format = 'dd-MMM-yyyy', 
  width = 165, 
  size = 'small', 
  placeholder, 
  disabled = false, 
  disablePast = false, 
  minDate, 
  maxDate 
}: any) => {
  return React.createElement('div', { 'data-testid': 'date-selector' },
    React.createElement('input', {
      type: 'text',
      value: value ? value.toLocaleDateString() : '',
      onChange: (e: any) => {
        if (e.target.value) {
          onChange(new Date(e.target.value));
        } else {
          onChange(null);
        }
      },
      placeholder,
      disabled,
      'data-format': format,
      'data-width': width,
      'data-size': size,
      'data-disable-past': disablePast,
      'data-min-date': minDate?.toISOString(),
      'data-max-date': maxDate?.toISOString(),
      onClick: () => {
        if (!disabled) {
          const input = document.querySelector('[data-testid="date-selector"] input') as HTMLInputElement;
          if (input) input.focus();
        }
      },
      readOnly: true
    })
  );
};

export default DateSelector;

// Mock other shared components as needed
export const Header = () => React.createElement('div', { 'data-testid': 'mock-header' }, 'Mock Header');
export const SideNav = () => React.createElement('div', { 'data-testid': 'mock-sidenav' }, 'Mock SideNav');
export const MainContent = ({ children }: any) => React.createElement('div', { 'data-testid': 'mock-main-content' }, children);
export const DataTable = () => React.createElement('div', { 'data-testid': 'mock-datatable' }, 'Mock DataTable');
