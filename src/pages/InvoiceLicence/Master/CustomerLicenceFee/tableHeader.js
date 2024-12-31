 

  export const headers = {
    action:'Action', 
    customerId: "Customer ID",
    customerName: "Customer Name", 
    consumerTypeDesc: "Comm. Purpose", 
    phoneNo: "Phone No", 
    mailId: "Mail ID", 
    gstn: "GSTN", 
  };
  

  export const changeKeyName = (obj) => { 
    const rename_key_name = (data) => {
      if (Array.isArray(data)) {
        return data.map(item => rename_key_name(item));
      } else if (typeof data === 'object' && data !== null) {
        const {
          customerAddressViews,  
          ...rest
        } = data; 
        const newObject = {
          ...rest,
          ...(customerAddressViews !== undefined && { customerAddresses: rename_key_name(customerAddressViews) }),  
        };
  
        return newObject;
      }
      return data;
    }; 
    return rename_key_name(obj);
  };
