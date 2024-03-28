import React, { useState, useEffect } from 'react';


export default function App() {

  let deleteItem = async () => {
    try {
      let res = await fetch("https://berkom-hr.com/applications/apitumizin.php", {
        method: "POST",
        body: JSON.stringify({
            method: 'sil',
            dgrid: '5122',
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
  deleteItem();
}