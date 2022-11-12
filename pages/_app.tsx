import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <>
      <Head>
        <title>sample</title>
      </Head>
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
    </>
  );
};

export default App;
