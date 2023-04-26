import React from 'react';
import { createRoot } from 'react-dom/client';
import AppLayout from './shared/components/AppLayout/AppLayout';

(async () => {
    const root = createRoot(document.getElementById('root'));

    root.render(<AppLayout />);
})();
