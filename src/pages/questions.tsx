import { Flex, SimpleGrid, Image, Box, Input, Icon } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

  function onQuestionClick(i: number) {
    console.log(i);
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex
        as="label"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Search question"
          px="4"
          mr="4"
          _placeholder={{ color: "gray.400" }}
          onChange={handleChangeSearchInput}
        />
        <Icon
          sx={{ cursor: "pointer" }}
          as={RiSearchLine}
          fontSize="20"
          onClick={onSearch}
        />
      </Flex>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SimpleGrid
          flex="1"
          gap="5"
          minChildWidth="260px"
          alignContent="flex-start"
        >
          {Array(20)
            .fill(null)
            .map((data: any, i: number) => {
              return (
                <Box
                  onClick={() => onQuestionClick(i)}
                  key={i}
                  sx={{ cursor: "pointer" }}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image src={question.imageUrl} alt="Question" />
                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {question.title}
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
