# SubTracker - Smart Subscription Management System

A full-stack web application for tracking and managing your subscriptions with automated email reminders, built with React.js and Node.js.

## 🌐 Live Demo

**Live Application:** [https://subscription-tracker-frontend-1.onrender.com/](https://subscription-tracker-frontend-1.onrender.com/)

## 📂 Repository Links

- **Frontend Repository:** [https://github.com/ARCoder181105/Subscription-tracker-frontend](https://github.com/ARCoder181105/Subscription-tracker-frontend)
- **Backend Repository:** [https://github.com/ARCoder181105/Subscription-tracker-backend](https://github.com/ARCoder181105/Subscription-tracker-backend)

## ✨ Features

### 🔐 Authentication & User Management
- **Multiple Login Methods**: Email/password, Google OAuth, GitHub OAuth
- **Secure Authentication**: JWT-based authentication with refresh tokens
- **User Profiles**: Avatar upload, user information management
- **Session Management**: Automatic token refresh and secure logout

### 📊 Subscription Management
- **Add Subscriptions**: Track any subscription with custom details
- **Multiple Billing Cycles**: Weekly, Monthly, Quarterly, Yearly
- **Multi-Currency Support**: USD, EUR, INR, GBP, JPY
- **Status Tracking**: Active, Paused, Cancelled, Expired subscriptions
- **Categories**: Organize subscriptions by type (Entertainment, Productivity, etc.)

### 🔔 Smart Reminder System
- **Email Notifications**: Automated reminder emails before billing dates
- **Customizable Reminders**: Set reminder period (1-30 days before billing)
- **Welcome Emails**: New user registration notifications
- **Login/Logout Notifications**: Security alerts for account activity
- **Payment Reminders**: Never miss a subscription payment again

### 📈 Analytics & Insights
- **Spending Overview**: Monthly and yearly expense calculations
- **Visual Statistics**: Dashboard with spending breakdown
- **Upcoming Renewals**: Track subscriptions due soon
- **Filtering Options**: View subscriptions by status or category

### 💻 Modern User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional UI**: Clean, modern design with Tailwind CSS
- **Real-time Updates**: Toast notifications for all user actions
- **Dark/Light Themes**: Professional color schemes
- **Interactive Elements**: Smooth animations and hover effects

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **Cloudinary** - Image upload and management
- **Nodemailer** - Email sending functionality
- **bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- Email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repositories:**
   ```bash
   # Frontend
   git clone https://github.com/ARCoder181105/Subscription-tracker-frontend.git
   cd Subscription-tracker-frontend

   # Backend (in another terminal)
   git clone https://github.com/ARCoder181105/Subscription-tracker-backend.git
   cd Subscription-tracker-backend
   ```

2. **Install dependencies:**
   ```bash
   # In both frontend and backend directories
   npm install
   ```

3. **Environment Configuration:**

   **Backend (.env):**
   ```env
   PORT=6969
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=7d
   SESSION_SECRET=your_session_secret

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

   **Frontend (.env):**
   ```env
   VITE_BACKEND_URL=http://localhost:6969
   ```

4. **Start the development servers:**
   ```bash
   # Backend (port 6969)
   npm run dev

   # Frontend (port 5173)
   npm run dev
   ```

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/google` - Google OAuth
- `GET /api/v1/auth/github` - GitHub OAuth

### Subscriptions
- `GET /api/v1/user/home` - Get user subscriptions
- `GET /api/v1/user/subs/:id` - Get specific subscription
- `POST /api/v1/user/subs` - Create new subscription
- `PATCH /api/v1/user/subs/:id` - Update subscription
- `DELETE /api/v1/user/subs/:id` - Delete subscription
- `PATCH /api/v1/user/subs/:id/done` - Mark subscription as paid

## 🔔 Email Reminder System

The application includes a comprehensive email notification system:

### Reminder Types
- **Registration Welcome**: Sent when users create an account
- **Login Notifications**: Security alerts for account access
- **Logout Notifications**: Session termination confirmations
- **Payment Reminders**: Automated emails before subscription renewals

### Reminder Configuration
- Set custom reminder periods (1-30 days before billing)
- Automatic calculation of next billing dates
- Prevention of duplicate reminder emails
- Support for different billing cycles

### Email Templates
Professional HTML email templates for all notification types with:
- Branded design matching the application
- Clear call-to-action buttons
- Subscription details and payment information
- Responsive design for mobile devices

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React Context providers
│   ├── pages/             # Application pages
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
└── package.json         # Dependencies and scripts

Backend/
├── src/
│   ├── controllers/      # Route handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/          # Utility functions
│   └── db/             # Database configuration
├── index.js            # Server entry point
└── package.json       # Dependencies and scripts
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Mongoose schema validation
- **Rate Limiting**: Protection against brute force attacks
- **Secure Headers**: Security middleware for Express

## 🌟 Key Highlights

- **Real-time Notifications**: Instant feedback for all user actions
- **Responsive Design**: Seamless experience across all devices
- **Professional UI**: Modern, clean interface design
- **Smart Reminders**: Never miss a subscription payment
- **Multi-platform Auth**: Login with Google, GitHub, or email
- **Expense Tracking**: Monitor monthly and yearly spending
- **Data Security**: Secure authentication and data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**ARCoder181105**
- GitHub: [@ARCoder181105](https://github.com/ARCoder181105)
- Frontend Repo: [Subscription Tracker Frontend](https://github.com/ARCoder181105/Subscription-tracker-frontend)
- Backend Repo: [Subscription Tracker Backend](https://github.com/ARCoder181105/Subscription-tracker-backend)

## 🚀 Deployment

The application is deployed on Render with:
- **Frontend**: Static site deployment
- **Backend**: Node.js application deployment
- **Database**: MongoDB Atlas cloud database
- **File Storage**: Cloudinary for image management

**Live Application**: [https://subscription-tracker-frontend-1.onrender.com/](https://subscription-tracker-frontend-1.onrender.com/)

---

**Built with ❤️ using React.js, Node.js, and MongoDB**
