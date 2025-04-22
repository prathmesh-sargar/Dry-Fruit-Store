document.addEventListener("DOMContentLoaded", function () {
    let orderTable = document.querySelector(".tbl-full"); 
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cartData.length === 0) {
        orderTable.innerHTML += `<tr><td colspan="7" class="text-center">No items in the cart</td></tr>`;
        return;
    }
  
    let totalAmount = 0;
    let tableRows = "";
    cartData.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
  
        tableRows += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="/food/${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>₹ ${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹ ${itemTotal}</td>
                <td><a href="#" class="btn-delete" data-id="${item.id}">&times;</a></td>
            </tr>
        `;
    });
  
    tableRows += `
        <tr>
            <th colspan="5">Total</th>
            <th>₹ ${totalAmount}</th>
            <th></th>
        </tr>
    `;
  
    orderTable.innerHTML += tableRows;
  
    // Delete item from cart
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            let itemId = this.getAttribute("data-id");
            cartData = cartData.filter(item => item.id !== itemId);
            localStorage.setItem("cart", JSON.stringify(cartData));
            location.reload(); // Refresh page to reflect changes
        });
    });
  });
  
  
  
  
      // Function to get cart items from localStorage
      function getCartItems() {
          let cart = localStorage.getItem("cart");
          return cart ? JSON.parse(cart) : [];
      }
  
      // Function to display cart items in the navbar dropdown
      function displayCartInNavbar() {
          let cartItems = getCartItems();
          let cartContent = document.querySelector("#cart-content .cart-table");
          let cartBadge = document.querySelector("#shopping-cart .badge");
  
          if (!cartContent || !cartBadge) return;
  
          // Clear existing cart content
          cartContent.innerHTML = `
              <tr>
                  <th>Food</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
              </tr>
          `;
  
          let totalItems = 0;
          let totalPrice = 0;
  
          cartItems.forEach((item, index) => {
              let itemTotal = item.price * item.quantity;
              totalItems += item.quantity;
              totalPrice += itemTotal;
  
              cartContent.innerHTML += `
                  <tr>
                      <td><img src="/food/${item.image}" alt="${item.name}" width="50"></td>
                      <td>${item.name}</td>
                      <td>₹ ${item.price}</td>
                      <td>${item.quantity}</td>
                      <td>$ ${itemTotal}</td>
                      <td><a href="#" class="btn-delete" onclick="removeFromCart(${index})">&times;</a></td>
                  </tr>
              `;
          });
  
          // Add total row
          cartContent.innerHTML += `
              <tr>
                  <th colspan="4">Total</th>
                  <th>₹ ${totalPrice.toFixed(2)}</th>
                  <th></th>
              </tr>
          `;
  
          // Update cart badge count
          cartBadge.textContent = totalItems;
      }
  
      // Function to remove an item from the cart
      function removeFromCart(index) {
          let cartItems = getCartItems();
          cartItems.splice(index, 1); // Remove item from array
          localStorage.setItem("cart", JSON.stringify(cartItems)); // Update localStorage
  
          // Refresh cart display
          displayCartInNavbar();
      }
  
      // Initialize cart on page load
      document.addEventListener("DOMContentLoaded", () => {
          displayCartInNavbar();
      });
  

      


      document.addEventListener("DOMContentLoaded", async function () {
        const foodMenuContainer = document.querySelector(".grid-2");

        // Get category from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category");

        if (!category) {
          console.log("No category found in URL!");
          return;
        }

        try {
          // Fetch data from backend API dynamically
          const response = await fetch(
            `http://localhost:3000/api/productsByCategory?category=${category}`
          );
          const data = await response.json();

          console.log("Fetched Products:", data);

          // Clear any existing content
          foodMenuContainer.innerHTML = "";

          // Loop through the fetched products and display them dynamically
          data.forEach((product) => {
            const productHTML = `
                        <div class="food-menu-box">
                            
                                <div class="food-menu-img">
                                    <img src="/food/${product.image_url}" alt="${product.name}" class="img-responsive img-curve">
                                </div>
                                <div class="food-menu-desc">
                                    <h4>${product.name}</h4>
                                    <p class="food-price">₹${product.price} per 250g</p>
                                    <p class="food-details">${product.description}</p>
                                     <button class="add-to-cart btn-primary" data-id="${product.id}"  data-name="${product.name}" data-price="${product.price}"  data-image="${product.image_url} ">
                                    Add to Cart
                                     </button>
                                </div>
                           
                        </div>
                    `;
            foodMenuContainer.innerHTML += productHTML;
          });

          // **Adding Event Listener for "Add to Cart"**
          document.querySelectorAll(".add-to-cart").forEach((button) => {
            button.addEventListener("click", function () {
              let cart = JSON.parse(localStorage.getItem("cart")) || [];

              const productData = {
                id: this.getAttribute("data-id"),
                name: this.getAttribute("data-name"),
                price: parseFloat(this.getAttribute("data-price")),
                image: this.getAttribute("data-image"),
                quantity: 1, // Default quantity
              };

              // Check if product already exists in cart
              const existingProduct = cart.find(
                (item) => item.name === productData.name
              );
              if (existingProduct) {
                existingProduct.quantity += 1;
              } else {
                cart.push(productData);
              }

              // Save back to localStorage
              localStorage.setItem("cart", JSON.stringify(cart));
              alert(`${productData.name} Item added to cart!`);
              window.location.reload()
            });
          });
        } catch (error) {
          console.error("Error fetching products:", error);
          foodMenuContainer.innerHTML =
            "<p>Error loading products. Please try again later.</p>";
        }
      });
    




      
      