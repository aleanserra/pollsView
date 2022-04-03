import { CircularProgress, Spinner } from "@chakra-ui/react";

export function LoadScreen() {
  return (
    <CircularProgress isIndeterminate color="pink.500" trackColor="gray.800" />
  );
}
