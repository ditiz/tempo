import { Box } from "@chakra-ui/react";
import React from "react";

export const Panel: React.FC = ({ children }) => (
  <Box
    padding="4"
    border="1px"
    borderRadius="md"
    borderColor="grey.800"
    bgColor="indigo.700"
  >
    {children}
  </Box>
);
