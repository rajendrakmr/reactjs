import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from './../Datepicker.css'
// Range helper
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
};

 
const formatDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) return ''; 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

 
const parseDateString = (dateString) => {
    if (!dateString) return null;  
    const [day, month, year] = dateString.split("/").map(Number);
    if (!day || !month || !year) return null; 
    return new Date(year, month - 1, day); 
};

const InputDateField = ({
    name,
    label,
    isRequired = false,
    errorMsg,
    hasError,
    col = "col-md-3",
    inputData,  
    onChange,  
    minDate,
    isDefault = false
}) => {
    const [startDate, setStartDate] = useState(inputData[name] ? parseDateString(inputData[name]) : null);  

  
    useEffect(() => {
        setStartDate(inputData[name] ? parseDateString(inputData[name]) : null);
    }, [inputData[name]]);

    const years = range(1990, getYear(new Date()) +5);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Handle date change
    const handleDateChange = (date) => {
        setStartDate(date);  
        const formattedDate = date ? formatDate(date) : null;
        onChange({ target: { name, value: formattedDate } }); 
    };

    return (
        <div className={`form-group ${col} d-flex mt-1 align-items-center`}>
            <div className="col-sm-5 col-4">
                <label htmlFor={name} className="mr-3 pe-7"> 
                    {label}:{isRequired && <span className="text-danger text-bold">*</span>}
                </label>
            </div>
            <div className="col-sm-7 col-8">
                <DatePicker 
                popperClassName={styles.datePickerPopper}
                    className={`form-control custome-input-height custome-border ${isRequired ? 'font-weight-bold' : ''}`}
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <div
                            style={{
                               
                                margin: 10,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FontAwesomeIcon
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                icon={faChevronLeft}
                            />
                            <select
                                value={getYear(date)}
                                onChange={({ target: { value } }) => changeYear(Number(value))}
                                style={{ margin: "0 10px" }}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={months[getMonth(date)]}
                                onChange={({ target: { value } }) =>
                                    changeMonth(months.indexOf(value))
                                }
                                style={{ margin: "0 10px" }}
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                                icon={faChevronRight}
                            />
                        </div>
                    )}
                    selected={startDate || null} // Ensure `null` when no valid date
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    disabled={isDefault}
                    minDate={minDate ? parseDateString(minDate) : null} // Parse minDate if provided
                />
                {hasError(name) && (
                    <span className="text-danger" style={{ fontSize: "11px", marginTop: "0" }}>
                        {errorMsg[name]}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputDateField;
