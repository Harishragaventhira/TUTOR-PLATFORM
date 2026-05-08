# TutorBridge - Professional Tutoring Platform

TutorBridge is a comprehensive, full-stack platform designed to connect learners with expert tutors. It provides a seamless experience for course discovery, booking tutoring sessions, and managing educational content with a premium, modern user interface.

## 🚀 Features

### For Learners (Students)
- **Course Discovery**: Explore a wide range of courses across various subjects.
- **Personalized Dashboard**: Track enrolled courses and learning progress.
- **Secure Registration**: Multi-step registration including OTP email verification.
- **Profile Management**: Update education details and preferences.
- **Course Learning**: Integrated video player for seamless learning experiences.

### For Tutors
- **Course Creation**: Upload and manage courses with video content support.
- **Tutor Dashboard**: Monitor student enrollment and course performance.
- **Verification System**: Secure document upload for admin verification.
- **Profile Customization**: Showcase expertise, experience, and availability.

### For Administrators
- **User Verification**: Review and approve/reject tutor applications.
- **Student Management**: Monitor platform-wide student activity.
- **Platform Analytics**: Oversee registrations and course metrics.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Sequelize](https://sequelize.org/)
- **File Handling**: Multer (for video and document uploads)
- **Services**: SendGrid (OTP/Emails), Nominatim (Geocoding)

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harishragaventhira/TUTOR-PLATFORM.git
   cd TUTOR-PLATFORM
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   DB_NAME=tutorplatform
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   JWT_SECRET=your_secret_key
   SENDGRID_API_KEY=your_sendgrid_key
   FROM_EMAIL=your_verified_email
   ```

3. **Frontend Setup**
   ```bash
   cd ..
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   ```

2. **Start the Frontend Development Server**
   ```bash
   # From the root directory
   npm run dev
   ```

## 📂 Project Structure

- `/src`: Frontend React components, pages, and assets.
- `/backend`: Express server, models, routes, and services.
- `/backend/models`: Sequelize database models.
- `/backend/routes`: API endpoints.
- `/backend/uploads`: Local storage for course videos and documents.

## 🔒 Security
- **JWT Authentication**: Secure API access for authenticated users.
- **Password Hashing**: Bcrypt for secure password storage.
- **OTP Verification**: Email verification for new registrations.
- **Secret Protection**: Sensitive configurations managed via environment variables.

---
Built with ❤️ for better education.
