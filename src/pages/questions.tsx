import { Flex, SimpleGrid, Image, Box, Input, Icon } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SearchQuestion } from "../components/Questions/SearchQuestion";
import { RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Question } from "../components/Questions/Question";

const QUESTION = "QUESTION";
const QUESTIONS = "QUESTIONS";

export default function Questions() {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    // The filter changed!
  }, [router.query.filter]);

  function handleChangeSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function onSearch() {
    console.log(searchInput);
  }

  const question = {
    imageUrl:
      "https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)",
    title: "Favourite programming language?",
  };

  function renderQuestionView(type: string) {
    switch (type) {
      case QUESTION:
        return <Question />;
      case QUESTIONS:
        return (
          <SearchQuestion onQuestionClick={(i: number) => onQuestionClick(i)} />
        );
      default:
        break;
    }
  }

  function onQuestionClick(i: number) {
    console.log(i);
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />
      {renderQuestionView(QUESTION)}
    </Flex>
  );
}
