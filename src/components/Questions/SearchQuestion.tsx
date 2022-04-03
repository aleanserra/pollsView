import {
  Flex,
  SimpleGrid,
  Image,
  Box,
  Input,
  Icon,
  Link,
  Text,
  Button,
} from "@chakra-ui/react";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadScreen } from "../LoadScreen";
import { ShareScreen } from "../ShareScreen";
import { Retry } from "../Retry";
import { getQuestions, useQuestions } from "../../services/hooks/useQuestions";
import { useHealth } from "../../services/hooks/useHealth";
import { Question } from "../../interfaces/useQuestions.interface";

const INITIAL_PAGE = 0;

export function SearchQuestion() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [searchInput, setSearchInput] = useState("");

  const healthQuery = useHealth();
  const questionsQuery = useQuestions(page, searchInput);

  const router = useRouter();

  useEffect(() => {
    if (router.query.filter) {
      setSearchInput(router.query.filter.toString());
    }
  }, [router.query.filter]);

  function handleChangeSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function onSearch() {
    setPage(0);
    questionsQuery.remove();
    router.push({ query: { filter: searchInput } });
  }

  const question = {
    imageUrl:
      "https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)",
    title: "Favourite programming language?",
  };

  function moreQuestions() {
    let newPage = page + 1;
    questionsQuery.refetch();
    setPage(newPage);
  }

  return (
    <Flex direction="column" h="100vh">
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
        borderWidth={router.query.filter === "" && "3px"}
        borderColor="pink.500"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Search question"
          px="4"
          mr="4"
          _placeholder={{ color: "gray.400" }}
          value={searchInput}
          onChange={handleChangeSearchInput}
        />
        <Icon
          sx={{ cursor: "pointer" }}
          as={RiCloseFill}
          fontSize="20"
          marginRight="2"
          onClick={() => setSearchInput("")}
        />
        <Icon
          sx={{ cursor: "pointer" }}
          as={RiSearchLine}
          fontSize="20"
          onClick={() => onSearch()}
        />
      </Flex>
      <Flex justifyContent="center" p="6">
        <ShareScreen />
      </Flex>
      <Flex
        w="100vw"
        h="100vh"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
        justify="center"
        alignItems="center"
      >
        {questionsQuery.isLoading || healthQuery.isLoading ? (
          <LoadScreen />
        ) : questionsQuery.error ||
          healthQuery.error ||
          healthQuery.data.status != "OK" ? (
          <Retry />
        ) : (
          <>
            <SimpleGrid
              flex="1"
              gap="5"
              minChildWidth="260px"
              alignContent="flex-start"
            >
              {questionsQuery.data.map((data: any, i: number) => {
                return (
                  <Box
                    key={i}
                    sx={{ cursor: "pointer" }}
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Link href={`${i}`}>
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
                    </Link>
                  </Box>
                );
              })}
            </SimpleGrid>
          </>
        )}
      </Flex>
      <Flex justify="center" margin="5rem">
        <Button color="gray.50" bg="gray.600" onClick={moreQuestions}>
          More
        </Button>
      </Flex>
    </Flex>
  );
}
