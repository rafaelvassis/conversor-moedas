import "./ConverterForm.css";

export default function ConverterForm() {
  return (
    <form>
      <div className="form__row">
        <label htmlFor="Source-Amount">Valor</label>
        <input
          type="number"
          min="0"
          step="0.01"
          id="Source-Amount"
          name="Source-Amount"
        />
      </div>
      <div className="form__row">
        <label htmlFor="Base-Currency">De: </label>
        <select>
          <option>USD</option>
          <option>BRL</option>
          <option>EUR</option>
        </select>
      </div>
      <div className="form__row">
        <label htmlFor="Quote-Currency">Para: </label>
        <select>
          <option>USD</option>
          <option>BRL</option>
          <option>EUR</option>
        </select>
      </div>
      <button>Converter</button>
    </form>
  );
}
