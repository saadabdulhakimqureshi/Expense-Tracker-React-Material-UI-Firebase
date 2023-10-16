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
import { addExpense, reset } from "../../features/expensesSlice";

export default function AddExpenseForm() {
  // States
  const amountRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  // Redux
  const status = useSelector((state) => state.expenses.addStatus);
  const error = useSelector((state) => state.expenses.error);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  // States
  const [amountError, setAmountError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  // Submit
  const handleSubmit = () => {
    if (validationCheck()) {
      dispatch(
        addExpense({
          uid: currentUser.uid,
          amount: amountRef.current.value,
          date: dateRef.current.value,
          description: descriptionRef.current.value,
          category: categoryRef.current.value,
        })
      );
    }
  };

  useEffect(() => {
    if (status == "succeded") {
      amountRef.current.value = "";
      dateRef.current.value = null;
      descriptionRef.current.value = "";

      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }
  }, [status]);

  const validationCheck = () => {
    setAmountError(false);
    setDateError(false);
    setDescriptionError(false);
    setCategoryError(false);
    var check = true;

    if (amountRef.current.value == "") {
      setAmountError(true);
      check = false;
    }
    if (dateRef.current.value == "") {
      setDateError(true);
      check = false;
    }
    if (descriptionRef.current.value == "") {
      setDescriptionError(true);
      check = false;
    }
    if (
      categoryRef.current.value != "Transportation" &&
      categoryRef.current.value != "Entertainment" &&
      categoryRef.current.value != "Utilities" &&
      categoryRef.current.value != "Other" &&
      categoryRef.current.value != "Food"
    ) {
      setCategoryError(true);
      check = false;
    }

    return check;
  };

  return (
    <>
      <Typography variant="h5">Add An Expense</Typography>
      <Box sx={{ mt: "5px" }}>
        {status == "failed" ? (
          <Alert severity="error">{error}</Alert>
        ) : status == "succeded" ? (
          <Alert severity="success">Expense Added!</Alert>
        ) : (
          <></>
        )}
      </Box>
      <Stack direction={"row"}>
        <TextField
          name="amount"
          label="Amount"
          type="number"
          required
          inputRef={amountRef}
          disabled={status === "loading"}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={amountError}
          helperText={amountError ? "Please specify amount." : ""}
          sx={{ mt: 5 }}
        />
        <TextField
          name="date"
          type="date"
          label="Date"
          inputRef={dateRef}
          disabled={status === "loading"}
          required
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          inputProps={{
            max: new Date().toISOString().split("T")[0], // Set the maximum allowed date
          }}
          error={dateError}
          helperText={dateError ? "Please specify date." : ""}
          sx={{ mt: 5 }}
        />
        <TextField
          label="Category"
          select
          required
          f
          disabled={status === "loading"}
          inputRef={categoryRef}
          error={categoryError}
          helperText={categoryError ? "Please specify category." : ""}
          sx={{ mt: 5, width: 200 }}
        >
          {/* Each menu item is an option. */}
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transportation">Transportation</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </Stack>
      <Stack direction={"column"} sx={{ mt: "1px" }}>
        <TextField
          name="description"
          label="Description"
          required
          disabled={status === "loading"}
          inputRef={descriptionRef}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          inputProps={{ maxLength: 30 }}
          error={descriptionError}
          helperText={descriptionError ? "Please describe expense." : ""}
          sx={{ mt: 1 }}
        />

        <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
          {status == "loading" ? (
            <CircularProgress size={"2rem"} />
          ) : (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add Expense
            </Button>
          )}
        </Box>
      </Stack>
    </>
  );
}
