import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from 'shared/components/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with label prop', () => {
      render(<Button label="Click Me" />);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should render button with children', () => {
      render(<Button>Child Content</Button>);
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should prioritize label over children when both are provided', () => {
      render(<Button label="Label Text">Children Text</Button>);
      expect(screen.getByText('Label Text')).toBeInTheDocument();
      expect(screen.queryByText('Children Text')).not.toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByText('Default Button');
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it('should render with custom variant', () => {
      render(<Button variant="contained" label="Contained Button" />);
      const button = screen.getByText('Contained Button');
      expect(button).toHaveAttribute('data-variant', 'contained');
    });

    it('should render with custom color', () => {
      render(<Button color="primary" label="Primary Button" />);
      const button = screen.getByText('Primary Button');
      expect(button).toHaveAttribute('data-color', 'primary');
    });
  });

  describe('Interaction', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} label="Click Me" />);
      
      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled label="Disabled Button" />);
      
      const button = screen.getByText('Disabled Button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should handle multiple clicks', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} label="Multi Click" />);
      
      const button = screen.getByText('Multi Click');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled label="Disabled" />);
      expect(screen.getByText('Disabled')).toBeDisabled();
    });

    it('should be enabled when disabled prop is false', () => {
      render(<Button disabled={false} label="Enabled" />);
      expect(screen.getByText('Enabled')).toBeEnabled();
    });

    it('should be enabled by default', () => {
      render(<Button label="Default" />);
      expect(screen.getByText('Default')).toBeEnabled();
    });
  });

  describe('Variants', () => {
    it('should render text variant', () => {
      render(<Button variant="text" label="Text Button" />);
      expect(screen.getByText('Text Button')).toHaveAttribute('data-variant', 'text');
    });

    it('should render contained variant', () => {
      render(<Button variant="contained" label="Contained Button" />);
      expect(screen.getByText('Contained Button')).toHaveAttribute('data-variant', 'contained');
    });

    it('should render outlined variant', () => {
      render(<Button variant="outlined" label="Outlined Button" />);
      expect(screen.getByText('Outlined Button')).toHaveAttribute('data-variant', 'outlined');
    });
  });

  describe('Colors', () => {
    it('should render primary color', () => {
      render(<Button color="primary" label="Primary" />);
      expect(screen.getByText('Primary')).toHaveAttribute('data-color', 'primary');
    });

    it('should render secondary color', () => {
      render(<Button color="secondary" label="Secondary" />);
      expect(screen.getByText('Secondary')).toHaveAttribute('data-color', 'secondary');
    });

    it('should render error color', () => {
      render(<Button color="error" label="Error" />);
      expect(screen.getByText('Error')).toHaveAttribute('data-color', 'error');
    });

    it('should render success color', () => {
      render(<Button color="success" label="Success" />);
      expect(screen.getByText('Success')).toHaveAttribute('data-color', 'success');
    });
  });

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<Button label="Accessible Button" />);
      const button = screen.getByRole('button', { name: 'Accessible Button' });
      expect(button).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      render(<Button aria-label="Custom Aria Label" label="Button" />);
      const button = screen.getByLabelText('Custom Aria Label');
      expect(button).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} label="Keyboard Button" />);
      
      const button = screen.getByText('Keyboard Button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Additional Props', () => {
    it('should pass through additional props', () => {
      render(<Button label="Custom" data-testid="custom-button" />);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('should support custom className', () => {
      render(<Button label="Custom Class" className="custom-class" />);
      const button = screen.getByText('Custom Class');
      expect(button).toHaveClass('custom-class');
    });

    it('should support custom styles', () => {
      render(<Button label="Styled" style={{ fontSize: '20px' }} />);
      const button = screen.getByText('Styled');
      expect(button).toHaveStyle({ fontSize: '20px' });
    });
  });

  describe('Edge Cases', () => {
    it('should render with empty label', () => {
      render(<Button label="" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with no label or children', () => {
      render(<Button />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle onClick with undefined', () => {
      render(<Button onClick={undefined} label="No Handler" />);
      const button = screen.getByText('No Handler');
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
});
