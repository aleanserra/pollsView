import { useState } from "react";
import {
  Flex,
  Image,
  Box,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { theme } from "../../styles/theme";
import { LoadScreen } from "../LoadScreen";
import { ShareScreen } from "../ShareScreen";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Question() {
  const [questionValue, setQuestionValue] = useState<string>("0");

  function onSubmitClick() {
    const payload = {
      ...question,
      choices: question.choices.map((choice: any, i: number) => {
        if (i.toString() === questionValue) return { ...choice, vote: 1 };
        return { ...choice, vote: 0 };
      }),
    };
    console.log(payload);
  }

  let question = {
    question: "Favourite programming language?",
    thumb_url:
      "https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)",
    imageUrl:
      "https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)",
    published_at: "2015-08-05T08:40:51.620Z",
    choices: [
      {
        choice: "Swift",
        votes: 2048,
      },
      {
        choice: "Python",
        votes: 1024,
      },
      {
        choice: "Objective-C",
        votes: 512,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
      {
        choice: "Ruby",
        votes: 256,
      },
    ],
  };

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: false,
    },
    tooltip: { enabled: false },
    xaxis: {
      type: "category",
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
      categories: question.choices.map((choice) => choice.choice),
    },
  };

  const series = [
    { name: "series", data: question.choices.map((choice) => choice.votes) },
  ];

  const loading = false;

  return (
    <Flex
      w="100%"
      h="100%"
      my="6"
      maxWidth={1480}
      mx="auto"
      px="6"
      justify="center"
      alignItems="center"
    >
      {loading ? (
        <LoadScreen />
      ) : (
        <HStack align="stretch" flex="1" spacing="6">
          <Image
            maxHeight="120"
            maxWidth="120"
            objectFit="cover"
            src={question.thumb_url}
            alt="Question"
          />
          <VStack align="stretch" flex="1" spacing="6">
            <Box>
              <Heading>{question.question}</Heading>
              <Box as="span">
                Publiched at{" "}
                {new Date(question.published_at).toLocaleDateString()}
              </Box>
            </Box>
            <RadioGroup onChange={setQuestionValue} value={questionValue}>
              <Stack>
                {question.choices.map((choice: any, i) => {
                  return (
                    <Box key={i}>
                      <Radio value={i.toString()} colorScheme="pink">
                        {choice.choice}
                      </Radio>
                    </Box>
                  );
                })}
              </Stack>
            </RadioGroup>
            <Box>
              <Button colorScheme="pink" onClick={onSubmitClick}>
                Submit vote
              </Button>
            </Box>
            <ShareScreen />
            <Chart options={options} series={series} type="area" height={300} />
          </VStack>
        </HStack>
      )}
    </Flex>
  );
}
