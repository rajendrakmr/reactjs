import React  from "react";
import BreadCrumb from "../components/layout/BreadCrumb";
 
function Layout() { 
  const cardStyle = {
    background: 'linear-gradient(135deg, #156565, #156544, #156544, #156565)',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in-out' // Apply fade-in animation
  };



  return (
    <section>
    <div className="col-12 ">
    <BreadCrumb item={{ label: '', 'sub_label': '', active: true, current: '' }} />
    <div className="">
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title text-center">The Durgapur Projects Limited</h5>
            <h6 className="card-subtitle mb-2 text-center font-italic">
              (A Government of West Bengal Enterprise)
              Administrative Building
              Durgapur - 713201
            </h6>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Layout;
