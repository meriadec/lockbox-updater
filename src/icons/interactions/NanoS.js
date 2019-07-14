import React from "react";

import colors, { opacity } from "../../colors";

const lineColor = "hsl(221, 26%, 40%)";
const swivelColor = "hsl(221, 26%, 30%)";

const LeftHint = ({ color }) => (
  <g transform="translate(22 -38)">
    <circle
      className="nanos__pulsing"
      cx="5"
      cy="36"
      r="5"
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeOpacity=".6"
      strokeWidth=".5"
    />
    <circle
      className="nanos__pulsing nanos__delay"
      cx="5"
      cy="36"
      r="5"
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeOpacity=".6"
      strokeWidth=".5"
    />
    <circle
      className="nanos__pulsing nanos__delay-two"
      cx="5"
      cy="36"
      r="5"
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeOpacity=".6"
      strokeWidth=".5"
    />
    <circle cx="5" cy="36" r="2" fill={color} stroke={color} strokeWidth=".8" />
    <path fill="url(#hints)" fillRule="nonzero" d="M5.5 34h-1V0h1z" />
  </g>
);

const RightHint = ({ color }) => (
  <g transform="translate(84 -38)">
    <circle
      className="nanos__pulsing"
      cx="5"
      cy="36"
      r="5"
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeOpacity=".6"
      strokeWidth=".5"
    />
    <circle
      className="nanos__pulsing nanos__delay"
      cx="5"
      cy="36"
      r="5"
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeOpacity=".6"
      strokeWidth=".5"
    />
    <circle
      className="nanos__pulsing nanos__delay-two"
      cx="5"
      cy="36"
      r="5"
      fill={color}
      fillOpacity=".2"
      stroke={color}
      strokeOpacity=".6"
      strokeWidth=".5"
    />
    <circle cx="5" cy="36" r="2" fill={color} stroke={color} strokeWidth=".8" />
    <path fill="url(#hints)" fillRule="nonzero" d="M5.5 34h-1V0h1z" />
  </g>
);

const Hints = ({ action, color }) => (
  <>
    <defs>
      <linearGradient id="hints" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0" />
        <stop offset="100%" stopColor={color} />
      </linearGradient>
    </defs>
    {action === "accept" ? (
      <RightHint color={color} />
    ) : action === "left" ? (
      <LeftHint color={color} />
    ) : null}
  </>
);

const Usb = () => (
  <>
    <defs>
      <linearGradient id="usb" x1="50%" x2="50%" y1="98.633%" y2="0%">
        <stop offset="0%" stopColor={opacity(lineColor, 0)} />
        <stop offset="100%" stopColor={lineColor} />
      </linearGradient>
    </defs>
    <g>
      <path
        fill="url(#usb)"
        d="M8.889 52h.889v2H8v-2h1.778-.89zm.889 50v-2H8v2h1.778zM8 52h1.778v50H8V52zm8 0h-1.778v2H16v-2zm0 0h-.889H16zm0 50v-2h-1.778v2H16zm-1.778-50H16v50h-1.778V52z"
        transform="matrix(0 -1 -1 0 2 33)"
      />
      <path
        fill={lineColor}
        d="M-38 25h-12v-8h12v8zm2 2V15h-14.8a1.2 1.2 0 0 0-1.2 1.2v9.6a1.2 1.2 0 0 0 1.2 1.2H-36z"
      />
      <path
        fill={lineColor}
        d="M0 30.6a.4.4 0 0 1-.4.4h-30.4a5.2 5.2 0 0 1-5.2-5.2v-9.6a5.2 5.2 0 0 1 5.2-5.2H-.4c.22 0 .4.18.4.4v19.2zm2 0V11.4A2.4 2.4 0 0 0-.4 9h-30.4a7.2 7.2 0 0 0-7.2 7.2v9.6a7.2 7.2 0 0 0 7.2 7.2H-.4A2.4 2.4 0 0 0 2 30.6z"
      />
    </g>
  </>
);

const UsbDisconnect = () => (
  <>
    <defs>
      <linearGradient id="usbdisc" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={lineColor} />
        <stop offset="100%" stopColor={opacity(lineColor, 0)} />
      </linearGradient>
    </defs>
    <g transform="translate(-150 0)">
      <g>
        <path
          stroke={lineColor}
          strokeWidth="1.796"
          d="M117.29 28.754a.898.898 0 0 1-.897.898H92.145a4.49 4.49 0 0 1-4.49-4.49v-7.69a4.49 4.49 0 0 1 4.49-4.49h24.248c.496 0 .898.402.898.898v14.874z"
        />
        <path
          stroke={lineColor}
          strokeWidth="1.796"
          d="M87.343 24.056H77.264v-5.808h10.079v5.808z"
        />
        <path
          stroke={lineColor}
          strokeWidth=".898"
          d="M117.782 26.743v-11.05h10.223c.744 0 1.348.602 1.348 1.346v8.357c0 .744-.604 1.347-1.348 1.347h-10.223z"
        />
        <g
          stroke={lineColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".898"
        >
          <path d="M127.594 18.322h-6.24M127.594 23.918h-6.24" />
        </g>
        <path
          fill="url(#usbdisc)"
          d="M6.163 53.199h1.456v75.908H6.163V53.2zm5.099 0h1.457v75.908h-1.457V53.2z"
          transform="matrix(0 -1 -1 0 129.802 30.55)"
        />
      </g>
      <g transform="translate(35.562 10.55)">
        <ellipse
          cx="10.299"
          cy="10.45"
          fill="#6490F1"
          stroke="#6490F1"
          strokeOpacity=".4"
          strokeWidth="3.208"
          rx="11.903"
          ry="12.013"
        />
        <g
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <path d="M14.345 10.58H6.253M9.471 13.832L6.253 10.58M9.471 7.327L6.253 10.58" />
        </g>
      </g>
    </g>
  </>
);

const UsbConnect = () => (
  <>
    <defs>
      <linearGradient id="usbco" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={lineColor} />
        <stop offset="100%" stopColor={opacity(lineColor, 0)} />
      </linearGradient>
    </defs>
    <g transform="translate(-140 -30)">
      <g>
        <path
          stroke={lineColor}
          strokeWidth="1.796"
          d="M141.293 58.683a.898.898 0 0 1-.898.899h-24.35a4.49 4.49 0 0 1-4.49-4.491v-7.685a4.49 4.49 0 0 1 4.49-4.49h24.35c.496 0 .898.401.898.897v14.87z"
        />
        <path
          stroke={lineColor}
          strokeWidth="1.796"
          d="M111.247 53.986H101.13V48.18h10.117v5.806z"
        />
        <path
          fill="url(#usbco)"
          d="M6.161 62.6h1.457v101.93H6.16V62.6zm5.098 0h1.457v101.93h-1.457V62.6z"
          transform="matrix(0 -1 -1 0 164.842 60.48)"
        />
      </g>
      <g transform="translate(34.39 40.443)">
        <ellipse
          cx="10.296"
          cy="10.487"
          fill="#6490F1"
          stroke="#6490F1"
          strokeOpacity=".4"
          strokeWidth="3.208"
          rx="11.9"
          ry="12.047"
        />
        <g
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <path d="M6.251 10.618h8.09M11.124 13.881l3.217-3.263M11.124 7.354l3.217 3.264" />
        </g>
      </g>
    </g>
  </>
);

const ValidationScreen = () => (
  <g transform="translate(49 13)">
    <mask id="validate-mask" fill="#fff">
      <path
        id="validate"
        d="M13.62 2.608l-8.22 8.22-3.02-3.02a.375.375 0 0 0-.53 0l-.884.884a.375.375 0 0 0 0 .53l4.169 4.17a.375.375 0 0 0 .53 0l9.37-9.37a.375.375 0 0 0 0-.53l-.884-.884a.375.375 0 0 0-.53 0z"
      />
    </mask>
    <g fill="#66BE54" mask="url(#validate-mask)">
      <path d="M0 0h16v16H0z" />
    </g>
  </g>
);

const PinScreen = ({ color }) => (
  <g transform="translate(37 17)">
    <rect width="40" height="8" fill={color} fillRule="nonzero" rx=".8" />
    <path
      fill="#FFF"
      d="M5.7 4.408c0 .03-.027.054-.059.054H5.05a.06.06 0 0 0-.056.035.053.053 0 0 0 .013.061l.417.386c.012.01.019.025.019.04s-.007.029-.019.04l-.239.222a.067.067 0 0 1-.085 0l-.417-.386a.064.064 0 0 0-.066-.012.056.056 0 0 0-.037.051v.546c0 .031-.027.056-.061.056h-.338c-.034 0-.061-.025-.061-.056v-.546a.056.056 0 0 0-.038-.05.064.064 0 0 0-.065.011l-.418.386a.067.067 0 0 1-.085 0l-.239-.223a.053.053 0 0 1-.018-.04c0-.014.007-.028.018-.039l.418-.386a.053.053 0 0 0 .012-.06.06.06 0 0 0-.055-.035h-.59a.061.061 0 0 1-.042-.016A.052.052 0 0 1 3 4.408v-.315c0-.015.006-.029.018-.039a.061.061 0 0 1 .043-.015h.59a.06.06 0 0 0 .054-.035.053.053 0 0 0-.012-.06l-.418-.387a.053.053 0 0 1-.018-.04c0-.014.007-.029.018-.039l.237-.223a.067.067 0 0 1 .085 0l.418.386c.017.016.043.02.065.012a.056.056 0 0 0 .038-.051v-.546c0-.03.027-.056.06-.056h.347c.034 0 .06.025.06.056v.546c.001.022.016.043.038.051a.064.064 0 0 0 .066-.012l.417-.386a.067.067 0 0 1 .085 0l.24.223c.011.01.018.025.018.04 0 .014-.007.029-.019.039l-.417.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .056.036h.591c.033 0 .059.024.059.054l-.006.315zm4.456 0c0 .03-.028.055-.06.054h-.59a.06.06 0 0 0-.055.035.053.053 0 0 0 .013.061l.417.386a.055.055 0 0 1 0 .08l-.241.222a.067.067 0 0 1-.085 0l-.417-.386a.064.064 0 0 0-.066-.012.056.056 0 0 0-.038.051v.546c0 .03-.026.055-.058.056h-.34c-.034 0-.06-.026-.06-.056v-.546a.056.056 0 0 0-.037-.05.064.064 0 0 0-.066.011l-.417.386a.067.067 0 0 1-.085 0l-.241-.223a.055.055 0 0 1 0-.079l.417-.386a.053.053 0 0 0 .013-.06.06.06 0 0 0-.055-.035h-.59c-.033 0-.06-.025-.06-.055v-.315c0-.03.027-.054.06-.054h.59a.06.06 0 0 0 .055-.035.053.053 0 0 0-.013-.06l-.417-.387a.055.055 0 0 1 0-.079l.241-.223a.067.067 0 0 1 .085 0l.417.386c.018.016.043.02.066.012a.056.056 0 0 0 .038-.051v-.546c0-.03.025-.055.058-.056h.34c.033.001.06.026.06.056v.546c0 .022.014.043.037.051a.064.064 0 0 0 .066-.012l.417-.386a.067.067 0 0 1 .085 0l.24.223a.055.055 0 0 1 0 .079l-.416.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .055.036h.59c.032 0 .06.024.06.054v.315zm4.449 0a.052.052 0 0 1-.018.04.061.061 0 0 1-.043.014h-.59a.06.06 0 0 0-.055.035.053.053 0 0 0 .013.061l.417.386a.053.053 0 0 1 0 .079l-.237.223a.067.067 0 0 1-.085 0l-.417-.386a.064.064 0 0 0-.066-.012.056.056 0 0 0-.037.051v.546c0 .031-.027.056-.061.056h-.346c-.034 0-.061-.025-.061-.056v-.546a.056.056 0 0 0-.038-.05.064.064 0 0 0-.065.011l-.418.386a.067.067 0 0 1-.085 0l-.239-.223a.053.053 0 0 1-.018-.04c0-.014.007-.028.018-.039l.418-.386a.053.053 0 0 0 .012-.06.06.06 0 0 0-.055-.035h-.585c-.033 0-.059-.025-.059-.055v-.315c0-.03.026-.054.059-.054h.591a.06.06 0 0 0 .055-.035.053.053 0 0 0-.012-.06l-.418-.387a.053.053 0 0 1-.018-.04c0-.014.007-.029.018-.039l.24-.223a.067.067 0 0 1 .084 0l.418.386c.017.016.043.02.065.012a.056.056 0 0 0 .038-.051v-.546c0-.03.027-.056.06-.056h.339c.033 0 .06.025.06.056v.546c.001.022.016.043.038.051a.064.064 0 0 0 .066-.012l.417-.386a.067.067 0 0 1 .085 0l.24.223c.01.01.017.025.017.04 0 .014-.006.029-.018.039l-.417.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .056.036h.589c.016 0 .031.005.043.015.011.01.018.024.018.04v.314zm4.448 0c0 .03-.026.054-.059.054h-.591a.06.06 0 0 0-.055.035.053.053 0 0 0 .012.061l.418.386c.011.01.018.025.018.04s-.007.029-.018.04l-.24.222a.067.067 0 0 1-.084 0l-.418-.386a.064.064 0 0 0-.065-.012.056.056 0 0 0-.038.051v.546c0 .031-.027.056-.06.056h-.339c-.033 0-.06-.025-.06-.056v-.546a.056.056 0 0 0-.038-.05.064.064 0 0 0-.066.011l-.417.386a.067.067 0 0 1-.085 0l-.24-.223a.053.053 0 0 1-.017-.04c0-.014.006-.028.018-.039l.417-.386a.053.053 0 0 0 .013-.06.06.06 0 0 0-.055-.035h-.59a.061.061 0 0 1-.043-.016.052.052 0 0 1-.018-.039v-.315c0-.015.007-.029.018-.039a.061.061 0 0 1 .043-.015h.59a.06.06 0 0 0 .055-.035.053.053 0 0 0-.013-.06l-.417-.387a.053.053 0 0 1-.018-.04c0-.014.006-.029.018-.039l.237-.223a.067.067 0 0 1 .085 0l.417.386c.017.016.043.02.066.012a.056.056 0 0 0 .037-.051v-.546c0-.03.028-.056.061-.056h.346c.034 0 .061.025.061.056v.546c0 .022.015.043.038.051a.064.064 0 0 0 .065-.012l.418-.386a.067.067 0 0 1 .085 0l.239.223c.011.01.018.025.018.04 0 .014-.007.029-.018.039l-.417.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .055.036H19c.033 0 .06.024.06.054l-.007.315zm4.457 0c-.001.03-.028.055-.061.054h-.59a.06.06 0 0 0-.055.035.053.053 0 0 0 .013.061l.417.386a.055.055 0 0 1 0 .08l-.24.222a.067.067 0 0 1-.086 0l-.417-.386a.064.064 0 0 0-.066-.012.056.056 0 0 0-.037.051v.546c0 .03-.026.055-.06.056h-.34c-.032 0-.058-.026-.058-.056v-.546a.056.056 0 0 0-.038-.05.064.064 0 0 0-.065.011l-.418.386a.067.067 0 0 1-.085 0l-.24-.223a.055.055 0 0 1 0-.079l.417-.386a.053.053 0 0 0 .012-.06.06.06 0 0 0-.055-.035h-.59c-.032 0-.059-.025-.06-.055v-.315c.001-.03.028-.054.06-.054h.59a.06.06 0 0 0 .055-.035.053.053 0 0 0-.012-.06l-.418-.387a.055.055 0 0 1 0-.079l.241-.223a.067.067 0 0 1 .085 0l.418.386c.017.016.043.02.065.012a.056.056 0 0 0 .038-.051v-.546c0-.03.026-.055.059-.056h.34c.033.001.059.026.059.056v.546c0 .022.015.043.037.051a.064.064 0 0 0 .066-.012l.417-.386a.067.067 0 0 1 .085 0l.241.223a.055.055 0 0 1 0 .079l-.417.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .056.036h.589c.033 0 .06.024.06.054v.315zm4.448 0a.052.052 0 0 1-.018.04.061.061 0 0 1-.043.014h-.589a.06.06 0 0 0-.055.035.053.053 0 0 0 .012.061l.418.386c.011.01.018.025.018.04s-.007.029-.018.04l-.237.222a.067.067 0 0 1-.085 0l-.418-.386a.064.064 0 0 0-.065-.012.056.056 0 0 0-.038.051v.546c0 .031-.027.056-.06.056h-.347c-.034 0-.06-.025-.06-.056v-.546a.056.056 0 0 0-.038-.05.064.064 0 0 0-.066.011l-.417.386a.067.067 0 0 1-.085 0l-.24-.223a.053.053 0 0 1-.018-.04c0-.014.007-.028.019-.039l.417-.386a.053.053 0 0 0 .013-.06.06.06 0 0 0-.056-.035h-.585c-.032 0-.059-.025-.059-.055v-.315c0-.03.027-.054.06-.054h.59a.06.06 0 0 0 .056-.035.053.053 0 0 0-.013-.06l-.417-.387a.053.053 0 0 1-.018-.04c0-.014.006-.029.018-.039l.239-.223a.067.067 0 0 1 .085 0l.417.386c.017.016.043.02.066.012a.056.056 0 0 0 .037-.051v-.546c0-.03.028-.056.061-.056h.338c.034 0 .061.025.061.056v.546c0 .022.015.043.038.051a.064.064 0 0 0 .065-.012l.418-.386a.067.067 0 0 1 .085 0l.239.223c.011.01.018.025.018.04 0 .014-.007.029-.018.039l-.418.386a.053.053 0 0 0-.012.06.06.06 0 0 0 .055.036h.59c.015 0 .03.005.042.015.012.01.018.024.018.04v.314zm4.449 0a.052.052 0 0 1-.018.04.061.061 0 0 1-.043.014h-.59a.06.06 0 0 0-.055.035.053.053 0 0 0 .013.061l.417.386a.053.053 0 0 1 0 .079l-.237.223a.067.067 0 0 1-.085 0l-.417-.386a.064.064 0 0 0-.066-.012.056.056 0 0 0-.037.051v.546c0 .031-.028.056-.061.056h-.347c-.033 0-.06-.025-.06-.056v-.546a.056.056 0 0 0-.038-.05.064.064 0 0 0-.066.011l-.417.386a.067.067 0 0 1-.085 0l-.239-.223a.053.053 0 0 1-.018-.04c0-.014.006-.028.018-.039l.417-.386a.053.053 0 0 0 .013-.06.06.06 0 0 0-.055-.035h-.586c-.032 0-.058-.025-.058-.055v-.315c0-.03.026-.054.058-.054h.592a.06.06 0 0 0 .055-.035.053.053 0 0 0-.013-.06l-.417-.387a.053.053 0 0 1-.018-.04c0-.014.007-.029.018-.039l.24-.223a.067.067 0 0 1 .084 0l.417.386c.018.016.044.02.066.012a.056.056 0 0 0 .038-.051v-.546c0-.03.027-.056.06-.056h.339c.033 0 .06.025.06.056v.546c0 .022.016.043.038.051a.064.064 0 0 0 .066-.012l.417-.386a.067.067 0 0 1 .085 0l.24.223c.01.01.017.025.017.04 0 .014-.006.029-.018.039l-.417.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .055.036h.59c.016 0 .031.005.043.015.011.01.018.024.018.04v.314zm4.448 0a.052.052 0 0 1-.018.04.061.061 0 0 1-.043.014h-.59a.06.06 0 0 0-.055.035.053.053 0 0 0 .013.061l.417.386c.012.01.019.025.019.04s-.007.029-.019.04l-.236.222a.067.067 0 0 1-.086 0l-.417-.386a.064.064 0 0 0-.065-.012.056.056 0 0 0-.038.051v.546c0 .031-.027.056-.06.056h-.347c-.034 0-.06-.025-.06-.056v-.546a.056.056 0 0 0-.039-.05.064.064 0 0 0-.065.011l-.417.386a.067.067 0 0 1-.085 0l-.24-.223a.053.053 0 0 1-.018-.04c0-.014.007-.028.019-.039l.417-.386a.053.053 0 0 0 .013-.06.06.06 0 0 0-.056-.035h-.585c-.033 0-.059-.025-.059-.055v-.315c0-.03.026-.054.059-.054h.591a.06.06 0 0 0 .056-.035.053.053 0 0 0-.013-.06l-.417-.387a.053.053 0 0 1-.019-.04c0-.014.007-.029.019-.039l.239-.223a.067.067 0 0 1 .085 0l.417.386c.017.016.043.02.066.012a.056.056 0 0 0 .037-.051v-.546c0-.03.027-.056.06-.056h.34c.033 0 .06.025.06.056v.546c0 .022.015.043.038.051a.064.064 0 0 0 .065-.012l.417-.386a.067.067 0 0 1 .086 0l.238.223c.012.01.019.025.019.04 0 .014-.007.029-.019.039l-.417.386a.053.053 0 0 0-.013.06.06.06 0 0 0 .056.036h.59c.015 0 .03.005.042.015.011.01.018.024.018.04v.314z"
    />
  </g>
);

const HomeScreen = ({ color }) => (
  <g transform="translate(49 13)">
    <mask id="home-mask" fill="#fff">
      <path
        id="home"
        d="M2.75 6.367v6.966c0 .322.261.584.583.584h9.334a.583.583 0 0 0 .583-.584V6.367L8 2.283 2.75 6.367zm-1.21-.959l6-4.667a.75.75 0 0 1 .92 0l6 4.667a.75.75 0 0 1 .29.592v7.333c0 1.15-.933 2.084-2.083 2.084H3.333a2.083 2.083 0 0 1-2.083-2.084V6a.75.75 0 0 1 .29-.592zM6.75 8.75v5.917a.75.75 0 0 1-1.5 0V8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 .75.75v6.667a.75.75 0 0 1-1.5 0V8.75h-2.5z"
      />
    </mask>
    <g fill={color} mask="url(#home-mask)">
      <path d="M0 0h16v16H0z" />
    </g>
  </g>
);

const ErrorScreen = ({ color, rejected = false }) => (
  <>
    {rejected ? (
      <g transform="translate(49 13)">
        <mask id="cmask" fill="#fff">
          <path
            id="cross"
            d="M9.372 8l4.506-4.506a.416.416 0 0 0 0-.59l-.783-.782a.416.416 0 0 0-.589 0L8 6.628 3.494 2.122a.416.416 0 0 0-.59 0l-.782.783a.416.416 0 0 0 0 .589L6.628 8l-4.506 4.506a.416.416 0 0 0 0 .59l.783.782a.416.416 0 0 0 .589 0L8 9.372l4.506 4.506a.416.416 0 0 0 .59 0l.782-.783a.416.416 0 0 0 0-.589L9.372 8z"
          />
        </mask>
        <g fill={color} mask="url(#cmask)">
          <path d="M0 0h16v16H0z" />
        </g>
      </g>
    ) : null}
    <g>
      <g transform="translate(254 -12)">
        <mask id="circle-mask" fill="#fff">
          <path
            id="circle"
            d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"
          />
        </mask>
        <g fill={color} mask="url(#circle-mask)">
          <path d="M0 0h32v32H0z" />
        </g>
      </g>
      {rejected ? (
        <g transform="translate(264 -2)">
          <mask id="smallcross-mask" fill="#fff">
            <path
              id="smallcross"
              d="M7.029 6l3.38-3.38a.312.312 0 0 0 0-.441l-.588-.587a.312.312 0 0 0-.441 0L6 4.972l-3.38-3.38a.312.312 0 0 0-.441 0l-.587.587a.312.312 0 0 0 0 .441L4.972 6l-3.38 3.38a.312.312 0 0 0 0 .441l.587.587c.122.123.32.123.441 0L6 7.028l3.38 3.38c.122.123.32.123.441 0l.587-.587a.312.312 0 0 0 0-.441L7.028 6z"
            />
          </mask>
          <g fill="#FFF" mask="url(#smallcross-mask)">
            <path d="M0 0h11.5v11.5H0z" />
          </g>
        </g>
      ) : (
        <g transform="translate(262 -4)">
          <mask id="exclamation-mask" fill="#fff">
            <path
              id="exclamation"
              d="M8 2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 12a1.2 1.2 0 1 1 0-2.4A1.2 1.2 0 0 1 8 14z"
            />
          </mask>
          <g fill="#FFF" mask="url(#exclamation-mask)">
            <path d="M0 0h16v16H0z" />
          </g>
        </g>
      )}
    </g>
  </>
);

const Frame = () => (
  <rect
    width="271.606"
    height="39.606"
    x="1.197"
    y="1.197"
    fill="transparent"
    fillOpacity=".12"
    stroke={lineColor}
    strokeWidth="2.394"
    rx="4"
  />
);

const Swivel = () => (
  <>
    <path
      fill={swivelColor}
      stroke={lineColor}
      strokeWidth="2.394"
      d="M135 1.197c-10.937 0-19.803 8.866-19.803 19.803 0 10.937 8.866 19.803 19.803 19.803h135A2.803 2.803 0 0 0 272.803 38V4A2.803 2.803 0 0 0 270 1.197H135z"
    />
    <circle cx="135" cy="21" r="9.5" stroke={lineColor} />
    <circle cx="135" cy="21" r="11.5" stroke={lineColor} />
  </>
);

const Screen = ({ color }) => (
  <rect
    width="65"
    height="23"
    x="24.5"
    y="9.5"
    fill="hsla(0, 0%, 0%, 0.2)"
    fillRule="nonzero"
    stroke={color || lineColor}
    rx="2"
  />
);

const LeftButton = () => (
  <rect
    width="17"
    height="4"
    x="18"
    y="-2"
    fill={lineColor}
    fillRule="nonzero"
    rx="1"
  />
);

const RightButton = () => (
  <rect
    width="17"
    height="4"
    x="80"
    y="-2"
    fill={lineColor}
    fillRule="nonzero"
    rx="1"
  />
);

const NanoS = ({ error, wire, action, screen, width = 272 }) => {
  const color = error ? colors.error : "#6490F1";
  const isRefusal = !!(error && error.name.startsWith("UserRefused"));

  return (
    <svg
      style={{ overflow: "visible" }}
      width={width}
      height={(width * 80) / 394}
      viewBox="0 0 394 80"
    >
      <g fill="none" fillRule="evenodd" transform="translate(100 38)">
        <Frame color={color} />
        <Swivel />
        <Screen color={error ? color : undefined} />
        <LeftButton />
        <RightButton />
        {/* displays usb cable */}
        {wire === "wired" ? <Usb /> : null}
        {wire === "disconnecting" ? <UsbDisconnect /> : null}
        {wire === "connecting" ? <UsbConnect /> : null}

        {/* displays action button */}
        {action ? <Hints action={action} color={color} /> : null}

        {/* displays screen type */}
        {screen === "home" ? (
          <HomeScreen color={color} />
        ) : screen === "validation" ? (
          <ValidationScreen />
        ) : screen === "pin" ? (
          <PinScreen color={color} />
        ) : null}

        {/* displays error */}
        {error ? <ErrorScreen rejected={isRefusal} color={color} /> : null}
      </g>
    </svg>
  );
};

export default NanoS;
