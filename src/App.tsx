import { useState } from "react";
import ConverterForm from "./components/ConverterForm/ConverterForm";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ResultCard from "./components/ResultCard/ResultCard";
import type { ExchangeRateResponse } from "./types/ExchangeRate";
import FeedbackMessage from "./components/FeedbackMessage/FeedbackMessage";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("BRL");
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <Header />
      <ConverterForm
        amount={amount}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        onAmountChange={handleAmountChange}
        onSourceCurrencyChange={handleSourceCurrencyChange}
        onTargetCurrencyChange={handleTargetCurrencyChange}
        onSwapCurrencies={handleSwapCurrencies}
        setExchangeRate={setExchangeRate}
        setError={setError}
      />
      {error && <FeedbackMessage message={error} />}
      <ResultCard
        amount={amount}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        exchangeRate={exchangeRate}
      />
      <Footer />
    </>
  );
}

export default App;
