import { useState } from 'react'
import strawberryImage from './assets/strawberry-product.jpg'
import './ProductPage.css'

function ProductPage() {
  const [selectedFlavor, setSelectedFlavor] = useState('Strawberry')
  const [selectedSize, setSelectedSize] = useState('Pint')
  const [quantity, setQuantity] = useState(1)

  const flavors = ['Mudslide', 'Strawberry', 'Chocolate', 'Double Vanilla']
  const sizes = [
    { name: 'Pint', volume: '1 pt (473 mL)' },
    { name: 'Quart', volume: '1.5 qt (1.42 L)' },
    { name: 'Half Gallon', volume: '1.75 qt (1.66 L)' }
  ]

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      flavor: selectedFlavor,
      size: selectedSize,
      quantity
    })
  }

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Left side - Product Image */}
        <div className="image-container">
          <div className="product-image-wrapper">
            <img src={strawberryImage} alt="Tillamook Strawberry Ice Cream" className="product-image" />
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="details-container">
          <div className="product-info">
            <p className="brand">Tillamook</p>
            <h1 className="product-title">Strawberry</h1>
            <p className="description">
              Made with real Oregon strawberries, this sweet and creamy ice cream delivers fresh berry flavor in every spoonful.
            </p>
            <p className="price">$5.99</p>

            {/* Flavor Selection */}
            <div className="selector-section">
              <label className="selector-label">Select Flavor</label>
              <div className="flavor-grid">
                {flavors.map((flavor) => (
                  <button
                    key={flavor}
                    className={`flavor-button ${selectedFlavor === flavor ? 'selected' : ''}`}
                    onClick={() => setSelectedFlavor(flavor)}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="selector-section">
              <label className="selector-label">Select Size</label>
              <div className="size-grid">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    className={`size-button ${selectedSize === size.name ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    <span className="size-name">{size.name}</span>
                    <span className="size-volume">{size.volume}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="cart-section">
              <div className="quantity-selector">
                <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-button" onClick={() => handleQuantityChange(1)}>
                  +
                </button>
              </div>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nutritional Information */}
      <div className="nutrition-section">
        <h2 className="nutrition-heading">Nutritional Information</h2>
        <div className="nutrition-facts">
          <div className="nutrition-header">
            <h3>Nutrition Facts</h3>
            <p className="serving-size">Serving size 2/3 cup (55g)</p>
            <p className="servings-per-container">Servings per container 8</p>
          </div>
          <div className="thick-divider"></div>
          <div className="calories-section">
            <p className="amount-per-serving">Amount per serving</p>
            <div className="calories-row">
              <span className="calories-label">Calories</span>
              <span className="calories-value">280</span>
            </div>
          </div>
          <div className="thin-divider"></div>
          <div className="daily-value-header">
            <p>% Daily Value*</p>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row">
            <span className="nutrient-name"><strong>Total Fat</strong> 12g</span>
            <span className="nutrient-percent"><strong>15%</strong></span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row indent">
            <span className="nutrient-name">Saturated Fat 4.5g</span>
            <span className="nutrient-percent"><strong>23%</strong></span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row indent">
            <span className="nutrient-name"><em>Trans</em> Fat 0g</span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row">
            <span className="nutrient-name"><strong>Cholesterol</strong> 40mg</span>
            <span className="nutrient-percent"><strong>13%</strong></span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row">
            <span className="nutrient-name"><strong>Sodium</strong> 150mg</span>
            <span className="nutrient-percent"><strong>7%</strong></span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row">
            <span className="nutrient-name"><strong>Total Carbohydrate</strong> 38g</span>
            <span className="nutrient-percent"><strong>13%</strong></span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row indent">
            <span className="nutrient-name">Dietary Fiber 0g</span>
            <span className="nutrient-percent"><strong>0%</strong></span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row indent">
            <span className="nutrient-name">Total Sugars 25g</span>
          </div>
          <div className="thin-divider"></div>
          <div className="nutrient-row indent-2">
            <span className="nutrient-name">Includes 24g Added Sugars</span>
            <span className="nutrient-percent"><strong>48%</strong></span>
          </div>
          <div className="thick-divider"></div>
          <div className="nutrient-row">
            <span className="nutrient-name"><strong>Protein</strong> 4g</span>
          </div>
          <div className="thick-divider"></div>
          <div className="vitamin-section">
            <div className="vitamin-row">
              <span>Vitamin D 0mcg</span>
              <span>0%</span>
            </div>
            <div className="vitamin-row">
              <span>Calcium 120mg</span>
              <span>10%</span>
            </div>
            <div className="vitamin-row">
              <span>Iron 0mg</span>
              <span>0%</span>
            </div>
            <div className="vitamin-row">
              <span>Potassium 230mg</span>
              <span>6%</span>
            </div>
          </div>
          <div className="thin-divider"></div>
          <div className="footnote">
            <p>* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
