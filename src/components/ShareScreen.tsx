import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../services/api";
import { useMutation } from "react-query";

interface ShareData {
  email: string;
  url: string;
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function ShareScreen() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(EMAIL_REGEX);
  };

  const sendLink = useMutation(
    async (shareData: ShareData) => {
      const response = await api.post(
        `share?destination_email=${shareData.email}&content_url=${shareData.url}`
      );
      return response.data.question;
    },
    {
      onSuccess: () => {
        onClose();
        toast({
          title: "Link sent successfully",
          status: "success",
          duration: 1000 * 5, //5 seconds
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Please try again",
          status: "error",
          duration: 1000 * 5, //5 seconds
          isClosable: true,
        });
      },
    }
  );

  function handleChangeEmail(event: any) {
    const { value } = event.target;
    setIsError(value === "");
    setEmail(value);
  }

  function onSend() {
    if (email !== "" && validateEmail(email)) {
      sendLink.mutateAsync({ email: email, url: window.location.href });
    } else {
      setIsError(true);
    }
  }

  return (
    <Box>
      <Button color="gray.50" bg="gray.600" onClick={onOpen}>
        Share
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader color="gray.50">Share this with other users</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(event) => handleChangeEmail(event)}
              />
              {!isError ? (
                <FormHelperText>We will never share your email.</FormHelperText>
              ) : (
                <FormErrorMessage>Valid email is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onSend}
              colorScheme="pink"
              mr={3}
              disabled={sendLink.isLoading}
              isLoading={sendLink.isLoading}
              loadingText="Sending"
            >
              Send
            </Button>
            <Button onClick={onClose} bg="gray.600">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
