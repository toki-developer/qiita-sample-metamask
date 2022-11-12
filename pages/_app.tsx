import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { RecoilRoot } from "recoil";
import { InitializeAccount } from "src/utils/wallet/InitializeAccount";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <>
      <Head>
        <title>sample</title>
      </Head>
      <RecoilRoot>
        <InitializeAccount>
          {getLayout(<Component {...pageProps} />)}
        </InitializeAccount>
      </RecoilRoot>
    </>
  );
};

export default App;
