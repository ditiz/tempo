import { Text } from "@chakra-ui/react";
import React from "react";

export const NavBarItem: React.FC = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);
