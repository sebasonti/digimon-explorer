import { useState, useEffect } from 'react';
import DigimonList from './DigimonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [digimon, setDigimon] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [currentPageUrl, setCurrentPageUrl] = useState(`https://www.digi-api.com/api/v1/digimon?pageSize=${itemsPerPage}`);
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel;
    async function fetchData() {
      const res = await axios.get(currentPageUrl, { cancelToken: new axios.CancelToken(c => cancel = c) });
      setDigimon(res.data.content);
      const prevPage = res.data.pageable.previousPage;
      setPrevPageUrl(prevPage ? `${prevPage}&pageSize=${itemsPerPage}` : prevPage);
      const nextPage = res.data.pageable.nextPage;
      setNextPageUrl(nextPage ? `${nextPage}&pageSize=${itemsPerPage}` : nextPage);
      setTotalPages(Math.ceil(res.data.pageable.totalElements / +itemsPerPage) - 1);
      setLoading(false);
    }
    fetchData();

    return () => cancel();
  }, [currentPageUrl, itemsPerPage]);

  if (loading) return "Loading...";

  function goToFirstPage() {
    setCurrentPageUrl(`https://www.digi-api.com/api/v1/digimon?pageSize=${itemsPerPage}`);
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function goToLastPage() {
    setCurrentPageUrl(`https://www.digi-api.com/api/v1/digimon?page=${totalPages}&pageSize=${itemsPerPage}`)
  }

  function updateItemsPerPage(newItemsPerPage) {
    setItemsPerPage(newItemsPerPage);
    setCurrentPageUrl(`https://www.digi-api.com/api/v1/digimon?pageSize=${newItemsPerPage}`);
  }

  return (
    <>
      <Pagination
        goToFirstPage={goToFirstPage}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToLastPage={goToLastPage}
        updateItemsPerPage={updateItemsPerPage}
        selectedItemsPerPage={itemsPerPage}
      />
      <DigimonList digimon={digimon} />
    </>
  );
}

export default App;
