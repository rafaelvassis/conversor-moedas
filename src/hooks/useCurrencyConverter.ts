import { useEffect, useState } from "react";
import type { ExchangeRateResponse } from "../types/ExchangeRate";
import type { Currency } from "../types/Currency";
import { convertCurrency, getCurrencies } from "../services/exchangeApi";

export function useCurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("BRL");
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const data = await getCurrencies();
        const sortedCurrencies = [...data].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setCurrencies(sortedCurrencies);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar a lista de moedas.");
      }
    }

    loadCurrencies();
  }, [setError]);

  function handleAmountChange(value: number) {
    setAmount(value);
    setExchangeRate(null);
    setError(null);
  }

  function handleSourceCurrencyChange(currency: string) {
    setSourceCurrency(currency);
    setExchangeRate(null);
    setError(null);
  }

  function handleTargetCurrencyChange(currency: string) {
    setTargetCurrency(currency);
    setExchangeRate(null);
    setError(null);
  }

  function handleSwapCurrencies() {
    setSourceCurrency((current) => {
      setTargetCurrency(current);
      return targetCurrency;
    });

    setExchangeRate(null);
    setError(null);
  }

  async function handleConvert() {
    setError(null);
    setExchangeRate(null);

    if (amount <= 0) {
      setError("Informe um valor válido.");
      return;
    }

    if (sourceCurrency === targetCurrency) {
      setError("Selecione moedas diferentes para converter.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await convertCurrency(sourceCurrency, targetCurrency);
      setExchangeRate(data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível obter a cotação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    amount,
    sourceCurrency,
    targetCurrency,
    exchangeRate,
    error,
    isLoading,
    currencies,

    handleAmountChange,
    handleSourceCurrencyChange,
    handleTargetCurrencyChange,
    handleSwapCurrencies,
    handleConvert,
  };
}
