# 🐾 Pet Clinic Management System

A modern, responsive web application for managing pet clinic patients built with Next.js, React, MongoDB, and Tailwind CSS.

## ✨ Features

- **Patient Management**: Add, edit, and delete patient records
- **Search & Filter**: Search by owner name or pet name, filter by pet type
- **Real-time Validation**: Client-side and server-side validation
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Keyboard Accessible**: Full keyboard navigation support
- **Modern UI**: Clean, professional design with smooth animations

## 🚀 Tech Stack

- **Frontend**: Next.js 13+ (React 18)
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- MongoDB Atlas account (free tier available)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tziporaI/pet_clinic_project.git
   cd pet-clinic
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB_NAME=pet_clinic
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
pet-clinic/
├── components/
│   ├── AddPatientModal.tsx
│   ├── EditPatientModal.tsx
│   ├── DeleteConfirmModal.tsx
│   ├── PatientsTable.tsx
│   └── pet-clinic-dashboard.tsx
├── hooks/
│   └── usePatientValidation.ts
├── lib/
│   ├── db.ts
│   ├── interfaces.ts
│   └── validators/
│       ├── patientValidator.ts
│       └── patientClientValidator.ts
├── pages/
│   ├── api/
│   │   └── patients.ts
│   ├── _app.tsx
│   └── index.tsx
├── styles/
│   └── globals.css
└── tailwind.config.js
```

## 🎨 Design Highlights

- **Color Scheme**: Emerald and Teal gradients for a modern, medical feel
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: SVG icons for scalability and performance
- **Animations**: Smooth fade-in and slide-up effects
- **Accessibility**: High contrast ratios and keyboard navigation

## 🔧 Configuration

### Tailwind CSS

Colors and spacing are configured in `tailwind.config.js`:

### Validation Rules

- **Name**: Letters and spaces only
- **Phone**: Must be 10 digits starting with "05"
- **Pet Name**: Letters and spaces only
- **Birth Date**: Cannot be in the future

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 API Endpoints

- `GET /api/patients` - Fetch all patients
- `POST /api/patients` - Create new patient
- `PUT /api/patients?id={id}` - Update patient
- `DELETE /api/patients?id={id}` - Delete patient

## 🐛 Troubleshooting

### MongoDB Connection Issues

Make sure your MongoDB Atlas connection string is correct and your IP is whitelisted.

### Build Errors

Try clearing the Next.js cache:
```bash
rm -rf .next
npm run dev
```

## 📝 License

This project is for educational purposes.

## 👥 Contributors

Developed as part of a coding assignment.

---

**Note**: Make sure to never commit your `.env.local` file to version control!