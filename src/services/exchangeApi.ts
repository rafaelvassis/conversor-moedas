import type { ExchangeRateResponse } from "../types/ExchangeRate";

/* Consulta a API Frankfurter e retorna a conversão.*/

export const convertCurrency = async (
  sourceCurrency: string,
  targetCurrency: string,
): Promise<ExchangeRateResponse> => {
  const url = `https://api.frankfurter.dev/v2/rate/${sourceCurrency}/${targetCurrency}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao buscar dados de câmbio da API.");
  }

  const data: ExchangeRateResponse = await response.json();

  return data;
};
