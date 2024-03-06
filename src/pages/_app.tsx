import "@/styles/globals.css";
import styled from "styled-components";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return<DocuMents> <Component {...pageProps} />  </DocuMents>;
}
const DocuMents = styled.div`
`;