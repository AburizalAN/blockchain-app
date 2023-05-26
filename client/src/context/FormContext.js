"use client";

import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import abi from "../utils/SimpleForm.json";
import moment from "moment/moment";

export const FormContext = createContext();

const formContractAddress = process.env.NEXT_PUBLIC_FORM_CONTRACT_ADDRESS;
const contractABI = abi.abi;

let ethereum = undefined;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  ethereum = window.ethereum;
};

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const formContract = new ethers.Contract(
    formContractAddress,
    contractABI,
    signer
  );

  return formContract;
};

export const withFormContext = (Component) => (props) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    name: "test",
    birthdate: "",
    number: 0,
    desc: "",
  });
  const [loading, setLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        getFormValues();
      } else {
        console.log("No accounts found");
        alert("No Account found");
      };
    } catch (err) {
      console.log(err)
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

  const getFormValues = async () => {
    const formContract = getEthereumContract();
    const data = await formContract.getData();
    const cleanData = {
      name: data.name,
      birthdate: data.birthdate,
      number: data.number,
      desc: data.desc,
    }
    setFormData(cleanData);
  }

  const sendData = async () => {
    try {
      setLoading(true);
      const { name, birthdate, number, desc } = formData;
      const formContract = getEthereumContract();
      const transactionHash = await formContract.setData(name, birthdate, number, desc);
      console.log(`loading = ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      window.location.reload();
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <FormContext.Provider value={{ currentAccount, connectWallet, formData, setFormData, sendData, loading }}>
      <Component {...props} />
    </FormContext.Provider>
  )
}