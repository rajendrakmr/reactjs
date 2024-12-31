export const headers = {
  action: 'Action',
  stnIndentNo: "STN Indent No",
  stnIndentDate: "STN Indent Date",
  deptBookSrlNo: "Dept Book Sr.No",
  indentingDivision: "Indent Div.",
  supplyingDivision: "Supply Div.",
  transactionCodeId: "TC ID",
  transactionCodeSd: "TC SD",
  empName: "Emp Name",
  // stnIndentedBy: "STN Indented By",
  // stnIndentStatus: "STN Indent Status",
  // groupNo: "Group No",
  // funcGroupName: "Func Group Name",
  // subGroupNo: "Sub Group No",
  // sunGroupName: "Sub Group Name",
};


export const changeKeyName = (obj) => {
  const rename_key_name = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => rename_key_name(item));
    } else if (typeof data === 'object' && data !== null) {
      const {
        viewStnIndentChildDTOS,
        ...rest
      } = data;
      const newObject = {
        ...rest,
        ...(viewStnIndentChildDTOS !== undefined && { stnIndentChildList: rename_key_name(viewStnIndentChildDTOS) }),
      };

      return newObject;
    }
    return data;
  };

  return rename_key_name(obj);
};