 {/* <form onSubmit={handleSearch} style={{ boxSizing: "border-box" }} className="px-2 py-4 custom-width mx-autoshadow-sm">
                            <div className="row mx-auto mw-100">
                                {showValidationMessage && (
                                    <div className="text-danger mt-2 text-center">
                                        At least one field is required for search.
                                    </div>
                                )}
                                <div className="form-group col-lg-6 d-md-flex mt-3 align-items-center gap-2">
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="challanNo">Challan No:</label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="challanNo"
                                                    name="challanNo"
                                                    value={searchFormData.challanNo}
                                                    onChange={handleChange}
                                                    placeholder="Challan No"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="deptChallanNo">Dpt Chal No:</label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="deptChallanNo"
                                                    name="deptChallanNo"
                                                    value={searchFormData.deptChallanNo}
                                                    onChange={handleChange}
                                                    placeholder="Dept Challan No"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6 d-md-flex mt-3 align-items-center gap-2">
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="challnDate">Challan Date:</label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="date"
                                                    className="form-control custome-border"
                                                    id="challnDate"
                                                    name="challnDate"
                                                    value={searchFormData.challnDate}
                                                    onChange={handleChange}
                                                    placeholder="Challan Date"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="depoCode">Depo Code:</label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="depoCode"
                                                    name="depoCode"
                                                    value={searchFormData.depoCode}
                                                    onChange={handleChange}
                                                    placeholder="Depo Code"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6 d-md-flex mt-3 align-items-center gap-2">
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="depoName">
                                                    Depo Name:
                                                </label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="depoName"
                                                    name="depoName"
                                                    value={searchFormData.depoName}
                                                    onChange={handleChange}
                                                    placeholder="Depo Name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">

                                            <div className="text-nowrap">
                                                <label htmlFor="poDate">
                                                    Po Date:
                                                </label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="date"
                                                    className="form-control custome-border"
                                                    id="poDate"
                                                    name="poDate"
                                                    value={searchFormData.poDate}
                                                    onChange={handleChange}
                                                    placeholder="Po Date"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6 d-flex mt-3 align-items-center">
                                    <div className="d-flex gap-2 align-items-center w-100 pr-2">
                                        <div className="text-nowrap">
                                            <label htmlFor="poNo">
                                                PO Number:
                                            </label>
                                        </div>
                                        <div className="w-100">
                                            <input
                                                type="text"
                                                className="form-control custome-border"
                                                id="poNo"
                                                name="poNo"
                                                value={searchFormData.poNo}
                                                onChange={handleChange}
                                                placeholder="poNo"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6 d-md-flex mt-3 align-items-center gap-2">
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="challanNo">
                                                    Vender code:
                                                </label>
                                            </div>
                                            <div className="mw-md-50 w-100">
                                                <input
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="vendorCode"
                                                    name="vendorCode"
                                                    value={searchFormData.vendorCode}
                                                    onChange={handleChange}
                                                    placeholder="Vendor Code"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 pr-2 mt-md-0 mt-3">
                                        <div className="d-flex gap-2 align-items-center mw-100">
                                            <div className="text-nowrap">
                                                <label htmlFor="ItemCode">
                                                    Vender Name:
                                                </label>
                                            </div>
                                            <div className="w-100">
                                                <input
                                                    type="text"
                                                    className="form-control custome-border"
                                                    id="vendorName"
                                                    name="vendorName"
                                                    value={searchFormData.vendorName}
                                                    onChange={handleChange}
                                                    placeholder="Vendor Name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
                                <button type="submit" className="btn btn-sm custome-button-color1 text-white mx-2">
                                    <FaSyncAlt className="me-1" />{loading ? 'Search...' : 'Search'}

                                </button>
                            </div>
                        </form> */}