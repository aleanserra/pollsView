import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Question } from "../../components/Questions/Question";

export default function Details() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Question />
    </Flex>
  );
}
