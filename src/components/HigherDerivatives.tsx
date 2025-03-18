import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, Slider } from '@mui/material';
import Plot from 'react-plotly.js';
import { evaluateFunction, generatePoints, calculateHigherDerivative } from '../utils/math';
import { createBaseLayout, createFunctionTrace } from '../utils/plotting';

const HigherDerivatives: React.FC = () => {
  const [functionInput, setFunctionInput] = useState('x^2');
  const [xValue, setXValue] = useState('0');
  const [stepSize, setStepSize] = useState('0.1');
  const [derivativeOrder, setDerivativeOrder] = useState(1);
  const [showOriginal, setShowOriginal] = useState(true);
  const [xRange, setXRange] = useState<[number, number]>([-10, 10]);
  const [yRange, setYRange] = useState<[number, number]>([-10, 10]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateDerivative = () => {
    setLoading(true);
    setError(null);
    try {
      const x = parseFloat(xValue);
      const h = parseFloat(stepSize);
      const derivative = calculateHigherDerivative(functionInput, x, h, derivativeOrder);
      
      // Generate points for the derivative function
      const { x: xPoints, y: yPoints } = generatePoints(
        derivative,
        xRange[0],
        xRange[1]
      );

      const layout = createBaseLayout({
        showGrid: true,
        showAxes: true,
        xRange,
        yRange,
        showPoints: false,
        lineWidth: 2,
        pointSize: 6,
      });

      const traces = [];
      if (showOriginal) {
        const originalPoints = generatePoints(functionInput, xRange[0], xRange[1]);
        traces.push(createFunctionTrace(originalPoints.x, originalPoints.y, functionInput));
      }
      traces.push(createFunctionTrace(xPoints, yPoints, `${derivativeOrder}th derivative`));

      Plot.newPlot('plot', traces, layout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculateDerivative();
  }, [functionInput, xValue, stepSize, derivativeOrder, showOriginal, xRange, yRange]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Higher Derivatives
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Function"
              value={functionInput}
              onChange={(e) => setFunctionInput(e.target.value)}
              margin="normal"
              helperText="Enter a mathematical function (e.g., x^2, sin(x), exp(x))"
            />
            <TextField
              fullWidth
              label="X Value"
              type="number"
              value={xValue}
              onChange={(e) => setXValue(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Step Size"
              type="number"
              value={stepSize}
              onChange={(e) => setStepSize(e.target.value)}
              margin="normal"
              helperText="Smaller values give more accurate results but may be less stable"
            />
            <Typography gutterBottom>Derivative Order</Typography>
            <Slider
              value={derivativeOrder}
              onChange={(_, value) => setDerivativeOrder(value as number)}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
            <Typography gutterBottom>Show Original Function</Typography>
            <Button
              variant={showOriginal ? 'contained' : 'outlined'}
              onClick={() => setShowOriginal(!showOriginal)}
              sx={{ mb: 2 }}
            >
              {showOriginal ? 'Hide Original' : 'Show Original'}
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleCalculateDerivative}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Calculating...' : 'Calculate Higher Derivative'}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <div id="plot" style={{ width: '100%', height: '400px' }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HigherDerivatives; 