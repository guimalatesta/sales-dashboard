// src/providers/theme-provider.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
