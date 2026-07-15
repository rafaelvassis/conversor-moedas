import type { ExchangeRateResponse } from "../../types/ExchangeRate";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import "./ResultCard.css";

type ResultCardProps = {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  exchangeRate: ExchangeRateResponse | null;
};

export default function ResultCard({
  amount,
  sourceCurrency,
  targetCurrency,
  exchangeRate,
}: ResultCardProps) {
  if (!exchangeRate) {
    return (
      <div className="card__container">
        Nenhuma conversão realizada. Preencha os dados acima e clique em
        Converter.
      </div>
    );
  }
  const convertedAmount = amount * exchangeRate.rate;

  return (
    <div className="card__container">
      <div>
        <p className="label__output">Valor original</p>
        <p className="text__output">{formatCurrency(amount, sourceCurrency)}</p>
      </div>
      <div>
        <p className="label__output">Valor Convertido</p>
        <p className="text__output">
          {formatCurrency(convertedAmount, targetCurrency)}
        </p>
      </div>
      <div>
        <p className="label__output">Data da consulta</p>
        <p className="text__output">{formatDate(exchangeRate.date)}</p>
      </div>
    </div>
  );
}
