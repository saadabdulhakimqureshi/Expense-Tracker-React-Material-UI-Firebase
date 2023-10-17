import React, { useEffect } from "react";
import AddExpenseForm from "./AddExpenseForm";
import EnhancedTable from "./Table";
import ExpensesSummary from "./ExpensesSummary";
import IncomeVsExpenses from "./IncomeVsExpenses";
import SetMonthlyForm from "./SetMonthlyForm";
import { Box, Typography, Grid } from "@mui/material";

export default function Expenses() {
  return (
    <div>
      <Typography variant="h4" sx={{ mt: "10vh", ml: "1vw" }}>
        Expenses Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 2,
              mt: "1vh",
            }}
          >
            <ExpensesSummary />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 2,
              mt: "1vh",
            }}
          >
            <IncomeVsExpenses />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 2,
              mt: "2vh",
            }}
          >
            <AddExpenseForm />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 2,
              mt: "2vh",
            }}
          >
            <SetMonthlyForm />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 2,
              mt: "2vh",
              mb: "2vh",
            }}
          >
            <EnhancedTable />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
