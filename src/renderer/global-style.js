import { createGlobalStyle } from "styled-components";

import colors from "../colors";

const staticPath = process.env.NODE_ENV === "production" ? `${__static}/` : "";

export default createGlobalStyle`
  /*! minireset.css v0.0.5 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}

  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 400;
    src: url("${staticPath}fonts/Inter-Regular.woff2?v=3.7") format("woff2"),
         url("${staticPath}fonts/Inter-Regular.woff?v=3.7") format("woff");
  }
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 500;
    src: url("${staticPath}fonts/Inter-Medium.woff2?v=3.7") format("woff2"),
         url("${staticPath}fonts/Inter-Medium.woff?v=3.7") format("woff");
  }
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 600;
    src: url("${staticPath}fonts/Inter-SemiBold.woff2?v=3.7") format("woff2"),
         url("${staticPath}fonts/Inter-SemiBold.woff?v=3.7") format("woff");
  }
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 700;
    src: url("${staticPath}fonts/Inter-Bold.woff2?v=3.7") format("woff2"),
         url("${staticPath}fonts/Inter-Bold.woff?v=3.7") format("woff");
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    display: flex;
    flex-direction: column;

    font-size: 16px;
    line-height: 24px;
    overflow-x: hidden;
    user-select: none;

    background-color: ${colors.bg};
    color: ${colors.fg};
  }

  #app {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;
