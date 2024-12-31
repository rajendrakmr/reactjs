import React ,{useCallback} from 'react'; 
const IndentItemChildListComponent = ({ indentItemChildList, setFormData, formData }) => {

  console.log('IndentItemChildListComponent')
  const handleItemChange = useCallback((index, e) => {
    const { name, value } = e.target;
    const updatedList = [...indentItemChildList];
    updatedList[index][name] = value;

    setFormData({
      ...formData,
      indentItemChildList: updatedList
    });
  },[setFormData]); 

  return (
    <div>
      <h2>Indent Item Child List</h2>
      {indentItemChildList.map((item, index) => (
        <div key={index}>
          <label>Depo Code: </label>
          <input
            type="text"
            name="depoCode"
            value={item.depoCode}
            onChange={(e) => handleItemChange(index, e)}
          />
          <br />

           
        </div>
      ))}
    </div>
  );
};

// Custom comparison function to optimize re-renders
const areEqual = (prevProps, nextProps) => { 
     return prevProps.indentItemChildList === nextProps.indentItemChildList;
};

// Wrap the component in React.memo and pass the custom comparison function
export default React.memo(IndentItemChildListComponent, areEqual);


// // export default App;
// import React, { useState } from 'react';
// import IndentItemChildListComponent from './IndentItemChildListComponent';
// // import IndentRefChildrenComponent from './IndentRefChildrenComponent';

// const App = () => {
//   const [formData, setFormData] = useState({
//     deptIndentNo: "",
//     purposeOfProcurement: "",
//     consigneeName: "",
//     placeOfDelivery: "",
//     deptIndentDate: "",
//     proposeddateOfDelivery: "",
//     indentorDesignation: "",
//     indentorDepartment: "",
//     indentorDesignationName: "",
//     indentorDepartmentName: "",
//     rejectionReason: "",
//     groupNo: "",
//     subGroupNo: "",
//     groupName: "",
//     subGroupName: "",
//     indentStatus: "",
//     loginId: "createdBy",
//     selectedLoginId: "",
//     indentItemChildList: [
//       {
//         depoCode: "",
//         itemCode: "",
//         jobCode: "",
//         unitCode: "",
//         lastPoNo: "",
//         lastPoDate: "",
//         lastPoRate: "",
//         quantity: "",
//         outstandingIndentNo: "",
//         outstandingIndentDate: "",
//         outstandingPoNo: "",
//         outstandingPoDate: "",
//         specialInstruction: "",
//         remarks: "",
//         modeOfTender: "",
//         vendorDetails: "",
//         indentItemChildOfChildList: [
//           {
//             balanceStock: "",
//             cpSi: "",
//             cpLast3Yr: "",
//             cpLast1Yr: "34",
//             reorderLevel: ""
//           }
//         ]
//       }
//     ],
//     indentRefChildren: [
//       {
//         refType: "",
//         refNo: "",
//         refDate: "",
//         refDesc: "",
//         refIsActive: "Y",
//         refUpdDate: "",
//         refUpdFile: "xyz"
//       }
//     ],
//     routingDetailsModuleList: []
//   });

//   // Function to update form data
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div>
//       <h1>Indent Form</h1>
//       <form>
//         <label>Dept Indent No: </label>
//         <input
//           type="text"
//           name="deptIndentNo"
//           value={formData.deptIndentNo}
//           onChange={handleInputChange}
//         />
//         <br />

//         <label>Purpose of Procurement: </label>
//         <input
//           type="text"
//           name="purposeOfProcurement"
//           value={formData.purposeOfProcurement}
//           onChange={handleInputChange}
//         />
//         <br />

//         {/* Pass data to IndentItemChildListComponent */}
//         <IndentItemChildListComponent
//           indentItemChildList={formData.indentItemChildList}
//           setFormData={setFormData}
//           formData={formData}
//         /> 
//       </form>
//     </div>
//   );
// };

// export default App;

