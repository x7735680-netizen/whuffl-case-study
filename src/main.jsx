import React from "react";
import { createRoot } from "react-dom/client";
import WhufflCaseStudy from "./pages/WhufflCaseStudy.jsx";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/whuffl-case-study.css";
import "./styles/build.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WhufflCaseStudy />
  </React.StrictMode>
);
