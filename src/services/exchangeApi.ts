import type { FrankfurterResponse } from "../types/ExchangeRate";

/* Consulta a API Frankfurter e retorna os dados da conversão.*/

export const convertCurrency = async (
  sourceCurrency: string,
  targetCurrency: string,
  amount: number,
): Promise<FrankfurterResponse> => {
  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao buscar dados de câmbio da API.");
  }

  const data: FrankfurterResponse = await response.json();

  return data;
};
