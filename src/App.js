import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers } from 'ethers';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [sendToAddress, setSendToAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");

  useEffect(() => {
    if (window.compass) {
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleChainChanged = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = Number(await web3.eth.net.getId());
    const networkName = getNetworkName(networkId);
    setNetwork(networkName);

    // Also update account and balance when network changes
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setCurrentAccount(accounts[0]);
      const balanceWei = await web3.eth.getBalance(accounts[0]);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceEth);

      // Log network change data
      console.log("Network changed:");
      console.log("New Network ID:", networkId);
      console.log("New Network Name:", networkName);
      console.log("Wallet Address:", accounts[0]);
      console.log("Wallet Balance:", balanceEth);
    } else {
      setCurrentAccount(null);
      setBalance(null);
      setNetwork(null);
    }
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length > 0) {
      const web3 = new Web3(window.ethereum);
      setCurrentAccount(accounts[0]);
      const balanceWei = await web3.eth.getBalance(accounts[0]);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceEth);
    } else {
      setCurrentAccount(null);
      setBalance(null);
      setNetwork(null);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum.isMetaMask) {
        return alert("MetaMask is not installed");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);

      const web3 = new Web3(window.ethereum);

      // Fetch balance
      const balanceWei = await web3.eth.getBalance(accounts[0]);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceEth);

      // Fetch network
      const networkId = Number(await web3.eth.net.getId());
      console.log("Network ID:", networkId);
      setNetwork(getNetworkName(networkId));

      // Log data
      console.log("Wallet Address:", accounts[0]);
      console.log("Wallet Balance:", balanceEth);
      console.log("Wallet Network:", getNetworkName(networkId));
    } catch (error) {
      console.error(error);
      alert("An error occurred while connecting to the wallet");
    }
  };

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case 1:
        return "Ethereum";
      case 10:
        return "Optimism";
      case 56:
        return "BSC";
      case 137:
        return "Polygon";
      case 8453:
        return "BASE";
      case 42161:
        return "Arbitrum";
      case 43114:
        return "Avalanche";
      case 81457:
        return "Blast";
      case 7777777:
        return "Zora";
      case 666666666:
        return "Degen";
      case 17000:
        return "ETH TEST";
      case 59144:
        return "Linae";
      case 11155111:
        return "Sepolia ETH";
      case 97:
        return "BSC TEST";
      case 80002:
        return "Polygon Amoy";
      case 59141:
        return "Linea Sepolia";
      case 59140:
        return "Linea Goerli";
      default:
        return "Unknown";
    }
  };

  const sendTransaction = async () => {
    if (!sendToAddress || !sendAmount) {
      alert("Please enter both address and amount to send.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const amountWei = web3.utils.toWei(sendAmount, "ether");

      // Log payment process
      console.log("Sending transaction...");
      console.log("From:", currentAccount);
      console.log("To:", sendToAddress);
      console.log("Amount:", sendAmount);

      // Send transaction
      await web3.eth.sendTransaction({
        from: currentAccount,
        to: sendToAddress,
        value: amountWei,
      });

      console.log("Transaction sent successfully!");
      alert("Transaction sent successfully!");
      setSendToAddress("");
      setSendAmount("");
    } catch (error) {
      console.error("Failed to send transaction:", error);
      alert("Failed to send transaction.");
    }
  };

  return (
    <div className="box">
      <div className="heder">
        <div>Connect your wallet</div>
        <button onClick={connectWallet} className="btn-1">
          Connect
        </button>
      </div>
      {currentAccount && (
        <div className="data">
          <p>Wallet Address: {currentAccount}</p>
          <p>
            Wallet Balance: {balance} ({network && `${network}`})
          </p>
          <p>Wallet Network: {network}</p>
        </div>
      )}
      <div className="form-main">
        <div className="form">
          <input
            type="text"
            placeholder="Address"
            value={sendToAddress}
            onChange={(e) => setSendToAddress(e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="Amount"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
          <br></br>
          <button onClick={sendTransaction}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
