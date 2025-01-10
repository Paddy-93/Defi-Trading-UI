import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia, base, localhost } from "@wagmi/core/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base, localhost],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [localhost.id]: http(),
  },
});
