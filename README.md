# Stock Management System - Frontend

A comprehensive inventory management solution that enables admins and stock officers to efficiently manage stock levels, sales, and inventory alerts.

## 🚀 Features

### Admin Dashboard
- Add new items to inventory
- View complete stock listing
- Monitor key metrics (sales, low stock alerts)

### Stock Officer Dashboard
- Process item sales
- View inventory status
- Track metrics and alerts

### Security
- Role-based authentication (Admin/Stock Officer)
- Secure user registration
- Protected dashboard access

### Smart Notifications
- Automated low-stock alerts
- Real-time inventory updates

## 🛠️ Tech Stack

- **React** - UI Components
- **Material-UI** - Styling Framework
- **React Router** - Navigation
- **Axios** - API Integration
- **JavaScript** - Core Logic

## 📁 Project Structure
make this read me well for read

I'll help restructure the README to make it more readable and organized. Here's the improved version:
src/
├── components/
│ ├── Auth/
│ │ ├── LoginForm.js
│ │ └── SignUp.js
│ │
│ ├── Dashboard/
│ │ ├── AdminDashboard.js
│ │ ├── OfficerDashboard.js
│ │ └── Notifications.js
│ │
│ ├── Pages/
│ │ ├── LoginPage.js
│ │ └── SignupPage.js
│ │
│ ├── Shared/
│ │ ├── Navbar.js
│ │ ├── Sidebar.js
│ │ └── Card.js
│ │
│ └── Stock/
│ ├── AddItem.js
│ ├── SellItem.js
│ └── ViewItems.js
│
├── api/
│ └── index.js
│
├── App.js
└── index.js

## 🚀 Getting Started

### Prerequisites
- Node.js & npm (or Yarn)
- Running backend server

### Installation

1. **Clone the repository**
   ```bash
    git clone https://github.com/Lily-Lilian/Stock-Management.git
   ```

2. **Install dependencies**
   ```bash
npm install
   ```

3. **Configure environment**
   Create `.env` file:
   ```env
REACT_APP_API_BASE_URL=http://localhost:8080
   ```

4. **Launch application**
   ```bash
npm start
   ```

   Access at: `http://localhost:3000`

## 📱 Usage Guide

### Authentication
- **Login**: Access via `/login` with credentials
- **Sign Up**: New users can register with role selection

### Admin Functions
- Add new inventory items
- Monitor stock levels
- View sales metrics

### Stock Officer Functions
- Process sales
- Check inventory
- Monitor alerts

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/login` | POST | User authentication |
| `/api/signup` | POST | New user registration |
| `/api/add-item` | POST | Add inventory items |
| `/api/sell-item` | POST | Process sales |
| `/api/items` | GET | Fetch inventory |
| `/api/total-sold` | GET | Sales metrics |
| `/api/low-stock` | GET | Stock alerts |

## 💡 Best Practices

1. Ensure backend connectivity before frontend launch
2. Implement strong password policies
3. Regular monitoring of stock alerts

## 🔮 Future Roadmap

- [ ] Additional user roles
- [ ] Enhanced analytics
- [ ] Multi-language support
- [ ] UI/UX improvements
