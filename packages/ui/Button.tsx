import * as React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <ChakraButton>{children}</ChakraButton>;
};
