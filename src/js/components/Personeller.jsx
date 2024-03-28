import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useState, useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import { AG_GRID_LOCALE_TR } from '../../assets/locale.tr';


const getValue = () => {
  return '\;';
};

const getParams = () => {
  return {
    columnSeparator: getValue('#columnSeparator'),
  };
};


export default function Personeller() {

  const gridRef = useRef(null);

  const onBtnExport = useCallback(() => {
    var params = getParams();
    gridRef.current.api.exportDataAsCsv(params);
    const filterModel = gridRef.current.api.getFilterModel();
    const filter = {kadro: filterModel.kadro.filter, bolum: filterModel.bolum.filter}
    console.log(filter)
  }, []);

  const UpdateButtonPerson = (e) => {
    return (
      <Link to="/person" state={{ data: e.data }} >
        <button className='btn btn-secondary btn-sm'><i className="bi bi-pencil-square"></i></button>
      </Link>
    )
  };

  const ListButtonIzin = (e) => {
    return (
      <Link to="/izinler" state={{ data: e.data }} >
        <button className='btn btn-secondary btn-sm'><i className="bi bi-list-columns-reverse"></i></button>
      </Link>
    )
  };

  const AddButtonIzin = (e) => {
    return (
      <Link to="/izin" state={{ data: e.data }} >
        <button className='btn btn-secondary btn-sm'><i className="bi bi-clipboard-plus"></i></button>
      </Link>
    )
  };

  const AddButtonSaatIzin = (e) => {
    return (
      <Link to="/izin" state={{ data: e.data }} >
        <button className='btn btn-secondary btn-sm'><i className="bi bi-clock"></i></button>
      </Link>
    )
  };

  const ReportButtonIzin = (event) => {
    return (
      <Link to="/rapor" state={{ data: event.data }} >
        <button className='btn btn-secondary btn-sm'><i className="bi bi-window"></i></button>
      </Link>
    )
  };

  const [rowData, setRowData] = useState();

  const [colDefs, setColDefs] = useState([
    { field: 'sicil', flex:2, filter: true },
    { field: 'ad', flex:4 },
    { field: 'soyad', flex:4 },
    { field: 'kadro', flex:3, filter: true },
    { headerName: 'Bölüm', field: 'bolum', flex:3, filter: true },
    { headerName: 'İşyeri', field: 'isyeri', flex:3, filter: true },
    { field: "", flex:1, cellRenderer: UpdateButtonPerson },
    { field: "", flex:1, cellRenderer: ListButtonIzin },
    { field: "", flex:1, cellRenderer: AddButtonSaatIzin },
    { field: "", flex:1, cellRenderer: ReportButtonIzin },
  ]);

  useEffect(() => {
    fetch('https://berkom-hr.com/applications/apipers.php')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
  }, []);

  return (
    <>
    <div className='container-fluid px-0 h-100'>
      <div className='my-3'>
        <h5>Personel Listesi</h5>
      </div>
      <div className='my-2'>
        <Link to='/person' state={{}} ><button className='btn btn-secondary me-2'><i className="bi bi-plus-circle"></i> Personel ekle </button></Link>
        <button className='btn btn-outline-secondary' onClick={onBtnExport}><i className="bi bi-download"></i> Listeyi İndir</button>
      </div>
      <div className='ag-theme-quartz' style={{ width: '100%', height: '80%' }} >
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} pagination={true} paginationAutoPageSize={true} localeText={AG_GRID_LOCALE_TR}/>
      </div>
    </div>
    </>
  );
}
