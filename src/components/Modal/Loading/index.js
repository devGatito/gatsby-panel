import React from "react";
import { Modal, Text, Flex, Loader } from "@components";
import secureAlert from "@assets/icons/alert-info.svg";

export default ({ show, title, onClose, children }) => {
  return (
    <Modal
      width={500}
      show={show}
      icon={secureAlert}
      title={title || "Espera un momento!"}
      onClose={onClose}
      unClosed
    >
      <Flex justify="center" className="p:2">
        <Loader w={50} />
        {children && (
          <Text className="mt:2" align="center" fs={14} fw={500} line={1.4}>
            {children}
          </Text>
        )}
      </Flex>
    </Modal>
  );
};
