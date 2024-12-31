import React from "react";

function Display_marks() {
  return (
    <section className="container-fluid display_marks_container pt-4 pb-4">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-lg-5 col-12 m-0  h-100 ps-3">
          <span style={{ fontSize: "18px", fontWeight: 500 }}>
            Internal Exam
          </span>{" "}
          |{" "}
          <span style={{ fontSize: "14px", color: "#60C8E3" }}>
            Examination (Pre) -{" "}
            <span className="text-black">Internal Exam</span>
          </span>
        </div>
        <div className="col-lg-7 col-12 mt-md-0 mt-3 d-flex align-items-center justify-content-lg-start gap-2 justify-content-center pt-lg-0 pb-lg-0 pt-3 pb-md-2 pb-0">
          <h6 className="dash_top_heading">
            Four Year Undergraduate Programmee Political Science
          </h6>
          <div style={{ height: "70px", width: "70px" }}>
            <img
              // src="assets/images/loginBG.jpg"
              alt=""
              className="h-100 w-100"
            />
          </div>
        </div>
      </div>

      <div className="row display_marks_table_container p-md-2 p-0 pt-5 pb-5 d-flex justify-content-center">
        <div className="col-10 marks_tables p-md-4 p-2">
          <h4 className="pt-2 ps-md-0 ps-2">Internal Marks</h4>
          <div className="w-100 overflow-auto">
            <table className="table align-middle table-striped fs-6 gy-5">
              <thead>
                <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Semester
                  </th>
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Course Type
                  </th>
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Paper Code
                  </th>
                  <th width={"40%"} className="bg-blue-oleo bg-font-blue-oleo">
                    Paper Name
                  </th>
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Obtained Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">DSC</td>
                  <td className="text-center">PLSDSC101T</td>
                  <td>Introduction to Political Theory</td>
                  <td className="text-center">9</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">DSC</td>
                  <td className="text-center">PLSDSC102T</td>
                  <td>Indian Government and Politics</td>
                  <td className="text-center">8</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">DSM</td>
                  <td className="text-center">EDCDSM101T</td>
                  <td>Introduction to Educational Psychology</td>
                  <td className="text-center">9</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">IDC</td>
                  <td className="text-center">PHPIDC101T</td>
                  <td>Applied Ethics</td>
                  <td className="text-center">12</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">SEC</td>
                  <td className="text-center">PLSSEC101T</td>
                  <td>Legislative Support</td>
                  <td className="text-center">9</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">VAC</td>
                  <td className="text-center">UINVAC101T</td>
                  <td>Undrstanding India</td>
                  <td className="text-center">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-10 marks_tables p-4">
          <h4 className=" mb-3 ps-md-0 ps-2">Attendance Marks</h4>
          <div className="w-100 overflow-auto">
            <table className="table align-middle table-striped fs-6 gy-5">
              <thead>
                <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Semester
                  </th>
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Course Type
                  </th>
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    Paper Code
                  </th>
                  <th width={"40%"} className="bg-blue-oleo bg-font-blue-oleo">
                    Paper Name
                  </th>
                  <th
                    width={"15%"}
                    className="bg-blue-oleo bg-font-blue-oleo text-center"
                  >
                    PERCENTAGE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">DSC</td>
                  <td className="text-center">PLSDSC101T</td>
                  <td>Introduction to Political Theory</td>
                  <td className="text-center">9</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">DSC</td>
                  <td className="text-center">PLSDSC102T</td>
                  <td>Indian Government and Politics</td>
                  <td className="text-center">8</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">DSM</td>
                  <td className="text-center">EDCDSM101T</td>
                  <td>Introduction to Educational Psychology</td>
                  <td className="text-center">9</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">IDC</td>
                  <td className="text-center">PHPIDC101T</td>
                  <td>Applied Ethics</td>
                  <td className="text-center">12</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">SEC</td>
                  <td className="text-center">PLSSEC101T</td>
                  <td>Legislative Support</td>
                  <td className="text-center">9</td>
                </tr>
                <tr className="odd gradeX">
                  <td className="text-center">1</td>
                  <td className="text-center">VAC</td>
                  <td className="text-center">UINVAC101T</td>
                  <td>Undrstanding India</td>
                  <td className="text-center">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Display_marks;
