import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export const Navigation = () => (
  <Box>
    This is dummy Navigation
    <Button onClick={async () => await signOut()}>sign out</Button>
  </Box>
);
