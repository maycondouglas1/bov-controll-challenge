import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const DropdownItemWrapper = styled.View`
  padding-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const IconContainer = styled.View`
  margin-left: ${({ theme }) => theme.spacing.small};
  position: absolute;
  right: 10px;
  bottom: 25px;
`;

export const Container = styled.View`
  flex-direction: column;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
