import React, { useEffect, useState } from 'react';
import UploadDocument from '../../../pages/dashboard/addUploadDocument';
import { useGetDistributor } from '../../../api/vendor';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import MillerDocument from '../miller-document';

export default function UploadMillerDocument() {
  const [tableData1,setTableData1] = useState([])
  const {vendor} = useAuthContext()
  const [documentType,setDocumentType]=  useState([])

  function getAllDocument() {
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/sub_mil_dist`
      )
      .then((res) => setTableData1(res?.data?.data))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getAllDocument();

  }, []);
  useEffect(() =>{
    tableData1?.map((data) =>{
      setDocumentType((item) => {
        if(!item.code !== data.csp_code ){
          return [...item, { label: data.name,key:data.name,code:data.csp_code }]
        }
      })
    })
  },[tableData1])

  return (
    <>
<MillerDocument documentLabel={documentType}/>
      {/*<UploadDocument documentLabel={documentType} />*/}
      </>

  );
}


