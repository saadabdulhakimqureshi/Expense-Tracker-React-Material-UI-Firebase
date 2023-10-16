import React from "react";
import { useState, useRef } from "react";

// MUI3
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
} from "@mui/material";

import { PieChart, BarChart, ScatterChart } from "@mui/x-charts";

import ExpensesBreakdown from "./ExpensesBreakdown";

export default function ExpensesSummary() {
  // States
  const amountRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  return (
    <>
      <Typography variant="h5">Expenses Summary</Typography>
      <ExpensesBreakdown />
      <Stack direction={"row"}>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
        <Typography variant="h7" sx={{ my: "10%" }}>
          Monthly Trends
        </Typography>
      </Stack>
    </>
  );
}
