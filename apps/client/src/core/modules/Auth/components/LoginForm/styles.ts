import { Form, styled } from '@astral/ui';

export const AuthFormWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(10, 4)};
`;

export const AuthFormGrid = styled(Form)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  grid-auto-flow: row;
  min-width: min(
    ${({ theme }) => theme.spacing(110)},
    calc(100vw - ${({ theme }) => theme.spacing(8)})
  );
`;
