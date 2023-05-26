"use client";

import { useContext, useEffect } from "react";
import { FormContext, withFormContext } from "@/src/context/FormContext";
import dynamic from "next/dynamic";
const ClipLoader = dynamic(() => import("react-spinners/ClipLoader"), {ssr: false});


const Input = ({ placeholder, name, type, handleChange, value, id }) => (
  <input
    className="mb-4 last:mb-0 w-full rounded-md px-4 py-3 white-glassmorphism outline-none bg-transparent text-white border-none text-sm"
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    id={id}
  />
);

const Textarea = ({ placeholder, name, handleChange, value, rows, id }) => (
  <textarea
    className="mb-4 last:mb-0 w-full rounded-md px-4 py-3 white-glassmorphism outline-none bg-transparent text-white border-none text-sm"
    placeholder={placeholder}
    onChange={(e) => handleChange(e)}
    rows={rows}
    id={id}
    value={value}
  >
  </textarea>
);

const Form = () => {
  const { currentAccount, connectWallet, formData, sendData, loading, setFormData } = useContext(FormContext);

  return (
    <main className="gradient-bg-2 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        {currentAccount ? (
          <div className="p-5 rounded-lg white-glassmorphism">
            <Input
              placeholder="Nama"
              name="name"
              type="text"
              handleChange={(e) => setFormData((prev) => ({
                ...prev,
                name: e.target.value
              }))}
              value={formData.name}
              id="name"
            />
            <Input
              placeholder="tanggal lahir"
              name="birthdate"
              type="date"
              handleChange={(e) => setFormData((prev) => ({ ...prev, birthdate: e.target.value }))}
              value={formData.birthdate}
              id="date"
            />
            <Input
              placeholder="Masukkan angka"
              name="number"
              type="number"
              handleChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
              value={formData.number}
              id="number"
            />
            <Textarea
              placeholder="About me"
              name="desc"
              handleChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
              value={formData.desc}
              rows={4}
              id="desc"
            />
            <button
              className=" w-full flex flex-row gap-x-4 justify-center items-center rounded-full p-2.5 my-5 bg-blue-500 hover:bg-blue-600 w-100 transition-all"
              onClick={sendData}
            >
              {loading ? <ClipLoader color="white" size={20} /> : null}
                <span>Send Data</span>
            </button>
          </div>
        ) : (
          <button
            className=" w-full flex flex-row justify-center items-center rounded-full p-2.5 my-5 bg-blue-500 hover:bg-blue-600 w-100 transition-all"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </main>
  );
};

export default withFormContext(Form);
