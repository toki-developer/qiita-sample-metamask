import type { FC } from "react";
import { useWallet } from "src/utils/wallet";

export const Index: FC = () => {
  const { address, error, handleConnect } = useWallet();

  return (
    <div>
      <button onClick={handleConnect}>Wonnect Wallet</button>
      {address ? <p>{address}</p> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
};
