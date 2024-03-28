import React, { useState, useEffect } from 'react';


export default function App() {

  let handleSubmit = async () => {
    try {
      let res = await fetch("https://berkom-hr.com/applications/apitumizin.php", {
        method: "POST",
        body: JSON.stringify({
          sicil: '7000',
          gds: '2024-02-01',
          dns: '2024-03-01',
          sure: 6,
          neden:'yill',
          aciklama: 'öz',
          method: 'güncelle',
          dgrid: '5118',
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log(resJson);
      }
    } catch (err) {
      console.log(err);
    }

  };
handleSubmit();
}