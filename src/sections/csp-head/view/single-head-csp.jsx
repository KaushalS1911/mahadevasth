import React, { useCallback, useEffect, useState } from 'react';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { Container } from '@mui/system';
import { Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router';
import { paths } from 'src/routes/paths';
import { useGetCSP } from '../../../api/branch-csp';
import Orders from '../Orders';
import FieldReport from '../field-report';
import axios from 'axios';
import CspHeadDocumentView from './csp-head-document-view';
import CspHeadNewEditForm from '../csp-head-new-edit-form';
import { useGetHeadCSP } from '../../../api/head-csp';
  const TABS = [
    {
      value: 'basic',
      label: 'Basic',
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'document',
      label: 'Document',
      icon: <Iconify icon="solar:bill-list-bold" width={24} />,
    },
    {
      value: 'orders',
      label: 'Intents',
      icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    },
    {
      value: 'fieldReport',
      label: 'Field report',
      icon: <Iconify icon="tdesign:verify" width={24} />,
    },
    // {
    //   value: 'security',
    //   label: 'Security',
    //   icon: <Iconify icon="solar:share-bold" width={24} />,
    // },
  ];
function SingleCspHead(props) {
const {id} = useParams()
  const [remark,setRemark] = useState("")
  const [data,setData] = useState("")
  const settings = useSettingsContext();
  const { headCsp } = useGetHeadCSP();
  const distributor =headCsp?.find((data) => data.csp_code === id )
  const [currentTab, setCurrentTab] = useState('basic');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);
  const remarkData = () => {
    axios.post("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/fr",{csp_code:id})
      .then((res) => {
        setRemark(res?.data?.data?.remark);
        setData(res?.data?.data?.remark)
      }).catch((err) => console.log(err))
  }
  useEffect(() => {
    setRemark("")
    remarkData()
  },[])
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="CSP"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'CSP', href: paths.dashboard.headCsp.csp_list },
            { name: 'Account' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {currentTab === 'basic' && <CspHeadNewEditForm distributor={distributor} cspt={true} />}

        {/*{currentTab === 'billing' && (*/}
        {/*  <AccountBilling*/}
        {/*    plans={_userPlans}*/}
        {/*    cards={_userPayment}*/}
        {/*    invoices={_userInvoices}*/}
        {/*    addressBook={_userAddressBook}*/}
        {/*  />*/}
        {/*)}*/}

        {currentTab === 'document' && <CspHeadDocumentView  />}
        {currentTab === 'orders' && <Orders singleCode={id}/>}
        {currentTab === 'fieldReport' && <FieldReport singleCode={id} remark={remark} setRemark={setRemark} data={data} setData={setData} remarkData={remarkData}/> }

        {/*{currentTab === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />}*/}

        {/*{currentTab === 'security' && <AccountChangePassword />}*/}
      </Container>
    </>
  );
}

export default SingleCspHead;
