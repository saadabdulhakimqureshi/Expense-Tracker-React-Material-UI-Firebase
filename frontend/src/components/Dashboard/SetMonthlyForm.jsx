import React, { useEffect } from "react";
import { useState, useRef } from "react";

// MUI3
import {
  Alert,
  CircularProgress,
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

// ReduxToolkit
import { useSelector, useDispatch } from "react-redux";
import { updateBudget } from "../../features/budgetSlice";
import { updateincome } from "../../features/incomeSlice";

export default function SetMonthlyForm() {
  // Refs
  const income = useRef();
  const budget = useRef();
  const incomeMonth = useRef();
  const budgetCategory = useRef();
  const budgetMonth = useRef();

  // States  const [amountError, setAmountError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);
  const [incomeMonthError, setIncomeMonthError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const [budgetCategoryError, setBudgetCategoryError] = useState(false);

  // React-Redux
  const budgetStatus = useSelector((state) => state.budget.updateStatus);
  const incomeStatus = useSelector((state) => state.income.updateStatus);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const handleUpdateIncome = () => {
    if (validationCheckIncome()) {
      dispatch(
        updateincome({
          income: income.current.value,
          month: incomeMonth.current.value-1,
          year: new Date().getFullYear(),
          uid: user.uid,
        })
      );
    }
  };

  const handleUpdateBudget = () => {
    if (validationCheckBudget()) {
      dispatch(
        updateBudget({
          budget: budget.current.value,
          category: budgetCategory.current.value,

          uid: user.uid,
        })
      );
    }
  };

  const validationCheckBudget = () => {
    setBudgetCategoryError(false);
    setBudgetError(false);

    var check = true;
    if (budget.current.value == "") {
      setBudgetError(true);
      check = false;
    }
    if (
      budgetCategory.current.value != "Transportation" &&
      budgetCategory.current.value != "Entertainment" &&
      budgetCategory.current.value != "Utilities" &&
      budgetCategory.current.value != "Other" &&
      budgetCategory.current.value != "Food"
    ) {
      setBudgetCategoryError(true);
      check = false;
    }
    return check;
  };

  const validationCheckIncome = () => {
    setIncomeError(false);
    setIncomeMonthError(false);

    var check = true;
    if (income.current.value == "") {
      setIncomeError(true);
      check = false;
    }

    if (
      incomeMonth.current.value === "" ||
      isNaN(incomeMonth.current.value) ||
      incomeMonth.current.value < 1 ||
      incomeMonth.current.value > 12
    ) {
      setIncomeMonthError(true);
      check = false;
    }
    return check;
  };

  return (
    <>
      <Typography variant="h5">Expenses Tracking</Typography>
      <Stack direction={"row"} sx={{ mt: 2 }}>
        <TextField
          label="Month's Income"
          type="number"
          required
          error={incomeError}
          disabled={incomeStatus === "loading"}
          helperText={incomeError ? "Please specify income." : ""}
          inputRef={income}
          //   disabled={status === "loading"}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          //   error={amountError}
          //   helperText={amountError ? "Please specify amount." : ""}
          //   sx={{ mt: 5 }}
        />
        <TextField
          label="Month"
          select
          required
          inputRef={incomeMonth}
          disabled={incomeStatus === "loading"}
          error={incomeMonthError}
          helperText={incomeMonthError ? "Please specify income month." : ""}
          //   inputRef={categoryRef}
          //   error={categoryError}
          //   helperText={categoryError ? "Please specify category." : ""}
          sx={{ width: 200 }}
        >
          {/* Each menu item is an option. */}
          <MenuItem value={1}>January</MenuItem>
          <MenuItem value={2}>February</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>August</MenuItem>
          <MenuItem value={9}>September</MenuItem>
          <MenuItem value={10}>October</MenuItem>
          <MenuItem value={11}>November</MenuItem>
          <MenuItem value={12}>December</MenuItem>
        </TextField>
      </Stack>
      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
        {incomeStatus == "loading" ? (
          <CircularProgress size={"2rem"} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateIncome}
          >
            Update
          </Button>
        )}
      </Box>
      <Stack direction={"row"} sx={{ mt: 2 }}>
        <TextField
          label="Month's Budget"
          type="number"
          required
          inputRef={budget}
          error={budgetError}
          helperText={budgetError ? "Please specify budget." : ""}
          disabled={budgetStatus === "loading"}
          //   disabled={status === "loading"}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          //   error={amountError}
          //   helperText={amountError ? "Please specify amount." : ""}
          //   sx={{ mt: 5 }}
        />
        <TextField
          label="Budget Category"
          select
          required
          inputRef={budgetCategory}
          error={budgetCategoryError}
          helperText={
            budgetCategoryError ? "Please specify budget category." : ""
          }
          disabled={budgetStatus === "loading"}
          //   inputRef={categoryRef}
          //   error={categoryError}
          //   helperText={categoryError ? "Please specify category." : ""}
          sx={{ width: 200 }}
        >
          {/* Each menu item is an option. */}
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transportation">Transportation</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </Stack>
      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
        {budgetStatus == "loading" ? (
          <CircularProgress size={"2rem"} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateBudget}
          >
            Update
          </Button>
        )}
      </Box>
    </>
  );
}
