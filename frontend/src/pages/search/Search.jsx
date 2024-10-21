/* eslint-disable no-unexpected-multiline */
import { useState } from "react"
import productsData from "../../data/products.json"
import ProductCards from "../shop/ProductCards";
// const Search = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState(productsData);

//     const handleSearch = () => {
//         const query = searchQuery.toLowerCase();
//         const filtered = productsData.filter(product => product.name.toLowerCase().includes
//             (query) || product.description.toLowerCase().includes(query));
//         setFilteredProducts(filtered);
//     }

//     return (
//         <>
//             <section className='section__container bg-primary-light'>
//                 <h2 className='section__header capitalize'>Search Products</h2>
//                 <p className='section__subheader'>Enjoy your daily</p>
//             </section>
//             <section className='section__container'>
//                 <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
//                     <input type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="search-bar w-full max-w-4xl p-2 border rounded"
//                         placeholder="Search for Products..." />
//                     <button
//                         onClick={handleSearch}
//                         className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded" >Search</button>
//                 </div>
//                 <ProductCards products={filteredProducts}/>
//             </section>
//         </>
//     )
// }

// export default Search

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = productsData.filter(product => 
            (product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)) &&
            product.price >= priceRange.min && product.price <= priceRange.max
        );
        setFilteredProducts(filtered);
    }

    const handleVoiceSearch = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "vi-VN";
        recognition.start();
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            console.log("Giọng nói nhận được:", speechToText);  // In ra kết quả giọng nói
            setSearchQuery(speechToText);
            handleSearch();
        };
        recognition.onerror = (error) => {
            console.error("Lỗi nhận diện giọng nói:", error);  // In ra lỗi nếu có
        }
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Tìm kiếm sản phẩm</h2>
                <p className='section__subheader'>Tận hưởng sản phẩm của bạn</p>
            </section>
            <section className='section__container'>
                <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar w-full max-w-4xl p-2 border rounded"
                        placeholder="Tìm kiếm sản phẩm..." />
                    
                    <input type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="price-input w-24 p-2 border rounded"
                        placeholder="Giá tối thiểu" />
                    
                    <input type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="price-input w-24 p-2 border rounded"
                        placeholder="Giá tối đa" />
                    
                    <button
                        onClick={handleSearch}
                        className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded">Tìm kiếm</button>

                    {/* Nút tìm kiếm bằng giọng nói */}
                    <button
                        onClick={handleVoiceSearch}
                        className="voice-search-button w-full md:w-auto py-2 px-8 bg-secondary text-white rounded">
                        🎤 Tìm kiếm bằng giọng nói
                    </button>
                </div>
                <ProductCards products={filteredProducts} />
            </section>
        </>
    );
}

export default Search;





