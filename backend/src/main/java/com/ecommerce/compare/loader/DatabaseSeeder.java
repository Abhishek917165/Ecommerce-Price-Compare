package com.ecommerce.compare.loader;

import com.ecommerce.compare.entity.Product;
import com.ecommerce.compare.entity.Review;
import com.ecommerce.compare.entity.User;
import com.ecommerce.compare.repository.ProductRepository;
import com.ecommerce.compare.repository.ReviewRepository;
import com.ecommerce.compare.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          ProductRepository productRepository,
                          ReviewRepository reviewRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Users if not present
        if (userRepository.count() == 0) {
            seedUsers();
        }

        // 2. Seed Products and Reviews if not present
        if (productRepository.count() == 0) {
            seedProductsAndReviews();
        }
    }

    private void seedUsers() {
        // Admin
        User admin = new User(null, "admin", passwordEncoder.encode("admin123"), "admin@compare.com", "ADMIN");
        userRepository.save(admin);

        // User 1
        User user1 = new User(null, "user1", passwordEncoder.encode("user123"), "user1@compare.com", "USER");
        userRepository.save(user1);

        // User 2
        User user2 = new User(null, "user2", passwordEncoder.encode("user223"), "user2@compare.com", "USER");
        userRepository.save(user2);

        System.out.println(">>> Seeded 3 default users (admin, user1, user2)");
    }

    private void seedProductsAndReviews() {
        List<Product> products = new ArrayList<>();

        // --- MOBILES ---
        products.add(new Product(null, "iPhone 15 Pro Max", "Mobiles", 
                "The ultimate iPhone with titanium design, revolutionary A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
                139900.00, 137999.00, 134900.00, "Croma Delhi", "Shop No 5, Inner Circle, Connaught Place, New Delhi - 110001", 4.8));

        products.add(new Product(null, "Samsung Galaxy S24 Ultra", "Mobiles", 
                "Welcome to the era of mobile AI. With Galaxy S24 Ultra, you can unleash whole new levels of creativity, productivity and possibility, starting with your smartphone.",
                "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
                129999.00, 132499.00, 131500.00, "Reliance Digital Mumbai", "Ground Floor, Phoenix Palladium, Lower Parel, Mumbai - 400013", 4.7));

        products.add(new Product(null, "OnePlus 12", "Mobiles", 
                "Redefined flagship power with the Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, and hyper-fast 100W SUPERVOOC charging.",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
                64999.00, 62999.00, 63500.00, "OnePlus Experience Store Bangalore", "No. 5, Brigade Road, Ashok Nagar, Bangalore - 560001", 4.6));

        products.add(new Product(null, "Google Pixel 8 Pro", "Mobiles", 
                "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera yet, and can even translate languages in real time.",
                "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=60",
                93999.00, 94999.00, 91900.00, "Apex Gadget Hub Delhi", "45, Nehru Place Market, New Delhi - 110019", 4.5));

        products.add(new Product(null, "Xiaomi 14", "Mobiles", 
                "Co-engineered with Leica, Xiaomi 14 boasts a next-generation Summilux optical lens, Snapdragon 8 Gen 3 processor, and highly optimized HyperOS.",
                "https://images.unsplash.com/photo-1565849906461-0ee43c8295b2?w=500&auto=format&fit=crop&q=60",
                69999.00, 68900.00, 68000.00, "Mi Home Tech Park Bangalore", "S-204, Nexus Mall, Koramangala, Bangalore - 560095", 4.4));

        products.add(new Product(null, "Nothing Phone (2)", "Mobiles", 
                "A new way to interact. Features the unique Glyph Interface, premium Nothing OS 2.0, dual 50 MP cameras, and a beautiful 6.7” flexible LTPO AMOLED display.",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60",
                39999.00, 38999.00, 41000.00, "Vijay Sales Mumbai", "Classic Corner, Link Road, Bandra West, Mumbai - 400050", 4.3));


        // --- LAPTOPS ---
        products.add(new Product(null, "MacBook Air M3", "Laptops", 
                "Supercharged by the next-generation M3 chip. The incredibly thin and light MacBook Air provides up to 18 hours of battery life to work and play anywhere.",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
                114900.00, 112990.00, 109900.00, "Imagine Apple Reseller Delhi", "F-22, Select Citywalk Mall, Saket, New Delhi - 110017", 4.9));

        products.add(new Product(null, "Dell XPS 13", "Laptops", 
                "Stunning lightweight design crafted with machined aluminum, featuring a borderless InfinityEdge display and Intel Core Ultra 7 processor.",
                "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
                139990.00, 138500.00, 141500.00, "Dell Exclusive Store Bangalore", "G-11, Mantri Square Mall, Malleshwaram, Bangalore - 560003", 4.6));

        products.add(new Product(null, "HP Spectre x360", "Laptops", 
                "The ultimate 2-in-1 convertible laptop. Offers breathtaking 4K OLED display, exceptional battery longevity, and precision stylus pen support.",
                "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60",
                154999.00, 153999.00, 152000.00, "HP World Mumbai", "Shop No 4, Linking Road, Santacruz West, Mumbai - 400054", 4.7));

        products.add(new Product(null, "Lenovo ThinkPad X1 Carbon", "Laptops", 
                "The premier business companion. Lightweight carbon fiber construct, legendary durability, spill-resistant keyboard, and elite security suites.",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=60",
                179900.00, 181500.00, 178000.00, "Lenovo Store Kolkata", "33, Park Street, Ground Floor, Kolkata - 700016", 4.8));

        products.add(new Product(null, "ASUS ROG Zephyrus G14", "Laptops", 
                "A high-powered gaming beast packed into an ultra-portable 14-inch chassis. Features AMD Ryzen 9 and Nvidia RTX 4060 graphics.",
                "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60",
                144990.00, 142999.00, 141000.00, "Asus ROG Store Bangalore", "Shop 104, SP Road, Electronics Market, Bangalore - 560002", 4.7));

        products.add(new Product(null, "Acer Swift Go 14", "Laptops", 
                "Perfect casual laptop featuring a gorgeous 2.8K OLED screen, Intel Core i5 processor, lightweight design, and great everyday performance.",
                "https://images.unsplash.com/photo-1496181130204-755241524eab?w=500&auto=format&fit=crop&q=60",
                59999.00, 58900.00, 61500.00, "Acer Mall Chennai", "New 22, Old 45, Usman Road, T. Nagar, Chennai - 600017", 4.2));


        // --- HEADPHONES ---
        products.add(new Product(null, "Sony WH-1000XM5", "Headphones", 
                "Industry-leading noise canceling wireless headphones with spectacular audio quality, crystal-clear hands-free calling, and 30-hour battery life.",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
                29990.00, 29499.00, 28500.00, "Sony Center Delhi", "E-12, Central Ring, Connaught Place, New Delhi - 110001", 4.8));

        products.add(new Product(null, "Bose QuietComfort Ultra", "Headphones", 
                "Immersive sound and world-class quiet. These wireless smart noise canceling headphones deliver breakthrough customized spatial audio.",
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60",
                35900.00, 34999.00, 36500.00, "Bose Premium Store Bangalore", "108, 100 Feet Road, Indiranagar, Bangalore - 560038", 4.7));

        products.add(new Product(null, "Sennheiser Momentum 4", "Headphones", 
                "Audiophile-inspired sound with unmatched 60-hour battery life. Enjoy premium adaptive noise cancellation and comfort design.",
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60",
                24990.00, 24499.00, 23900.00, "Audio Depot Mumbai", "Shop 3, Crystal Castle, Bandra West, Mumbai - 400050", 4.6));

        products.add(new Product(null, "Apple AirPods Max", "Headphones", 
                "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. Ultimate personal listening experience.",
                "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=60",
                59900.00, 58499.00, 56900.00, "Apple Store BKC", "G-10, Jio World Drive Mall, BKC, Bandra East, Mumbai - 400051", 4.5));

        products.add(new Product(null, "JBL Tour One M2", "Headphones", 
                "Smart ambient true adaptive noise canceling headphones. Exceptional Hi-Res sound with customizable EQ profiles.",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60",
                18999.00, 17999.00, 19500.00, "Harman Brand Store Hyderabad", "No. 12, Road No 36, Jubilee Hills, Hyderabad - 500033", 4.3));

        products.add(new Product(null, "Audio-Technica ATH-M50xBT2", "Headphones", 
                "The legendary studio monitor sonic signature, now wireless. Offers exceptional clarity, deep bass, and professional sound staging.",
                "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&auto=format&fit=crop&q=60",
                16500.00, 16299.00, 15900.00, "SoundCraft Bangalore", "No. 18, Commercial Street, Bangalore - 560001", 4.7));


        // --- WATCHES ---
        products.add(new Product(null, "Apple Watch Series 9", "Watches", 
                "Smarter, brighter, mightier. Features the S9 chip, a magic new way to use your watch without touching the screen, and deep health insights.",
                "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60",
                41900.00, 40999.00, 39900.00, "iFuture Reseller Pune", "S-12, Phoenix Marketcity, Viman Nagar, Pune - 411014", 4.8));

        products.add(new Product(null, "Samsung Galaxy Watch 6", "Watches", 
                "Start your day with detailed sleep tracking, comprehensive body composition metrics, and a stunning rotating bezel simulation on a large screen.",
                "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60",
                27999.00, 26999.00, 28900.00, "Samsung SmartPlaza Bangalore", "No. 202, Indiranagar Double Road, Bangalore - 560038", 4.5));

        products.add(new Product(null, "Garmin Venu 3", "Watches", 
                "Advanced GPS smartwatch equipped with bright AMOLED touchscreen display, personalized fitness tracking, and premium body battery energy ratings.",
                "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=500&auto=format&fit=crop&q=60",
                44990.00, 43999.00, 43500.00, "Garmin Flagship Store Delhi", "34, Khan Market, New Delhi - 110003", 4.7));

        products.add(new Product(null, "Fitbit Sense 2", "Watches", 
                "Advanced health smartwatch designed to help you manage stress, track heart rate metrics, sleep parameters, and optimize exercise routines.",
                "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500&auto=format&fit=crop&q=60",
                19999.00, 18999.00, 20500.00, "Helios Watch Store Mumbai", "G-4, High Street Phoenix, Senapati Bapat Marg, Mumbai - 400013", 4.2));

        products.add(new Product(null, "Fossil Gen 6 Smartwatch", "Watches", 
                "Classic design meets smart performance. Features Qualcomm Snapdragon Wear 4100+, rapid charging, and Google Wear OS updates.",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
                23995.00, 22499.00, 21900.00, "Fossil Boutique Bangalore", "Shop S-15, Orion Mall, Malleshwaram, Bangalore - 560055", 4.1));

        products.add(new Product(null, "Amazfit GTR 4", "Watches", 
                "Superb outdoor circular design with industry-first dual-band circularly-polarized GPS, 150+ sports modes, and 14-day battery duration.",
                "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=60",
                16999.00, 16499.00, 17500.00, "TimeKeepers Galleria Delhi", "Shop 4, Lajpat Nagar 2, New Delhi - 110024", 4.4));


        // --- SHOES ---
        products.add(new Product(null, "Nike Air Max 270", "Shoes", 
                "Nike's first lifestyle Air Max delivers style, comfort, and big attitude. Features an extra-large air unit window and bootie fit.",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
                13995.00, 13499.00, 12900.00, "Nike Flagship Store Mumbai", "Ground Floor, Linking Road, Santacruz West, Mumbai - 400054", 4.7));

        products.add(new Product(null, "Adidas Ultraboost Light", "Shoes", 
                "Experience epic energy with the lightest Ultraboost ever made. Built with next-generation Boost foam cushioning and Primeknit+ upper.",
                "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&auto=format&fit=crop&q=60",
                18999.00, 17999.00, 19500.00, "Adidas Store Bangalore", "No. 12, 100 Feet Road, Indiranagar, Bangalore - 560038", 4.8));

        products.add(new Product(null, "Puma Velocity Nitro 3", "Shoes", 
                "A neutral running shoe that delivers exceptional comfort and responsiveness. Infused with nitrogen-injected Nitro foam cushioning.",
                "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60",
                10999.00, 9999.00, 9700.00, "Puma Store Delhi", "F-18, Connaught Place, New Delhi - 110001", 4.4));

        products.add(new Product(null, "Reebok Nano X4", "Shoes", 
                "The ultimate training shoe built for gym workouts, weight lifting, and functional fitness. Features supportive Flexweave knit.",
                "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60",
                12999.00, 12499.00, 13500.00, "Metro Sports Gurgaon", "Shop No 10, Galleria Market, DLF Phase 4, Gurgaon - 122009", 4.5));

        products.add(new Product(null, "New Balance 574 Classic", "Shoes", 
                "The icon of casual sneakers. Crafted with premium suede and mesh materials, ENCAP midsole cushioning delivers all-day support.",
                "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&auto=format&fit=crop&q=60",
                8999.00, 8299.00, 8500.00, "SoleStride Footwear Bangalore", "Shop 4, Commercial Street, Bangalore - 560001", 4.6));

        products.add(new Product(null, "Under Armour Phantom 3", "Shoes", 
                "Engineered with UA HOVR cushioning that returns energy and drives you forward. Ultra-breathable, stretchy knit upper.",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60",
                14999.00, 14499.00, 15500.00, "ActiveSports Hub Chennai", "No 14, Khader Nawaz Khan Road, Nungambakkam, Chennai - 600006", 4.3));


        // 3. Save Products and Seed Reviews
        for (Product product : products) {
            Product savedProduct = productRepository.save(product);
            seedReviewsForProduct(savedProduct);
        }

        System.out.println(">>> Seeded exactly " + productRepository.count() + " products and " + reviewRepository.count() + " user reviews successfully.");
    }

    private void seedReviewsForProduct(Product product) {
        // Review 1
        Review rev1 = new Review(null, product, "Rahul Sharma", 5.0, 
                "Absolutely brilliant! Used this comparison website and saved a good chunk of cash by visiting " + product.getShopName() + " to buy it offline. Highly recommended app!",
                "2026-05-10");
        reviewRepository.save(rev1);

        // Review 2
        Review rev2 = new Review(null, product, "Priya Patel", 4.0, 
                "Excellent build quality and features. The comparison feature here is extremely accurate. I compared the prices and bought it. Totally satisfied with the performance.",
                "2026-05-15");
        reviewRepository.save(rev2);

        // Review 3
        Review rev3 = new Review(null, product, "Amit Verma", 3.0, 
                "The product itself is decent, but the offline shop address is a bit far from my location. Still, a very solid price comparison website for bargain hunters!",
                "2026-05-20");
        reviewRepository.save(rev3);
    }
}
