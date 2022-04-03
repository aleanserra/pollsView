import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Header } from "../../components/Header";
import { SearchQuestion } from "../../components/Questions/SearchQuestion";

export default function Questions() {
  // useEffect(() => {
  //   console.log("teste");
  //   fetch("http://localhost:3000/questions")
  //     .then((response) => response.json())
  //     .then((data) => console.log("data", data));
  // }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <SearchQuestion />
    </Flex>
  );
}
