import { Layout } from 'plotly.js-dist';
import { Point } from './math';

interface PlotState {
  showGrid: boolean;
  showAxes: boolean;
  xRange: [number, number];
  yRange: [number, number];
  showPoints: boolean;
  lineWidth: number;
  pointSize: number;
}

export const createBaseLayout = (state: PlotState): Partial<Layout> => ({
  title: 'Function Plot',
  xaxis: {
    title: 'x',
    range: state.xRange,
    showgrid: state.showGrid,
    showline: state.showAxes,
    zeroline: state.showAxes,
  },
  yaxis: {
    title: 'y',
    range: state.yRange,
    showgrid: state.showGrid,
    showline: state.showAxes,
    zeroline: state.showAxes,
  },
  showlegend: false,
  autosize: true,
  margin: { t: 40, b: 40, l: 40, r: 40 },
});

export const createFunctionTrace = (points: Point[], state: PlotState, name?: string) => ({
  x: points.map(p => p.x),
  y: points.map(p => p.y),
  name,
  type: 'scatter',
  mode: state.showPoints ? 'lines+markers' : 'lines',
  line: { 
    color: '#1976d2',
    width: state.lineWidth 
  },
  marker: {
    size: state.pointSize,
    color: '#1976d2'
  }
});

export const createAreaTrace = (points: Point[], name: string = 'Area') => ({
  x: points.map(p => p.x),
  y: points.map(p => p.y),
  name,
  type: 'scatter',
  mode: 'lines',
  fill: 'tozeroy',
  line: {
    color: '#1976d2',
    width: 1,
  },
});

export const createTangentLineTrace = (points: Point[], name: string = 'Tangent Line') => ({
  x: points.map(p => p.x),
  y: points.map(p => p.y),
  name,
  type: 'scatter',
  mode: 'lines',
  line: {
    color: '#dc004e',
    width: 2,
    dash: 'dash',
  },
}); 