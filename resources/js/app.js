import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import DestinationPage from './components/DestinationPage';

const root = createRoot(document.getElementById('app'));
root.render(<DestinationPage />);