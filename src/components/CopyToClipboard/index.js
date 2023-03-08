/**
 *
 * CopyToClipBoard
 *
 */

import React, { memo, useState } from "react";
import { UncontrolledTooltip } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import "./copyToClipBoardStyle.scss";

function CopyToClipBoard({ children, text }) {
  const [propmt, setPrompt] = useState("Copy to Clipboard");
  const showCopied = () => {
    setPrompt("Copied");
    setTimeout(() => setPrompt("Copy to Clipboard"), 3000);
  };
  return (
    <>
      <CopyToClipboard
        text={text}
        id="clip-board13432"
        onCopy={() => showCopied()}
      >
        {children}
      </CopyToClipboard>
      <UncontrolledTooltip
        delay={0}
        trigger="hover focus"
        target="clip-board13432"
      >
        {propmt}
      </UncontrolledTooltip>
    </>
  );
}

CopyToClipBoard.propTypes = {};

export default memo(CopyToClipBoard);
