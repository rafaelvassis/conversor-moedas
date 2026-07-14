import { useState } from "react";
import { convertCurrency } from "../../services/exchangeApi";
import type { ExchangeRateResponse } from "../../types/ExchangeRate";
import "./ConverterForm.css";

type ConverterFormProps = {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  setAmount: (a: number) => void;
  setSourceCurrency: (s: string) => void;
  setTargetCurrency: (s: string) => void;
  setExchangeRate: (r: ExchangeRateResponse) => void;
  setError: (err: string | null) => void;
  error: string | null;
};

export default function ConverterForm({
  amount,
  setAmount,
  sourceCurrency,
  setSourceCurrency,
  targetCurrency,
  setTargetCurrency,
  setExchangeRate,
  setError,
  error,
}: ConverterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSwapCurrencies(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const currentSource = sourceCurrency;

    setSourceCurrency(targetCurrency);
    setTargetCurrency(currentSource);
  }

  async function handleConvert(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (amount <= 0) {
      return;
    }

    setIsLoading(true);

    try {
      const data: ExchangeRateResponse = await convertCurrency(
        sourceCurrency,
        targetCurrency,
      );

      setExchangeRate(data);
      setError(null);
    } catch {
      console.error(error);
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
          type="number"
          min="0"
          step="0.01"
          id="sourceAmount"
          name="sourceAmount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="converter-form__group">
        <label htmlFor="sourceCurrency">De: </label>
        <select
          id="sourceCurrency"
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <button
        type="button"
        className="converter-form__swap-btn"
        onClick={handleSwapCurrencies}
      >
        ⇅
      </button>

      <div className="converter-form__group">
        <label htmlFor="targetCurrency">Para: </label>
        <select
          id="targetCurrency"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <button type="submit" className="converter-form__submit-btn">
        Converter
      </button>
    </form>
  );
}
