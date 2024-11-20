// import { paramCase } from 'src/utils/change-case';

// import { _id, _postTitles } from 'src/_mock/assets';

// // ----------------------------------------------------------------------

// const MOCK_ID = _id[1];

// const MOCK_TITLE = _postTitles[2];

// const ROOTS = {
//   AUTH: '/auth',
//   AUTH_DEMO: '/auth-demo',
//   DASHBOARD: '/dashboard',
// };

// // ----------------------------------------------------------------------

// export const paths = {
//   comingSoon: '/coming-soon',
//   maintenance: '/maintenance',
//   pricing: '/pricing',
//   payment: '/payment',
//   about: '/about-us',
//   contact: '/contact-us',
//   faqs: '/faqs',
//   page403: '/403',
//   page404: '/404',
//   page500: '/500',
//   components: '/components',
//   docs: 'https://docs.minimals.cc',
//   changelog: 'https://docs.minimals.cc/changelog',
//   zoneUI: 'https://mui.com/store/items/zone-landing-page/',
//   minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
//   freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
//   figma:
//     'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
//   product: {
//     root: `/product`,
//     checkout: `/product/checkout`,
//     details: (id) => `/product/${id}`,
//     demo: {
//       details: `/product/${MOCK_ID}`,
//     },
//   },
//   post: {
//     root: `/post`,
//     details: (title) => `/post/${paramCase(title)}`,
//     demo: {
//       details: `/post/${paramCase(MOCK_TITLE)}`,
//     },
//   },
//   // AUTH
//   auth: {
//     amplify: {
//       login: `${ROOTS.AUTH}/amplify/login`,
//       verify: `${ROOTS.AUTH}/amplify/verify`,
//       register: `${ROOTS.AUTH}/amplify/register`,
//       newPassword: `${ROOTS.AUTH}/amplify/new-password`,
//       forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
//     },
//     jwt: {
//       login: `${ROOTS.AUTH}/jwt/login`,
//       register: `${ROOTS.AUTH}/jwt/register`,
//     },
//     firebase: {
//       login: `${ROOTS.AUTH}/firebase/login`,
//       verify: `${ROOTS.AUTH}/firebase/verify`,
//       register: `${ROOTS.AUTH}/firebase/register`,
//       forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
//     },
//     auth0: {
//       login: `${ROOTS.AUTH}/auth0/login`,
//     },
//     supabase: {
//       login: `${ROOTS.AUTH}/supabase/login`,
//       verify: `${ROOTS.AUTH}/supabase/verify`,
//       register: `${ROOTS.AUTH}/supabase/register`,
//       newPassword: `${ROOTS.AUTH}/supabase/new-password`,
//       forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
//     },
//   },
//   authDemo: {
//     classic: {
//       login: `${ROOTS.AUTH_DEMO}/classic/login`,
//       register: `${ROOTS.AUTH_DEMO}/classic/register`,
//       forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
//       newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
//       verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
//     },
//     modern: {
//       login: `${ROOTS.AUTH_DEMO}/modern/login`,
//       register: `${ROOTS.AUTH_DEMO}/modern/register`,
//       forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
//       newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
//       verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
//     },
//   },
//   // DASHBOARD
//   dashboard: {
//     root: ROOTS.DASHBOARD,
//     basic_info: `${ROOTS.DASHBOARD}/basic-info`,
//     upload_document: `${ROOTS.DASHBOARD}/upload-document`,
//     upload_evidence: `${ROOTS.DASHBOARD}/upload-evidence`,
//     document: `${ROOTS.DASHBOARD}/document`,
//     orders: `${ROOTS.DASHBOARD}/orders`,
//     mail: `${ROOTS.DASHBOARD}/mail`,
//     chat: `${ROOTS.DASHBOARD}/chat`,
//     blank: `${ROOTS.DASHBOARD}/blank`,
//     kanban: `${ROOTS.DASHBOARD}/kanban`,
//     calendar: `${ROOTS.DASHBOARD}/calendar`,
//     fileManager: `${ROOTS.DASHBOARD}/file-manager`,
//     permission: `${ROOTS.DASHBOARD}/permission`,
//     general: {
//       app: `${ROOTS.DASHBOARD}/app`,
//       ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
//       analytics: `${ROOTS.DASHBOARD}/analytics`,
//       banking: `${ROOTS.DASHBOARD}/banking`,
//       booking: `${ROOTS.DASHBOARD}/booking`,
//       file: `${ROOTS.DASHBOARD}/file`,
//     },
//     head-office: {
//       root: `${ROOTS.DASHBOARD}/head-office`,
//       new: `${ROOTS.DASHBOARD}/head-office/new`,
//       list: `${ROOTS.DASHBOARD}/head-office/list`,
//       cards: `${ROOTS.DASHBOARD}/head-office/cards`,
//       profile: `${ROOTS.DASHBOARD}/head-office/profile`,
//       account: `${ROOTS.DASHBOARD}/head-office/account`,
//       edit: (id) => `${ROOTS.DASHBOARD}/head-office/${id}/edit`,
//       demo: {
//         edit: `${ROOTS.DASHBOARD}/head-office/${MOCK_ID}/edit`,
//       },
//     },
//     product: {
//       root: `${ROOTS.DASHBOARD}/product`,
//       new: `${ROOTS.DASHBOARD}/product/new`,
//       details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
//       edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
//       demo: {
//         details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
//         edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
//       },
//     },
//     invoice: {
//       root: `${ROOTS.DASHBOARD}/invoice`,
//       new: `${ROOTS.DASHBOARD}/invoice/new`,
//       details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
//       edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
//       demo: {
//         details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
//         edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
//       },
//     },
//     post: {
//       root: `${ROOTS.DASHBOARD}/post`,
//       new: `${ROOTS.DASHBOARD}/post/new`,
//       details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
//       edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
//       demo: {
//         details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
//         edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
//       },
//     },
//     head-office: {
//       root: `${ROOTS.DASHBOARD}/head-office`,
//       details: (id) => `${ROOTS.DASHBOARD}/head-office/${id}`,
//       demo: {
//         details: `${ROOTS.DASHBOARD}/head-office/${MOCK_ID}`,
//       },
//     },
//     job: {
//       root: `${ROOTS.DASHBOARD}/job`,
//       new: `${ROOTS.DASHBOARD}/job/new`,
//       details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
//       edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
//       demo: {
//         details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
//         edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
//       },
//     },
//     tour: {
//       root: `${ROOTS.DASHBOARD}/tour`,
//       new: `${ROOTS.DASHBOARD}/tour/new`,
//       details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
//       edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
//       demo: {
//         details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
//         edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
//       },
//     },
//   },
// };
import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `/login`,
      branch:`/admin`,
      headlogin: `/ho-login`,
      register: `/register`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    basic_info: `${ROOTS.DASHBOARD}/basic-info`,
    field_report:`${ROOTS.DASHBOARD}/field-report`,
    distributor_info: `${ROOTS.DASHBOARD}/distributor-info`,
    inventory: `${ROOTS.DASHBOARD}/inventory`,
    // upload_document: `${ROOTS.DASHBOARD}/upload-document`,
    // document_list: `${ROOTS.DASHBOARD}/document-list`,
    orders: `${ROOTS.DASHBOARD}/orders`,
    addMiller: `${ROOTS.DASHBOARD}/add-miller`,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    headOffice: {
      root: `${ROOTS.DASHBOARD}/head-office`,
      // new: `${ROOTS.DASHBOARD}/head-office/new`,
      list: `${ROOTS.DASHBOARD}/head-office/list`,
      // cards: `${ROOTS.DASHBOARD}/head-office/cards`,
      // profile: `${ROOTS.DASHBOARD}/head-office/profile`,
      // account: `${ROOTS.DASHBOARD}/head-office/account`,
      view: (id) => `${ROOTS.DASHBOARD}/head-office/${id}/view`,
      // demo: {
      //   edit: `${ROOTS.DASHBOARD}/head-office/${MOCK_ID}/edit`,
      // },
    },
    article: {
      root: `${ROOTS.DASHBOARD}/article`,
      new: `${ROOTS.DASHBOARD}/article/new`,
      list: `${ROOTS.DASHBOARD}/article/list`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    document: {
      root: `${ROOTS.DASHBOARD}/document`,
      document_overview: `${ROOTS.DASHBOARD}/document/document-overview`,
     document_upload : `${ROOTS.DASHBOARD}/document/document-upload`,
     document_list : `${ROOTS.DASHBOARD}/document/document-list`,
     document_view : `${ROOTS.DASHBOARD}/document/document-view`,
    upload_evidence: `${ROOTS.DASHBOARD}/document/upload-evidence`,
        },
    distributor:{
      root: `${ROOTS.DASHBOARD}/distributor`,
      distributor_list: `${ROOTS.DASHBOARD}/distributor/distributor-list`,
      add_distributor: `${ROOTS.DASHBOARD}/distributor/add-distributor`,
     distributor_view :(title) =>  `${ROOTS.DASHBOARD}/distributor/distributor-view/${title}`,
     distributor_document_view :(title) =>  `${ROOTS.DASHBOARD}/distributor/distributor-document-view/${title}`,
     document_upload : `${ROOTS.DASHBOARD}/distributor/document-upload`,
    },
    miller:{
      root: `${ROOTS.DASHBOARD}/miller`,
      miller_list: `${ROOTS.DASHBOARD}/miller/miller-list`,
     miller_view :(title) =>  `${ROOTS.DASHBOARD}/miller/miller-view/${title}`,
     miller_document_view :(title) =>  `${ROOTS.DASHBOARD}/miller/miller-document-view/${title}`,
      add_miller: `${ROOTS.DASHBOARD}/miller/add-miller`,
     document_upload : `${ROOTS.DASHBOARD}/miller/document-upload`,
          },
    csp:{
      root: `${ROOTS.DASHBOARD}/csp`,
      csp_list: `${ROOTS.DASHBOARD}/csp/csp-list`,
      // csp_list:(tital) =>  `${ROOTS.DASHBOARD}/nccf/branch/${tital}/csp/list`,
     csp_view :(title) =>  `${ROOTS.DASHBOARD}/csp/csp-view/${title}`,
     csp_document_view :(title) =>  `${ROOTS.DASHBOARD}/csp/csp-document-view/${title}`,

          },
    headCsp:{
      root: `${ROOTS.DASHBOARD}/head-csp`,
      csp_list: `${ROOTS.DASHBOARD}/head-csp/csp-list`,
      // csp_list:(tital) =>  `${ROOTS.DASHBOARD}/nccf/branch/${tital}/csp/list`,
     csp_view :(title) =>  `${ROOTS.DASHBOARD}/head-csp/csp-view/${title}`,
     csp_document_view :(title) =>  `${ROOTS.DASHBOARD}/head-csp/csp-document-view/${title}`,

          },

    statsOverview: {
      root : `${ROOTS.DASHBOARD}/states-overview`,
      branch: `${ROOTS.DASHBOARD}/states-overview/branch`,
      vendor_type: `${ROOTS.DASHBOARD}/states-overview/vendor-type`,
      order: `${ROOTS.DASHBOARD}/states-overview/order`,
    //  document_upload : `${ROOTS.DASHBOARD}/document/document-upload`,
    //  document_list : `${ROOTS.DASHBOARD}/document/document-list`,
    //  document_view : `${ROOTS.DASHBOARD}/document/document-view`,
    // upload_evidence: `${ROOTS.DASHBOARD}/document/upload-evidence`,

      // demo: {
      //   details: `${ROOTS.DASHBOARD}/head-office/${MOCK_ID}`,
      // },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
