"use client";

import { useState, useEffect, createContext, useCallback } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import { ethers } from "ethers";

export const TransactionContext = createContext();

let ethereum = undefined;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  ethereum = window.ethereum;
};

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const withTransactionContext = (Component) => (props) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState();
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getAllTransactions = async () => {
    const transactionContract = getEthereumContract();
    const availableTransactions = await transactionContract.getAllTransactions();

    const structuredTransactions = availableTransactions.map((transaction) => ({
      addressTo: transaction.receiver,
      addressFrom: transaction.sender,
      timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
      message: transaction.message,
      keyword: transaction.keyword,
      amount: parseInt(transaction.amount._hex) / (10 ** 18),
    }));
    setTransactions(structuredTransactions);
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
      console.log(accounts);
    } catch (err) {
      console.log(err)
      throw new Error("No ethereum object.");
    }
    
  }

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount()
    
      localStorage.setItem("transactionCount", transactionCount);
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    }
  } 

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    }
  }

  const sendTransaction = async () => {
    try {
      setIsLoading(true);
      if (!ethereum) return alert("Please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 gwei
          value: parsedAmount._hex, 
        }]
      })

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      console.log(`loading = ${transactionHash.hash}`)
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
      window.location.reload();
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTransactionCount(localStorage.getItem("transactionCount"));
  }, [])

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading
      }}
    >
      <Component {...props} />
    </TransactionContext.Provider>
  );
};
