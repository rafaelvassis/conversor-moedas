import { useState } from "react";
import { convertCurrency } from "../../services/exchangeApi";
import type { ExchangeRateResponse } from "../../types/ExchangeRate";
import "./ConverterForm.css";
import { currencies } from "../../data/currencies";

type ConverterFormProps = {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;

  onAmountChange: (value: number) => void;
  onSourceCurrencyChange: (currency: string) => void;
  onTargetCurrencyChange: (currency: string) => void;
  onSwapCurrencies: () => void;

  setExchangeRate: (r: ExchangeRateResponse | null) => void;
  setError: (err: string | null) => void;
};

export default function ConverterForm({
  amount,
  sourceCurrency,
  targetCurrency,
  onAmountChange,
  onSourceCurrencyChange,
  onTargetCurrencyChange,
  onSwapCurrencies,
  setExchangeRate,
  setError,
}: ConverterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConvert(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

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
      const data: ExchangeRateResponse = await convertCurrency(
        sourceCurrency,
        targetCurrency,
      );

      setExchangeRate(data);
    } catch (error) {
      console.error(error);
      setExchangeRate(null);
      setError("Não foi possível obter a cotação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="converter-form" onSubmit={handleConvert}>
      <div className="converter-form__group">
        <label htmlFor="sourceAmount">Valor</label>
        <input
          disabled={isLoading}
          type="number"
          min="0"
          step="0.01"
          id="sourceAmount"
          name="sourceAmount"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="converter-form__group">
        <label htmlFor="sourceCurrency">De: </label>
        <select
          disabled={isLoading}
          id="sourceCurrency"
          value={sourceCurrency}
          onChange={(e) => onSourceCurrencyChange(e.target.value)}
        >
          {currencies.map(({ code, name }) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <button
        disabled={isLoading}
        type="button"
        className="converter-form__swap-btn"
        onClick={onSwapCurrencies}
      >
        ⇅
      </button>

      <div className="converter-form__group">
        <label htmlFor="targetCurrency">Para: </label>
        <select
          disabled={isLoading}
          id="targetCurrency"
          value={targetCurrency}
          onChange={(e) => onTargetCurrencyChange(e.target.value)}
        >
          {currencies.map(({ code, name }) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="converter-form__submit-btn"
        disabled={isLoading}
      >
        {isLoading ? "Convertendo..." : "Converter"}
      </button>
    </form>
  );
}
