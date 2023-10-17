import React from "react";
import { useRef } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Stack,
  InputAdornment,
  Grid, // Import Grid component from Material-UI
} from "@mui/material";

import { PieChart, BarChart, ScatterChart } from "@mui/x-charts";
import ExpensesBreakdown from "./ExpensesBreakdown";
import CategoryBudgetsAndTotal from "./CategoryBudgetsAndTotal";

export default function ExpensesSummary() {
  // States
  const amountRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  return (
    <Container>
      <Typography variant="h5">Month's Summary</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ExpensesBreakdown />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategoryBudgetsAndTotal />
        </Grid>
      </Grid>
    </Container>
  );
}
