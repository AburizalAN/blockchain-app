"use client";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { withTransactionContext, TransactionContext } from "@/src/context/TransactionContext";
import Services from "@/src/components/Services";
import shortenAddress from "@/src/utils/shortenAddress";
import dynamic from "next/dynamic";

const ClipLoader = dynamic(() => import("react-spinners/ClipLoader"), {ssr: false});

import { useContext } from "react";
import Transactions from "@/src/components/Transactions";

const Input = ({ placeholder, name, type, handleChange, value }) => (
  <input
    className="my-2 w-full rounded-md p-2 white-glassmorphism outline-none bg-transparent text-white border-none text-sm "
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Home = () => {
  const { connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isLoading } =
    useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;

    if (isEmptyValue(addressTo) || isEmptyValue(amount) || isEmptyValue(keyword) || isEmptyValue(message)) return;

    sendTransaction();
  };

  const isEmptyValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().length === 0)
    ) {
      return true;
    }
    return false;
  };

  return (
    <main className="gradient-bg-welcome">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-y-8 py-24">
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Send Crypto <br /> across the world
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Explore the crypto world. Buy and sell cryptocurrency easily on
              KRIPTO
            </p>
            {!currentAccount ? (
              <button
                className="flex flex-row justify-center items-center rounded-full p-2.5 my-5 bg-blue-500 hover:bg-blue-600 w-100 transition-all"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : null}
          </div>
          <div className="flex flex-col flex-1 items-center justify-start w-full">
            <div className="flex flex-col p-3 items-start rounded-xl h-40 w-full md:w-72 eth-card white-glassmorphism">
              <div className="flex justify-between w-full flex-1">
                <div className="flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <p className=" w-full font-light text-sm">
                {shortenAddress(currentAccount)}
              </p>
              <p className="font-semibold text-lg">
                Ethereum
              </p>
            </div>
            <div className="md:w-96 w-full mt-5 p-5 flex flex-col justify-start items-center blue-glassmorphism">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
              <div className="h-[1px] w-full bg-gray-700 mt-2"></div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-4 border-[1px] border-gray-600 p-2 rounded-full flex gap-x-2 items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="white" size={20} /> : null}
                <span>Send Now</span>
              </button>
            </div>
          </div>
        </div>
        <Services />
        <Transactions />
      </div>
    </main>
  );
};

export default withTransactionContext(Home);