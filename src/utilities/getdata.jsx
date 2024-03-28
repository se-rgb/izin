import React, { useState, useEffect } from 'react';


export default function App() {

  const [paramData, setParamdata] = useState();

  useEffect(() => {
    fetch(`https://berkom-hr.com/applications/apiparam.php`)
        .then(result => result.json())
        .then(data => setParamdata(JSON.parse(data.kadro)))
  }, []);

  return (
    <>
    <ul>
    {paramData && paramData.kadro.map((item,i) => 
      <li key={i}>{item}</li>)}
    </ul>
    <select>
      {paramData && Object.entries(paramData.izintur).map(([key,value]) => 
      <option value={key}>{value}</option>
      )}
    </select>
    </>
  );
}