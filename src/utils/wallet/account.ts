import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type Account =
  | { address: string | undefined; errorMessage: undefined }
  | { address: undefined; errorMessage: string | undefined };

const currentAccountState = atom<Account>({
  key: "currentAccount",
  default: { address: undefined, errorMessage: undefined },
  effects: [
    ({ setSelf }) => {
      console.error("呼ばれたよーーー1");

      if (typeof window === "undefined") {
        return;
      }

      console.error("呼ばれたよーーー2");

      const setAddress = (address: string) => {
        setSelf({ address: address, errorMessage: undefined });
      };
      const setError = (error: string) => {
        setSelf({ address: undefined, errorMessage: error });
      };

      if (!window.ethereum || !window.ethereum.isMetaMask) {
        return setSelf({
          address: undefined,
          errorMessage: "Metamaskをインストールしてください",
        });
      }
      if (window.ethereum.chainId !== "0x1") {
        setError("イーサリアムメインネットでのみ利用可能です");
        return;
      }

      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: any) => {
          if (accounts.length !== 0) {
            setAddress(accounts[0]);
          }
        });

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
    },
  ],
});

/**
 * @package
 */
export const useAccount = () => useRecoilValue(currentAccountState);

/**
 * @package
 */
export const useSetAddress = () => {
  const setState = useSetRecoilState(currentAccountState);
  return (address: string) => setState({ address, errorMessage: undefined });
};

/**
 * @package
 */
export const useSetAddressError = () => {
  const setState = useSetRecoilState(currentAccountState);
  return (errorMessage: string) =>
    setState({ address: undefined, errorMessage });
};
