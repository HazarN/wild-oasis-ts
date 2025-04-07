import styled from 'styled-components';

import Button from '@ui/Button';
import Heading from '@ui/Heading';
import Input from '@ui/Input';

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <Heading as='h1'>Hello World</Heading>

      <Button>Check in</Button>
      <Button>Check out</Button>

      <Input type='number' placeholder='Number of guests' />
    </StyledApp>
  );
}

export default App;
