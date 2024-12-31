import React from 'react';
import PropTypes from 'prop-types';

const BreadCrumb = ({ item }) => {
  return (
    <>
      <nav aria-label="breadcrumb mt-5">
        <ol className="breadcrumb" style={{ marginBottom: "0px" }}>
          <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
          {item.label && <li className="breadcrumb-item">{item.label ? item.label : ''}</li>}
          {item.sub_label && <li className="breadcrumb-item">{item.sub_label ? item.sub_label : ''}</li>}
          {item.current && <li className="breadcrumb-item active" aria-current="page">{item.current ? item.current : ''}</li>}
        </ol>
      </nav>

    </>
  );
};
BreadCrumb.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool
  }).isRequired
};

export default BreadCrumb;
