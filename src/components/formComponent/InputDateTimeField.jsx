import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./../Datepicker.css";

// Helper function for range
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
};

// Format date and time
const formatDateTime = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Parse date string with time
const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart ? timePart.split(":").map(Number) : [0, 0, 0];
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day, hours, minutes, seconds);
};

const InputDateTimeField = ({
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

    const years = range(1990, getYear(new Date()));
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
        const formattedDateTime = date ? formatDateTime(date) : null;
        onChange({ target: { name, value: formattedDateTime } });
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
                    selected={startDate || null}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    timeIntervals={1}
                    placeholderText="DD/MM/YYYY HH:mm:ss"
                    disabled={isDefault}
                    minDate={minDate ? parseDateString(minDate) : null}
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

export default InputDateTimeField;
