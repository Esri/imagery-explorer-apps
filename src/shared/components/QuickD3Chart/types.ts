export type QuickD3ChartDataItem = {
    key: string | number;
    value: number;
    label?: string;
};

export type QuickD3ChartData = QuickD3ChartDataItem[];

export type Dimension = {
    height: number;
    width: number;
};

export type Margin = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type SvgContainerData = {
    svg: SVGSVGElement;
    rootGroup: SVGGElement;
    margin: Margin;
    dimension: Dimension;
};
