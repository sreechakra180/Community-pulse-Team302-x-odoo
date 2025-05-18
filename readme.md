# 🌐 Community Pulse

Community Pulse is a location-aware community engagement platform designed to facilitate interaction, visibility, and participation within local neighborhoods. Users can discover, share, and register interest in community events such as garage sales, sports matches, volunteer drives, and more — all from a web or mobile interface.

---

## 🚀 Features

- 🔍 Search and explore local events by location and category
- 📝 Users can post, edit, and delete their own events
- 📱 Mobile-responsive and mobile-compatible interface
- ❤️ Express interest in events with just name, email, phone, and attendee count
- 🔔 Get notifications via Email, SMS, or WhatsApp for:
  - Event reminders (1 day before)
  - Changes in event details (time, location, or cancellation)
- 🛡️ Admin dashboard for event moderation, user bans, and status control

---

## 🎯 Event Categories

- Garage Sales
- Sports Matches (e.g., cricket, football, tennis)
- Community Classes (e.g., yoga, art, workshops)
- Volunteer Opportunities (e.g., clean-up drives, donation camps)
- Exhibitions
- Local Festivals and Celebrations

---

## 👤 User Roles

### Guest
- Browse and search events without logging in

### Registered User
- Register/Login with name, email, phone, password
- Post/edit/delete personal events
- Mark interest in events with minimal info
- View registered events under "My Events"

### Admin
- View and moderate submitted events
- Approve/reject event listings
- Flag and remove inappropriate content
- Assign “Verified Organizer” status
- View event participation history per user
- Ban users if needed

---

## 🛠️ Tech Stack

> _Fill in your final chosen stack below._

- **Frontend**: React.js / [React Native or Flutter for mobile]
- **Backend**: Node.js / Express.js or Django
- **Database**: MongoDB / PostgreSQL
- **Authentication**: JWT-based or Session-based auth
- **Notifications**: Twilio, SendGrid, WhatsApp API
- **Deployment**: [AWS / Firebase / Heroku / Vercel]

---

## 📂 Folder Structure

community-pulse/
├── client/ # React frontend
├── server/ # Backend (API & logic)
├── database/ # DB models & seed scripts
├── public/ # Static files & assets
└── README.md
1.Git clone
bash
git clone https://github.com/your-username/community-pulse.git
cd community-pulse
2. Install dependencies

# Backend setup
cd server
npm install

# Frontend setup
cd ../client
npm install
3. Create environment variables
Create .env files in both /client and /server folders as needed.

env
Copy
Edit
# server/.env example
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_API_KEY=your_email_service_api
TWILIO_API_KEY=your_twilio_key
📸 Screenshots


🧭 Navigation Flow
Home Page: Browse/Search events

Register/Login

Add/Edit/Delete Events

View Registered Events

Admin Panel (for Admins only)

🛡️ Admin Panel Overview
Approve or reject new events

Remove flagged/inappropriate content

View full event history per user

Ban misbehaving users

Assign "Verified Organizer" to trusted users

📅 Notifications System
Reminder sent to users 24 hours before any event they've marked interest in

Live updates sent immediately if:

Event location changes

Event is canceled

Event time changes

📱 Mobile Compatibility
Fully responsive design. Can be extended into a dedicated mobile app using React Native or Flutter.

📈 Future Improvements


 Push Notifications

 Event rating & feedback

 Event filtering by distance

 Calendar integration

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

Fork the repo

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

📃 License
Specify your license here. Example:

This project is licensed under the MIT License.

🙋 Contact
For questions or support, contact:

Email: 23f3003224@ds.study.iitm.ac.in

GitHub: https://github.com/sreechakra180/Community-pulse-Team302-x-odoo

