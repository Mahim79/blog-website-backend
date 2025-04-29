IC_Product Inventory Management API
Welcome to the IC_Product Inventory Management API documentation. This API provides a set of endpoints to manage product inventories, including creating, retrieving, updating, and deleting products.

Base URL
The base URL for all API requests is:

https://ic-product-management-api.onrender.com/api

Authentication
All endpoints require an API key for authentication. Include the API key in the request headers as follows:


Authorization: Bearer YOUR_API_KEY
Replace YOUR_API_KEY with your actual API key.

Endpoints
1. Get All Products
Retrieve a list of all products in the inventory.

URL: https://ic-product-management-api.onrender.com/api/products
Method: GET
Headers:
Authorization: Bearer YOUR_API_KEY
Response:
200 OK: Returns an array of product objects.
2. Get Product by ID
Retrieve details of a specific product by its ID.

URL: https://ic-product-management-api.onrender.com/api/products/{id}
Method: GET
Headers:
Authorization: Bearer YOUR_API_KEY
Parameters:
id (path): The unique identifier of the product.
Response:
200 OK: Returns the product object.
404 Not Found: If the product does not exist.
3. Create a New Product
Add a new product to the inventory.

URL: https://ic-product-management-api.onrender.com/api/products
Method: POST
Headers:
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
Body:
json
Copy code
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100.0,
  "quantity": 10
}
Response:
201 Created: Returns the created product object.
400 Bad Request: If the request body is invalid.
4. Update Product
Update details of an existing product.

URL: https://ic-product-management-api.onrender.com/api/products/{id}
Method: PUT
Headers:
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
Parameters:
id (path): The unique identifier of the product.
Body:
json
Copy code
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 120.0,
  "quantity": 15
}
Response:
200 OK: Returns the updated product object.
400 Bad Request: If the request body is invalid.
404 Not Found: If the product does not exist.
5. Delete Product
Remove a product from the inventory.

URL: https://ic-product-management-api.onrender.com/api/products/{id}
Method: DELETE
Headers:
Authorization: Bearer YOUR_API_KEY
Parameters:
id (path): The unique identifier of the product.
Response:
204 No Content: If the deletion is successful.
404 Not Found: If the product does not exist.
Error Handling
The API uses standard HTTP status codes to indicate the success or failure of an API request. In case of an error, the response will include a JSON object with an error field describing the issue.

Rate Limiting
To ensure fair usage, the API enforces rate limits. If you exceed the allowed number of requests, you will receive a 429 Too Many Requests response. Check the Retry-After header to know when you can resume making requests.

Contact
For support or inquiries, please contact our API team at api-support@example.com.

