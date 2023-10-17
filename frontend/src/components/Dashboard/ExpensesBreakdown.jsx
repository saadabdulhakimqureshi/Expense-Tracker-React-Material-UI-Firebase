import React, { useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";

// Redux Tool Kit
import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../../features/expensesSlice";

import { PieChart, BarChart, ScatterChart } from "@mui/x-charts";
export default function ExpensesBreakdown() {
  // React-Redux
  const addStatus = useSelector((state) => state.expenses.addStatus);
  const getStatus = useSelector((state) => state.expenses.getStatus);
  const expenses = useSelector((state) => state.expenses.unfilteredList);

  // States
  const [breakdown, setBreakdown] = useState([]);
  function getBreakdown() {
    const updatedBreakdown = {};

    for (var expense of expenses) {
      const category = expense.category;

      // If the category already exists in the breakdown, increment the count
      if (category in updatedBreakdown) {
        updatedBreakdown[category] += 1;
      } else {
        // If the category doesn't exist in the breakdown, initialize it with a count of 1
        updatedBreakdown[category] = 1;
      }
    }
    const data = [];
    var index = 0;
    for (var key in updatedBreakdown) {
      data.push({
        id: index,
        value: Math.round((updatedBreakdown[key] / expenses.length) * 100),
        label: key,
      });
      index += 1;
    }

    setBreakdown(data);
  }

  // Effect
  useEffect(() => {
    getBreakdown();
  }, [getStatus]);

  return (
    <>
      <PieChart
        series={[
          {
            data: breakdown,
          },
        ]}
        height={300}
      />
    </>
  );
}
