import { useState } from "react";
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
  onConvert: () => Promise<void>;
};

export default function ConverterForm({
  amount,
  sourceCurrency,
  targetCurrency,
  onAmountChange,
  onSourceCurrencyChange,
  onTargetCurrencyChange,
  onSwapCurrencies,
  onConvert,
}: ConverterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConvert(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onConvert();
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
