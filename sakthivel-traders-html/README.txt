SAKTHIVEL TRADERS — HTML WEBSITE
================================

HOW TO OPEN
  Double-click index.html  (home page)
  Double-click shop.html   (shop page)
  No install needed. Needs internet for fonts and the placeholder bike photos.

FILES
  index.html              Home page (Hero, About, Products, Wholesale, Why Us, FAQ, Contact)
  shop.html               Shop page (filters, search, sort, cart)
  assets/css/style.css    All design / colours / fonts
  assets/js/config.js     <-- EDIT THIS: phone, WhatsApp, address, social links, products, prices
  assets/js/main.js       Site behaviour (cart, forms, animations) — normally no need to edit
  assets/images/          Put your own photos here

CHANGE BUSINESS DETAILS
  Open assets/js/config.js and replace every value marked TODO.

ADD REAL PRODUCT PHOTOS
  1. Copy the photo into assets/images/products/  (e.g. diamond-quilt.jpg, 4:3 shape works best)
  2. In config.js find the product and set:  image: "assets/images/products/diamond-quilt.jpg"

CHANGE HERO / SECTION PHOTOS
  In config.js -> images -> hero / about / wholesale / shop, e.g. hero: "assets/images/hero.jpg"

HOW ORDERS WORK
  Customers add products to the cart and press "Order on WhatsApp".
  The full order (items, colours, quantity, total) is sent to your WhatsApp number.
  Wholesale and contact forms also send to WhatsApp.

PUBLISH ONLINE
  Upload the whole folder (keep the structure) to any static host:
  Netlify (drag & drop), GitHub Pages, Hostinger, or any cPanel hosting.
