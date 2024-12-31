const CustomInputField = ({ label, name, type, value, onChange, placeholder }) => {
    return (
        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-3">
            <label htmlFor={name} className="col-form-label" style={{ flex: '0 0 40%' }}>{label}<span className="text-danger text-bold">*</span></label>
            <input
                type={type}
                className="custome-input-height form-control custome-border"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ flex: '1 1 auto' }}
            />
        </div>
    );
};
export default CustomInputField