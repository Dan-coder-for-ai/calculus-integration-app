import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';
import { evaluateFunction, generatePoints, calculateIntegral } from '../utils/math';
import { createBaseLayout, createFunctionTrace, createAreaTrace } from '../utils/plotting';

const Integrals: React.FC = () => {
  const [functionInput, setFunctionInput] = useState('x^2');
  const [lowerBound, setLowerBound] = useState('-1');
  const [upperBound, setUpperBound] = useState('1');
  const [xRange, setXRange] = useState<[number, number]>([-10, 10]);
  const [yRange, setYRange] = useState<[number, number]>([-10, 10]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [integralValue, setIntegralValue] = useState<number | null>(null);

  const handleCalculateIntegral = () => {
    setLoading(true);
    setError(null);
    try {
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      const integral = calculateIntegral(functionInput, a, b);
      setIntegralValue(integral);
      
      // Generate points for the original function
      const { x: xPoints, y: yPoints } = generatePoints(functionInput, xRange[0], xRange[1]);
      
      const layout = createBaseLayout({
        showGrid: true,
        showAxes: true,
        xRange,
        yRange,
        showPoints: false,
        lineWidth: 2,
        pointSize: 6,
      });

      const traces = [
        createFunctionTrace(xPoints, yPoints, functionInput),
        createAreaTrace(functionInput, a, b),
      ];

      Plot.newPlot('plot', traces, layout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculateIntegral();
  }, [functionInput, lowerBound, upperBound, xRange, yRange]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Integrals
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
              label="Lower Bound"
              type="number"
              value={lowerBound}
              onChange={(e) => setLowerBound(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Upper Bound"
              type="number"
              value={upperBound}
              onChange={(e) => setUpperBound(e.target.value)}
              margin="normal"
            />
            {integralValue !== null && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Integral Value: {integralValue.toFixed(4)}
              </Typography>
            )}
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleCalculateIntegral}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Calculating...' : 'Calculate Integral'}
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

export default Integrals; 