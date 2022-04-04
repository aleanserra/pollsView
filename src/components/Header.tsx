import { Flex, Link, Text } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Link href="/questions" _hover={{ outline: "none" }}>
        <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight">
          DashPoll
          <Text as="span" ms="1" color="pink.500">
            .
          </Text>
        </Text>
      </Link>
    </Flex>
  );
}
