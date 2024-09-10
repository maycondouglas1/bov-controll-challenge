import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity } from "react-native";
import { StyledInput } from "../input/styles";
import { AppText } from "../text";
import {
  Container,
  Content,
  DropdownItemWrapper,
  IconContainer,
  ModalContainer,
  ModalContent,
} from "./styles";

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect: (item: string) => void;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (item: string) => void;
}

export function AppDropdown({
  label,
  options,
  onSelect,
  placeholder,
  defaultValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedItem(defaultValue || "");
  }, [defaultValue]);

  return (
    <Container>
      {label && <AppText>{label}</AppText>}
      <TouchableOpacity onPress={toggleDropdown}>
        <Content>
          <StyledInput
            value={selectedItem}
            placeholder={placeholder}
            editable={false}
          />
          <IconContainer>
            <Feather name="chevron-down" size={24} color="#b25be1" />
          </IconContainer>
        </Content>
      </TouchableOpacity>
      <Modal visible={isOpen} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <DropdownItemWrapper>
                    <AppText>{item}</AppText>
                  </DropdownItemWrapper>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
