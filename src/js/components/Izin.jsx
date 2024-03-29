import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";


const Izin = () => {

  const navigate = useNavigate();
  let location = useLocation();
  const emp = location.state?.data;
  console.log(emp);

  const returnHomePage = () => {
    navigate("/");
  }

  const returnBack = () => {
    navigate(-1);
  }

  const [paramData, setParamdata] = useState();

  useEffect(() => {
    fetch(`https://berkom-hr.com/applications/apiparam.php`)
        .then(result => result.json())
        .then(data => setParamdata(JSON.parse(data.kadro)))
  }, []);

  const method = emp.gds ? "güncelle":"ekle";

  const [bas, setBas] = useState(emp.gds);
  const [bit, setBit] = useState(emp.dns);
  const [sure, setSure] = useState(emp.day);
  const [exp, setExp] = useState(emp.aciklama);
  const [tip, setTip] = useState(emp.neden);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://berkom-hr.com/applications/apitumizin.php", {
        method: "POST",
        body: JSON.stringify({
          sicil: emp.sicil,
          gds: bas,
          dns: bit,
          sure: sure,
          neden: tip,
          aciklama: exp,
          method: method,
          dgrid: emp.dgrId,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        returnBack();
      }
    } catch (err) {
      console.log(err);
    }

  };

    return (
    <>
    <div>
      <div className='my-3'>
        <h5>{ `İzin Kaydı - ${emp.ad} ${emp.soyad}` }</h5>
      </div>
      <div className='my-2'>
        <button className='btn btn-secondary me-2' onClick={() => navigate("/")}><i className="bi bi-chevron-left"></i></button> 
      </div>          
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className='w-50'>
            <select className="form-select" value={tip} onChange={(e) => setTip(e.target.value)}>
              {method=="ekle" && <option className="dropdown-item" value=''>İzin türü seçiniz</option>}
              <option className="dropdown-item" value='yillik'>Yıllık İzin</option>
              <option className="dropdown-item" value='mazeret'>Mazeret İzni</option>
              <option className="dropdown-item" value='ucretsiz'>Ücretsiz İzin</option>
              <option className="dropdown-item" value='dogum'>Doğum İzni</option>
              <option className="dropdown-item" value='hastalik'>Hastalık İzni</option>
              <option className="dropdown-item" value='diger'>Diğer İzin</option>
              {/*paramData && Object.entries(paramData.izintur).map(([key,value]) => 
              <option className="dropdown-item" key={key} value={key}>{value}</option>
              )*/}
            </select>
            <div className="mb-3">
              <label className="form-label">Gidiş Tarihi</label>
              <input type="date" className="form-control" value={bas} onChange={(e) => setBas(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Dönüş Tarihi</label>
              <input type="date" className="form-control" value={bit} onChange={(e) => setBit(e.target.value)}/>
            </div>  
            <div className="mb-3">
              <label className="form-label">İzin Süresi</label>
              <input type="text" className="form-control" value={sure} onChange={(e) => setSure(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Açıklama</label>
              <input type="text" className="form-control" value={exp} onChange={(e) => setExp(e.target.value)}/>
            </div> 
        </div>
        <div className='mt-5'>
        <button type="submit" className='btn btn-secondary me-2'>{method}</button><button className='btn btn-outline-secondary' onClick={() => navigate("/")}>iptal</button>
        </div>
      </form>
    </div>
    </>
    )
  }
  
  export default Izin;