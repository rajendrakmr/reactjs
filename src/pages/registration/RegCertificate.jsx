import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";


function RegCertificate({ children }) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setToggleSidebar(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDropdownToggle = (index) => {
    setIsCollapse((prev) => (prev === index ? null : index));
  };

  return (
    <div className="container-fluid p-0 d-flex flex-row m-0">
      {/* Sidebar Section Start */}
      <div className={`row m-0 sidebar_container ${toggleSidebar ? "" : "sidebarToogleCls"}`}>
        <Sidebar isCollapse={isCollapse} handleDropdownToggle={handleDropdownToggle}/>
      </div>
      {/* Sidebar Section End */}

      <div className="row w-100 d-flex m-0 p-0">
        <Header  toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} 
        />
        
        {/* Children Section Start */}
        <div className="col-12 children_container m-0 p-0 mt-5">
        <section className='container-fluid reg_certificate_container p-3'>
        <div className="row m-0 p-0">
            <div className="box d-flex flex-column align-items-center pt-4">
                <table cellPadding={0} cellSpacing={0} align='center' className='regTable regTable_header'>
                    <thead>
                        <tr>
                            <th width={"20%"}> 
                                <img src="http://ausnep.loc/media/clients/au-logo.jpg" alt="logo" className='thead-logo-img' />
                             </th>
                             <th width={"80%"} align="left">
                                <h2 >असम विश्वविद्यालय, सिलचर, असम</h2>
                                <h3 >ASSAM UNIVERSITY, SILCHAR, ASSAM</h3>
                                <h4 style={{fontSize:'10.5px'}}>(A CENTRAL UNIVERSITY CONSTITUTED BY AN ACT OF PARLIAMENT)</h4>
                                <h4 className="reg-cer" >PROVISIONAL REGISTRATION CERTIFICATE</h4>
                            </th>
                        </tr>
                    </thead>
                </table>
                <table cellPadding={0} cellSpacing={0} align='center' className='regTable regTable_body'>
                    <tbody >
                        <tr >
                            <td>SL No :</td>
                            <td className='text-end' style={{fontWeight:'500', fontSize:"13px"}}>Date : 03/08/2024</td>
                        </tr>
                        <tr>
                            <td><i>Certified that</i></td>
                            <td><b>DEBENDRA  TIMUNG</b></td>
                        </tr>
                        <tr>
                            <td><i>Son of</i></td>
                            <td><b>SURESH TIMUNG</b></td>
                        </tr>
                        <tr>
                            <td><i>and</i></td>
                            <td><b>BINA RONGHIPI</b></td>
                        </tr>
                        <tr>
                            <td colspan={2}><i>is registered with the University.</i></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><i>His registration number is </i><span className="regNo">20230022742</span> <i> of </i> <span className="regYear">2023-2024</span></td>
                        </tr>
                        <tr>
                            <td rowspan={1}>
                                
                                <img src="https://api.qrserver.com/v1/create-qr-code/?data=20230022742&amp;size=75x75" alt="QR" title="QR" />                    
                            </td>
                            
                        </tr>
                        <tr>
                            <td colspan={2} align={"right"} className='pt-0 pb-0'>
                                <h4  style={{fontSize:"16px"}}>Astt. Registrar / Dy. Registrar / Jt. Registrar</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-section ">
                    N.B: For any correction the Registration Certificate must be returned to University by the 
                    Principal/HOD immediately <br/> <span>No Complaint shall be entertained after one month from the date of 
                    issue of the certificate</span>
                </p>
            </div>
        </div>
    </section>
        </div>
        {/* Children Section End */}

        {/* Sidebar Footer Section start  */}
        <Footer />
        {/* Sidebar Footer Section end */}
      </div>
    </div>
  );
}

export default RegCertificate;
