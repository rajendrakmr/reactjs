import { faCaretLeft, faCaretRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages, handlePageChange,totalCount=0 }) => {

    return (
        <div className="pagination  rr d-flex justify-content-start gap-3 mt-3">
            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
               <FontAwesomeIcon icon={faCaretLeft} /> Previous
            </button>

            <span>Showing: {currentPage + 1}/{totalPages} of {totalCount} Records</span>
            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
            >
                Next <FontAwesomeIcon icon={faCaretRight} />
            </button> 
        </div>
    );
};
export default Pagination