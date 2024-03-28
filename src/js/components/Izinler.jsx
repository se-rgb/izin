import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AG_GRID_LOCALE_TR } from '../../assets/locale.tr';


const getValue = () => {
  return '\;';
};

const getParams = () => {
  return {
    columnSeparator: getValue('#columnSeparator'),
  };
};

const valueDuzenle = (p) => {
  switch (p.data.neden) {
    case 'yillik':
      return 'Yıllık İzin';
    break;
    case 'ucretsiz':
      return 'Ücretsiz İzin';
    break;
    case 'hastalik':
      return 'Hastalık İzni';
    break;
    case 'dogum':
      return 'Doğum İzni';
    break;
    case 'mazeret':
      return 'Mazeret İzni';
    break;
    default:
      return 'Diğer İzin';
  }
}

function Izinler() {

  const gridRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const person = location.state?.data;

  const getRowId = useCallback((params) => params.data.dgrId, []);  

  const onBtnExport = useCallback(() => {
    var params = getParams();
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  const UpdateButtonIzin = useCallback ((event) => {
    let emp = {...event.data,...person};
    return (
      <Link to="/izin" state={{ data: emp }} >
        <button className='btn btn-secondary btn-sm'><i className="bi bi-pencil-square"></i></button>
      </Link>
    )
  },[]);

  const DeleteButtonIzin = useCallback ((event) => {
    return (
      <button className='btn btn-secondary btn-sm' onClick={()=>{deleteIzin(event)}}><i className="bi bi-trash3"></i></button>
  )
  },[]);

  const [izinData, setIzinData] = useState({});

  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { valueGetter: valueDuzenle, headerName: 'İzin Türü', filter: 'true', flex: 4 },
    { field: 'gds', headerName: 'Gidiş Tarihi', flex: 4, sort: 'desc', cellRenderer: (params) => { return params ? (new Date(params.value)).toLocaleDateString() : ''; } },
    { field: 'dns', headerName: 'Dönüş Tarihi', flex: 4, cellRenderer: (params) => { return params ? (new Date(params.value)).toLocaleDateString() : ''; } },
    { field: 'day', headerName: 'Süre', flex: 1, cellClass: 'ag-right-aligned-cell' },
    { field: 'aciklama', headerName: 'İzin Açıklaması', flex: 8 },
    { field: '', flex: 1, cellRenderer: UpdateButtonIzin },
    { field: '', flex: 1, cellRenderer: DeleteButtonIzin },
  ]);

  useEffect(() => {
    fetch(`https://berkom-hr.com/applications/apitumizin.php?sicil=${person.sicil}`)
        .then(result => result.json())
        .then(data => {console.log(data);setRowData(data)})
  }, []);

  const deleteIzin = useCallback (async (e) => {
    let res = await fetch("https://berkom-hr.com/applications/apitumizin.php", {
      method: "POST",
      body: JSON.stringify({ dgrid: e.data.dgrId, method:'sil' }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      const selectedData = getRowId(e);
      const rowNode = e.api.getRowNode(selectedData);
      e.api.applyTransaction({ remove: [rowNode.data] })
    }
  },[]);


  return (
    <>
    <div className='container-fluid px-0 h-100'>
      <div className='my-3'>
        <h5>{`İzin Listesi - ${person.ad} ${person.soyad}`}</h5>
      </div>
      <div className='my-2'>
          <Link to='/'><button className='btn btn-secondary me-2'><i className="bi bi-chevron-left"></i></button></Link>
          <Link to='/izin' state={{ data: person }}><button className='btn btn-secondary me-2'><i className="bi bi-plus-circle"></i> İzin ekle </button></Link>
          <button className='btn btn-outline-secondary' onClick={onBtnExport}><i className="bi bi-download"></i> Listeyi İndir </button>
      </div>
      <div className='ag-theme-quartz' style={{ width: '100%', height: '80vh' }} >
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} pagination={true} paginationPageSize={20} getRowId={getRowId} localeText={AG_GRID_LOCALE_TR} />
      </div>
      </div>
    </>
  );
}

export default Izinler;