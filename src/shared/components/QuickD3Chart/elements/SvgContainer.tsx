import React, { useRef, useEffect, useLayoutEffect } from 'react';

import { select } from 'd3';

import { SvgContainerData, Margin, Dimension } from '../types';

import { MARGIN } from '../constants';

type Props = {
    margin?: Margin;
    resizable?: boolean;
    dimensionOnChange?: (dimension: Dimension) => void;
    children?: React.ReactNode;
};

const SvgContainer: React.FC<Props> = ({
    margin = MARGIN,
    resizable,
    dimensionOnChange,
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>();
    const svgRef = useRef<SVGSVGElement>();
    const rootGroupRef = useRef<SVGGElement>();
    const dimensionRef = useRef<Dimension>();

    const [svgContainerData, setSvgContainerData] =
        React.useState<SvgContainerData>();

    const updateDimension = () => {
        const svg = select(svgRef.current).node();
        const rootGroup = select(rootGroupRef.current).node();

        const container = containerRef.current;
        const width = container.offsetWidth - margin.left - margin.right;
        const height = container.offsetHeight - margin.top - margin.bottom;

        dimensionRef.current = {
            height,
            width,
        };

        if (dimensionOnChange) {
            dimensionOnChange(dimensionRef.current);
        }

        setSvgContainerData({
            svg,
            rootGroup,
            margin,
            dimension: dimensionRef.current,
        });
    };

    useEffect(() => {
        updateDimension();
    }, []);

    useLayoutEffect(() => {
        if (resizable) {
            window.addEventListener('resize', updateDimension);
        }

        return () => {
            window.removeEventListener('resize', updateDimension);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <svg
                ref={svgRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <g
                    ref={rootGroupRef}
                    style={{
                        transform: `translate(${margin.left}px, ${margin.top}px)`,
                    }}
                >
                    {svgContainerData
                        ? React.Children.map(children, (child) => {
                              return React.cloneElement(
                                  child as React.ReactElement<any>,
                                  {
                                      svgContainerData,
                                  }
                              );
                          })
                        : null}
                </g>
            </svg>
        </div>
    );
};

export default SvgContainer;
