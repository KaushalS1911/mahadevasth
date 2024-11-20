import React, { useEffect, useState } from 'react';
import UploadDocument from '../../../pages/dashboard/addUploadDocument';
import { useGetDistributor } from '../../../api/vendor';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import DistributorDocument from '../distributor-document';

export default function UploadDistributorDocument() {
  const [tableData,setTableData] = useState([])
  const {vendor} = useAuthContext()
  const [documentType,setDocumentType]=  useState([])

  function getAllDocument() {
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/sub_mil_dist`
      )
      .then((res) => setTableData(res?.data?.data))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getAllDocument();

  }, []);
  useEffect(() =>{
    tableData?.map((data) =>{
      setDocumentType((item) => {
        if(!item.code !== data.csp_code ){
          return [...item, { label: data.name,key:data.name,code:data.csp_code }]
        }
      })
    })
  },[tableData])

  return (
    <>
<DistributorDocument documentLabel={documentType}/>
      {/*<UploadDocument documentLabel={documentType} />*/}
      </>

  );
}


