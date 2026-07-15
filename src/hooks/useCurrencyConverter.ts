import { useState } from "react";
import type { ExchangeRateResponse } from "../types/ExchangeRate";

export function useCurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("BRL");
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  return {
    amount,
    sourceCurrency,
    targetCurrency,
    exchangeRate,
    error,

    setAmount,
    setSourceCurrency,
    setTargetCurrency,
    setExchangeRate,
    setError,
  };
}