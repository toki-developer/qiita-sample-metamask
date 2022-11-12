import { useCallback } from "react";

import { useAccount, useSetAddress, useSetAddressError } from "./account";

/**
 * @package
 */
export const useWallet = () => {
  const setAddress = useSetAddress();
  const setError = useSetAddressError();
  const { address, errorMessage } = useAccount();

  const handleConnect = useCallback(async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        setError("Metamaskをインストールしてください");
        return;
      }

      if (window.ethereum.chainId !== "0x1") {
        setError("イーサリアムメインネットでのみ利用できます。ネットワークを切り替えてください。");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length !== 0) {
        setAddress(accounts[0]);
      } else {
        setError("認証済みのアカウントが見つかりませんでした");
      }
    } catch (error) {
      setError("Metamaskの接続に失敗しました");
    }
  }, [setAddress, setError]);

  return { handleConnect, address, error: errorMessage };
};
