import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const CommonModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default CommonModal;
