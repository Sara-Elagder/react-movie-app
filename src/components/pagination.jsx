import React from "react";
import "./pagination.css"; // We'll create this file shortly

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>

      {currentPage > 1 && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}

      <button className="pagination-btn-active">
        {currentPage}
      </button>

      {currentPage < totalPages && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>
    </div>
  );
};

export default Pagination;