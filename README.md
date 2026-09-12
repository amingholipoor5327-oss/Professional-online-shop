# 🛍️ Amin Store

A modern and complete e-commerce store built with Next.js, MongoDB, and RTL design.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)

---

## Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## About

**Amin Store** is a full-featured e-commerce store built with **Next.js 14** (App Router) and **MongoDB**. Designed with **RTL (Right-to-Left)** support, **Vazir** font, and a modern UI, it provides a seamless shopping experience for Persian-speaking users.

---

## Features

###  Completed
- [x] Display products from database
- [x] Shopping cart with Context API
- [x] Add/remove/update product quantities
- [x] Total price calculation (USD → Toman)
- [x] Cart badge in header
- [x] Checkout page and order submission
- [x] Save orders to MongoDB
- [x] Error handling
- [x] Responsive design
- [x] Sticky header
- [x] Mobile menu
- [x] Persian number formatting

### In Progress
- [ ] Authentication
- [ ] Admin panel
- [ ] Order history
- [ ] Payment gateway

### Future
- [ ] Product search and filters
- [ ] Product categories
- [ ] Reviews and ratings
- [ ] Wishlist
- [ ] Discount codes
- [ ] Dark mode
- [ ] PWA
- [ ] Multi-language

---

## Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | 14+ | Main framework |
| **React** | 18+ | UI library |
| **MongoDB** | - | Database |
| **Mongoose** | - | Database ODM |
| **CSS Modules** | - | Styling |
| **Vazir Font** | - | Persian font |
| **Context API** | - | State management |

---

##  Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/amingholipoor5327-oss/Professional-online-shop
cd Professional-online-shop

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local

# 4. Run in development mode
npm run dev
