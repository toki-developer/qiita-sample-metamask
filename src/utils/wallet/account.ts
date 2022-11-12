import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type Account =
  | { address: string | undefined; errorMessage: undefined }
  | { address: undefined; errorMessage: string | undefined };

const currentAccountState = atom<Account>({
  key: "currentAccount",
  default: { address: undefined, errorMessage: undefined },
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
