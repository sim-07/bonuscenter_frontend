"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
