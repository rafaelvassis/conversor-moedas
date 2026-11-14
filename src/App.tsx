import ConverterForm from "./components/ConverterForm/ConverterForm";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ResultCard from "./components/ResultCard/ResultCard";
import FeedbackMessage from "./components/FeedbackMessage/FeedbackMessage";
import { useCurrencyConverter } from "./hooks/useCurrencyConverter";
import "./App.css"

function App() {
  const {
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
  } = useCurrencyConverter();

  return (
    <div className="app">
      <Header />
      <ConverterForm
        amount={amount}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        isLoading={isLoading}
        onAmountChange={handleAmountChange}
        onSourceCurrencyChange={handleSourceCurrencyChange}
        onTargetCurrencyChange={handleTargetCurrencyChange}
        onSwapCurrencies={handleSwapCurrencies}
        onConvert={handleConvert}
        currencies={currencies}
      />
      {error && <FeedbackMessage message={error} />}
      <ResultCard
        amount={Number(amount)}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        exchangeRate={exchangeRate}
      />
      <Footer />
    </div>
  );
}

export default App;
