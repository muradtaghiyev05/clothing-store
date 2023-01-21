import { useEffect, useState } from 'react';
import { Toaster } from "react-hot-toast";
import ReactPaginate from 'react-paginate';
import 'react-lazy-load-image-component/src/effects/blur.css'
import ProductCard from '../product-card/ProductCard';
import SearchFilter from '../filters/search-filter/SearchFilter';
import SortFilter from '../filters/sort-filter/SortFilter';
import { motion } from "framer-motion"
import { useParams, useSearchParams } from 'react-router-dom';
import { clothes } from '../../clothes/data';

const productsPerPage = 8;
const sortTypes = {
    up: {
        fn: (a, b) => a.price - b.price
    },
    down: {
        fn: (a, b) => b.price - a.price
    },
    default: {
        fn: (a, b) => a
    }
};

const Products = () => {

    const params = useParams();
    const productsType = params.productsCategory;
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log(Object.fromEntries([...searchParams]));

    // category variable
    const [filteredClothes, setFilteredClothes] = useState([]);

    // search variables
    const searchText = searchParams.get('title') || '';
    const searchResults = [...filteredClothes].filter((product) =>
        product.title.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        product.brand.toLowerCase().includes(searchText.trim().toLowerCase()));

    // pagination variables
    const pageNumber = parseInt(searchParams.get('page')) || 0;
    const pagesVisited = pageNumber * productsPerPage;
    const pageCount = Math.ceil(searchResults.length / productsPerPage);

    // sorting variables
    const currentSort = searchParams.get('sorting') || 'default';

    // changing page
    const changePage = ({ selected }) => {
        document.getElementById("products").scrollIntoView();
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: selected })
    };

    // scroll to top when changing
    useEffect(() => {
        const changePage = () => {
            window.scrollTo({ top: 0 });
        };
        changePage()
    }, []);

    useEffect(() => {
        if (productsType === 'Bütün Geyimlər') {
            setFilteredClothes(clothes);
        }
        else {
            const newProducts = clothes.filter((product) => {
                return product.type === productsType;
            });
            setFilteredClothes(newProducts);
        }
    }, [productsType]);

    return (
        <div className='products-page'>
            <h1 className='products-page-title' id='products'>Kişi - {productsType}</h1>
            <SearchFilter searchText={searchText} searchParams={searchParams} setSearchParams={setSearchParams} />
            <SortFilter currentSort={currentSort} searchParams={searchParams} setSearchParams={setSearchParams} />
            {searchResults.length ? (
                <motion.div layout className='products-container'>
                    <Toaster
                        position='bottom-left'
                        toastOptions={{
                            duration: 5000
                        }}
                    />
                    {searchResults
                        .sort(sortTypes[currentSort].fn)
                        .slice(pagesVisited, pagesVisited + productsPerPage)
                        .map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                </motion.div>
            ) : (
                <div className='no-results'>
                    Axtarışınıza uyğun nəticə tapılmadı
                </div>
            )}
            {searchResults.length !== 0
                && (
                    <ReactPaginate
                        previousLabel="Əvvəlki"
                        nextLabel="Növbəti"
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
                        forcePage={pageNumber}
                        onPageChange={changePage}
                        containerClassName="pagination-buttons"
                        previousLinkClassName='previous-button'
                        nextLinkClassName='next-button'
                        disabledClassName='pagination-disabled'
                        activeClassName='pagination-active'
                    />
                )}
        </div>
    )
}

export default Products