import { useEffect, useState } from "react";
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
import { useQuestion } from "../../services/hooks/useQuestion";
import { useRouter } from "next/router";
import { Retry } from "../Retry";
import { Question } from "../../interfaces/useQuestions.interface";
import { api } from "../../services/api";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Question() {
  const router = useRouter();
  const [questionValue, setQuestionValue] = useState<string>("0");
  const [enabled, setEnabled] = useState(false);
  const questionQuery = useQuestion(+router.query.id, enabled);

  useEffect(() => {
    if (router.query.id) {
      setEnabled(true);
    }
  }, [router.query]);

  const updateQuestion = useMutation(
    async (question: Question) => {
      const response = await api.put(`questions/${router.query.id}`, {
        ...question,
      });
      return response.data.question;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("question");
      },
    }
  );

  function onSubmit() {
    const payload: Question = {
      ...questionQuery.data,
      choices: questionQuery.data.choices.map((choice: any, i: number) => {
        if (i.toString() === questionValue) return { ...choice, vote: 1 };
        return { ...choice, vote: 0 };
      }),
    };
    updateQuestion.mutateAsync(payload);
  }

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
      categories: questionQuery.data?.choices.map((choice) => choice.choice),
    },
  };

  const series = [
    {
      name: "series",
      data: questionQuery.data
        ? questionQuery.data.choices.map((choice) => choice.votes)
        : [],
    },
  ];

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
      {questionQuery.isLoading ? (
        <LoadScreen />
      ) : questionQuery.error ? (
        <Retry />
      ) : (
        <HStack align="stretch" flex="1" spacing="6">
          <Image
            maxHeight="120"
            maxWidth="120"
            objectFit="cover"
            src={questionQuery.data?.thumb_url}
            alt="Question"
          />
          <VStack align="stretch" flex="1" spacing="6">
            <Box>
              <Heading>{questionQuery.data?.question}</Heading>
              <Box as="span">
                Publiched at{" "}
                {new Date(
                  questionQuery.data?.published_at
                ).toLocaleDateString()}
              </Box>
            </Box>
            <RadioGroup onChange={setQuestionValue} value={questionValue}>
              <Stack>
                {questionQuery.data?.choices.map((choice: any, i) => {
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
              <Button colorScheme="pink" onClick={onSubmit}>
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
