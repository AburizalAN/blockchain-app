"use client";

import { useState, useEffect, createContext, useCallback } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import { ethers } from "ethers";

export const TransactionContext = createContext();

let ethereum = undefined;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  ethereum = window.ethereum;
};

export const withTransactionContext = (Component) => (props) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

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

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
      console.log(accounts);
    } catch (err) {
      console.log(err)
      throw new Error("No ethereum object.")
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
      if (!ethereum) return alert("Please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000
          value: parsedAmount._hex, 
        }]
      })
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
      <Component {...props} />
    </TransactionContext.Provider>
  );
};
