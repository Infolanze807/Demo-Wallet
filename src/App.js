// import React, { useState, useEffect } from "react";
// import Web3 from "web3";

// function App() {
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [balance, setBalance] = useState(null);
//   const [network, setNetwork] = useState(null);
//   const [sendToAddress, setSendToAddress] = useState("");
//   const [sendAmount, setSendAmount] = useState("");
//   const [txHash, setTxHash] = useState(""); 

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("chainChanged", handleChainChanged);
//       window.ethereum.on("accountsChanged", handleAccountsChanged);
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener("chainChanged", handleChainChanged);
//         window.ethereum.removeListener(
//           "accountsChanged",
//           handleAccountsChanged
//         );
//       }
//     };
//   });

//   const handleChainChanged = async () => {
//     const web3 = new Web3(window.ethereum);
//     const networkId = Number(await web3.eth.net.getId());
//     const networkName = getNetworkName(networkId);
//     setNetwork(networkName);
//     console.log("Chain changed to network:", networkName);

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length > 0) {
//       setCurrentAccount(accounts[0]);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//       console.log("Current account:", accounts[0]);
//       console.log("Balance updated:", balanceEth, "ETH");
//     } else {
//       setCurrentAccount(null);
//       setBalance(null);
//       setNetwork(null);
//       console.log("No accounts detected");
//     }
//   };

//   const handleAccountsChanged = async (accounts) => {
//     if (accounts.length > 0) {
//       const web3 = new Web3(window.ethereum);
//       setCurrentAccount(accounts[0]);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//       console.log("Account changed to:", accounts[0]);
//       console.log("Balance updated:", balanceEth, "ETH");
//     } else {
//       setCurrentAccount(null);
//       setBalance(null);
//       setNetwork(null);
//       console.log("No accounts detected");
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum.isMetaMask) {
//         return alert("MetaMask is not installed");
//       }
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);
//       console.log("Wallet connected:", accounts[0]);

//       const web3 = new Web3(window.ethereum);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//       console.log("Balance updated:", balanceEth, "ETH");

//       const networkId = Number(await web3.eth.net.getId());
//       const networkName = getNetworkName(networkId);
//       setNetwork(networkName);
//       console.log("Network connected:", networkName);
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while connecting to the wallet");
//     }
//   };

//   const getNetworkName = (networkId) => {
//     switch (networkId) {
//       case 1:
//         return "Ethereum";
//       case 10:
//         return "Optimism";
//       case 56:
//         return "BSC";
//       case 137:
//         return "Polygon";
//       case 8453:
//         return "BASE";
//       case 42161:
//         return "Arbitrum";
//       case 43114:
//         return "Avalanche";
//       case 81457:
//         return "Blast";
//       case 7777777:
//         return "Zora";
//       case 666666666:
//         return "Degen";
//       case 17000:
//         return "ETH TEST";
//       case 59144:
//         return "Linae";
//       case 11155111:
//         return "Sepolia ETH";
//       case 97:
//         return "BSC TEST";
//       case 80002:
//         return "Polygon Amoy";
//       case 59141:
//         return "Linea Sepolia";
//       case 59140:
//         return "Linea Goerli";
//       case 713715:
//         return "SEI DEV";
//       case 1329:
//         return "SEI";
//       default:
//         return "Unknown";
//     }
//   };

//   const sendTransaction = async () => {
//     if (!sendToAddress || !sendAmount) {
//       alert("Please enter both address and amount to send.");
//       return;
//     }
  
//     try {
//       const web3 = new Web3(window.ethereum);
//       const amountWei = web3.utils.toWei(sendAmount, "ether");
  
//       const nonce = await web3.eth.getTransactionCount(currentAccount, "latest");
//       const gasPrice = await web3.eth.getGasPrice();
//       const gasLimit = 21000; // Basic transaction gas limit
  
//       const tx = {
//         from: currentAccount,
//         to: sendToAddress,
//         value: amountWei,
//         gas: gasLimit,
//         gasPrice: gasPrice,
//         nonce: nonce,
//       };
  
//       const txHash = await web3.eth.sendTransaction(tx);
//       console.log("Transaction sent. TxHash:", txHash);
//       setTxHash(txHash.transactionHash); //
  
//       alert("Transaction sent successfully!");
//       setSendToAddress("");
//       setSendAmount("");
//     } catch (error) {
//       console.error("Failed to send transaction:", error);
//       alert("Failed to send transaction.");
//     }
//   };

//   return (
//   <div className="box">
//     <div className="heder">
//       <div>Connect your wallet</div>
//       <button onClick={connectWallet} className="btn-1">
//         Connect
//       </button>
//     </div>
//     {currentAccount && (
//       <div className="data">
//         <p>Wallet Address: {currentAccount}</p>
//         <p>
//           Wallet Balance: {balance} ({network && `${network}`})
//         </p>
//         <p>Wallet Network: {network}</p>
//       </div>
//     )}
//     <div className="form-main">
//       <div className="form">
//         <h3>Send Crypto Currency</h3>
//         <input
//           type="text"
//           placeholder="Address"
//           value={sendToAddress}
//           onChange={(e) => setSendToAddress(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="text"
//           placeholder="Amount"
//           value={sendAmount}
//           onChange={(e) => setSendAmount(e.target.value)}
//         />
//         <br></br>
//         <button onClick={sendTransaction}>Send</button>
//           {txHash && (
//         <div className="form">
//           <h3>Transaction Hash</h3>
//           <p>{txHash}</p>
//         </div>
//       )}
//       </div>
//     </div>
//   </div>
// );
// }

// export default App;


import React, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [sendToAddress, setSendToAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  });

  const handleChainChanged = async (chainIdHex) => {
    const networkId = parseInt(chainIdHex, 16); // Convert hexadecimal chainId to decimal
    console.log("Chain ID returned by MetaMask:", networkId);

    // Handle network change based on networkId
    switch (networkId) {
      case 713715: // SEI Devnet
        setNetwork("SEI Devnet");
        await updateAccountAndBalance();
        break;
      default:
        setNetwork(null); // Reset network state
        setCurrentAccount(null); // Reset current account state
        setBalance(null); // Reset balance state
        alert("Please switch to SEI Devnet network");
        await switchToSeiDevnet();
        break;
    }
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length > 0) {
      setCurrentAccount(accounts[0]);
      await updateAccountAndBalance();
    } else {
      setCurrentAccount(null);
      setBalance(null);
      setNetwork(null);
      console.log("No accounts detected");
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
      console.log("Wallet connected:", accounts[0]);

      const chainIdHex = await window.ethereum.request({
        method: "eth_chainId",
      });
      const networkId = parseInt(chainIdHex, 16); // Convert hexadecimal chainId to decimal
      console.log("Chain ID returned by MetaMask:", networkId);

      switch (networkId) {
        case 713715: // SEI Devnet
          setNetwork("SEI Devnet");
          await updateAccountAndBalance();
          break;
        default:
          setNetwork(null); // Reset network state
          setCurrentAccount(null); // Reset current account state
          setBalance(null); // Reset balance state
          alert("Please switch to SEI Devnet network");
          await switchToSeiDevnet();
          break;
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while connecting to the wallet");
    }
  };

  const switchToSeiDevnet = async () => {
    const networks = {
      SEI_DEVNET: {
        chainId: '0xae3f3',
        chainName: 'SEI Devnet',
        nativeCurrency: {
          name: 'SEI Devnet',
          symbol: 'SEI',
          decimals: 18,
        },
        rpcUrls: ['https://evm-rpc-arctic-1.sei-apis.com'], // Replace with actual SEI Devnet RPC URL
        blockExplorerUrls: ['https://seistream.app'],
      },
    };

    const params = networks.SEI_DEVNET;

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [params],
      });
    } catch (error) {
      console.error('Failed to switch network:', error);
      alert('Failed to switch network.');
    }
  };

  const updateAccountAndBalance = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);

    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    setBalance(balanceEth);

    console.log("Current account:", accounts[0]);
    console.log("Balance updated:", balanceEth, "SEI");
  };

  const sendTransaction = async () => {
    if (!sendToAddress || !sendAmount) {
      alert("Please enter both address and amount to send.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const amountWei = web3.utils.toWei(sendAmount, "ether");

      const nonce = await web3.eth.getTransactionCount(currentAccount, "latest");
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 21000; // Basic transaction gas limit

      const tx = {
        from: currentAccount,
        to: sendToAddress,
        value: amountWei,
        gas: gasLimit,
        gasPrice: gasPrice,
        nonce: nonce,
      };

      const txHash = await web3.eth.sendTransaction(tx);
      console.log("Transaction sent. TxHash:", txHash);
      setTxHash(txHash.transactionHash); //

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
          <p>Wallet Balance: {balance} ({network})</p>
          <p>Wallet Network: {network}</p>
        </div>
      )}
      <div className="form-main">
        <div className="form">
          <h3>Send Crypto Currency</h3>
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
          {txHash && (
            <div className="form">
              <h3>Transaction Hash</h3>
              <p>{txHash}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


// with switch network