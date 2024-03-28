import React, { useCallback, useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate } from "react-router-dom";


export default function Personel() {

  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location);

  const person = location?.state.data;
  
  const method = person ? "güncelle":"ekle";

  const [paramData, setParamdata] = useState();

  useEffect(() => {
    fetch(`https://berkom-hr.com/applications/apiparam.php`)
        .then(result => result.json())
        .then(data => setParamdata(JSON.parse(data.kadro)))
  }, []);
  
  const [id, setId] = useState(person?.sicil);
  const [name, setName] = useState(person?.ad);
  const [surname, setSurname] = useState(person?.soyad);
  const [kadro, setKadro] = useState(person?.kadro);
  const [isyeri, setIsyeri] = useState(person?.isyeri);
  const [dept, setDept] = useState(person?.bolum);
  const [isegrs, setIsegrs] = useState(person?.isegrs);
  const [dgmtrh, setDgmtrh] = useState(person?.dgmtrh);
  const [ref, setRef] = useState(person?.refno);
  const [yil, setYil] = useState(person?.oncekikidem);
  const [gun, setGun] = useState(person?.artakalan);
  const [iscks, setIscks] = useState(person?.iscks);

  console.log(person);

  const returnHomePage = () => {
    navigate("/");
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://berkom-hr.com/applications/apipers.php", {
        method: "POST",
        body: JSON.stringify({
          sicil: id,
          ad: name,
          soyad: surname,
          bolum: dept,
          kadro: kadro,
          isyeri: isyeri,
          isegrs: isegrs,
          dgmtrh: dgmtrh,
          refno: ref,
          oncekikidem: yil,
          artakalan: gun,
          iscks: iscks,
          method: method,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log(resJson);
        returnHomePage();
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
    <div className='container-fluid my-3'>
      <div>
        <h5>{method=="güncelle" ? `${id} - ${name} ${surname}` : "Personel Ekle"}</h5>
      </div>
      <div className='my-2'>
        <button className='btn btn-secondary me-2' onClick={() => navigate("/")}><i className="bi bi-chevron-left"></i></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='row gx-5'>
          <div className='box-container col-8'>
            <div className='box p-3 border rounded-1'>
              <div className="mb-3">
                <label className="form-label">Ad</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Soyad</label>
                <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} />
              </div>  
              <div className="mb-3">
                <label className="form-label">İşe Giriş Tarihi</label>
                <input type="date" className="form-control"  value={isegrs} onChange={(e) => setIsegrs(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Doğum Tarihi</label>
                <input type="date" className="form-control"  value={dgmtrh} onChange={(e) => setDgmtrh(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Ref-No</label>
                <input type="text" className="form-control"  value={ref} onChange={(e) => setRef(e.target.value)} />
              </div> 
            </div>
            <div className='box p-3 border rounded-1 mt-5'>
              <div className="row mb-3">
                <div className='col-6'>
                  <label className="form-label"></label>
                  <input type="text" readOnly className="form-control-plaintext" value="Önceki Hizmet Süresi" />
                </div>
                <div className='col-3'>
                  <label className="form-label">Yıl</label>
                  <input type="text" className="form-control text-end" value={yil} onChange={(e) => setYil(e.target.value)} />
                </div>
                <div className='col-3'>
                < label className="form-label">Gün</label>
                  <input type="text" className="form-control text-end" value={gun} onChange={(e) => setGun(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-4 box-container'>
            <div className='box p-3 border rounded-1'>
              <div className="mb-3">
                <label className="form-label">Kurum</label>
                <select className="form-select" value={kadro} onChange={(e) => setKadro(e.target.value)}>
                  {method=="ekle" && <option value=''>Kurum seçiniz</option>}
                  {paramData && paramData.kadro.map((item) =>
                  <option key={item} value={item}>{item}</option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Bölüm</label>
                <select className="form-select" value={dept} onChange={(e) => setDept(e.target.value)}>
                  {method=="ekle" && <option value=''>Bölüm seçiniz</option>}
                  {paramData && paramData.bolum.map((item) =>
                  <option key={item} value={item}>{item}</option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">İşyeri</label>
                <select className="form-select" value={isyeri} onChange={(e) => setIsyeri(e.target.value)}>
                  {method=="ekle" && <option value=''>İşyeri seçiniz</option>}
                  {paramData && paramData.isyeri.map((item) =>
                  <option key={item} value={item}>{item}</option>
                  )}
                </select>
              </div>
            </div>
            {method=="güncelle" && 
            <div className='box p-3 border rounded-1 mt-5'>
              <div className="mb-3">
                <label className="form-label">İşten Çıkış Tarihi</label>
                <input type="date" className="form-control"  value={iscks} onChange={(e) => setIscks(e.target.value)} />
              </div>
            </div>
            }
          </div>
        </div>
        <div className='mt-5'>
        <button type="submit" className='btn btn-secondary me-2'>{method}</button><button className='btn btn-outline-secondary' onClick={returnHomePage}>iptal</button>
        </div>
      </form>
    </div>
    </>
  );
}