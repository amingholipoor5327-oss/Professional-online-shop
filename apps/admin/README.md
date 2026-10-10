# Amin Shop Admin Dashboard

A modern, responsive administration dashboard for managing the Amin Shop e-commerce platform. Built with Next.js and React, this project provides a centralized interface for product management, order tracking, store analytics, and administrative operations.

<p align="center">
  <strong>Manage products. Track orders. Monitor store performance.</strong>
</p>

---

## Overview

The Amin Shop Admin Dashboard is designed to simplify day-to-day e-commerce management through a clean user interface, reusable React components, and API-driven data handling.

The dashboard brings essential store operations together in one place, helping administrators manage catalog information, review orders, and monitor business activity.

## Features

### Dashboard & Analytics
- Store statistics and key performance indicators
- Revenue visualization for recent days
- Order status distribution chart
- Data-driven dashboard components

### Product Management
- View product information
- Edit product details
- Manage product titles, prices, images, descriptions, and categories
- Retrieve and update product data through API endpoints

### Order Management
- Access order information
- Search orders by relevant fields
- Review order status information

### Search
- Search across products and orders
- Debounced search to reduce unnecessary API requests
- Loading, error, and empty-result states
- Quick navigation to relevant management pages

### Authentication & Administration
- Admin authentication flow
- Session-based access control
- Protected dashboard routes
- Administrator profile interface

### User Interface
- Reusable React components
- CSS Modules for scoped styling
- Interactive charts and search results
- Responsive layout design

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| React | Component-based user interface |
| JavaScript (ES6+) | Application logic |
| CSS Modules | Component-level styling |
| React Icons | Interface icons |
| REST API | Communication with backend services |
| MongoDB / Mongoose | Product and order data persistence, where configured |

## Architecture

The dashboard separates the user interface from backend data operations. React components display information and handle user interactions, while API endpoints are responsible for retrieving and updating application data.

```text
Admin Dashboard
       |
       v
Next.js / React UI
       |
       v
REST API Endpoints
       |
       v
Database
```

The admin application can run separately from the storefront, provided that API URLs, authentication, and deployment settings are configured correctly.

## Getting Started

### Prerequisites

- Node.js and npm
- Access to the required API endpoints
- MongoDB configuration if the backend is hosted locally

### Installation

Clone the repository and navigate to the admin application directory:

```bash
git clone https://github.com/amingholipoor5327-oss/Professional-online-shop.git

cd Professional-online-shop
```

Navigate to the actual admin application directory, then install its dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the admin application's root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
ADMIN_EMAIL=your-admin-email@example.com
```

Configure any additional authentication or database variables required by your implementation.

**Security:** Never commit real credentials, session secrets, or database connection strings to version control. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and must not contain secrets.

### Run Locally

```bash
npm run dev
```

If the admin application is configured to use port `3001`, open:

[http://localhost:3001](http://localhost:3001)

## Project Structure

The following is a conceptual overview. Update directory names to match the current repository.

```text
admin/
├── app/
│   ├── dashboard/
│   ├── Products/
│   ├── Orders/
│   ├── Settings/
│   ├── login/
│   └── api/
├── component/
│   └── css/
├── lib/
├── public/
└── package.json
```

## Security Considerations

Administrative access should be validated on the server. Protected API routes must verify the administrator's session and authorization before allowing sensitive operations.

For production deployments, configure secure cookies, appropriate CORS rules, environment variables, and HTTPS. Hiding a page or redirecting unauthenticated users in the frontend is not a substitute for server-side authorization.

## Deployment

The dashboard can be deployed independently from the storefront when the required backend endpoints are accessible.

Before deploying, verify:

- Production API URL
- Authentication and cookie configuration
- Cross-origin request settings, if applications use different origins
- Required environment variables
- Database connectivity and server-side authorization

## Future Improvements

Potential improvements include:

- Advanced order filtering and pagination
- Product image upload
- More detailed sales reports
- Improved form validation and API error handling
- Automated tests for critical administrative workflows
- Role-based access control for multiple administrators

## Author

**Mohammad Amin Gholipour**

GitHub: [@amingholipoor5327-oss](https://github.com/amingholipoor5327-oss)

## License

No license has been specified yet. Add a `LICENSE` file if you intend to define the terms under which others may use or distribute this project.
