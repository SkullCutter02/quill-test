import type { AppProps } from "next/app";
import { useEffect } from "react";
import katex from "katex";
import highlight from "highlight.js";
import Head from "next/head";

import "../styles/global.css";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-light.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.katex = katex;
    (window as any).hljs = highlight;
  }, []);

  return (
    <>
      <Head>
        <title>QuillJS</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
