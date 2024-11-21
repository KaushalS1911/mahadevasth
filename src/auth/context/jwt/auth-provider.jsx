import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession } from './utils';
import { AUTH_API } from '../../../config-global';
import { useSnackbar } from '../../../components/snackbar/index.js';
import { enqueueSnackbar } from 'notistack';
import {paths} from "../../../routes/paths";
import {useRouter} from "../../../routes/hooks";

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  vendor: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      vendor: action.payload.vendor,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      vendor: action.payload.vendor,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      vendor: action.payload.vendor,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      vendor: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const VENDOR_KEY = 'vendor';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(async () => {
    try {
      const vendor = JSON.parse(sessionStorage.getItem(VENDOR_KEY));
      // const login = JSON.parse(sessionStorage.getItem(LOGIN_KEY));
      if (vendor) {
        setSession(vendor);

        // const response = await axios.get(endpoints.auth.me);

        // const { head-office } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            vendor: {
              counsellor_code: vendor?.counsellor_code,
              status: vendor?.status,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            vendor: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          vendor: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (data) => {
    axios
      .post(`https://interactapiverse.com/mahadevasth/shape/counsellor/login`, data)
      .then((response) => {
        sessionStorage.setItem("res",JSON.stringify(response))
        if (response?.data?.status === '200') {
          const res = response?.data?.data;
          setSession(res);
          enqueueSnackbar('Login success');
          dispatch({
            type: 'LOGIN',
            payload: {
              vendor: {
                counsellor_code: res?.counsellor_code,
                status: res?.status,
              },
            },
          });
          router.push(paths.dashboard.article.list)
        } else {
          enqueueSnackbar('Invalid credentials', { variant: 'error' });
          console.log('err');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  //HEAD_OFFICE_LOGIN
  const ho_login = useCallback(async (data) => {
    axios
      .post(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/admin/login`, data)
      .then((response) => {
        if (response?.data?.status === '200') {
          const res = response?.data?.data[0];
          setSession(res);
          enqueueSnackbar('Login success');
          dispatch({
            type: 'LOGIN',
            payload: {
              vendor: {
                category: res?.category,
                csp_code: res?.csp_code,
                mil_dis_sub_roles: res?.mil_dis_sub_roles,
                name: res?.name,
                phone_number: res?.phone_number,
                branch:res?.branch
              },
            },
          });
        } else {
          enqueueSnackbar('Invalid credentials', { variant: 'error' });
          console.log('err');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {
    const response = await axios.post(`${AUTH_API}${endpoints.auth.login}`, data);

    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    localStorage.clear()
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.vendor ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      vendor: state.vendor,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      ho_login,
      login,
      register,
      logout,
    }),
    [ho_login, login, logout, register, state.vendor, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
