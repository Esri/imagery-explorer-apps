import React from 'react';
import { ReferenceLayersToggleControl } from './ReferenceLayersToggleControl';
import classNames from 'classnames';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';

export const ReferenceLayersControlMobileDevice = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [showReferenceLayersControl, setShowReferenceLayersControl] =
        React.useState(false);

    const toggleReferenceLayersControl = () => {
        setShowReferenceLayersControl(!showReferenceLayersControl);
    };

    useOnClickOutside(containerRef, () => {
        setShowReferenceLayersControl(false);
    });
    return (
        <div className=" h-full flex items-start" ref={containerRef}>
            <div
                className={classNames('mr-2', {
                    hidden: showReferenceLayersControl === false,
                })}
            >
                <ReferenceLayersToggleControl />
            </div>

            <div
                className="theme-background text-custom-light-blue"
                style={
                    {
                        '--calcite-button-text-color':
                            'var(--custom-light-blue)',
                    } as React.CSSProperties
                }
            >
                <calcite-button
                    iconStart="layers"
                    appearance="transparent"
                    kind="neutral"
                    onClick={toggleReferenceLayersControl}
                />
            </div>
        </div>
    );
};
