import React, { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }}/>
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const { vendor } = useAuthContext();
  const societyItems = vendor?.mil_dis_sub_roles === "own_distribution_own_mill" ? [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('Document'),
      path: paths.dashboard.document.root,
      icon: ICONS.chat,
      children: [
        // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
        { title: t('Document List'), path: paths.dashboard.document.document_list },
        { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
        {
          title: t('Upload Evidence'),
          path: paths.dashboard.document.upload_evidence,
        },
      ],
    },
    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
  ]:[
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },

    {
      title: t('Miller'),
      path: paths.dashboard.miller.root,
      icon: ICONS.file,
      children: [
        { title: t('Miller List'), path: paths.dashboard.miller.miller_list },
        { title: t('Add Miller'), path: paths.dashboard.miller.add_miller },
        { title: t('Upload Document'), path: paths.dashboard.miller.document_upload },

      ],
    },

    {
      title: t('Document'),
      path: paths.dashboard.document.root,
      icon: ICONS.chat,
      children: [
        // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
        { title: t('Document List'), path: paths.dashboard.document.document_list },
        { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
        {
          title: t('Upload Evidence'),
          path: paths.dashboard.document.upload_evidence,
        },
      ],
    },
    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
  ];

  const otherItems = [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },

    // {
    //   title: t('Intents'),
    //   path: paths.dashboard.orders,
    //   icon: ICONS.product,
    // },
    // {
    //   title: t('Stats Overview'),
    //   path: paths.dashboard.statsOverview.root,
    //   icon: ICONS.mail,
    //   children: [
    //     // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
    //     { title: t('Branch'), path: paths.dashboard.statsOverview.branch },
    //     { title: t('Vendor Type'), path: paths.dashboard.statsOverview.vendor_type },
    //
    //   ],
    // },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('Document'),
      path: paths.dashboard.document.root,
      icon: ICONS.chat,
      children: [
        // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
        { title: t('Document List'), path: paths.dashboard.document.document_list },
        { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
        {
          title: t('Upload Evidence'),
          path: paths.dashboard.document.upload_evidence,
        },
      ],
    },

    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
    // {
    //   title: t('Head Office'),
    //   path: paths.dashboard.headOffice.root,
    //   icon: ICONS.user,
    // },
  ];

  const Miller_DistributorItems = [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },

    // {
    //   title: t('Intents'),
    //   path: paths.dashboard.orders,
    //   icon: ICONS.product,
    // },
    // {
    //   title: t('Stats Overview'),
    //   path: paths.dashboard.statsOverview.root,
    //   icon: ICONS.mail,
    //   children: [
    //     // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
    //     { title: t('Branch'), path: paths.dashboard.statsOverview.branch },
    //     { title: t('Vendor Type'), path: paths.dashboard.statsOverview.vendor_type },
    //
    //   ],
    // },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('Field Report'),
      path: paths.dashboard.field_report,
      icon: <Iconify icon="tdesign:verify"  />,
    },
    {
      title: t('Add Distributor Info'),
      path: paths.dashboard.distributor_info,
      icon: ICONS.user,
    },


    {
      title: t('Document'),
      path: paths.dashboard.document.root,
      icon: ICONS.chat,
      children: [
        // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
        { title: t('Document List'), path: paths.dashboard.document.document_list },
        { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
        {
          title: t('Upload Evidence'),
          path: paths.dashboard.document.upload_evidence,
        },
      ],
    },
    {
      title: t('Intents'),
      path: paths.dashboard.orders,
      icon: ICONS.order,
    },
    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
    // {
    //   title: t('Head Office'),
    //   path: paths.dashboard.headOffice.root,
    //   icon: ICONS.user,
    // },
  ];

  const branchItem = [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('CSP'),
      path: paths.dashboard.csp.csp_list,
      icon: <Iconify icon="ooui:user-group-rtl" sx={{ width: 1, height: 1 }}></Iconify>,
    },
    // {
    //   title: t('CSP'),
    //   path: paths.dashboard.csp.root,
    //   icon: ICONS.file,
    //   children: [
    //     { title: t('CSP List'), path: paths.dashboard.csp.csp_list },
    //     // { title: t('Add Distributor'), path: paths.dashboard.csp.add_distributor },
    //     { title: t('Upload Document'), path: paths.dashboard.csp.document_upload },
    //
    //   ],
    // },


    // {
    //   title: t('Add Miller'),
    //   path: paths.dashboard.addMiller,
    //   icon: ICONS.file,
    // },
    // {
    //   title: t('Document'),
    //   path: paths.dashboard.document.root,
    //   icon: ICONS.Document,
    //   children: [
    //     // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
    //     { title: t('Document List'), path: paths.dashboard.document.document_list },
    //     { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
    //     {
    //       title: t('Upload Evidence'),
    //       path: paths.dashboard.document.upload_evidence,
    //     },
    //   ],
    // },
    {
      title: t('Document'),
      path: paths.dashboard.document.document_list,
      icon: ICONS.chat,
    },
    {
      title: t('Intents'),
      path: paths.dashboard.orders,
      icon: ICONS.order,
    },
    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
  ];

  const millerItems = [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('Field Report'),
      path: paths.dashboard.field_report,
      icon: <Iconify icon="tdesign:verify"  />,
    },
    {
      title: t('Distributor'),
      path: paths.dashboard.distributor.root,
      icon: ICONS.file,
      children: [
            { title: t('Distributor List'), path: paths.dashboard.distributor.distributor_list },
            { title: t('Add Distributor'), path: paths.dashboard.distributor.add_distributor },
            { title: t('Upload Document'), path: paths.dashboard.distributor.document_upload },

          ],
    },
    // {
    //   title: t('Intents'),
    //   path: paths.dashboard.orders,
    //   icon: ICONS.product,
    // },
    // {
    //   title: t('Stats Overview'),
    //   path: paths.dashboard.statsOverview.root,
    //   icon: ICONS.mail,
    //   children: [
    //     // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
    //     { title: t('Branch'), path: paths.dashboard.statsOverview.branch },
    //     { title: t('Vendor Type'), path: paths.dashboard.statsOverview.vendor_type },
    //
    //   ],
    // },
    {
      title: t('Document'),
      path: paths.dashboard.document.root,
      icon: ICONS.chat,
      children: [
        // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
        { title: t('Document List'), path: paths.dashboard.document.document_list },
        { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
        {
          title: t('Upload Evidence'),
          path: paths.dashboard.document.upload_evidence,
        },
      ],
    },
    {
      title: t('Intents'),
      path: paths.dashboard.orders,
      icon: ICONS.order,
    },
    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },

  ];
  const distributeItems = [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },

    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('Field Report'),
      path: paths.dashboard.field_report,
      icon: <Iconify icon="tdesign:verify"  />,
    },
    {
      title: t('Miller'),
      path: paths.dashboard.miller.root,
      icon: ICONS.file,
      children: [
            { title: t('Miller List'), path: paths.dashboard.miller.miller_list },
            { title: t('Add Miller'), path: paths.dashboard.miller.add_miller },
            { title: t('Upload Document'), path: paths.dashboard.miller.document_upload },

          ],
    },
    // {
    //   title: t('Intents'),
    //   path: paths.dashboard.orders,
    //   icon: ICONS.product,
    // },
    // {
    //   title: t('Stats Overview'),
    //   path: paths.dashboard.statsOverview.root,
    //   icon: ICONS.mail,
    //   children: [
    //     // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
    //     { title: t('Branch'), path: paths.dashboard.statsOverview.branch },
    //     { title: t('Vendor Type'), path: paths.dashboard.statsOverview.vendor_type },
    //
    //   ],
    // },
    {
      title: t('Document'),
      path: paths.dashboard.document.root,
      icon: ICONS.chat,
      children: [
        // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
        { title: t('Document List'), path: paths.dashboard.document.document_list },
        { title: t('Upload Document'), path: paths.dashboard.document.document_upload },
        {
          title: t('Upload Evidence'),
          path: paths.dashboard.document.upload_evidence,
        },
      ],
    },
    {
      title: t('Intents'),
      path: paths.dashboard.orders,
      icon: ICONS.order,
    },

    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
    // {
    //   title: t('Head Office'),
    //   path: paths.dashboard.headOffice.root,
    //   icon: ICONS.user,
    // },
  ];

  const headItems = [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.dashboard,
    },

    // {
    //   title: t('Stats Overview'),
    //   path: paths.dashboard.statsOverview.root,
    //   icon: ICONS.mail,
    //   children: [
    //     // { title: t('Document Overview'), path: paths.dashboard.document.document_overview },
    //     { title: t('Branch'), path: paths.dashboard.statsOverview.branch },
    //     { title: t('Vendor Type'), path: paths.dashboard.statsOverview.vendor_type },
    //
    //   ],
    // },
    {
      title: t('Basic Info'),
      path: paths.dashboard.basic_info,
      icon: ICONS.user,
    },
    {
      title: t('CSP'),
      path: paths.dashboard.headCsp.csp_list,
      icon: <Iconify icon="ooui:user-group-rtl" sx={{ width: 1, height: 1 }}></Iconify>,
    },
    {
      title: t('Documents'),
      path: paths.dashboard.document.document_list,
      icon: ICONS.chat
    },
    {
      title: t('Intents'),
      path: paths.dashboard.orders,
      icon: ICONS.order,
    },

    // {
    //   title: t('Add Miller'),
    //   path: paths.dashboard.addMiller,
    //   icon: ICONS.file,
    // },
    // INVOICE
    {
      title: t('payment'),
      path: paths.dashboard.invoice.root,
      icon: ICONS.invoice,
      children: [
        { title: t('list'), path: paths.dashboard.invoice.root },
        // {
        //   title: t('details'),
        //   path: paths.dashboard.invoice.demo.details,
        // },
        { title: t('create'), path: paths.dashboard.invoice.new },
        // { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      ],
    },
    {
      title: t('Inventory'),
      path: paths.dashboard.inventory,
      icon: <Iconify icon="material-symbols:inventory-2-outline-rounded" />,
    },
  ];
  const data = useMemo(
    () => [
      // ----------------------------------------------------------------------
      {
        // subheader: t('management'),
        // items: vendor?.category === 'society_cooperative' ? societyItems : otherItems,
        items: vendor?.category === "cooperative_rent_mill" || vendor?.category === "own_distribution_rent_mill" || vendor?.category === "own_distribution_own_mill" ?
          societyItems : vendor?.category === 'branch' ? branchItem : vendor?.category === 'head_office' ? headItems : vendor?.category === "miller" ?
            millerItems : vendor?.category === "distributor" ? distributeItems :vendor.category === "miller_distributor" ? Miller_DistributorItems : otherItems,
      },
    ],
    [t],
  );

  return data;
}
