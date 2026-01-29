import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Grid, Divider } from '@mui/material';

// @ts-ignore
const DateSelector = React.lazy(() => import('shared/DateSelector'));

/**
 * Test Page for DateSelector Component
 * Demonstrates various configurations and use cases
 */
const TestDateSelector: React.FC = () => {
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);
  const [selectedDate3, setSelectedDate3] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        DateSelector Component Examples
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Enterprise-grade date picker from MFE_WithShared, now available in MFE_NewProject
      </Typography>

      <Grid container spacing={3}>
        {/* Basic Date Picker */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic Date Picker
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Standard date selection with default formatting
            </Typography>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DateSelector
                value={selectedDate1}
                onChange={setSelectedDate1}
                placeholder="Select a date"
              />
            </React.Suspense>
            <Box mt={2}>
              <Typography variant="body2">
                Selected: {selectedDate1 ? selectedDate1.toLocaleDateString() : 'None'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Date Picker with Past Dates Disabled */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Future Dates Only
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Past dates are disabled (useful for scheduling)
            </Typography>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DateSelector
                value={selectedDate2}
                onChange={setSelectedDate2}
                placeholder="Select future date"
                disablePast
              />
            </React.Suspense>
            <Box mt={2}>
              <Typography variant="body2">
                Selected: {selectedDate2 ? selectedDate2.toLocaleDateString() : 'None'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Custom Format */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Custom Date Format
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Format: yyyy/MM/dd (ISO style)
            </Typography>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DateSelector
                value={selectedDate3}
                onChange={setSelectedDate3}
                format="yyyy/MM/dd"
                placeholder="yyyy/MM/dd"
              />
            </React.Suspense>
            <Box mt={2}>
              <Typography variant="body2">
                Selected: {selectedDate3 ? selectedDate3.toISOString().split('T')[0] : 'None'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Small Size */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Compact Size
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Smaller date picker for tight spaces
            </Typography>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DateSelector
                value={selectedDate1}
                onChange={setSelectedDate1}
                placeholder="Compact picker"
                size="small"
                width={200}
              />
            </React.Suspense>
          </Paper>
        </Grid>

        {/* Date Range */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Date Range Selection
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select start and end dates with validation
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  Start Date
                </Typography>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <DateSelector
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      // Clear end date if it's before start date
                      if (endDate && date && endDate < date) {
                        setEndDate(null);
                      }
                    }}
                    placeholder="Start date"
                    maxDate={endDate || undefined}
                  />
                </React.Suspense>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  End Date
                </Typography>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <DateSelector
                    value={endDate}
                    onChange={setEndDate}
                    placeholder="End date"
                    minDate={startDate || undefined}
                  />
                </React.Suspense>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography variant="body2">
                Range: {startDate ? startDate.toLocaleDateString() : '?'} 
                {' → '}
                {endDate ? endDate.toLocaleDateString() : '?'}
              </Typography>
              {startDate && endDate && (
                <Typography variant="body2" color="primary">
                  Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Disabled State */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Disabled State
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Read-only date display
            </Typography>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DateSelector
                value={new Date()}
                onChange={() => {}}
                disabled
                placeholder="Disabled"
              />
            </React.Suspense>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Component Features
        </Typography>
        <Typography component="div" variant="body2">
          <ul>
            <li>✅ Material-UI integration with custom styling</li>
            <li>✅ Rounded borders (25px) for modern look</li>
            <li>✅ Read-only input (click to open calendar)</li>
            <li>✅ Flexible date formatting via date-fns</li>
            <li>✅ Min/Max date validation</li>
            <li>✅ Past date disabling for future scheduling</li>
            <li>✅ Customizable width and size (small/medium)</li>
            <li>✅ Disabled state for read-only display</li>
            <li>✅ Fully typed TypeScript support</li>
            <li>✅ Federated via Module Federation (+600 KB bundle)</li>
          </ul>
        </Typography>
      </Box>
    </Container>
  );
};

export default TestDateSelector;
