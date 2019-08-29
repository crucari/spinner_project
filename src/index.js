import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import './styles.css';

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: sans-serif;
`;

const spin = keyframes`
to {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  border: 3px solid orangered;
  border-radius: 50%;
  border-right-color: transparent;
  display: inline-block;
  width: 50px;
  height: 50px;
  animation: 1s linear infinite ${spin};
`;

function FakeLoader(props) {
  const [isTimedOut, setTimedOut] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setTimedOut(true), 1500);
    return () => clearTimeout(id);
  }, []);
  return isTimedOut ? (
    props.children
  ) : (
    <>
      <Spinner />
      <p>{props.loadingText}</p>
    </>
  );
}

function App() {
  const [restartFlag, setRestartFlag] = React.useState(false);
  return (
    <Container key={restartFlag}>
      <FakeLoader loadingText="Bootstrapping">
        <FakeLoader loadingText="Fetching user">
          <FakeLoader loadingText="Fetching other stuff">
            <FakeLoader loadingText="One more thing...">
              <h1>Finally loaded!</h1>
              <button onClick={() => setRestartFlag(r => !r)}>
                See it again!
              </button>
            </FakeLoader>
          </FakeLoader>
        </FakeLoader>
      </FakeLoader>
    </Container>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
