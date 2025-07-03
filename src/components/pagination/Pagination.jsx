import React from 'react'

const Pagination = ({ pagination, onPageChange }) => {
    const { currentPage, lastPage } = pagination;

    const handleClick = (page, e) => {
        e.preventDefault();

        if (page >= 1 && page <= lastPage && page !== currentPage) {
            onPageChange(page);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>


            <div className='pagination'>
                {/* <button type='button' className='pagination_btn'>Prev</button> */}

                <ul className="">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className={`page-link`} onClick={(e) => handleClick(currentPage - 1, e)}>Prev</a>
                    </li>

                    {pageNumbers.map((num) => (
                        <li key={num} className="page-item">
                            <a className={`page-link ${currentPage === num ? 'active' : ''}`} onClick={(e) => handleClick(num, e)}>
                                {num}
                            </a>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                        <a className={`page-link`} onClick={(e) => handleClick(currentPage + 1, e)}>Next</a>
                    </li>
                </ul>

                {/* <button type='button' className='pagination_btn'>Next</button> */}
            </div>

        </>
    )
}

export default Pagination