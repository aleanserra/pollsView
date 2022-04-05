import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import { RiWifiOffFill } from "react-icons/ri";
import { useEffect, useState } from "react";

export default function NoConnectivityScreen() {
  const { onClose } = useDisclosure();

  let [online, isOnline] = useState(navigator.onLine);

  const setOnline = () => {
    isOnline(true);
  };

  const setOffline = () => {
    isOnline(false);
  };

  // Register the event listeners
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("offline", setOffline);
      window.addEventListener("online", setOnline);
    }

    // cleanup if we unmount
    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={!online}
        onClose={onClose}
        isCentered
        size="10xl"
      >
        <ModalOverlay />
        <ModalContent height="20rem" bg="red.800">
          <Flex
            direction="column"
            justify="center"
            alignItems="center"
            h="20rem"
          >
            <RiWifiOffFill size="5rem" />
            <Text textAlign="center" fontSize="5xl" color="gray.50">
              No Internet Connection
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
