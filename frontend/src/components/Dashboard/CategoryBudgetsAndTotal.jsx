import React, { useEffect, useState } from "react";
import {
  Alert,
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { getBudgets } from "../../features/budgetSlice";

export default function CategoryBudgetsAndTotal() {
  const budgets = useSelector((state) => state.budget.budgets);
  const expenses = useSelector((state) => state.expenses.unfilteredList);
  const getExpensesStatus = useSelector((state) => state.expenses.getStatus);
  const addExpensesStatus = useSelector((state) => state.expenses.addStatus);
  const addBudgetStatus = useSelector((state) => state.budget.updateStatus);
  const getBudgetStatus = useSelector((state) => state.budget.getBudgetStatus);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    dispatch(getBudgets(currentUser.uid));
  }, [addBudgetStatus]);

  useEffect(() => {
    getTotalByCategory();
  }, [getExpensesStatus, addExpensesStatus]);

  const getTotalByCategory = () => {
    const categoryTotals = {};

    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so we add 1 to get the current month as a number

    // Iterate through the expenses
    expenses.forEach((expense) => {
      const { amount, category, date } = expense;

      // Parse the date string to get the month
      const expenseDate = new Date(date);
      const expenseMonth = expenseDate.getMonth() + 1;

      // Check if the expense is from the current month
      if (expenseMonth === currentMonth) {
        // If the category is not in the categoryTotals object, initialize it with the amount
        if (!categoryTotals[category]) {
          categoryTotals[category] = Number(amount);
        } else {
          // If the category is already in categoryTotals, add the amount to the existing total
          categoryTotals[category] += Number(amount);
        }
      }
    });

    setCategoryTotals(categoryTotals);
  };

  const getStatus = (amount, budget) => {
    if (amount > budget) {
      return "error";
    }
    if (amount > budget - budget / 10) {
      return "warning";
    }
    return "success";
  };

  return (
    <>
      <TableContainer>
        <Table size="small" aria-labelledby="tableTitle">
          {getExpensesStatus == "loading" ? (
            <CircularProgress></CircularProgress>
          ) : (
            <>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Month's Budget</TableCell>
                  <TableCell align="left">Month's Expense</TableCell>
                  <TableCell align="left">Month's Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgets.map((budget) => {
                  var status = getStatus(
                    categoryTotals[budget.category]
                      ? categoryTotals[budget.category]
                      : 0,
                    budget.budget
                  );
                  return (
                    <TableRow key={budget.category}>
                      <TableCell align="left">{budget.category}</TableCell>
                      <TableCell align="left">{budget.budget}</TableCell>
                      <TableCell align="left">
                        {categoryTotals[budget.category]
                          ? categoryTotals[budget.category]
                          : 0}
                      </TableCell>
                      <TableCell align="left">
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
