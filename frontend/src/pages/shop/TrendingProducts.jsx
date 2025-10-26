
import { useState } from 'react'
import ProductCards from './ProductCards'
// import products from '../../data/products.json'
import { useFetchAllProductsQuery } from '../../redux/feature/products/productsApi';

const TrendingProducts = () => {
        const [visibleProducts, setVisibleProducts] = useState(8);
        const { data: { products = [] } = {}, isLoading } = useFetchAllProductsQuery({ limit: 8 });

        const loadMoreProducts = () =>{
        setVisibleProducts(prevCount => prevCount + 4)

        if (isLoading) return <p>Loading...</p>;

    }
  return (
    <section className ='section__container product__container'>
        <h2 className='section__header'>Trending Products</h2>
        <p className='section__subheader mb-12'>Discover the Hottest picks: Elevate Your Style with our Currated Collection of Trending Women Fashion Products. </p>

        {/* Product card */}
        <div className='mt-12'>
            <ProductCards products = {products.slice(0,visibleProducts)} />
        </div>

        {/* load more products */}
        <div className='product__btn'>

            {
                visibleProducts < products.length && (
                    <button className='btn' onClick={loadMoreProducts}>Load More</button>
                )
            }
        </div>
       
    </section>
  )
}

export default TrendingProducts
 