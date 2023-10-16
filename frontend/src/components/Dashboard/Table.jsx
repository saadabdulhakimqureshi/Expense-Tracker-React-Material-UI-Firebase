import * as React from "react";
import PropTypes from "prop-types";

import {
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Stack, MenuItem, Button } from "@mui/material";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormGroup } from "@mui/material";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

const headCells = [
  {
    id: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount($)",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },

  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "edit",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            > */}
            {headCell.label}
            {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

import { useSelector, useDispatch } from "react-redux";
import {
  getExpenses,
  filterExpenses,
  reset,
  setFirstLoad,
  setStartDate,
  setEndDate,
  filterExpensesByDate,
  getUnfilteredExpenses,
  updateExpense,
  deleteExpense,
} from "../../features/expensesSlice";

export default function EnhancedTable() {
  // States
  const [edit, setEdit] = React.useState({});

  const handleEditClick = (expenseId) => {
    // Toggle the edit state for a specific expenseId
    console.log(edit);
    setEdit((prevEdit) => ({
      ...prevEdit,
      [expenseId]: prevEdit[expenseId] ? !prevEdit[expenseId] : true,
    }));
  };

  // Edit States
  const [date, setDate] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [amount, setAmount] = React.useState(null);

  // Filter States
  const [entertainmentCheck, setEntertainmentCheck] = React.useState(true);
  const [transportCheck, setTransportCheck] = React.useState(true);
  const [utilitiesCheck, setUtilitiesCheck] = React.useState(true);
  const [foodCheck, setFoodCheck] = React.useState(true);
  const [otherCheck, setOtherCheck] = React.useState(true);

  const [startDateState, setStartDateState] = React.useState();
  const [endDateState, setEndDateState] = React.useState();

  // React-Redux
  const error = useSelector((state) => state.expenses.error);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userExpenses = useSelector((state) => state.expenses.filteredList);
  const status = useSelector((state) => state.expenses.getStatus);
  const addStatus = useSelector((state) => state.expenses.addStatus);
  const updateStatus = useSelector((state) => state.expenses.updateStatus);
  const startDate = useSelector((state) => state.expenses.startDate);
  const endDate = useSelector((state) => state.expenses.endDate);
  const firstLoad = useSelector((state) => state.expenses.firstLoad);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getExpenses(currentUser.uid));
  }, []);

  React.useEffect(() => {
    // This code will run when the component is mounted

    // Return a cleanup function
    return () => {
      // This code will run when the component is unmounted
      dispatch(reset());
    };
  }, []); // An empty dependency array ensures that the effect only runs once (on mount) and the cleanup function runs when the component is unmounted

  React.useEffect(() => {
    if (status == "succeded" && firstLoad == false) {
      setStartDateState(startDate);
      setEndDateState(endDate);
      dispatch(setFirstLoad());
      filter();
    }
    if (status == "succeded") {
      filter();
    }
  }, [status]);

  React.useEffect(() => {
    if (addStatus == "succeded") {
      dispatch(getExpenses(currentUser.uid));
      filter();
    }
  }, [addStatus]);

  const filter = () => {
    dispatch(dispatch(setStartDate(startDateState)));
    dispatch(dispatch(setEndDate(endDateState)));
    var filters = [];
    if (entertainmentCheck) {
      filters.push("Entertainment");
    }
    if (transportCheck) {
      filters.push("Transportation");
    }
    if (utilitiesCheck) {
      filters.push("Utilities");
    }
    if (foodCheck) {
      filters.push("Food");
    }
    if (otherCheck) {
      filters.push("Other");
    }

    dispatch(filterExpenses({ filters: filters }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Expenses Table</Typography>
      <Box sx={{ mt: "5px" }}>
        {status == "failed" ? <Alert severity="error">{error}</Alert> : <></>}
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <Stack direction={"row"}>
          <FormControlLabel
            control={<Checkbox />}
            checked={entertainmentCheck}
            label="Entertainment"
            onChange={() => {
              setEntertainmentCheck(!entertainmentCheck);
              //filter();
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={transportCheck}
            label="Transportation"
            onChange={() => {
              setTransportCheck(!transportCheck);
              //filter();
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={utilitiesCheck}
            label="Utilities"
            onChange={() => {
              setUtilitiesCheck(!utilitiesCheck);
              //filter();
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={foodCheck}
            label="Food"
            onChange={() => {
              setFoodCheck(!foodCheck);
              //filter();
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={otherCheck}
            label="Other"
            onChange={() => {
              setOtherCheck(!otherCheck);
              //filter();
            }}
          />{" "}
          <TextField
            name="date"
            type="date"
            label="From"
            required
            value={startDateState}
            onChange={(e) => setStartDateState(e.target.value)}
            inputProps={{
              max: endDateState, // Set the maximum allowed date
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            sx={{ mt: 1 }}
          />
          <TextField
            name="date"
            type="date"
            label="To"
            required
            value={endDateState}
            inputProps={{
              max: new Date().toISOString().split("T")[0], // Set the maximum allowed date
            }}
            onChange={(e) => setEndDateState(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            sx={{ mt: 1, ml: 2 }}
          />
        </Stack>
        <Stack direction={"row"}></Stack>
        <Box
          sx={{ mt: -5, mr: 5, display: "flex", justifyContent: "flex-end" }}
        >
          {status == "loading" ? (
            <Box sx={{ ml: 10, mt: 1 }}>
              <CircularProgress size={"2rem"} />
            </Box>
          ) : (
            <Button
              variant="contained"
              sx={{ width: 150, mt: 1, ml: 2 }}
              onClick={filter}
            >
              Filter
            </Button>
          )}
        </Box>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead rowCount={userExpenses.length} />
            <TableBody>
              {userExpenses.map((row, index) => {
                const expenseId = row.id;
                const userId = row.uid;

                const handleUpdate = () => {
                  const newFields = {
                    uid: userId,
                    amount: amount,
                    date: date,
                    description: description,
                    category: category,
                  };
                  dispatch(
                    updateExpense({ id: expenseId, newFields: newFields })
                  );
                  handleEditClick(expenseId);
                };

                const handleDelete = () => {
                  dispatch(deleteExpense({ id: expenseId, uid: userId }));
                  handleEditClick(expenseId);
                };
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.amount}
                    sx={{ cursor: "pointer" }}
                  >
                    {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
                    {!edit[expenseId] ? (
                      <>
                        <TableCell
                          align="left"
                          component="th"
                          id={row.date}
                          scope="row"
                          padding="none"
                        >
                          {row.amount}
                        </TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="right">
                          {updateStatus === "loading" ? (
                            <></>
                          ) : (
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setDate(row.date);
                                setAmount(row.amount);
                                setDescription(row.description);
                                setCategory(row.category);
                                handleEditClick(expenseId);
                              }}
                            >
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="left">
                          <TextField
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={updateStatus === "loading"}
                          ></TextField>
                        </TableCell>
                        <TableCell align="left">
                          <TextField
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={updateStatus === "loading"}
                          ></TextField>
                        </TableCell>
                        <TableCell align="left">
                          <TextField
                            select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={updateStatus === "loading"}
                          >
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Transportation">
                              Transportation
                            </MenuItem>
                            <MenuItem value="Utilities">Utilities</MenuItem>
                            <MenuItem value="Entertainment">
                              Entertainment
                            </MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </TextField>
                        </TableCell>
                        <TableCell align="left">
                          <TextField
                            value={description}
                            inputProps={{ maxLength: 30 }}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={updateStatus === "loading"}
                          ></TextField>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={() => handleUpdate()}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleDelete()}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
