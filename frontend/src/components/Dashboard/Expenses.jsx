import React, { useEffect } from "react";

import AddExpenseForm from "./AddExpenseForm";
import EnhancedTable from "./Table";
import ExpensesSummary from "./ExpensesSummary";
import SetMonthlyForm from "./SetMonthlyForm";

import { Box, Typography, Stack } from "@mui/material";

export default function Expenses() {
  return (
    <div>
      <Typography variant="h4" sx={{ mt: "10vh", ml: "1vw" }}>
        Expenses Dashboard
      </Typography>
      <Stack direction={"row"} sx={{ padding: "2" }}>
        <Stack direction={"column"} sx={{ mr: 0, width: "100%" }}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 10,
              mt: "1vh",
              ml: "2vw",
              height: "100%",
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <AddExpenseForm />
          </Box>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 10,
              height: "100%",
              mt: "2vh",
              ml: "2vw",
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <SetMonthlyForm />
          </Box>
        </Stack>
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Box
            component="form"
            noValidate
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: "16px",
              padding: 10,
              mt: "1vh",
              ml: "1vw",
              mr: "2vw",
              height: "100%",
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <ExpensesSummary />
          </Box>
        </Stack>
      </Stack>

      <Box
        component="form"
        noValidate
        sx={{
          backgroundColor: "white",
          border: 1,
          borderRadius: "16px",
          padding: 10,

          width: "96%",
          mt: "2vh",
          ml: "2vw",
          mb: "2vh",

          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <EnhancedTable />
      </Box>
    </div>
  );
}
