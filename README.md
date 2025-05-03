# ic-blog-api

The **ic-blog-api** is a RESTful API for managing blog content including posts, categories, tags, and user authentication.

## 🌐 Base URL

```
https://ic-blog-api.vercel.app
```

---

## 🔐 Authentication

### Register
```http
POST /api/auth/register
```

### Login
```http
POST /api/auth/login
```

### Logout
```http
POST /api/auth/logout
```

> 💡 After logging in, include the token in the `Authorization` header for protected routes.

---

## 📂 Categories

### List all categories
```http
GET /api/blog/categories
```


---

## 📝 Get Blogs API


### Get a single Blog
```http
GET /api/blog/single-blog/{id}
```
### Get a all Blog
```http
GET /api/blog/all-blog
```
### Get a all Blog with pagination
```http
GET /api/blog/all-blog/pagination?page={page-number}&limit={total-blog}
```
### Get Blogs with category
```http
GET /api/blog/category/{category-name}
```
### Get Popular Blogs
```http
GET /api/blog/popular-blogs
```

### Update a post
```http
PUT /api/blog/update/{id}
```

### soft delete a Blog (User Only)
```http
PUT /api/blog/soft-delete/{id}
```
### Delete a Blog (Admin Only)
```http
DELETE /api/blog/delete/{id}
```

---

## 👤 Users

### Update User
```http
PUT /api/user/update/{user-id}
{
    "firstName":"aaaaa",
    "lastName":"bbbb",
    "password":"22222222",
    "profilePicture":"https://res.cloudinary.com/dutnq2gdm/image/upload/v1745864054/user-1699635_640_mgcjmz.png",
    "bio":"new bio"

}
```

### Delete user
```http
DELETE /api/user/delete/{user-id}
```
### SUSPEND user (Admin Only)
```http
PUT /api/user/suspend/{user-id}
{
    "isSuspended":"suspend"
}
```
### APPROVE user (Admin Only)
```http
PUT /api/user/suspend/{user-id}
{
    "isSuspended":"approve"
}

```

---

## 🛠️ Example: Create a Blog Post

```http
POST /api/blog/create-blog
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "The Rise of AI in Everyday Life",
  "content": "Artificial Intelligence is transforming industries and changing how we interact with technology daily. From smart assistants to predictive analytics, AI is becoming an essential part of modern life.",
  "category": "technology",
  "tags": ["AI", "machine learning", "innovation"]
}
```

---

## Comment

### Create Comment on a Post
```http
POST /api/comment/post-comment/{blog-id}

{
"content":"greate blog"

}
```

### Delete Comment on a Post (user)
```http
PUT /api/comment/soft-delete-comment/{blog-id}

```
### Delete Comment on a Post (Admin Only)
```http
PUT /api/comment/delete-comment/{blog-id}

```
### Delete Comment on a Post (user)
```http
PUT /api/comment/soft-delete-comment/{blog-id}

```
### Get Comments by Blog ID
```http
GET /api/comment/get-comments/{blog-id}

```

## Like

### Add and Remove like on a Blog
```http
POST /api/like/{blog-id}

```


### Get Total Likes by BlogID
```http
GET /api/like/{blog-id}

```


## 📄 License

This project is licensed under the **MIT License**.

---

## 📘 Documentation

Full documentation is available via Postman:
👉 [ic-blog-api Postman Docs](https://documenter.getpostman.com/view/26622927/2sB2j4grj7)
