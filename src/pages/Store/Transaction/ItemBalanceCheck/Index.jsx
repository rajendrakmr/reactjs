import React, { useCallback, useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import { GetDepoCode, GetItemCode } from "./apiService";
import { submitPostData } from "../../../../redux/reducer/commonApiSlice";
import { convertDate } from "../../../../utils/helpers";
import MandatoryField from "../../../../components/MandatoryField";
import InputFieldComponent from "../../../../components/formComponent/InputFieldComponent";
import SelectFieldComponent from "../../../../components/formComponent/SelectFieldComponent";
import debounce from 'lodash/debounce';
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";

const Index = () => {
    const dispatch = useDispatch();
    const [itemOptions, setItemOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [depoOptions, setDepoOptions] = useState();
    const [itemPgNo, setItemPgNo] = useState(1);
    const [itemPgSize, setItemPgSize] = useState(10);
    const { isSubmit } = useSelector(state => state.commonApi);

    useEffect(() => {
        GetDepoCode(dispatch, setDepoOptions)
        setItemPgSize(10)
    }, [])




   



    // form validation 
    const validationSchema = Yup.object({
        itemCode: Yup.string().required("Item Code is required."),
        depoCode: Yup.string().required("Depot Code is required.")
    });

    const initialValues = {
        depoCode: "",
        depoName: "",
        itemName: "",
        itemCode: "",
        AsOnDate: "",
    };



    const handleFormSubmit = async (values, { setValues }) => {
        try {
            const payload = { itemCode: values.itemCode, depoCode: values.depoCode, AsOnDate: convertDate(values.AsOnDate) }

            const action = await dispatch(submitPostData({ dataInfo: payload, indicatorsPath: '/balance/item-balance-qty' }));
            if (submitPostData.fulfilled.match(action) && action?.payload) {
                setValues((prevValues) => ({
                    ...prevValues,
                    ...action?.payload
                }));
            } else {
                setErrorMessage(action?.payload?.error)
            }
        } catch (error) {
        } finally {
            setTimeout(async () => {
                setErrorMessage('')
            }, 5000);

        }
    };


    const handleChangeSelect = useCallback(async (e, field, setFieldValue, initialData, setTouched) => {
        const { value, items, AsOnDate } = e;
        setFieldValue(field, value);
        if (field == "depoCode") {
            setFieldValue('depoName', value);
            setFieldValue('depoName', items.depoDescription);
            setFieldValue('itemCode', '');
            setFieldValue('itemName', '');
            setFieldValue('AsOnDate', '');
            setFieldValue('ItemBalanceQty', '');
            setFieldValue('avgRate', '');
            setTouched({ ...initialData, itemCode: false });
            const payload = { itemCode: "", depoCode: value, pageNumber: 1, pageSize: itemPgSize }
            await GetItemCode(dispatch, setItemOptions, payload, setFieldValue, false)
        }
        if (field == "itemCode") {
            setTouched({ ...initialData, itemCode: false });
            setFieldValue('itemName', items.itemDescription);
            setFieldValue('AsOnDate', AsOnDate);
            setFieldValue('ItemBalanceQty', '');
            setFieldValue('avgRate', '');
        }
    }, []);
     //on mouse scroll  cl
     const onMoreItemScroll = useCallback(async (initial, pageNumber) => {
        setIsLoading(true);
        setItemPgNo(preNo => preNo + 1);
        const payload = { itemCode: "", depoCode: initial.depoCode, pageNumber: pageNumber + 1, pageSize: itemPgSize }
        await GetItemCode(dispatch, setItemOptions, payload, true)
        setTimeout(async () => { setIsLoading(false); }, 2000);
    }, []);




    const callApi = useCallback(
        debounce(async (itemCode, depoCode) => {
            setIsLoading(true);
            setItemPgNo(preNo => preNo + 0);
            const payload = { itemCode: itemCode, depoCode: depoCode, pageNumber: 0, pageSize: itemPgSize }
            await GetItemCode(dispatch, setItemOptions, payload, true)
            setTimeout(async () => { setIsLoading(false); }, 2000);
        }, 500),
        []
    );

    const handleKeyDown = async (event, depoCode) => {
        const inputValue = event.target.value;
        if (inputValue.length >= 8) {
            await callApi(inputValue, depoCode)
        }
        if (event.key === 'Enter') {
            await callApi(inputValue, depoCode)
        }
    };

    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Item Balance Checking' }} />
            <div className="pb-4">
                <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                    <h6>Item Balance Checking</h6>
                </div>
                <MandatoryField />
                <div className="_rkContentBorder row py-2">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ values, touched, errors, setFieldValue, handleChange, setTouched }) => (
                            <Form className="px-3 mx-auto ">
                                <div className="row">
                                    <SelectFieldComponent
                                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode', setFieldValue, values, setTouched)}
                                        options={depoOptions}
                                        value={values.depoCode}
                                        id="depoCode"
                                        label="Depot Code"
                                        name="depoCode"
                                        error={errors.depoCode}
                                        touched={touched.depoCode}
                                        required={true}
                                        col="col-md-3"
                                    />
                                    <InputFieldComponent label="Depot Name" type="text" name="depoName" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-3" />


                                    <SelectFieldComponent
                                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'itemCode', setFieldValue, values, setTouched)}
                                        options={itemOptions}
                                        id="itemCode"
                                        label="Item Code"
                                        name="itemCode"
                                        value={values.itemCode}
                                        onMenuScrollToBottom={() => onMoreItemScroll(values, itemPgNo)}
                                        onKeyDown={(event) => handleKeyDown(event, values.depoCode)}
                                        error={errors.itemCode}
                                        touched={touched.itemCode}
                                        isLoading={isLoading}
                                        required={true}
                                        col="col-md-3"
                                    />
                                    <InputFieldComponent label="Item Name" type="text" name="itemName" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-3" />
                                    <InputFieldComponent label="As On Date" type="text" name="AsOnDate" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-3" />
                                    <InputFieldComponent label="Item Balance Qty" type="text" name="ItemBalanceQty" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-3" />
                                    <InputFieldComponent label="Avg Rate" type="text" name="avgRate" onChange={handleChange} touched={touched} errors={errors} isDisabled={true} col="col-md-3" />
                                </div>

                                <div className="row custom-width mx-auto  w-100" style={{ marginRight: "-25px !important" }}>
                                    <div className="form-group col-md-12 mt-3 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-sm custome-button-color1 text-white" disabled={isSubmit}>
                                            {isSubmit ? 'Processing...' : <><FaSyncAlt /> Check</>}
                                        </button>
                                    </div>
                                </div>

                                {isSubmit && <SearchLoading />}

                                {errorMessage && (<div className="row custom-width mx-auto"  >
                                    <div className="form-group col-md-12 mt-3 d-flex justify-content-end text-danger">
                                        {errorMessage}
                                    </div>
                                </div>)}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </section>
    );
};

export default Index;
