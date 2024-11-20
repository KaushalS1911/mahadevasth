import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../auth/hooks';
import BranchBasicInfo from './branch-basic-info';
import BasicInfo from './basic-info';
import MillerBasicInfo from './miller-basic-info';
import { useGetProfile } from '../../api/basic-info';
import axios from 'axios';

function MainBasicInfo() {
  const {vendor} = useAuthContext()
  const { profile } = useGetProfile();
  const [loading,setLoading] = useState(false)
  const [miller_disprofile,setMiller_disProfile] = useState({})
  useEffect(() => {
    getSingleMiller_dis();
  }, []);
  function getSingleMiller_dis() {
    setLoading(true)
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/sub_mil_dist`
      )
      .then((res) => {
        setMiller_disProfile(res?.data?.data[0]);
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      {(vendor?.category === "branch" || vendor?.category === "head_office") ? <BranchBasicInfo /> : <MillerBasicInfo profile={profile} miller_disprofile={miller_disprofile} vendor={vendor} loading={loading}/>}
    </>
  );
}

export default MainBasicInfo;
