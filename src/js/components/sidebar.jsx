import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";


function Sidebar() {
return (
  <>
  <div className='sidebar container pt-5'>
    <div className="d-flex flex-column mt-5">
      <div className="p-1"><button className='btn btn-outline-secondary w-100 text-start'> Ana Sayfa </button></div>
      <div className="p-1"><button className='btn btn-outline-secondary w-100 text-start'>Yıllık İzin Raporu</button></div>
      <div className="p-1"><button className='btn btn-outline-secondary w-100 text-start'>İzin Kullanım Raporu</button></div>
      <div className="p-1"><button className='btn btn-outline-secondary w-100 text-start'>Saatlik İzin Kullanım Raporu</button></div>
    </div>
  </div>
</>
)
}

export default Sidebar;