# 🛍️ NexaMart — Full-Stack E-Commerce Platform

A modern full-stack e-commerce web application built with **React, Django REST Framework, and PostgreSQL**. NexaMart allows users to browse products, explore categories, manage their shopping cart, and place orders through a clean and responsive interface.

The backend provides REST APIs for product management, cart operations, user registration, authentication, and order creation, while Django Admin makes it easy to manage store data.

## 🌐 Live Demo

- **Frontend:** https://e-commerce-django-sooty.vercel.app/
- **Backend API:** https://e-commerce-django-f0ml.onrender.com/
- **Admin Panel:** https://e-commerce-django-f0ml.onrender.com/admin/

## ✨ Features

- 🛒 **Product Catalog** — Browse products with pricing, descriptions, and images.
- 📂 **Category Management** — Organize products into different categories.
- 🔍 **Product Details** — View individual product information.
- 🛍️ **Shopping Cart** — Add products, update quantities, and remove items.
- 📦 **Order Management** — Create orders through the checkout flow.
- 🔐 **Authentication** — User registration and JWT-based authentication.
- 🔄 **Token Refresh** — Refresh JWT access tokens using the backend API.
- 🛠️ **Django Admin** — Manage products, categories, and other registered models through the Django administration panel.
- 🐘 **PostgreSQL Database** — Store application data in PostgreSQL.
- 📱 **Responsive Interface** — Designed for a convenient shopping experience across screen sizes.
- ☁️ **Cloud Deployment** — Frontend deployed on Vercel and backend on Render.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend development and build tooling |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive layouts |
| Python | Backend programming |
| Django | Backend framework |
| Django REST Framework | REST API development |
| Simple JWT | Token-based authentication |
| PostgreSQL | Relational database |
| Neon | Hosted PostgreSQL database |
| Docker | Backend containerization |
| Gunicorn | Production WSGI server |
| WhiteNoise | Static file serving |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Git & GitHub | Version control and source code hosting |

## 📸 Application Modules

### 1. Product Catalog
Display available products with their names, prices, descriptions, categories, and images.

### 2. Product Details
Show information about an individual product using its unique ID.

### 3. Shopping Cart
Allow users to add products, adjust quantities, remove items, and review their cart before checkout.

### 4. Checkout & Orders
Collect checkout details and submit an order to the backend.

### 5. Django Administration
Use Django Admin to create and update product listings, maintain categories, and manage available administrative data.

## 📁 Project Structure

```text
E-Commerce-Django/
│
├── BACKEND/
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── store/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   │
│   ├── media/
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
│
└── FRONTEND/
    ├── src/
    ├── public/
    ├── package.json
    ├── vercel.json
    └── .env
```

*Note: The structure above is a simplified overview. Your actual files and folders may differ.*

## ⚙️ Getting Started

Follow these steps to run NexaMart locally.

### Prerequisites

Make sure you have installed:

- Python 3.12 or a compatible version
- Node.js and npm
- PostgreSQL, or access to a hosted PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone <https://github.com/nabeel-builds/E-Commerce-Django->
cd <E-Commerce (Django)>
```

### 2. Set Up the Backend

Open a terminal in the backend directory:

```bash
cd BACKEND
```

Create and activate a virtual environment.

**Windows PowerShell:**

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside `BACKEND/`.

Example:

```env
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=your_postgresql_connection_string
```

Configure any additional variables required by your Django settings, including allowed hosts and CORS origins.

**Security:** Never commit `.env` files, database credentials, Django secret keys, or authentication tokens to GitHub.

### 4. Run Database Migrations

```bash
python manage.py migrate
```

Create a Django admin account:

```bash
python manage.py createsuperuser
```

Start the development server:

```bash
python manage.py runserver
```

Backend runs by default at:

`http://127.0.0.1:8000/`

Django Admin:

`http://127.0.0.1:8000/admin/`

### 5. Set Up the Frontend

Open another terminal:

```bash
cd FRONTEND
npm install
```

Create a frontend `.env` file:

```env
VITE_DJANGO_BASE_URL=http://127.0.0.1:8000
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173/`

Make sure the frontend environment variable matches the backend URL and that Django CORS settings allow the frontend origin.

## 🔌 API Endpoints

The following endpoints are defined in the backend application.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a user |
| POST | `/api/token/` | Obtain JWT tokens |
| POST | `/api/token/refresh/` | Refresh an access token |
| GET | `/api/products/` | Retrieve products |
| GET | `/api/products/<id>/` | Retrieve a product |
| GET | `/api/categories/` | Retrieve categories |
| GET | `/api/cart/` | Retrieve cart data |
| POST | `/api/cart/add/` | Add an item to the cart |
| POST | `/api/cart/remove/` | Remove an item from the cart |
| POST | `/api/cart/update/` | Update cart quantity |
| POST | `/api/orders/create/` | Create an order |

**Note:** The exact HTTP methods, request payloads, authentication requirements, and response formats depend on the corresponding Django views and serializers.

## 🚀 Deployment

### Frontend — Vercel

1. Import the frontend project or repository into Vercel.
2. Configure the frontend root directory and build settings.
3. Add the production environment variable:

   ```env
   VITE_DJANGO_BASE_URL=https://e-commerce-django-f0ml.onrender.com
   ```

4. Ensure `vercel.json` contains the SPA rewrite configuration if the frontend uses React Router with Vite.
5. Deploy the application.

### Backend — Render

1. Connect the repository to Render.
2. Configure the backend root directory.
3. Deploy using the backend Dockerfile.
4. Add the required environment variables, including `DATABASE_URL` and `SECRET_KEY`.
5. Configure production `DEBUG`, allowed hosts, CORS, CSRF settings, and database connectivity.
6. Run database migrations against the production database.

The production backend uses Gunicorn to serve the Django application inside a Docker container.

## 🔒 Security Considerations

- Keep environment variables and database credentials private.
- Use `DEBUG=False` in production.
- Configure `ALLOWED_HOSTS` and CORS origins explicitly.
- Use HTTPS for production traffic.
- Protect Django Admin with a strong password and appropriate staff permissions.
- Validate input and handle API errors appropriately.
- Avoid exposing sensitive information in API responses or application logs.

## 🎯 Project Goals

NexaMart was developed as a full-stack project to practice and demonstrate:

- React frontend development
- Django REST API development
- PostgreSQL database integration
- Authentication and JWT workflows
- E-commerce cart and checkout logic
- Docker-based backend deployment
- Frontend and backend deployment on cloud platforms

## 🔮 Future Improvements

- Product search, sorting, and filtering
- Product stock and inventory management
- Order history and order status tracking
- Product reviews and ratings
- Improved product image storage
- Online payment gateway integration
- Enhanced admin analytics and reporting
- Automated tests for APIs and checkout workflows

## 👨‍💻 Author

**Nabeel Ahmad**

GitHub: [@nabeel-builds](https://github.com/nabeel-builds)

---

⭐ If you find this project useful, consider giving the repository a star!

