import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/feature/products/productsApi';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const { data: { products = [], totalPages, totalProducts } = {}, isLoading, error } = useFetchAllProductsQuery({
        category: categoryName.toLowerCase(),
        page: 1,
        limit: 100, // or any number you want to show per page
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
                </p>
            </section>

            {/* products card */}
            <div className='section__container'>
                <ProductCards products={products} />
            </div>
        </>
    );
};

export default CategoryPage;
