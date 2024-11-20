import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import UserListView from '../../pages/user/view/user-list-view';
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';

function Oreder(props) {
  const [orderList, setOrderList] = useState([]);
  const [count,setCount] = useState(0)
  const {vendor} = useAuthContext()
  useEffect(() => {
    // if (vendor.csp){
    // }
      fetchAllOrders()
  },[])

  function fetchAllOrders() {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/orders`).then((res) => {
      setOrderList(res.data.data);
    });
  }
  function fetchAllOrdersDemo(){
    setCount((ev) => ev+1 )
  }

  return (
    <>
      {/*<Grid item xs={12} lg={12}>*/}
        <UserListView tableData={orderList} fetchAllOrdersDemo={fetchAllOrdersDemo} />
      {/*</Grid>*/}
    </>
  );
}

export default Oreder;
