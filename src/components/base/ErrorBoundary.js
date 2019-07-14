import React from "react";
import styled from "styled-components";

import DisplayError from "./DisplayError";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorContainer>
          <h1>Something went wrong.</h1>
          <DisplayError error={this.state.error} />
          <div style={{ opacity: 0.6 }}>
            Please quit and re-launch the app.
            <br />
            If the problem persists, please contact support.
          </div>
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  h1 {
    font-size: 18px;
  }

  > * + * {
    margin-top: 20px;
  }
`;

export default ErrorBoundary;
