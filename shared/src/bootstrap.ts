// Shared MFE entry point
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = document.getElementById('root');

if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(
    React.createElement('div', { style: { padding: '20px', fontFamily: 'Arial' } }, [
      React.createElement('h1', { key: 'title' }, 'Shared Components MFE'),
      React.createElement('p', { key: 'desc' }, 'This MFE exposes shared components and utilities to other MFEs.'),
      React.createElement('ul', { key: 'list' }, [
        React.createElement('li', { key: '1' }, 'Header'),
        React.createElement('li', { key: '2' }, 'DataTable'),
        React.createElement('li', { key: '3' }, 'Button'),
        React.createElement('li', { key: '4' }, 'Theme'),
        React.createElement('li', { key: '5' }, 'API Utilities'),
      ]),
    ])
  );
}
