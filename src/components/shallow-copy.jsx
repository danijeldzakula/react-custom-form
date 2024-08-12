import { useState } from "react";

export default function ShallowCopyBlock() {
  const [data, setData] = useState({ name: 'Danijel' });
  
  const onClick = () => {
    const newData = { ...data };
    console.log("🚀 ~ onClick ~ newData:", newData);

    newData.name = 'Dzakula';
    console.log("🚀 ~ onClick ~ newData:", newData);
    
    setData(newData);
  };

  return (
    <div>
      <h3>Shallow Copy - {data.name}</h3>

      <button type="button" onClick={onClick} className="btn btn-primary">Change Shallow Copy Data</button>
    </div>
  )
}