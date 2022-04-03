import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import { Question } from "../../components/Questions/Question";

export default function Details() {
  const router = useRouter();

  console.log("router id", router.query.id);

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Question />
    </Flex>
  );
}
