const menuItems = [
        {
          id: "1",
          name: "Creamy Tomato Bisque",
          description: "Silky tomato soup with crème fraîche and fresh basil",
          price: 400,
          category: "Appetizers",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9cc64447-5683-11f1-82cf-0242ac110002-Y86YAHcGyr0yPaATLfLsJ.jpg",
        },
        {
          id: "2",
          name: "Crispy Calamari",
          description: "Golden calamari rings with lemon aioli and microgreens",
          price: 400,
          category: "Appetizers",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9cd1ca70-5683-11f1-b054-0242ac110002-xalVFDaiT_FUMXwj2BN-U.jpg",
        },
        {
          id: "3",
          name: "Fresh Oyster Selection",
          description: "Three fresh oysters on ice with house cocktail sauce",
          price: 400,
          category: "Appetizers",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9cdc4352-5683-11f1-9537-0242ac110002-WGvl18M4BjyfFkuXPUC9b.jpg",
        },
        {
          id: "4",
          name: "Pan-Seared Salmon",
          description:
            "Wild salmon fillet with roasted vegetables and lemon butter sauce",
          price: 400,
          category: "Main Courses",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9e2e59b5-5683-11f1-84f2-0242ac110002-SBqyQKpbk1f-QvR56bvgB.jpg",
        },
        {
          id: "5",
          name: "Mushroom Pasta",
          description:
            "Fresh handmade pasta with wild mushroom cream sauce and basil",
          price: 400,
          category: "Main Courses",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9d8b9a45-5683-11f1-a1d0-0242ac110002-mYvR18vtlnnV01rnZEt-4.jpg",
        },
        {
          id: "6",
          name: "Prime Beef Steak",
          description:
            "Grass-fed ribeye with herb butter, roasted garlic, and seasonal vegetables",
          price: 400,
          category: "Main Courses",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9d5f2f06-5683-11f1-9e2c-0242ac110002-S-8khbthTudS4fgc-hVxm.jpg",
        },
        {
          id: "7",
          name: "Chocolate Lava Cake",
          description:
            "Warm chocolate cake with molten center, vanilla ice cream, and fresh berries",
          price: 400,
          category: "Desserts",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9cddcbd6-5683-11f1-88ed-0242ac110002-GFM-6A86HyvxyXFhzO6K7.jpg",
        },
        {
          id: "8",
          name: "Crème Brûlée",
          description:
            "Classic French custard with caramelized sugar crust and fresh mint",
          price: 400,
          category: "Desserts",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9caaa055-5683-11f1-8e64-0242ac110002-IEwG5_b-ZVvrW1a1gI3Fi.jpg",
        },
        {
          id: "9",
          name: "Fresh Fruit Tart",
          description:
            "Buttery pastry shell with pastry cream and glazed seasonal berries",
          price: 400,
          category: "Desserts",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9d5f7129-5683-11f1-bf26-0242ac110002-E1iiecAPoGNIs2xzvoWy5.jpg",
        },
        {
          id: "10",
          name: "Craft Cocktail",
          description:
            "House specialty with fresh citrus, artisanal spirits, and house-made syrup",
          price: 400,
          category: "Beverages",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9d5ff050-5683-11f1-8f07-0242ac110002-IznQQPYTR2UiaCQQjmvdA.jpg",
        },
        {
          id: "11",
          name: "Cold Brew Coffee",
          description: "Smooth cold brew with house-made cream and ice",
          price: 400,
          category: "Beverages",
          image:
            "https://cdn.b12.io/client_media/I2mVyfTm/9cbe214a-5683-11f1-a2af-0242ac110002-WZMa5e0XoYMeRLlsUQKHG.jpg",
        },
      ];

      const menuGrid = document.getElementById("menu-grid");
      const searchInput = document.getElementById("search-input");
      const filterButtons = document.querySelectorAll(".filter-btn");
      const noResults = document.getElementById("no-results");
      const modal = document.getElementById("menu-modal");
      const modalClose = document.getElementById("modal-close");
      const modalBackdrop = document.getElementById("modal-backdrop");
      const modalTitle = document.getElementById("modal-title");
      const modalImage = document.getElementById("modal-image");
      const modalDescription = document.getElementById("modal-description");
      const modalPrice = document.getElementById("modal-price");
      const modalOrderBtn = document.getElementById("modal-order-btn");

      let activeFilter = "All";

      // Render menu items
      function renderMenuItems() {
        menuGrid.innerHTML = menuItems
          .map(
            (item) => `
        <div class="menu-card" data-item-id="${item.id}" data-category="${item.category}">
          <div class="menu-card-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="menu-card-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-card-footer">
              <span class="menu-card-price">${item.price}</span>
              <button data-menu-button="${item.id}" type="button">Order Now</button>
            </div>
          </div>
        </div>
      `,
          )
          .join("");

        // Add event listeners to cards and buttons
        document.querySelectorAll(".menu-card").forEach((card) => {
          card.addEventListener("click", () => openModal(card.dataset.itemId));
        });

        document.querySelectorAll("[data-menu-button]").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal(btn.dataset.menuButton);
          });
        });
      }

      // Filter and search functionality
      function filterAndSearch() {
        const cards = document.querySelectorAll(".menu-card");
        let visibleCount = 0;

        cards.forEach((card) => {
          const category = card.dataset.category;
          const name = card.querySelector("h3").textContent.toLowerCase();
          const description = card.querySelector("p").textContent.toLowerCase();
          const searchTerm = searchInput.value.toLowerCase();

          const matchesFilter =
            activeFilter === "All" || category === activeFilter;
          const matchesSearch =
            searchTerm === "" ||
            name.includes(searchTerm) ||
            description.includes(searchTerm);

          if (matchesFilter && matchesSearch) {
            card.style.display = "";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        });

        noResults.style.display = visibleCount > 0 ? "none" : "block";
      }

      // Filter button event listeners
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterButtons.forEach((b) => {
            b.style.backgroundColor = "var(--muted)";
            b.style.color = "var(--muted-foreground)";
          });
          btn.style.backgroundColor = "var(--primary)";
          btn.style.color = "var(--primary-foreground)";
          activeFilter = btn.dataset.filter;
          filterAndSearch();
        });
      });

      // Search input listener
      searchInput.addEventListener("input", filterAndSearch);

      // Modal functions
      function openModal(itemId) {
        const item = menuItems.find((i) => i.id === itemId);
        if (item) {
          modalTitle.textContent = item.name;
          modalImage.src = item.image;
          modalImage.alt = item.name;
          modalDescription.textContent = item.description;
          modalPrice.textContent = item.price;
          modal.classList.add("show");
        }
      }

      function closeModal() {
        modal.classList.remove("show");
      }

      modalClose.addEventListener("click", closeModal);
      modalBackdrop.addEventListener("click", closeModal);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      });

      modalOrderBtn.addEventListener("click", () => {
        console.log("Item added to cart");
        alert("Item added to your order!");
        closeModal();
      });

      // Initial render
      renderMenuItems();