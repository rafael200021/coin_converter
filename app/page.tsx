"use client";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { currencies } from "./helpers/constants";
import axios from "axios";
import { API_KEY } from "./helpers/keys";

export default function Home() {
  const [currentCurrency, setCurrentCurrency] = useState("");
  const [currentCurrencyValue, setCurrentCurrencyValue] = useState("");
  const [futureCurrency, setFutureCurrency] = useState("");
  const [futureCurrencyValue, setFutureCurrencyValue] = useState("");

  const convert = async () => {
    try {
      const res = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${futureCurrency}&base_currency=${currentCurrency}`
      );

      console.log(res);
      const currency = Number(res.data.data[futureCurrency]);
      setFutureCurrencyValue(
        (currency * Number(currentCurrencyValue)).toFixed(2).toString()
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center  flex-col h-screen">
      <h1 className="text-4xl font-extrabold">
        Coin <span className="text-blue-500">Converter</span>
      </h1>
      <div className="flex items-center gap-4">
        <div className="mt-10 flex flex-col gap-4">
          <input
            className="bg-gray-200 p-2 rounded"
            type="text"
            placeholder="Valor"
            value={currentCurrencyValue}
            onChange={(e) => setCurrentCurrencyValue(e.target.value)}
          />
          <select
            className="bg-gray-200 p-2 rounded"
            name="current"
            onChange={(e) => setCurrentCurrency(e.target.value)}
            value={currentCurrency}
            id="current"
          >
            <option value="" disabled >
              Select a currency
            </option>
            {currencies.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <ArrowRightLeft />
        <div className="mt-10 flex flex-col gap-4">
          <input
            className="bg-gray-200 p-2 rounded"
            type="text"
            disabled
            placeholder="Valor"
            value={futureCurrencyValue}
            onChange={(e) => setFutureCurrencyValue(e.target.value)}
          />
          <select
            className="bg-gray-200 p-2 rounded"
            name="current"
            onChange={(e) => setFutureCurrency(e.target.value)}
            value={futureCurrency}
            id="current"
          >
            <option value="" disabled>
              Select a currency
            </option>
            {currencies.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={convert}
        className="mt-10 bg-blue-500 text-white duration-300 font-bold w-40 hover:bg-white hover:text-blue-500 border border-blue-500 p-2 rounded"
      >
        Convert
      </button>
    </div>
  );
}
