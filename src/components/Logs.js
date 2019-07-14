import React from "react";
import styled from "styled-components";
import moment from "moment";

export default ({ logs }) => {
  if (!logs.length) {
    return <Container>{"..."}</Container>;
  }
  return (
    <Container>
      {logs.map(log => (
        <div key={log.id}>
          <span style={{ color: "#0ce4bf", userSelect: "none" }}>
            {`${moment(log.date).format("HH:mm:ss")} `}
          </span>
          {log.text}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  font-family: monospace;
  font-size: 13px;
  line-height: 16px;
  background-color: #444;
  color: white;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
`;
