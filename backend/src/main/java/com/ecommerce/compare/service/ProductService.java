package com.ecommerce.compare.service;

import com.ecommerce.compare.entity.Product;
import com.ecommerce.compare.entity.Review;
import com.ecommerce.compare.repository.ProductRepository;
import com.ecommerce.compare.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    public ProductService(ProductRepository productRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<Product> getAllProducts(String category, String query) {
        if (category != null && !category.trim().isEmpty() && query != null && !query.trim().isEmpty()) {
            return productRepository.findByCategoryIgnoreCaseAndNameContainingIgnoreCase(category.trim(), query.trim());
        } else if (category != null && !category.trim().isEmpty()) {
            return productRepository.findByCategoryIgnoreCase(category.trim());
        } else if (query != null && !query.trim().isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(query.trim());
        } else {
            return productRepository.findAll();
        }
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        // Calculate average rating initially if null
        if (product.getRating() == null) {
            product.setRating(5.0); // default starting rating
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product details) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));

        product.setName(details.getName());
        product.setCategory(details.getCategory());
        product.setDescription(details.getDescription());
        product.setImageUrl(details.getImageUrl());
        product.setOnlinePriceAmazon(details.getOnlinePriceAmazon());
        product.setOnlinePriceFlipkart(details.getOnlinePriceFlipkart());
        product.setOfflinePrice(details.getOfflinePrice());
        product.setShopName(details.getShopName());
        product.setShopAddress(details.getShopAddress());
        
        if (details.getRating() != null) {
            product.setRating(details.getRating());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        // First delete any reviews linked to this product (to avoid foreign key constraint errors)
        List<Review> reviews = reviewRepository.findByProductIdOrderByIdDesc(id);
        reviewRepository.deleteAll(reviews);
        
        productRepository.deleteById(id);
    }

    // --- Review Methods ---

    public List<Review> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProductIdOrderByIdDesc(productId);
    }

    public Review addReviewToProduct(Long productId, Review review) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
        
        review.setProduct(product);
        
        if (review.getDate() == null || review.getDate().isEmpty()) {
            review.setDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        }
        
        Review savedReview = reviewRepository.save(review);

        // Recalculate average rating for product
        List<Review> allReviews = reviewRepository.findByProductIdOrderByIdDesc(productId);
        double totalRating = 0;
        for (Review r : allReviews) {
            totalRating += r.getRating();
        }
        double avgRating = allReviews.isEmpty() ? 5.0 : (totalRating / allReviews.size());
        
        // Round to 1 decimal place
        avgRating = Math.round(avgRating * 10.0) / 10.0;
        product.setRating(avgRating);
        productRepository.save(product);

        return savedReview;
    }
}
