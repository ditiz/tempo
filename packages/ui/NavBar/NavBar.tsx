import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import React, { ReactChildren, ReactNode, useState } from "react";
import { NavBarItem } from "./NavBarItem";

interface NavBarProps extends FlexProps {
  name: string;
  items?: ReactChildren[];
}

export const NavBar: React.FC<NavBarProps> = ({ name, items, ...props }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="green.800"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          {name}
        </Heading>
      </Flex>
      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        {items?.length && (
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        )}
      </Box>
      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {items}
      </Box>
      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      ></Box>
    </Flex>
  );
};
