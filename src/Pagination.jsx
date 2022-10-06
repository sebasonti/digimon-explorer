import React from "react";

export default function Pagination({
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    updateItemsPerPage,
    selectedItemsPerPage,
}) {
    function handleItemsPerPageChange(event) {
        updateItemsPerPage(event.target.value);
    }

    return (
        <div>
            <button onClick={goToFirstPage}>{"|<"}</button>
            <button onClick={goToPrevPage} disabled={goToPrevPage == null}>
                {"<<"}
            </button>
            <button onClick={goToNextPage} disabled={goToNextPage == null}>
                {">>"}
            </button>
            <button onClick={goToLastPage}>{">|"}</button>
            <select
                onChange={handleItemsPerPageChange}
                name="items-per-page"
                id="items-per-page"
                value={selectedItemsPerPage}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    );
}
