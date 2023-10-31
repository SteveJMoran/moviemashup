import React from 'react';
import { createRoot } from 'react-dom/client';
import { MovieMashup } from './components/MovieMashup'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<MovieMashup />);