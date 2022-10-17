

export interface InfiniteCanvasPosition {
    x: number;
    y: number;
}

export interface InfiniteCanvasNode {
    id: string;
    type: string;
    
    isSelected?: boolean;

    extras?: any;

    menu?: any;

    direction?: string;

    asset?: string;
    x: number;
    y: number;

    zIndex?: number;

    ports?: InfinitePort[];
    label?: string;

    rotation?: number;

    width?: number;
    height?: number;

    value?: string;

    sub_components?: {
        [key: string]: InfiniteCanvasNode
    }
}

export interface InfinitePort {
    name?: string;
    type?: string;

    position?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }

    bounds?: {
        x?: number;
        y?: number;
    }
}

export interface InfiniteCanvasPath {
    id: string;
    type?: string;
    
    menu?: any;

    extras?: any;
    
    source: string;
    sourceHandle?: string | {x: number, y: number};
    target?: string;
    targetHandle?: string | {x: number, y: number};
    points: InfiniteCanvasPosition[]
}