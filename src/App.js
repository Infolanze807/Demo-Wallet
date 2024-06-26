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
// demo 

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
//         window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
//       }
//     };
//   });

//   const handleChainChanged = async (chainIdHex) => {
//     const networkId = parseInt(chainIdHex, 16); // Convert hexadecimal chainId to decimal
//     console.log("Chain ID returned by MetaMask:", networkId);

//     // Handle network change based on networkId
//     switch (networkId) {
//       case 713715: // SEI Devnet
//         setNetwork("SEI Devnet");
//         await updateAccountAndBalance();
//         break;
//       default:
//         setNetwork(null); // Reset network state
//         setCurrentAccount(null); // Reset current account state
//         setBalance(null); // Reset balance state
//         alert("Please switch to SEI Devnet network");
//         await switchToSeiDevnet();
//         break;
//     }
//   };

//   const handleAccountsChanged = async (accounts) => {
//     if (accounts.length > 0) {
//       setCurrentAccount(accounts[0]);
//       await updateAccountAndBalance();
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

//       const chainIdHex = await window.ethereum.request({
//         method: "eth_chainId",
//       });
//       const networkId = parseInt(chainIdHex, 16); // Convert hexadecimal chainId to decimal
//       console.log("Chain ID returned by MetaMask:", networkId);

//       switch (networkId) {
//         case 713715: // SEI Devnet
//           setNetwork("SEI Devnet");
//           await updateAccountAndBalance();
//           break;
//         default:
//           setNetwork(null); // Reset network state
//           setCurrentAccount(null); // Reset current account state
//           setBalance(null); // Reset balance state
//           alert("Please switch to SEI Devnet network");
//           await switchToSeiDevnet();
//           break;
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while connecting to the wallet");
//     }
//   };

//   const switchToSeiDevnet = async () => {
//     const networks = {
//       SEI_DEVNET: {
//         chainId: '0xae3f3',
//         chainName: 'SEI Devnet',
//         nativeCurrency: {
//           name: 'SEI Devnet',
//           symbol: 'SEI',
//           decimals: 18,
//         },
//         rpcUrls: ['https://evm-rpc-arctic-1.sei-apis.com'], // Replace with actual SEI Devnet RPC URL
//         blockExplorerUrls: ['https://seistream.app'],
//       },
//     };

//     const params = networks.SEI_DEVNET;

//     try {
//       await window.ethereum.request({
//         method: 'wallet_addEthereumChain',
//         params: [params],
//       });
//     } catch (error) {
//       console.error('Failed to switch network:', error);
//       alert('Failed to switch network.');
//     }
//   };

//   const updateAccountAndBalance = async () => {
//     const web3 = new Web3(window.ethereum);
//     const accounts = await web3.eth.getAccounts();
//     setCurrentAccount(accounts[0]);

//     const balanceWei = await web3.eth.getBalance(accounts[0]);
//     const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//     setBalance(balanceEth);

//     console.log("Current account:", accounts[0]);
//     console.log("Balance updated:", balanceEth, "SEI");
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
//     <div className="box">
//       <div className="heder">
//       <div>Connect your wallet</div>
//       <button onClick={connectWallet} className="btn-1">
//         Connect
//       </button>
//     </div>
//       {currentAccount && (
//         <div className="data">
//           <p>Wallet Address: {currentAccount}</p>
//           <p>Wallet Balance: {balance} ({network})</p>
//           <p>Wallet Network: {network}</p>
//         </div>
//       )}
//       <div className="form-main">
//         <div className="form">
//           <h3>Send Crypto Currency</h3>
//           <input
//             type="text"
//             placeholder="Address"
//             value={sendToAddress}
//             onChange={(e) => setSendToAddress(e.target.value)}
//           />
//           <br></br>
//           <input
//             type="text"
//             placeholder="Amount"
//             value={sendAmount}
//             onChange={(e) => setSendAmount(e.target.value)}
//           />
//           <br></br>
//           <button onClick={sendTransaction}>Send</button>
//           {txHash && (
//             <div className="form">
//               <h3>Transaction Hash</h3>
//               <p>{txHash}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// // with switch network

// import React, { useState, useEffect } from "react";
// import Web3 from "web3";

// const API_URL = "https://api.diadata.org/v1/assetQuotation/Sei/0x0000000000000000000000000000000000000000";

// function App() {
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [balance, setBalance] = useState(null);
//   const [network, setNetwork] = useState(null);
//   const [sendToAddress, setSendToAddress] = useState("0xfE597edD372fBd54f3E3a5637432fAa42a591A6D");
//   const [sendAmountUsd, setSendAmountUsd] = useState("");
//   const [sendAmountSei, setSendAmountSei] = useState("");
//   const [txHash, setTxHash] = useState("");
//   const [seiToUsdRate, setSeiToUsdRate] = useState(null);

//   useEffect(() => {
//     const fetchSeiToUsdRate = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error("Failed to fetch SEI to USD rate");
//         }
//         const data = await response.json();
//         const rate = data.Price; // Extract the rate from the response
//         setSeiToUsdRate(rate);
//       } catch (error) {
//         console.error("Failed to fetch SEI to USD rate:", error.message);
//       }
//     };

//     fetchSeiToUsdRate();
//   }, []);

//   const updateAccountAndBalance = async () => {
//     const web3 = new Web3(window.ethereum);
//     const accounts = await web3.eth.getAccounts();
//     setCurrentAccount(accounts[0]);

//     const balanceWei = await web3.eth.getBalance(accounts[0]);
//     const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//     setBalance(balanceEth);

//     console.log("Current account:", accounts[0]);
//     console.log("Balance updated:", balanceEth, "SEI");
//   };

//   const sendTransaction = async () => {
//     try {
//       if (!window.ethereum) {
//         return alert("MetaMask is not installed");
//       }

//       if (!currentAccount) {
//         await connectWallet();
//         if (!currentAccount) {
//           return; // If still no current account after attempting to connect, stop here
//         }
//       }

//       if (!sendToAddress || !sendAmountSei) {
//         alert("Please enter both address and amount to send.");
//         return;
//       }

//       const web3 = new Web3(window.ethereum);
//       const amountWei = web3.utils.toWei(sendAmountSei, "ether");

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
//       setSendAmountUsd("");
//       setSendAmountSei("");
//     } catch (error) {
//       console.error("Failed to send transaction:", error);
//       alert("Failed to send transaction.");
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) {
//         return alert("MetaMask is not installed");
//       }
      
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);
//       console.log("Wallet connected:", accounts[0]);

//       const chainIdHex = await window.ethereum.request({
//         method: "eth_chainId",
//       });
//       const networkId = parseInt(chainIdHex, 16); // Convert hexadecimal chainId to decimal
//       console.log("Chain ID returned by MetaMask:", networkId);

//       switch (networkId) {
//         case 713715: // SEI Devnet
//           setNetwork("SEI Devnet");
//           await updateAccountAndBalance();
//           break;
//         default:
//           setNetwork(null); // Reset network state
//           setCurrentAccount(null); // Reset current account state
//           setBalance(null); // Reset balance state
//           alert("Please switch to SEI Devnet network");
//           await switchToSeiDevnet();
//           break;
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while connecting to the wallet");
//     }
//   };

//   const switchToSeiDevnet = async () => {
//     const networks = {
//       SEI_DEVNET: {
//         chainId: '0xae3f3',
//         chainName: 'SEI Devnet',
//         nativeCurrency: {
//           name: 'SEI Devnet',
//           symbol: 'SEI',
//           decimals: 18,
//         },
//         rpcUrls: ['https://evm-rpc-arctic-1.sei-apis.com'], // Replace with actual SEI Devnet RPC URL
//         blockExplorerUrls: ['https://seistream.app'],
//       },
//     };

//     const params = networks.SEI_DEVNET;

//     try {
//       await window.ethereum.request({
//         method: 'wallet_addEthereumChain',
//         params: [params],
//       });
//     } catch (error) {
//       console.error('Failed to switch network:', error);
//       alert('Failed to switch network.');
//     }
//   };

//   const handleAmountChange = (amount) => {
//     setSendAmountUsd(amount);
//     if (seiToUsdRate) {
//       const convertedAmount = parseFloat(amount) / seiToUsdRate;
//       setSendAmountSei(convertedAmount.toFixed(18)); // Adjust decimal places if necessary
//     }
//   };

//   return (
//     <div className="box">
//       <div className="heder">
//         <div>Connect your wallet</div>
//         <button onClick={connectWallet} className="btn-1">
//           Connect
//         </button>
//       </div>
//       {currentAccount && (
//         <div className="data">
//           <p>Wallet Address: {currentAccount}</p>
//           <p>Wallet Balance: {balance} SEI ({network})</p>
//           <p>Wallet Network: {network}</p>
//         </div>
//       )}
//       <div className="form-main">
//         <div className="form">
//           <h3>Send Crypto Currency</h3>
//           <input
//             type="text"
//             placeholder="Address"
//             value={sendToAddress}
//             disabled
//             onChange={(e) => setSendToAddress(e.target.value)}
//           />
//           <br></br>
//           <input
//             type="text"
//             placeholder="Amount in USD"
//             value={sendAmountUsd}
//             onChange={(e) => handleAmountChange(e.target.value)}
//           />
//           <br></br>
//           {sendAmountUsd && seiToUsdRate !== null && (
//             <p>USD TO : {sendAmountSei} SEI</p>
//           )}
//           <button onClick={sendTransaction}>Send</button>
//           {txHash && (
//             <div className="form">
//               <h3>Transaction Hash</h3>
//               <p>{txHash}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// // convertor


// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import {abi} from "./ABI"
// function App() {
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [balance, setBalance] = useState(null);
//   const [network, setNetwork] = useState(null);
//   const [sendToAddress, setSendToAddress] = useState("");
//   const [contractAddress, setContractAddress] = useState("");
//   const [nftBalance, setNftBalance] = useState(null);
//   const [tokenIds, setTokenIds] = useState([]);
//   const [transactionHash, setTransactionHash] = useState(null);

//   const PRIVATE_KEY = "37665e889eae27f25dd02cf761866daf5d3bbb499e4612193880ed6f405898df"; 
//   const Owner = "0x04c0c408ac99ae55c0130cb913ff6466b800d4b1";
//     useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("chainChanged", handleChainChanged);
//       window.ethereum.on("accountsChanged", handleAccountsChanged);
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener("chainChanged", handleChainChanged);
//         window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum && window.ethereum.isMetaMask) {
//         await connectWallet();
//       }
//     };

//     init();
//   }, []);

//   const handleChainChanged = async () => {
//     const web3 = new Web3(window.ethereum);
//     const networkId = Number(await web3.eth.net.getId());
//     const networkName = getNetworkName(networkId);
//     setNetwork(networkName);

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length > 0) {
//       setCurrentAccount(accounts[0]);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//     } else {
//       setCurrentAccount(null);
//       setBalance(null);
//       setNetwork(null);
//     }
//   };

//   const handleAccountsChanged = async () => {
//     const web3 = new Web3(window.ethereum);
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length > 0) {
//       setCurrentAccount(accounts[0]);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//     } else {
//       setCurrentAccount(null);
//       setBalance(null);
//       setNetwork(null);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);

//       const web3 = new Web3(window.ethereum);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);

//       const networkId = Number(await web3.eth.net.getId());
//       setNetwork(getNetworkName(networkId));
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while connecting to the wallet");
//     }
//   };

//   const getNetworkName = (networkId) => {
//     switch (networkId) {
//       case 713715:
//         return "SEI DEV"
//       default:
//         return "Unknown";
//     }
//   };

//   const performNftAirdrop = async () => {
//     try {
//       if (!contractAddress || !sendToAddress) {
//         alert("Please enter contract address and recipient address.");
//         return;
//       }

//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(abi, contractAddress);

//       // Fetch token IDs owned by the current user
//       const tokenIds = await contract.methods.tokensOfOwner(Owner).call();
//       if (tokenIds.length === 0) {
//         alert("You do not own any tokens to airdrop.");
//         return;
//       }


//       const gas = await contract.methods
//         .transferFirstTokens(Owner, sendToAddress)
//         .estimateGas({ from: Owner });

//       const gasPrice = await web3.eth.getGasPrice();

//       const tx = {
//         from:Owner,
//         to: contractAddress,
//         gas: gas,
//         gasPrice: gasPrice,
//         data: contract.methods.transferFirstTokens(Owner, sendToAddress).encodeABI(),
//       };

//       const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

//       const receipt = await web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction
//       );

//       const updatedNftBalance = await contract.methods.balanceOf(Owner).call();
//       setNftBalance(parseInt(updatedNftBalance, 10));

//       const token = await contract.methods.tokensOfOwner(Owner).call();
//       setTokenIds(token.map(id => id.toString()));

//       setTransactionHash(receipt.transactionHash);
//       alert("NFT Airdrop successful!");
//     } catch (error) {
//       console.error("Failed to perform NFT Airdrop:", error);
//       alert("Failed to perform NFT Airdrop.");
//     }
//   };

//   useEffect(() => {
//     const fetchNftBalance = async () => {
//       try {
//         if (!Owner || !contractAddress) {
//           return;
//         }

//         const web3 = new Web3(window.ethereum);
//         const contract = new web3.eth.Contract(abi, contractAddress);

//         const balance = await contract.methods.balanceOf(Owner).call();
//         setNftBalance(parseInt(balance, 10));
//       } catch (error) {
//         console.error("Failed to fetch NFT balance:", error);
//         setNftBalance(null);
//       }
//     };

//     fetchNftBalance();
//   }, [Owner, contractAddress]);

//   useEffect(() => {
//     const fetchTokenIds = async () => {
//       try {
//         if (!Owner || !contractAddress) {
//           return;
//         }

//         const web3 = new Web3(window.ethereum);
//         const contract = new web3.eth.Contract(abi, contractAddress);
//         const tokenIds = await contract.methods.tokensOfOwner(Owner).call();
//         setTokenIds(tokenIds.map(id => id.toString()));
//       } catch (error) {
//         console.error("Failed to fetch token IDs:", error);
//         setTokenIds([]);
//       }
//     };

//     fetchTokenIds();
//   }, [Owner, contractAddress]);



//   return (
//     <div className="box">
//        <h1>NFT Airdrop App</h1>
//        <h3>Remaining NFTs: {nftBalance}</h3>
//        <div className="heder">
//        <div>Connect your wallet</div>
//         <button onClick={connectWallet} className="btn-1">
//           Connect
//          </button>
//   </div>
//   {currentAccount && (
//         <div className="data">
//           <p>Wallet Address: {currentAccount}</p>
//           <p>
//             Wallet Balance: {balance} ({network && `${network}`})
//           </p>
//           <p>Wallet Network: {network}</p>
//         </div>
//       )}
//        <div className="form-main">
//        <div className="form">
//        <input
//             type="text"
//             value={contractAddress}
//             onChange={(e) => setContractAddress(e.target.value)}
//             disabled
//           />
//           <input
//             type="text"
//             value={sendToAddress}
//             placeholder="Enter Your Wallet Address"
//             onChange={(e) => setSendToAddress(e.target.value)}
//           />
//           <button onClick={performNftAirdrop}>Claim NFT</button>
//           {transactionHash && (
//             <p>Transaction Hash: <br/>{transactionHash}</p>
//           )}
//            <p>Your Token IDs:</p>
//            <ul>
//              {tokenIds.map((id, index) => (
//               <li key={index}>{id}</li>
//             ))}
//           </ul>
//        </div>
//        </div>
// </div>

//   );
// }

// export default App;



// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import {abi} from "./ABI"
// function App() {
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [balance, setBalance] = useState(null);
//   const [network, setNetwork] = useState(null);
//   const [sendToAddress, setSendToAddress] = useState("");
//   const [contractAddress, setContractAddress] = useState("0xF2eFEAAe7F7665F04d6A34a6021495aDA6DC95A5");
//   const [nftBalance, setNftBalance] = useState(null);
//   const [tokenIds, setTokenIds] = useState([]);
//   const [transactionHash, setTransactionHash] = useState(null);

//   const PRIVATE_KEY = "37665e889eae27f25dd02cf761866daf5d3bbb499e4612193880ed6f405898df"; 
//   const Owner = "0x04c0c408ac99ae55c0130cb913ff6466b800d4b1";
//     useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("chainChanged", handleChainChanged);
//       window.ethereum.on("accountsChanged", handleAccountsChanged);
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener("chainChanged", handleChainChanged);
//         window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
//       }
//     };
//   }, []);

 

//   const handleChainChanged = async () => {
//     const web3 = new Web3(window.ethereum);
//     const networkId = Number(await web3.eth.net.getId());
//     const networkName = getNetworkName(networkId);
//     setNetwork(networkName);

//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length > 0) {
//       setCurrentAccount(accounts[0]);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//     } else {
//       setCurrentAccount(null);
//       setBalance(null);
//       setNetwork(null);
//     }
//   };

//   const handleAccountsChanged = async () => {
//     const web3 = new Web3(window.ethereum);
//     const accounts = await web3.eth.getAccounts();
//     if (accounts.length > 0) {
//       setCurrentAccount(accounts[0]);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//     } else {
//       setCurrentAccount(null);
//       setBalance(null);
//       setNetwork(null);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);

//       const web3 = new Web3(window.ethereum);
//       const balanceWei = await web3.eth.getBalance(accounts[0]);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);

//       const networkId = Number(await web3.eth.net.getId());
//       setNetwork(getNetworkName(networkId));
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while connecting to the wallet");
//     }
//   };

//   const getNetworkName = (networkId) => {
//     switch (networkId) {
//       case 713715:
//         return "SEI DEV"
//       default:
//         return "Unknown";
//     }
//   };

//   const performNftAirdrop = async () => {
//     try {
//       if (!contractAddress || !currentAccount) {
//         alert("Please enter contract address and recipient address.");
//         return;
//       }

//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(abi, contractAddress);

//       // Fetch token IDs owned by the current user
//       const tokenIds = await contract.methods.tokensOfOwner(Owner).call();
//       if (tokenIds.length === 0) {
//         alert("You do not own any tokens to airdrop.");
//         return;
//       }

//       const recipientTokenIds = await contract.methods.tokensOfOwner(currentAccount).call();
//       if (recipientTokenIds.length > 0) {
//           alert("Recipient has already received an NFT airdrop.");
//           return;
//       }


//       const gas = await contract.methods
//         .transferFirstTokens(Owner, currentAccount)
//         .estimateGas({ from: Owner });

//       const gasPrice = await web3.eth.getGasPrice();

//       const tx = {
//         from:Owner,
//         to: contractAddress,
//         gas: gas,
//         gasPrice: gasPrice,
//         data: contract.methods.transferFirstTokens(Owner, currentAccount).encodeABI(),
//       };

//       const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

//       const receipt = await web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction
//       );

//       const updatedNftBalance = await contract.methods.balanceOf(Owner).call();
//       setNftBalance(parseInt(updatedNftBalance, 10));

//       const token = await contract.methods.tokensOfOwner(Owner).call();
//       setTokenIds(token.map(id => id.toString()));

//       setTransactionHash(receipt.transactionHash);
//       alert("NFT Airdrop successful!");
//     } catch (error) {
//       console.error("Failed to perform NFT Airdrop:", error);
//       alert("Failed to perform NFT Airdrop.");
//     }
//   };

//   useEffect(() => {
//     const fetchNftBalance = async () => {
//       try {
//         if (!Owner || !contractAddress) {
//           return;
//         }

//         const web3 = new Web3(window.ethereum);
//         const contract = new web3.eth.Contract(abi, contractAddress);

//         const balance = await contract.methods.balanceOf(Owner).call();
//         setNftBalance(parseInt(balance, 10));
//       } catch (error) {
//         console.error("Failed to fetch NFT balance:", error);
//         setNftBalance(null);
//       }
//     };

//     fetchNftBalance();
//   }, [Owner, contractAddress]);

//   useEffect(() => {
//     const fetchTokenIds = async () => {
//       try {
//         if (!Owner || !contractAddress) {
//           return;
//         }

//         const web3 = new Web3(window.ethereum);
//         const contract = new web3.eth.Contract(abi, contractAddress);
//         const tokenIds = await contract.methods.tokensOfOwner(Owner).call();
//         setTokenIds(tokenIds.map(id => id.toString()));
//       } catch (error) {
//         console.error("Failed to fetch token IDs:", error);
//         setTokenIds([]);
//       }
//     };

//     fetchTokenIds();
//   }, [Owner, contractAddress]);



//   return (
//     <div className="box">
//        <h1>NFT Airdrop App</h1>
//        <h3>Remaining NFTs: {nftBalance}</h3>
//        <div className="heder">
//        <div>Connect your wallet</div>
//         <button onClick={connectWallet} className="btn-1">
//           Connect
//          </button>
//   </div>
//   {currentAccount && (
//         <div className="data">
//           <p>Wallet Address: {currentAccount}</p>
//           <p>Wallet Network: {network}</p>
//         </div>
//       )}
//        <div className="form-main">
//        <div className="form">
//        <input
//             type="text"
//             value={contractAddress}
//             onChange={(e) => setContractAddress(e.target.value)}
//             disabled
//           />
//           <input
//             type="text"
//             value={currentAccount}
//             placeholder="Enter Your Wallet Address"
//             onChange={(e) => setCurrentAccount(e.target.value)}
//           />
//           <button onClick={performNftAirdrop}>Claim NFT</button>
//           {transactionHash && (
//             <p>Transaction Hash: <br/>{transactionHash}</p>
//           )}
//        </div>
//        </div>
// </div>

//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {abi} from "./ABI"
function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [sendToAddress, setSendToAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("0xb9Ea33a4A26230b7acaE8e7e532A49564b5d6e0b");
  const [nftBalance, setNftBalance] = useState(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [transactionHash, setTransactionHash] = useState(null);

  const PRIVATE_KEY = "7b55bcf1bfb498097a4cbc506d42846c3292df834154d6f535890b94dfea1345"; 
  const Owner = "0xD362Baf658f4ED0E9F616fd5d3BD960b12a916Dd";
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
  }, []);

 

  const handleChainChanged = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = Number(await web3.eth.net.getId());
    const networkName = getNetworkName(networkId);
    setNetwork(networkName);

    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
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

  const handleAccountsChanged = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
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
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);

      const web3 = new Web3(window.ethereum);
      const balanceWei = await web3.eth.getBalance(accounts[0]);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceEth);

      const networkId = Number(await web3.eth.net.getId());
      setNetwork(getNetworkName(networkId));
    } catch (error) {
      console.error(error);
      alert("An error occurred while connecting to the wallet");
    }
  };

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case 713715:
        return "SEI DEV"
      default:
        return "Unknown";
    }
  };

  const performNftAirdrop = async () => {
    try {
      if (!contractAddress || !currentAccount) {
        alert("Please enter contract address and recipient address.");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, contractAddress);

      // Fetch token IDs owned by the current user
      const tokenIds = await contract.methods.tokensOfOwner(Owner).call();
      if (tokenIds.length === 0) {
        alert("You do not own any tokens to airdrop.");
        return;
      }

      const recipientTokenIds = await contract.methods.tokensOfOwner(currentAccount).call();
      if (recipientTokenIds.length > 0) {
          alert("Recipient has already received an NFT airdrop.");
          return;
      }


      const gas = await contract.methods
        .transferFirstTokens(Owner, currentAccount)
        .estimateGas({ from: Owner });

      const gasPrice = await web3.eth.getGasPrice();

      const tx = {
        from:Owner,
        to: contractAddress,
        gas: gas,
        gasPrice: gasPrice,
        data: contract.methods.transferFirstTokens(Owner, currentAccount).encodeABI(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      const updatedNftBalance = await contract.methods.balanceOf(Owner).call();
      setNftBalance(parseInt(updatedNftBalance, 10));

      const token = await contract.methods.tokensOfOwner(Owner).call();
      setTokenIds(token.map(id => id.toString()));

      setTransactionHash(receipt.transactionHash);
      alert("NFT Airdrop successful!");
    } catch (error) {
      console.error("Failed to perform NFT Airdrop:", error);
      alert("Failed to perform NFT Airdrop.");
    }
  };

  useEffect(() => {
    const fetchNftBalance = async () => {
      try {
        if (!Owner || !contractAddress) {
          return;
        }

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const balance = await contract.methods.balanceOf(Owner).call();
        setNftBalance(parseInt(balance, 10));
      } catch (error) {
        console.error("Failed to fetch NFT balance:", error);
        setNftBalance(null);
      }
    };

    fetchNftBalance();
  }, [Owner, contractAddress]);

  useEffect(() => {
    const fetchTokenIds = async () => {
      try {
        if (!Owner || !contractAddress) {
          return;
        }

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, contractAddress);
        const tokenIds = await contract.methods.tokensOfOwner(Owner).call();
        setTokenIds(tokenIds.map(id => id.toString()));
      } catch (error) {
        console.error("Failed to fetch token IDs:", error);
        setTokenIds([]);
      }
    };

    fetchTokenIds();
  }, [Owner, contractAddress]);



  return (
    <div className="box">
       <h1>NFT Airdrop App</h1>
       <h3>Remaining NFTs: {nftBalance}</h3>
       <div className="heder">
       <div>Connect your wallet</div>
        <button onClick={connectWallet} className="btn-1">
          Connect
         </button>
  </div>
  {currentAccount && (
        <div className="data">
          <p>Wallet Address: {currentAccount}</p>
          <p>Wallet Network: {network}</p>
        </div>
      )}
       <div className="form-main">
       <div className="form">
       <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            disabled
          />
          <input
            type="text"
            value={currentAccount}
            placeholder="Enter Your Wallet Address"
            onChange={(e) => setCurrentAccount(e.target.value)}
          />
          <button onClick={performNftAirdrop}>Claim NFT</button>
          {transactionHash && (
            <p>Transaction Hash: <br/>{transactionHash}</p>
          )}
       </div>
       </div>
</div>

  );
}

export default App;