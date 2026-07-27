package com.ecommerce.compare.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // Mobiles, Laptops, Headphones, Watches, Shoes

    @Column(length = 1000)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Double onlinePriceAmazon;

    @Column(nullable = false)
    private Double onlinePriceFlipkart;

    @Column(nullable = false)
    private Double offlinePrice;

    @Column(nullable = false)
    private String shopName;

    @Column(length = 500)
    private String shopAddress;

    private Double rating; // average rating

    // Default Constructor
    public Product() {
    }

    // All-args Constructor
    public Product(Long id, String name, String category, String description, String imageUrl, 
                   Double onlinePriceAmazon, Double onlinePriceFlipkart, Double offlinePrice, 
                   String shopName, String shopAddress, Double rating) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.onlinePriceAmazon = onlinePriceAmazon;
        this.onlinePriceFlipkart = onlinePriceFlipkart;
        this.offlinePrice = offlinePrice;
        this.shopName = shopName;
        this.shopAddress = shopAddress;
        this.rating = rating;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getOnlinePriceAmazon() {
        return onlinePriceAmazon;
    }

    public void setOnlinePriceAmazon(Double onlinePriceAmazon) {
        this.onlinePriceAmazon = onlinePriceAmazon;
    }

    public Double getOnlinePriceFlipkart() {
        return onlinePriceFlipkart;
    }

    public void setOnlinePriceFlipkart(Double onlinePriceFlipkart) {
        this.onlinePriceFlipkart = onlinePriceFlipkart;
    }

    public Double getOfflinePrice() {
        return offlinePrice;
    }

    public void setOfflinePrice(Double offlinePrice) {
        this.offlinePrice = offlinePrice;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopAddress() {
        return shopAddress;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
