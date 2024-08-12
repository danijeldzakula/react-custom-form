// eslint-disable-next-line react/prop-types
function TemperatureInput({ temperature, scale, onTemperatureChange }) {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

  function handleChange(e) {
    onTemperatureChange(e.target.value);
  }

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
}

export default TemperatureInput;
