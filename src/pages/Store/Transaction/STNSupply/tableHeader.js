 


export const headers = {
  action: 'Action',
  stnSupplyNo: "STN Supply No",
  stnSupplyDate: "STN Supply Date",
  stnIndentNo: "STN Indent No",
  // stnIssuedBy: "STN Issued By",
  // issuedByEmpCode: "Issued By Emp Code",
  stnIssuedDate: "STN Issued Date",
  // priceStoreLedgerIPostBy: "Price Store Ledger I Post By",
  // priceStoreLedgerIPostDate: "Price Store Ledger I Post Date",
  // stnReceivedBy: "STN Received By",
  stnReceivedDate: "STN Received Date",
  // priceStoreLedgerRPostBy: "Price Store Ledger R Post By",
  // priceStoreLedgerRPostDate: "Price Store Ledger R Post Date",
  // stnSupplyStatus: "STN Supply Status",
  stnIndentDate: "STN Indent Date",
  indentingDivision: "Indent Div",
  supplyingDivision: "Supply Div",
  transactionCodeId: "TC ID",
  transactionCodeSd: "TC SD",
  // stnIndentedBy: "STN Indented By",
  // indentedByEmpName: "Emp Name",
  groupNo: "Group No",
  // functionalGroupName: "Func Group Name",
  subGroupNo: "Sub Group No",
  // subGroupName: "Sub Group Name" 
};


export const changeKeyName = (obj) => {
  const rename_key_name = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => rename_key_name(item));
    } else if (typeof data === 'object' && data !== null) {
      const {
        viewStnSupplyChildDTOS,
        ...rest
      } = data;
      const newObject = {
        ...rest,
        ...(viewStnSupplyChildDTOS !== undefined && { stnSupplyChildList: rename_key_name(viewStnSupplyChildDTOS) }),
      };

      return newObject;
    }
    return data;
  };
  return rename_key_name(obj);
};
