"use client";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const Input = ({ placeholder, name, type, handleChange, value }) => (
  <input
    className="text-gray-300 my-2 w-full bg-transparent rounded-md px-2.5 py-2 outline-none border-none white-glassmorphism text-sm"
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Home = () => {
  const connectWallet = () => {};
  const handleSubmit = () => {};
  return (
    <main className="gradient-bg-welcome">
      <div className="flex flex-row mx-auto max-w-7xl py-24 px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrency easily on
            KRIPTO
          </p>
          <button
            className="flex flex-row justify-center items-center rounded-full p-2.5 my-5 bg-blue-500 hover:bg-blue-600 w-100 transition-all"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full">
          <div className="flex flex-col p-3 items-start rounded-xl h-40 w-full md:w-72 eth-card white-glassmorphism">
            <div className="flex justify-between w-full flex-1">
              <div className="flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
                <SiEthereum fontSize={21} color="#fff" />
              </div>
              <BsInfoCircle fontSize={17} color="#fff" />
            </div>
            <p className="font-light text-sm">
              address: x000000....
            </p>
            <p className="font-semibold text-lg">
              Ethereum
            </p>
          </div>
          <div className="sm:w-96 w-full mt-5 p-5 flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={() => {}} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={() => {}} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={() => {}} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={() => {}} />
            <div className="h-[1px] w-full bg-gray-700 mt-2"></div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-4 border-[1px] border-gray-600 p-2 rounded-full"
            >
              Send Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
