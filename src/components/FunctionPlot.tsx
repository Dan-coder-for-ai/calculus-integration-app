import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';
import { evaluateFunction, generatePoints } from '../utils/math';
import { createBaseLayout, createFunctionTrace } from '../utils/plotting';

const FunctionPlot: React.FC = () => {
  const [functionInput, setFunctionInput] = useState('x^2');
  const [xRange, setXRange] = useState<[number, number]>([-10, 10]);
  const [yRange, setYRange] = useState<[number, number]>([-10, 10]);
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlot = () => {
    setLoading(true);
    setError(null);
    try {
      const { x, y } = generatePoints(functionInput, xRange[0], xRange[1]);
      const layout = createBaseLayout({
        showGrid,
        showAxes,
        xRange,
        yRange,
      });
      const trace = createFunctionTrace(x, y, functionInput);
      Plot.newPlot('plot', [trace], layout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePlot();
  }, [functionInput, xRange, yRange, showGrid, showAxes]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Function Plot
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
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="X Range Start"
                  type="number"
                  value={xRange[0]}
                  onChange={(e) => setXRange([Number(e.target.value), xRange[1]])}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="X Range End"
                  type="number"
                  value={xRange[1]}
                  onChange={(e) => setXRange([xRange[0], Number(e.target.value)])}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Y Range Start"
                  type="number"
                  value={yRange[0]}
                  onChange={(e) => setYRange([Number(e.target.value), yRange[1]])}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Y Range End"
                  type="number"
                  value={yRange[1]}
                  onChange={(e) => setYRange([yRange[0], Number(e.target.value)])}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handlePlot}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Plotting...' : 'Plot Function'}
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

export default FunctionPlot; 