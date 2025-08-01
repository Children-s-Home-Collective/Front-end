Children’s Home Collective — Frontend
A React-based frontend for a platform that connects users with trusted children’s homes. The app allows for donations, volunteering, reviews, and user management through a user-friendly interface.

🚀 Features
User authentication (login/signup)

Volunteer sign-up form

Admin and user dashboards

View and manage children’s homes

Submit and view donations

Submit and read reviews

Image gallery and programme information

Redux-based state management

🛠 Technologies Used
React 19+

Redux Toolkit & redux-persist

React Router DOM 7+

Formik + Yup for form validation

Axios for API requests

CSS Modules 

JWT Auth integration

Backend: Python/Flask (hosted at https://back-end-1-wour.onrender.com)

📁 Project Structure
src/
│
├── Components/
│   ├── About.jsx
│   ├── Account.jsx
│   ├── AdminDashboard.jsx
│   ├── Childrenshomes.jsx
│   ├── Contactinfo.jsx
│   ├── Donate.jsx
│   ├── DonationsManagement.jsx
│   ├── Fundinggoal.jsx
│   ├── Gallery.jsx
│   ├── Header.jsx
│   ├── HomeDetails.jsx
│   ├── HomePage.jsx
│   ├── HomesManagement.jsx
│   ├── LoginPage.jsx
│   ├── LogoutButton.jsx
│   ├── Managesystem.jsx
│   ├── Navigationbar.jsx
│   ├── Profilepage.jsx
│   ├── ProgrammesPage.jsx
│   ├── Review.jsx
│   ├── ReviewsManagement.jsx
│   ├── UserManagement.jsx
│   ├── Visit.jsx
│   ├── VisitorsManagement.jsx
│   ├── VolunteerPage.jsx
│   ├── VolunteersManagement.jsx
│
├── app/
│   └── store.js
│
├── features/
│   └── childHomeSlice.js
│
├── Images/
│   └── content1.avif
│
├── App.jsx
├── App.css
├── index.js
├── index.css
├── reportWebVitals.js
└── setupTests.js





🔧 Setup Instructions
1)Clone the Repository:


git clone https://github.com/your-username/childrenshomeapp.git
cd childrenshomeapp





2)Install Dependencies:


npm install




3)Run the App:


npm start




4)Build for Production:


npm run build






🔐 Environment Variables


REACT_APP_BACKEND_URL=https://back-end-1-wour.onrender.com


📡 API Endpoints (Backend)
POST /auth/login – Login

POST /users/register – Register

GET /homes/ – Fetch all children’s homes

POST /volunteers/ – Register a volunteer

POST /donations/ – Make a donation

POST /reviews/ – Submit a review

Make sure to pass JWT tokens for protected routes.

👤 Roles & Access
Admin:

Manages homes, users, reviews, and volunteers

Example admin: email="arnold.maruti@gmail.com"  password="Arnold!444"

User:

Views content, volunteers, donates, submits reviews


Example user:   email"emma.davis@gmail.com"   passwords="Emma#9876"

<!-- 🧪 Running Tests
npm test
Uses React Testing Library. -->

📝 License
MIT License © 2025 – [Arnold Maruti]

