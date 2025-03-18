declare module 'plotly.js-dist' {
  export interface Layout {
    title?: string;
    xaxis?: {
      title?: string;
      showgrid?: boolean;
      showline?: boolean;
      zeroline?: boolean;
      range?: [number, number];
    };
    yaxis?: {
      title?: string;
      showgrid?: boolean;
      showline?: boolean;
      zeroline?: boolean;
      range?: [number, number];
    };
    showlegend?: boolean;
    grid?: {
      rows?: number;
      columns?: number;
      pattern?: 'independent';
    };
  }

  export interface Trace {
    x: number[];
    y: number[];
    type: string;
    name?: string;
    mode?: string;
    line?: {
      color?: string;
      width?: number;
    };
    fill?: string;
  }

  export interface Plot {
    newPlot: (divId: string, data: Trace[], layout: Layout) => void;
  }

  const Plot: Plot;
  export default Plot;
} 