import "./ResultCard.css";

export default function ResultCard() {
  return (
    <div className="card__container">
      <div>
        <p className="label__output">Valor original</p>
        <p className="text__output">USD 2000.00</p>
      </div>
      <div>
        <p className="label__output">Valor Convertido</p>
        <p className="text__output">USD 2000.00</p>
      </div>
      <div>
        <p className="label__output">Data</p>
        <p className="text__output">xx/xx/xxxx</p>
      </div>
    </div>
  );
}
