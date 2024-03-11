import React from 'react';
import products from '../Product'; // Assuming you have defined your products in Product.js
import './index.css';

const Images = ({ descriptors }) => {
    // Generate products based on matching tags with descriptors
    const generateProducts = () => {
        let generatedProducts = [];
    
        // Iterate through each product
        products.forEach(product => {
            let isMatched = false;
    
            // Check each tag of the product
            product.tags.forEach(tag => {
                // Check if the tag is included in the descriptors
                if (descriptors.includes(tag) && !isMatched) {
                    generatedProducts.push(product);
                    isMatched = true; // Set flag to true to avoid duplicate addition
                }
            });
        });
    
        return generatedProducts;
    };

    // Get the generated products
    const matchedProducts = generateProducts();

    // Render matched products
    return (
        <div className='products'>
            {matchedProducts.map(product => (
                <div class="product" key={product.name}>
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name} />
                    
                </div>
            ))}
        </div>
    );
};

export default Images;
