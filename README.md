# Sons of Prophets LMS

A modern Learning Management System built with React, featuring spiritual coaching, biblical studies, and community engagement tools.

## 🚀 Features

### Core Features
- **User Authentication**: Email/password registration with email verification
- **Role-based Access**: Admin, Coach, and Member roles with different permissions
- **Course Management**: Comprehensive course catalog and player
- **Community Forum**: Discussion boards and live activity feeds
- **Biblical Study Interface**: Advanced Bible study tools with commentary
- **Events Calendar**: Event management and scheduling
- **Profile Management**: User profiles with spiritual gifts and ministry focus
- **Theme Configuration**: Customizable themes and design tokens

### Authentication & Security
- JWT-based authentication
- Password reset functionality
- Email verification system
- Secure password hashing with bcrypt
- Role-based route protection

### Database
- PostgreSQL database with Neon.tech hosting
- Comprehensive user profiles and permissions
- Scalable schema design
- Connection pooling and error handling

## 🛠️ Technology Stack

- **Frontend**: React 18.2, Vite, Tailwind CSS
- **Database**: PostgreSQL (Neon.tech)
- **Authentication**: JWT, bcrypt
- **Email**: Nodemailer
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Components**: Lucide React icons, DaisyUI
- **Forms**: React Hook Form
- **Charts**: Recharts, D3.js

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- PostgreSQL database (Neon.tech account recommended)
- Email service (Gmail, SendGrid, etc.)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sons-prophets-lms.git
   cd sons-prophets-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure Environment Variables**
   
   Edit `.env` file with your actual values:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://neondb_owner:npg_8THW7MRAoXqz@ep-empty-mountain-aeytqax5-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

   # JWT Configuration
   VITE_JWT_SECRET=your-super-secret-jwt-key-change-in-production-minimum-32-characters

   # Email Configuration (SMTP)
   VITE_SMTP_HOST=smtp.gmail.com
   VITE_SMTP_PORT=587
   VITE_SMTP_USER=your-email@gmail.com
   VITE_SMTP_PASS=your-app-password

   # Application Configuration
   VITE_FROM_EMAIL=noreply@sonsprophets.org
   VITE_FRONTEND_URL=http://localhost:3000
   ```

5. **Database Setup**
   
   The application will automatically initialize the database schema on first run. The schema includes:
   - Users table with authentication
   - User profiles with roles and permissions
   - Proper indexes and triggers
   - Security constraints

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Create a new account or use the login system

## 🔐 Authentication System

### User Registration
- Users register with email and password
- Email verification required before login
- Role selection during registration (Member, Coach)
- Profile completion with spiritual gifts and ministry focus

### Login System
- Email/password authentication
- JWT token-based sessions
- Remember me functionality
- Automatic role-based dashboard routing

### Password Reset
- Secure password reset via email
- Time-limited reset tokens
- Email verification flow

## 📊 Database Schema

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `password_hash`: Bcrypt hashed password
- `email_verified`: Boolean verification status
- `verification_token`: Email verification token
- `reset_token`: Password reset token
- `reset_token_expires`: Token expiration timestamp

### User Profiles Table
- `id`: UUID foreign key to users
- `full_name`: User's full name
- `role`: Enum (admin, coach, member)
- `status`: Enum (active, inactive, suspended)
- `plan`: Enum (free, plus, premium)
- `spiritual_gifts`: Array of spiritual gifts
- `ministry_focus`: Primary ministry focus
- `coaching_info`: Coaching availability and rates

## 🎨 Theme System

### Theme Configuration
- Light, Dark, and Reverent themes
- Color customization
- Typography settings
- Component styling
- Live preview functionality
- Export/import capabilities

### Design Tokens
- Consistent color palette
- Typography scale
- Spacing system
- Component variants
- Accessibility compliance

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Configure production database
3. Set up email service
4. Configure domain and SSL

### Build Process
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Migration
The application handles schema initialization automatically. For production:
1. Ensure database connection is secure
2. Run the application to initialize schema
3. Verify all tables and indexes are created

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/reset-password` - Password reset request
- `POST /api/auth/reset-password-confirm` - Password reset confirmation

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/coaches` - Get available coaches

## 🧪 Testing

```bash
# Run tests
npm run test

# Run load tests
npm run test:load

# Run lighthouse tests
npm run test:lighthouse

# Run all performance tests
npm run test:perf
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
├── pages/               # Page components
├── contexts/            # React contexts
├── utils/               # Utility functions
├── lib/                 # External library configurations
├── styles/              # Global styles and themes
└── hooks/               # Custom React hooks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: support@sonsprophets.org
- Documentation: [Project Wiki](https://github.com/your-username/sons-prophets-lms/wiki)
- Issues: [GitHub Issues](https://github.com/your-username/sons-prophets-lms/issues)

## 🙏 Acknowledgments

- Built with love for the spiritual community
- Inspired by modern learning platforms
- Powered by open-source technologies