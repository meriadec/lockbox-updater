import React, { useState } from "react";
import styled from "styled-components";

import Spinner from "./Spinner";
import colors, { lighten } from "../../colors";

const Button = ({
  children,
  variant,
  size,
  Icon,
  onClick,
  style,
  ...props
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleClick = async () => {
    if (isLoading) return;
    const r = onClick();
    if (r && r.then) {
      setLoading(true);
      try {
        await r;
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    }
  };

  const handleKeyDown = e => {
    if (e.which === 13) {
      handleClick();
    }
  };

  return (
    <StyledButton
      variant={variant}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isLoading ? undefined : 0}
      style={{
        opacity: isLoading ? 0.6 : 1,
        cursor: isLoading ? "not-allowed" : undefined,
        ...style,
      }}
      {...props}
    >
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <Content size={size} style={{ opacity: isLoading ? 0 : 1 }}>
        {Icon && (
          <IconContainer>
            <Icon />
          </IconContainer>
        )}
        {children}
      </Content>
    </StyledButton>
  );
};

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${p =>
    p.variant === "primary" ? colors.blue : "rgba(255, 255, 255, 0.1)"};
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  font-weight: 600;
  &:hover {
    background-color: ${p =>
      p.variant === "primary"
        ? lighten(colors.blue, 0.1)
        : "rgba(255, 255, 255, 0.2)"};
  }
`;

const Content = styled.div`
  display: inline-flex;
  align-items: center;
  height: ${p => (p.size === "small" ? 30 : 40)}px;
  font-size: 13px;
  padding: 0 ${p => (p.size === "small" ? 8 : 16)}px;
`;

export default Button;
