import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface Props extends BoxProps {}

export const Panel: React.FC<Props> = ({ children, ...props }) => (
  <Box
    padding="4"
    border="1px"
    borderRadius="md"
    borderColor="grey.800"
    bgColor="indigo.700"
    {...props}
  >
    {children}
  </Box>
);
