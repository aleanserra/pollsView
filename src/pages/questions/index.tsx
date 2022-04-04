import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { SearchQuestion } from "../../components/Questions/SearchQuestion";

export default function Questions() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <SearchQuestion />
    </Flex>
  );
}
