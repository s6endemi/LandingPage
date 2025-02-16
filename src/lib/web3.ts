import { writable } from "svelte/store";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Web3 Store
export const walletStore = writable({
  connected: false,
  address: "",
  shortAddress: "",
  network: "",
  balance: "0",
});

// Provider Konfiguration
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: import.meta.env.VITE_INFURA_ID,
    },
  },
};

let web3: Web3;
let provider: any;

export async function connectWallet() {
  try {
    // Mobile/Desktop Detection
    if ((window as any).ethereum) {
      provider = (window as any).ethereum;
    } else {
      provider = new WalletConnectProvider(providerOptions);
    }

    web3 = new Web3(provider);

    // Account Zugriff anfordern
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    const address = accounts[0];

    // Network Info
    const chainId = await web3.eth.getChainId();
    const network = getNetworkName(chainId);

    // Balance abfragen
    const balanceWei = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(balanceWei, "ether");

    // Store aktualisieren
    walletStore.set({
      connected: true,
      address,
      shortAddress: `${address.slice(0, 6)}...${address.slice(-4)}`,
      network,
      balance,
    });

    // Event Listener
    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
  } catch (error) {
    console.error("Web3 Error:", error);
  }
}

function handleAccountsChanged(accounts: string[]) {
  if (accounts.length === 0) {
    disconnectWallet();
  } else {
    walletStore.update((store) => ({
      ...store,
      address: accounts[0],
      shortAddress: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
    }));
  }
}

function handleChainChanged(chainId: string) {
  walletStore.update((store) => ({
    ...store,
    network: getNetworkName(parseInt(chainId, 16)),
  }));
}

export function disconnectWallet() {
  if (provider.disconnect) provider.disconnect();
  walletStore.set({
    connected: false,
    address: "",
    shortAddress: "",
    network: "",
    balance: "0",
  });
}

function getNetworkName(chainId: number) {
  switch (chainId) {
    case 1:
      return "Ethereum Mainnet";
    case 3:
      return "Ropsten Testnet";
    case 4:
      return "Rinkeby Testnet";
    case 5:
      return "Goerli Testnet";
    case 42:
      return "Kovan Testnet";
    case 56:
      return "Binance Smart Chain";
    case 137:
      return "Polygon Mainnet";
    default:
      return "Unknown Network";
  }
}
