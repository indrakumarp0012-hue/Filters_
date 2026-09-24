import { useEffect, useState } from "react";
import "./Products.css";

const INR_RATE = 83;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.slice(0, 8));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Unable to load products. Please try again.");
        setLoading(false);
      });
  }, []);

 
  const getPriceInINR = (product) => {
    return Math.round(product.price * INR_RATE);
  };


  const addToCart = (product) => {
    const unitPrice = getPriceInINR(product);

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

     
      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

   
      return [
        ...previousCart,
        {
          ...product,
          unitPrice: unitPrice,
          quantity: 1,
        },
      ];
    });
  };


  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

 
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

 
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

 
  const totalCartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

 
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.unitPrice * item.quantity,
    0
  );

  
  if (loading) {
    return (
      <div className="loading-container">
        <h2 className="loading">Loading products...</h2>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="app">
     
      <header className="header">
        <h1> E-Commerce Store</h1>

        <div className="cart-badge">
          🛒 Cart
          <span>{totalCartCount}</span>
        </div>
      </header>

      <main className="container">
      
        <section className="products-section">
          <h2 className="section-title">Products</h2>

          <div className="product-grid">
            {products.map((product) => {
              const priceInINR = getPriceInINR(product);

              return (
                <div
                  className="product-card"
                  key={product.id}
                >
                 
                  <div className="image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                    />
                  </div>

               
                  <div className="product-content">
                    <span className="category">
                      {product.category}
                    </span>

                    <h3>{product.title}</h3>

                    <p className="price">
                      ₹{priceInINR.toLocaleString("en-IN")}
                    </p>

                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

       
        <section className="cart-section">
          <div className="cart-heading">
            <h2>🛒 Shopping Cart</h2>

            <span>
              {totalCartCount}{" "}
              {totalCartCount === 1 ? "Item" : "Items"}
            </span>
          </div>

        
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>

              <h3>Your cart is empty</h3>

              <p>Add some products to your cart.</p>
            </div>
          ) : (
            <>
             
              <div className="cart-items">
                {cart.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                   
                    <img
                      src={item.image}
                      alt={item.title}
                    />

                   
                    <div className="cart-product-info">
                      <h3>{item.title}</h3>

                      <p>
                        ₹
                        {item.unitPrice.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <small>Unit Price</small>
                    </div>

                   
                    <div className="quantity-section">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="item-total">
                      ₹
                      {(
                        item.unitPrice *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </div>

                  
                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

           
              <div className="cart-summary">
                <div>
                  <span>Total Items</span>

                  <strong>{totalCartCount}</strong>
                </div>

                <div>
                  <span>Total Price</span>

                  <strong>
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;