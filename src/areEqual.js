const areEqual = (prevProps, nextProps) => {
    // First, check if the array lengths are the same
    if (prevProps.indentItemChildList.length !== nextProps.indentItemChildList.length) {
      return false;
    }
  
    // Check if each item inside the array is the same
    for (let i = 0; i < prevProps.indentItemChildList.length; i++) {
      const prevItem = prevProps.indentItemChildList[i];
      const nextItem = nextProps.indentItemChildList[i];
  
      if (
        prevItem.depoCode !== nextItem.depoCode ||
        prevItem.itemCode !== nextItem.itemCode ||
        prevItem.jobCode !== nextItem.jobCode ||
        prevItem.unitCode !== nextItem.unitCode ||
        prevItem.lastPoNo !== nextItem.lastPoNo ||
        prevItem.lastPoDate !== nextItem.lastPoDate ||
        prevItem.lastPoRate !== nextItem.lastPoRate ||
        prevItem.quantity !== nextItem.quantity ||
        prevItem.outstandingIndentNo !== nextItem.outstandingIndentNo ||
        prevItem.outstandingIndentDate !== nextItem.outstandingIndentDate ||
        prevItem.outstandingPoNo !== nextItem.outstandingPoNo ||
        prevItem.outstandingPoDate !== nextItem.outstandingPoDate ||
        prevItem.specialInstruction !== nextItem.specialInstruction ||
        prevItem.remarks !== nextItem.remarks ||
        prevItem.modeOfTender !== nextItem.modeOfTender ||
        prevItem.vendorDetails !== nextItem.vendorDetails ||
        !compareChildOfChildList(prevItem.indentItemChildOfChildList, nextItem.indentItemChildOfChildList)
      ) {
        return false;
      }
    }
  
    return true;
  };
  
  // Helper function to compare indentItemChildOfChildList
  const compareChildOfChildList = (prevList, nextList) => {
    if (prevList.length !== nextList.length) {
      return false;
    }
  
    for (let i = 0; i < prevList.length; i++) {
      const prevChild = prevList[i];
      const nextChild = nextList[i];
  
      if (
        prevChild.balanceStock !== nextChild.balanceStock ||
        prevChild.cpSi !== nextChild.cpSi ||
        prevChild.cpLast3Yr !== nextChild.cpLast3Yr ||
        prevChild.cpLast1Yr !== nextChild.cpLast1Yr ||
        prevChild.reorderLevel !== nextChild.reorderLevel
      ) {
        return false;
      }
    }
  
    return true;
  };
  