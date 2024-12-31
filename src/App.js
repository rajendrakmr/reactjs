import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./components/layout/AppContent";
import PrivateRoute from "./navigation/Private/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./screen/Login/Login";
import Error404 from "./navigation/error404/Error404";
import CreateUserIndex from "./pages/secrutity/createUser/Index";
import CreateRoleForm from "./pages/secrutity/createRoles/CreateRoleForm";
import AuthRoute from "./components/AuthRoute";
import CreateUserForm from "./pages/secrutity/createUser/CreateUser";
import ModifyUser from "./pages/secrutity/createUser/modifyUser/Index";
import AdminPortal from "./pages/secrutity/portalAdmin/AdminPortal";
import ResetPassword from "./pages/secrutity/resetPassword/ResetPassword";


import ApprovalAuthority from "./pages/Store/IndentApprovalAuthority/ApprovalAuthority";

import ChangePassword from "./pages/secrutity/changePassword/Index";

import IndentEntry from "./pages/Store/Transaction/IndentEntry/Index";
import IndentApproval from "./pages/Store/Transaction/IndentApproval/Index";

import GrnRegister from "./pages/Store/report/DWGrnRegister/Index";
import DepoItemList from "./pages/Store/report/DepoItemList/Index";
import JCWItemRegister from "./pages/Store/report/JCWItemRegister/Index";
import TCWItemRegister from "./pages/Store/report/TCWItemRegister/Index";
import InventoryListing from "./pages/Store/report/InventoryListing/index";
import StoreLedgerReport from "./pages/Store/report/StoreLedger/Index";
import GroupWiseItemControl from "./pages/Store/report/GroupWiseItemControl/Index";
import IRByRegister from "./pages/Store/report/IRByRegister/Index";
import PspTrans from "./pages/Store/report/PSPTrans/Index";


import ChallanEntry from "./pages/Store/Transaction/ChallanEntry/Index";
import AdvancedSIS from "./pages/Store/Transaction/AdvancedSIS/Index";
import AdvancedSISReturn from "./pages/Store/Transaction/AdvancedSISReturn/Index";
import ItemBalanceCheck from "./pages/Store/Transaction/ItemBalanceCheck/Index";
import DWItemBal from "./pages/Store/report/DWItemBal/DWItemBal";
import OpeningBalance from "./pages/Store/Transaction/OpeningBalance/Index";
import SISIssue from "./pages/Store/Transaction/SISIssue/Index";
import STNSupply from "./pages/Store/Transaction/STNSupply/Index";
import STNIndent from "./pages/Store/Transaction/STNIndent/Index";

import SISRequisition from "./pages/Store/Transaction/SISRequisition/Index";
import ClaimRejectItem from "./pages/Store/Transaction/ClaimRejectItem/Index";
import SARItem from "./pages/Store/Transaction/SARItem/Index";
import StockAdjustment from "./pages/Store/Transaction/StockAdjustment/Index";
import ItemInspection from "./pages/Store/Transaction/ItemInspection/Index"

// master
import TransactionCodeMaster from "./pages/Store/Master/TransactionCodeMaster/Index";
import DepoWiseItemMaster from "./pages/Store/Master/DepoWiseItemMaster/Index";
import DepoWiseJobMaster from "./pages/Store/Master/DepoWiseJobMaster/Index";
import ItemGroupMaster from "./pages/Store/Master/ItemGroupMaster/Index";
import UnitCodeMaster from "./pages/Store/Master/UnitCodeMaster/Index";
import DepoMaster from "./pages/Store/Master/DepoMaster/Index";
import IndentInstruction from "./pages/Store/Master/IndentInstruction/Index";
import AbcFsnAnalysis from "./pages/Store/Master/ABCNFSNA/Index";
import ItemAlias from "./pages/Store/Master/ItemAlias/Index";
import FSNAReport from "./pages/Store/report/FSNAReport/FSNAReport";
import ABCReport from "./pages/Store/report/ABCReport/ABCReport";
import IHReport from "./pages/Store/report/IHReport/IHReport";
import ATMaterReport from "./pages/Store/report/ATMaterReport/ATMaterReport";
import WaterCategory from "./pages/InvoiceWater/Master/WaterCategory/Index";
import ConnectionType from "./pages/InvoiceWater/Master/ConnectionType/Index";
import ConsumerType from "./pages/InvoiceWater/Master/ConsumerType/Index";

import BillingPeriod from "./pages/InvoiceWater/Master/BillingPeriod/Index";
import RMWBilling from "./pages/InvoiceWater/Master/RMWBilling/Index";
import Customer from "./pages/InvoiceWater/Master/Customer/Index";
import TestInvoice from "./pages/InvoiceWater/Master/Test/Index";

import LicenceFeeRate from "./pages/InvoiceLicence/Master/LicenceFeeRate/Index";

import ConsumerDetail from "./pages/InvoiceWater/Transaction/ConsumerDetail/Index";
import PeriodicMeterReading from "./pages/InvoiceWater/Transaction/PreMeterReading/Index";
import MeterRepairing from "./pages/InvoiceWater/Transaction/MeterRepairing/Index";
// import AccomoType from "./pages/InvoiceLicense/Master/AccomoType/Index";
import AccomoType from "./pages/InvoiceLicence/Master/AccomoType/Index";
import MeterInstallation from "./pages/InvoiceWater/Transaction/MeterInstallation/Index";


import CustomerLicenceFee from "./pages/InvoiceLicence/Master/CustomerLicenceFee/Index";

function App() {
  return (
    <Router basename="/Store_Accounts">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<AuthRoute> <AppContent /> </AuthRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/role-creation" element={<CreateRoleForm />} />
          <Route path="/user/create-user" element={<CreateUserForm />} />
          <Route path="/store/challan-issue" element={<AdvancedSIS />} />
          <Route path="/store/challan-issue-return" element={<AdvancedSISReturn />} />
          <Route path="/store/indent" element={<IndentEntry />} />
          <Route path="/store/indent-approval" element={<IndentApproval />} />
          <Route path="/store/report/depowise-grn-register" element={<GrnRegister />} />
          <Route path="/store/report/list-item" element={<DepoItemList />} />
          <Route path="/user/creation" element={<CreateUserIndex />} />
          <Route path="/store/report/store-ledger" element={<StoreLedgerReport />} />
          <Route path="/store/report/groupwise-item-control" element={<GroupWiseItemControl />} />
          <Route path="/store/report/depowise-grn-register" element={<DepoItemList />} />
          <Route path="store/report/depowise-item-Balance" element={<DWItemBal />} />
          <Route path="/store/report/jcw-item-register" element={<JCWItemRegister />} />
          <Route path="/store/report/tcw-item-register" element={<TCWItemRegister />} />
          <Route path="/store/report/inventory-listing" element={<InventoryListing />} />
          <Route path="/store/depo-master" element={<DepoMaster />} />
          <Route path="/store/transection-code-master" element={<TransactionCodeMaster />} />
          <Route path="/store/unit-code-master" element={<UnitCodeMaster />} />
          <Route path="/store/depo-wise-item-master" element={<DepoWiseItemMaster />} />
          <Route path="/store/depo-wise-job-master" element={<DepoWiseJobMaster />} />
          <Route path="/store/item-group" element={<ItemGroupMaster />} />
          <Route path="/store/abc-fsn-analysis" element={<AbcFsnAnalysis />} />
          <Route path="/store/indent/instruction" element={<IndentInstruction />} />
          <Route path="/store/item-alias" element={<ItemAlias />} />
          <Route path="/store/report/groupwise-item-control" element={<GroupWiseItemControl />} />
          <Route path="/store/item-balance" element={<ItemBalanceCheck />} />
          <Route path="/store/challan-entry" element={<ChallanEntry />} />
          <Route path="/store/sis-requisition" element={<SISRequisition />} />
          <Route path="/store/sis-issue" element={<SISIssue />} />
          <Route path="/store/stn-indent" element={<STNIndent />} />
          <Route path="/store/stn-supply" element={<STNSupply />} />
          <Route path="/store/stock-adjustment" element={<StockAdjustment />} />
          <Route path="/store/claim/reject-item" element={<ClaimRejectItem />} />
          <Route path="/store/supply-against/reject-item" element={<SARItem />} />
          <Route path="/store/item/inspection" element={<ItemInspection />} />
          <Route path="/user/modify" element={<ModifyUser />} />
          <Route path="/user/portal-admin" element={<AdminPortal />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
          <Route path="/user/reset-password" element={<ResetPassword />} />
          <Route path="/store/opening-balance" element={<OpeningBalance />} />
          <Route path="/store/report/psp-transaction" element={<PspTrans />} />
          <Route path="/store/report/irw-register" element={<IRByRegister />} />
          <Route path="/store/report/fsn-analysis" element={<FSNAReport />} />
          <Route path="/store/report/abc-analysis" element={<ABCReport />} />
          <Route path="/store/report/indent-history" element={<IHReport />} />
          <Route path="/store/report/audit-trail" element={<ATMaterReport />} />
          <Route path="/invoice/water-category" element={<WaterCategory />} />
          <Route path="/invoice/connection-type" element={<ConnectionType />} />
          <Route path="/invoice/connection-type" element={<ConnectionType />} />
          <Route path="/invoice/consumer-type" element={<ConsumerType />} />
          <Route path="/invoice/consumer-detail" element={<ConsumerDetail />} />
          <Route path="/invoice/billing-period" element={<BillingPeriod />} />
          <Route path="/invoice/rmw-billing" element={<RMWBilling />} />
          <Route path="/invoice/customer" element={<Customer />} />
          <Route path="/invoice/periodic-meter-reading" element={<PeriodicMeterReading />} />
          <Route path="/invoice/meter-repairing" element={<MeterRepairing />} />
          <Route path="/invoice/meter-installation" element={<MeterInstallation />} />
          <Route path="/invoice/licence-fee-rate" element={<LicenceFeeRate />} />
          <Route path="/invoice/accommodation-type" element={<AccomoType />} /> 
          <Route path="/invoice/customer-licence-fee" element={<CustomerLicenceFee />} /> 
        </Route>


        <Route path="/store/indent/approval-authority" element={<PrivateRoute element={<ApprovalAuthority />} />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}



export default App;
