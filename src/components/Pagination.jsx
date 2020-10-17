import React from "react";
const Pagination = ({totalItems,itemsPerPage,currentPage,changePage}) => {
    if(!totalItems || !totalItems.length) {
        return null;
    }
    const pageNumber = [];
    const totalPages = +totalItems.length / +itemsPerPage;
    for (let index = 1;index <= Math.ceil(totalPages);index ++) {
        pageNumber.push(index);
    }
    let listPages;
    if(pageNumber.length) {
        listPages = pageNumber.map((p,index) => (
            <li key={index} className={`page-item ${p === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={(e) => changePage(e,p)}>{p}</button>
            </li>
        ));
    }
    return (
        <React.Fragment>
            <nav className={'mt-2'}>
                <ul className="pagination justify-content-center">
                    <li key={'previous'} className="page-item">
                        <button
                            disabled={currentPage === 1}
                            onClick={(e) => changePage(e,currentPage-1)}
                            className="page-link" >Previous
                        </button>
                    </li>
                    {listPages}
                    <li key={'next'} className="page-item">
                        <button
                            disabled={currentPage >= pageNumber[pageNumber.length-1]}
                            onClick={(e) => changePage(e,currentPage+1)}
                            className="page-link" >Next</button>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}
export default Pagination;