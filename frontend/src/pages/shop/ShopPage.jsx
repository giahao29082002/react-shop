// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import productsData from "../../data/products.json"
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchALLProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
    categories: ['all', 'food', 'drink', 'dessert', 'combo'],
    size: ['all', 'S', 'M', 'L'],
    priceRanges: [
        { label: 'Under $10', min: '0', max: '10' },
        { label: '$20 - $25', min: '20', max: '25' },
        { label: '$25 - $50 ', min: '25', max: '50' },
        { label: '$50 and abouve', min: '50', max: 'Infinity' },
    ]
};
const ShopPage = () => {

    const [filtersState, setFiltersState] = useState({
        category: 'all',
        size: 'all',
        priceRange: ''
    });

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    const { category, size, priceRange } = filtersState;
    
    // Kiểm tra giá trị của priceRange trước khi sử dụng split()
    const [minPrice, maxPrice] = priceRange
        ? priceRange.split('-').map(Number)
        : [0, Infinity];  // Nếu priceRange rỗng, đặt giá trị mặc định

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchALLProductsQuery({
        category: category !== 'all' ? category : '',
        size: size !== 'all' ? size : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage
    });

    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            size: 'all',
            priceRange: ''
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error :  {error.message}</div>;

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'> Shop page </h2>
                <p className='section__subheader'>Enjoy your daily</p>
            </section>
            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />
                    <div>
                        <h3 className="text-xl font-medium mb-4">
                            Showing {startProduct} to {endProduct} of {totalProducts} products
                        </h3>
                        <ProductCards products={products} />

                        <div className="mt-6 flex justify-center">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 ${
                                        currentPage === index + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-700'
                                    } rounded-md mx-1`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;

// const ShopPage = () => {

//     const [filtersState, setFiltersState] = useState({
//         category: 'all',
//         size: 'all',
//         priceRange: ''
//     });

//     const handlePageChange = (pageNumber) =>{
//         if(pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber)
//         }
//     }
  

//     const [currentPage, setCurrentPage] = useState(1);
//     const [ProductsPerPage] = useState(8);

//     const { category, size, priceRange } = filtersState;
//     const [minPrice, maxPrice] = priceRange.split('-').map(Number)
//     const {data: {products = [], totalPages,totalProducts} ={},error ,  isLoading} = useFetchALLProductsQuery({
//         category: category !== 'all' ? category : '',
//         size: size !== 'all' ? size: '',
//         minPrice : isNaN(minPrice)? '' : minPrice,
//         maxPrice :  isNaN(maxPrice)? '' : maxPrice,
//         page:currentPage,
//         limit : ProductsPerPage
//     })

//     const clearFilters = () => {
//         setFiltersState({
//             category: 'all',
//             size: 'all',
//             priceRanges: ''
//         })
//     }

//     if (isLoading) return <div>loading...</div>
//     if(error)  return <div>Error loading product</div>


//     const startProduct = (currentPage -1) * ProductsPerPage +1;
//     const endProduct= startProduct + products.length - 1
//     return (
//         <>
//             <section className='section__container bg-primary-light'>
//                 <h2 className='section__header capitalize'> Shop page </h2>
//                 <p className='section__subheader'>Enjoy your daily</p>
//             </section>
//             <section className="section__container">
//                 <div className="flex flex-col md:flex-row md:gap-12 gap-8">
//                     <ShopFiltering filters={filters}
//                         filtersState={filtersState}
//                         setFiltersState={setFiltersState}
//                         clearFilters={clearFilters}
//                     />
//                     <div>
//                         <h3 className="text-xl font-medium mb-4">
//                            Showing {startProduct} to {endProduct} of {totalProducts} products
//                         </h3>
//                         <ProductCards products={products} />

//                         <div className="mt-6 flex justify-center">
//                         <button 
//                         disabled = {currentPage === 1}
//                             onClick={()=> handlePageChange(currentPage -1)}
//                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2">Previous</button>
//                         {
//                             [...Array(totalPages)].map((_,index) =>(
//                                 <button key={index}
//                                 onClick={()=> handlePageChange(index + 1)}
//                                 className={`px-4 py-2 ${currentPage === index +1 ? 
//                                     'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
//                                     rounded-md mx-1
//                                     `}
//                                 >{index + 1}</button>
//                             ))  
//                         }
//                         <button
//                         disabled={currentPage === totalPages}
//                         onClick={()=> handlePageChange(currentPage + 1)}
//                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2">Next</button>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }   
// export default ShopPage