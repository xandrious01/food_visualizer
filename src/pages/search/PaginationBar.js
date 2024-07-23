import { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";
import '../../styles/Search.css'

const PaginationBar = ({query, maxPage, currPageNum}) => {

    const [activePage, setActivePage] = useState(1);
    const numPerPage = 50;
    const numPagesToDisplay = maxPage < 9 ? maxPage : 9;
    const pages = Array.from({ length: numPagesToDisplay }, (_, index) => index + 1);
    console.log(pages)

  

    return (
        <Pagination className="searchPaginationBar">
            <PaginationItem>
                <PaginationLink
                    disabled={activePage === 0 ? true : false}
                    first
                    href={`/search/${query}/page/1`}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    href={`/search/${query}/page/${currPageNum-1}`}
                    previous
                    disabled={activePage === 0 ? true : false}

                />
            </PaginationItem>
            {pages.map(i => {

                return (
                    <PaginationItem
                        key={i}>
                        <PaginationLink
                            href={`/search/${query}/page/${i}`}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            })}

            <PaginationItem>
                <PaginationLink
                    href={`/search/${query}/page/${currPageNum+1}`}
                    next
                    disabled={activePage === pages.length ? true : false}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    href={`/search/${query}/page/${maxPage}`}
                    disabled={activePage === pages.length ? true : false}
                    last
                />
            </PaginationItem>
        </Pagination>
    )
}

export default PaginationBar;