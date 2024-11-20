import React from 'react';
import InventoryAddList from '../../../sections/inventory/view/inventory-add-list';
import { Helmet } from 'react-helmet-async';

function InventoryList(props) {
  return (
    <>
      <Helmet>
        <title> Dashboard: Inventory</title>
      </Helmet>
<InventoryAddList />
    </>
  );
}

export default InventoryList;
