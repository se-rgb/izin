import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import '../scss/styles.scss';
import '../scss/custom.scss';
import Personeller from "./components/Personeller.jsx";
import Izinler from "./components/Izinler.jsx";
import Personel from "./components/Personel.jsx";
import Izin from "./components/Izin.jsx";
import Sidebar from "./components/sidebar.jsx";



export default function App() {
  return (
    <>
    <div className='container-fluid py-2 mb-5'>
      <div className='row p-2'>
        <div className='col'>
          <div className='logo'>Berkom Danışmanlık</div>
        </div>
        <div className='col text-end'>
          Kullanıcı
        </div>
      </div>
    </div>
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div className='col-2 p-3'>
          <Sidebar />
        </div>
        <div className='col-10 h-100'>
          <Routes>
            <Route path="/" element={<Personeller />} />
            <Route path="/person" element={<Personel />} />
            <Route path="/izinler" element={<Izinler />} />
            <Route path="/izin" element={<Izin />} />
        </Routes>
        </div>
      </div>
    </div>
    </>
  );
}