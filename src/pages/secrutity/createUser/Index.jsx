import React from "react"; 
import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/layout/BreadCrumb";


const Index = () => { 
  return (
    <section>
      <div className="container mt-5">
        <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Login Details Maintenance' }} />
        <div className="row">
          <div className="col-md-6">
            <div className="card border border-dark">
              <div className="card-body">
                <h5 className="card-title">New User</h5>
                <p className="card-text">
                  Create a new login user account with a unique username and password. Grant user privileges to define accessibility to the system.
                </p>
                <Link to='/user/create-user'>
                  <button className="btn btn-sm btn-secondary btn-block">Create User</button>
                </Link>

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border border-dark">
              <div className="card-body">
                <h5 className="card-title">Modify User</h5>
                <p className="card-text">
                  View and modify the details of an existing login user for the selected company. Update user information and privileges as needed.
                </p>
                <Link to='/user/modify'>
                  <button className="btn btn-sm btn-danger btn-block">Modify User</button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Index;
