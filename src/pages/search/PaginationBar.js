import { useContext } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { TriggerReloadContext } from "../../contexts";
import "../../styles/Search.css";

const PaginationBar = ({ query, maxPage, currPageNum }) => {
  const numPerPage = 50;
  const numPagesToDisplay = maxPage < 9 ? maxPage : 9;
  let pages = Array.from(
    { length: numPagesToDisplay },
    (_, index) => index + 1
  );
  const navigate = useNavigate();
  const {setReloadOnSearch} = useContext(TriggerReloadContext)

  function updatePageNumbers() {
    if (currPageNum*1 > 5 && currPageNum*1 < maxPage * 1 - 4) {
      pages = pages.map((x) => x + currPageNum*1 - 5);
      return pages;
    } else if (currPageNum*1 >= 1 && currPageNum*1 < 5) {
      return pages;
    } else if (currPageNum*1 >= maxPage * 1 - 4 || currPageNum*1 === maxPage) {
      let difference = maxPage - 9;
      pages = pages.map((x) => x + difference);
      return pages;
    }
  }

  updatePageNumbers();

  const handlePageClick = (targetPath) => {
    navigate(targetPath)
    setReloadOnSearch(true)
  }

  return (
    <Pagination className="searchPaginationBar">
      <PaginationItem disabled={currPageNum*1 === 1 ? 'disabled' : ''}>
        <PaginationLink first onClick={() => handlePageClick(`/search/${query}/page/1`)} />
      </PaginationItem>
      <PaginationItem disabled={currPageNum*1 === 1 ? 'disabled' : ''}>
        <PaginationLink
          onClick={() => handlePageClick(`/search/${query}/page/${currPageNum*1 -1}`)}
          previous
        />
      </PaginationItem>

      {pages.map((i) => {
        return (
          <PaginationItem key={i} active={currPageNum*1===i ? 'active' : ''}>
            <PaginationLink onClick={() => handlePageClick(`/search/${query}/page/${i}`)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem disabled={currPageNum*1 === maxPage ? 'disabled' : ''}>
        <PaginationLink
          onClick={() => handlePageClick(`/search/${query}/page/${currPageNum*1 +1}`)}
          next
        />
      </PaginationItem>
      <PaginationItem disabled={currPageNum*1 === maxPage ? 'disabled' : ''}>
        <PaginationLink last onClick={() => handlePageClick(`/search/${query}/page/${maxPage}`)}  />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationBar;
