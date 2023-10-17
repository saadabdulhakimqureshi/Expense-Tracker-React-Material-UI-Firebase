import React, { useEffect, useState } from "react";

// MUI
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { LineChart } from "@mui/x-charts";

// Redux Toolkit
import { useSelector, useDispatch } from "react-redux";
import { getincomes } from "../../features/incomeSlice";

export default function IncomeVsExpenses() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // States
  const [incomesState, setIncomesState] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [expensesMonth, setExpensesMonth] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  // React-Redux
  const expenses = useSelector((state) => state.expenses.unfilteredList);
  const getExpensesStatus = useSelector((state) => state.expenses.getStatus);
  const addExpensesStatus = useSelector((state) => state.expenses.addStatus);

  const getStatus = useSelector((state) => state.income.getStatus);
  const addStatus = useSelector((state) => state.income.updateStatus);
  const incomes = useSelector((state) => state.income.incomes);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const getTotalByMonth = () => {
    const monthTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Iterate through the expenses
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth(); // Months are 0-based

      if (expenseYear === currentYear) {
        monthTotal[expenseMonth] += Number(expense.amount);
      }
    });

    // Now, monthTotal is an array where each element represents the total expenses for that month.
    // It will look like: [totalJan, totalFeb, ..., totalDec]

    // Set the state or return the monthTotal array as needed
    setExpensesMonth(monthTotal);
  };

  const updateIncomes = () => {
    const list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const index in incomes) {
      const income = incomes[index];

      list[income.month] = Number(income.income);
    }
    setIncomesState(list);
  };

  // Use Effect
  useEffect(() => {
    dispatch(getincomes(currentUser.uid));
  }, [addStatus]);

  useEffect(() => {
    if (getStatus == "succeded") {
      console.log(incomes);
      updateIncomes();
    }
  }, [getStatus]);
  useEffect(() => {
    if (getStatus == "succeded") {
      console.log(incomes);
      getTotalByMonth();
      console.log(expensesMonth);
    }
  }, [getExpensesStatus]);

  return (
    <Container>
      <Typography variant="h5">Income vs Expenses</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LineChart
            xAxis={[
              {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                label: "Month", // Add this line for the x-axis label
              },
            ]}
            series={[
              {
                data: incomesState,
                label: "Income", // Add this line for the y-axis label
              },
              {
                data: expensesMonth,
                label: "Total Expenses", // Add this line for the y-axis label
              },
            ]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer>
            <Table size="small" aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Month</TableCell>
                  <TableCell align="left">Income</TableCell>
                  <TableCell align="left">Total Expense</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {months.map((month, index) => {
                  // var status = getStatus(
                  //   categoryTotals[budget.category]
                  //     ? categoryTotals[budget.category]
                  //     : 0,
                  //   budget.budget
                  // );
                  return (
                    <TableRow>
                      <TableCell align="left">{month}</TableCell>
                      <TableCell align="left">{incomesState[index]}</TableCell>
                      <TableCell align="left">{expensesMonth[index]}</TableCell>
                      {/* <TableCell align="left">
                        {status == "success" ? (
                          <Alert severity={"success"}>Budget is safe.</Alert>
                        ) : status == "warning" ? (
                          <Alert severity={"warning"}>
                            Budget is close to being exceeded!
                          </Alert>
                        ) : (
                          <Alert severity={"error"}>
                            Budget has been exceeded!
                          </Alert>
                        )}
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
