import { useState } from "react";

export default function DeepCopyBlock() {
  const [data, setData] = useState({ name: 'Danijel' });

  const onClick = () => {
    const newData = JSON.parse(JSON.stringify(data));
    console.log("🚀 ~ onClick ~ newData:", newData);

    newData.name = 'Dzakula';
    console.log("🚀 ~ onClick ~ newData:", newData);
    
    setData(newData);
  };

  return (
    <div>
      <h3>Deep Copy - {data.name}</h3>
      <button type="button" onClick={onClick} className="btn btn-primary">Change Deep Copy Data</button>
    </div>
  );
}
