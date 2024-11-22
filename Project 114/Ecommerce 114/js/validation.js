document.addEventListener("DOMContentLoaded", function () {
    // Login form validation
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent default form submission

            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value.trim();
            const userType = document.getElementById("userType").value;

            // Validate username and password
            if (!username || !password) {
                alert("Please fill out both username and password fields.");
                return;
            }
            // Set a flag in localStorage to indicate the user is logged in
            localStorage.setItem("isLoggedIn", true);
            // Redirect based on user type after validation
            if (userType === 'Seller') {
                window.location.href = 'customer-dashboard.html'; // Redirect to seller interface
            } else if (userType === 'Buyer') {
                window.location.href = 'customer-dashboard.html'; // Redirect to customer interface
            }
            alert("Log in successfully!");

        });
    }

    // Create Account form validation
    const createAccountForm = document.getElementById("create-account");

    if (createAccountForm) {
        createAccountForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the default form submission immediately

            const username = document.getElementById("create-username").value.trim();
            const email = document.getElementById("create-email").value.trim();
            const password = document.getElementById("create-password").value.trim();
            const confirmPassword = document.getElementById("create-confirm-password").value.trim();

            // Form validation
            if (!username) {
                alert("Please enter your username.");
                return; // Stop the function here
            }

            if (!email) {
                alert("Please enter your email.");
                return; // Stop the function here
            }

            if (!password) {
                alert("Please enter your password.");
                return; // Stop the function here
            }

            if (!confirmPassword) {
                alert("Please confirm your password.");
                return; // Stop the function here
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return; // Stop the function here
            }

            // Simulate account creation
            alert("The account is created successfully!");

            // Redirect to login page after account creation
            window.location.href = "login.html";
        });
    }
    // Redirect to login if not logged in
    window.redirectToLogin = function () {
        alert("Please log in to add items to your cart.");
        window.location.href = "login.html"; // Redirects to the login page
    };

    // Cart functionality
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartContainer = document.querySelector(".cart-container");

    function saveAndUpdateCart() {
        localStorage.setItem("cartData", JSON.stringify(cartData));
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cartData.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
                    <td>₱${item.price.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-light" onclick="changeQuantity(${index}, -1)">-</button>
                        ${item.quantity}
                        <button class="btn btn-sm btn-light" onclick="changeQuantity(${index}, 1)">+</button>
                    </td>
                    <td>₱${subtotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">🗑️</button></td>
                </tr>
            `;
        });

        cartItemsContainer.innerHTML += `
            <tr>
                <td colspan="3" style="text-align: right; font-weight: bold;">Total:</td>
                <td>₱${total.toFixed(2)}</td>
                <td></td>
            </tr>
        `;
    }

    window.addToCart = function (productName, productPrice) {
        // Check if the user is logged in by checking localStorage or sessionStorage
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn) {
            // Proceed with adding the product to the cart (if logged in)
            alert(`${productName} has been added to your cart for ₱${productPrice}`);
            // Logic to add the product to the cart (could be done using localStorage, sessionStorage, or server-side)
        } else {
            // Redirect to the login page and prompt user to log in
            alert("Please log in first to add items to your cart.");
            window.location.href = "login.html"; // Redirect to login page
        }
        const productImage = `images/${productName.toLowerCase().replace(/\s+/g, '')}.jpg`;

        const existingProduct = cartData.find((item) => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartData.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
        }

        saveAndUpdateCart();
        cartContainer.style.display = "block";
        alert(`${productName} has been added to your cart!`);
    };

    window.changeQuantity = function (index, delta) {
        cartData[index].quantity = Math.max(cartData[index].quantity + delta, 1);
        saveAndUpdateCart();
    };

    window.deleteItem = function (index) {
        cartData.splice(index, 1);
        saveAndUpdateCart();
    };

    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cartData.length === 0) {
            alert("Your cart is empty. Add some items before checking out.");
        } else {
            alert("This button is in progress");
        }
    });

    document.querySelector(".close-cart").addEventListener("click", function () {
        cartContainer.style.display = "none";
    });

    updateCart();
    // Sample product list for demonstration purposes
    const productList = [
        { name: "Vintage Dress", url: "product-vintage-dress.html" },
        { name: "Leather Jacket", url: "product-leather-jacket.html" },
        { name: "Running Shoes", url: "product-running-shoes.html" },
        { name: "Casual Shirt", url: "product-casual-shirt.html" }
    ];

    const closeCartButton = document.querySelector(".close-cart");

    if (closeCartButton) {
        closeCartButton.addEventListener("click", function () {
            // Redirect to the customer dashboard
            window.location.href = "customer-dashboard.html";
        });
    }
    // Search bar functionality
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    // Display prompt when search bar is used
    if (searchInput) {
        searchInput.addEventListener("focus", function () {
            alert("Search feature is not available yet.");
        });
    }

    // Display prompt when search button is clicked
    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            alert("Search feature is not available yet.");
        });
    }
});
