import './style.css';
import React from 'react';

const CustomMapArrtribution = () => {
    const toggleEsriAttribution = () => {
        const element = document.querySelector('.esri-attribution');
        element.classList.toggle('show');
    };

    return (
        <div
            className="absolute left-0 bottom-0 custom-attribution-text hover:opacity-0"
            onMouseEnter={toggleEsriAttribution}
            onMouseOut={toggleEsriAttribution}
        >
            <div className="pointer-events-none">
                <span>
                    Powered by Esri | Sentinel-2 10m Land Use/Land Cover data by
                    Impact Observatory, Microsoft, and Esri
                </span>
            </div>
        </div>
    );
};

export default CustomMapArrtribution;
