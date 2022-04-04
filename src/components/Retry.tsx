import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Retry() {
  const router = useRouter();

  function onRetry() {
    router.reload();
  }

  return (
    <>
      <Flex justify="center">
        <Button color="gray.50" bg="gray.600" onClick={() => onRetry()}>
          Retry
        </Button>
      </Flex>
    </>
  );
}
