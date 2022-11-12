import { useEffect } from "react";

import { useSetAddress, useSetAddressError } from "./account";

export const InitializeAccount = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setAddress = useSetAddress();
  const setError = useSetAddressError();

  useEffect(() => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      setError("Metamaskをインストールしてください");
      return;
    }

    // アカウント切り替え時の処理
    const accountChanged = async (newAccount: string) => {
      setAddress(newAccount[0]);
    };
    window.ethereum.on("accountsChanged", accountChanged);

    // ネットワーク切り替え時の処理
    const chainChanged = (chain: string) => {
      if (chain !== "0x1") {
        setError("イーサリアムメインネットでのみ利用可能です");
        return;
      }
      if (!window.ethereum) {
        return;
      }
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: any) => {
          if (accounts.length !== 0) {
            setAddress(accounts[0]);
          } else {
            setError("認証済みのアカウントが見つかりませんでした");
          }
        });
    };
    window.ethereum.on("chainChanged", chainChanged);

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: any) => {
        if (window.ethereum?.chainId !== "0x1") {
          setError("イーサリアムメインネットでのみ利用可能です");
          return;
        }
        if (accounts.length !== 0) {
          setAddress(accounts[0]);
        }
      });
  }, [setAddress, setError]);
  return <>{children}</>;
};
