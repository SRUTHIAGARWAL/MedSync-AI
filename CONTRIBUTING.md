# Contributing to MedSync AI

Thank you for your interest in contributing to MedSync AI! This document provides guidelines and instructions for developers who want to contribute to the project. We welcome contributions from developers of all skill levels.

---

## Table of Contents

- [Important Announcements](#important-announcements)
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Common Development Tasks](#common-development-tasks)
- [Troubleshooting](#troubleshooting)
- [Questions or Need Help?](#questions-or-need-help)

---

## Important Announcements

**All critical project updates, contribution guidelines, submission rules, timelines, and community announcements are published in the [GitHub Discussions → Announcements](https://github.com/tirth-patel06/MedSync-AI/discussions/categories/announcements) section.**

As a contributor, it is your responsibility to review announcements regularly before and during your contribution. This ensures you are aware of:

- Project roadmap and priority areas
- Contribution deadlines (if applicable)
- Breaking changes or architectural decisions
- Community standards and expectations
- Important dependency updates
- API or protocol changes affecting contributions

**Contributors who miss critical announcements may have PRs rejected or delayed.** We strongly recommend enabling notifications for this category to stay informed.

---

## Code of Conduct

### Our Commitment

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- **Be respectful:** Treat all contributors with courtesy and professionalism
- **Be constructive:** Provide helpful feedback and critique
- **Be inclusive:** Welcome contributions from people of all backgrounds and experience levels
- **Report issues:** If you witness or experience inappropriate behavior, report it to the maintainers

Unacceptable behavior includes harassment, discrimination, or disrespect toward any contributor. The maintainers reserve the right to remove contributions or ban contributors who violate these principles.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16+ LTS recommended) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** access (local or cloud) — We use MongoDB Atlas
- **Git** — [Download](https://git-scm.com/)

### Step 1: Fork the Repository

1. Go to [MedSync-AI on GitHub](https://github.com/tirth-patel06/MedSync-AI)
2. Click the **Fork** button in the top-right corner
3. Clone your forked repository:

```bash
git clone https://github.com/YOUR_USERNAME/MedSync-AI.git
cd MedSync-AI
```

### Step 2: Add Upstream Remote

Link your local repo to the original repository to keep it in sync:

```bash
git remote add upstream https://github.com/tirth-patel06/MedSync-AI.git
```

Verify remotes:
```bash
git remote -v
# origin    -> your fork
# upstream  -> original repo
```

---

## Development Setup

### Frontend Setup (React + Vite + Tailwind)

```bash
cd client
npm install
npm run dev
# App runs at http://localhost:5173
```

**Scripts available:**
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

### Backend Setup (Express.js + MongoDB)

```bash
cd server
npm install
```

**Create `.env` file** in the `server/` directory with the following variables:

```env
# Server
PORT=8080

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# LLM APIs
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
HUGGINGFACEHUB_API_KEY=your_huggingface_key

# Google OAuth (for Calendar sync)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/api/oauth/callback

# Report Generation (if using report service)
REPORT_API=your_report_api_key
REPORT_TEMPLATE_ID=5b077b23e86a4726
```

**Start the backend:**
```bash
npm run dev
# Server runs at http://localhost:8080
```

**Scripts available:**
- `npm run dev` — Start with nodemon (auto-reload on changes)
- `npm start` — Start production server

### Frontend `.env` Setup (Optional)

If you need custom API endpoints, create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080
```

---

## Project Structure

Understanding the codebase layout helps you navigate and contribute effectively:

### Frontend (`client/`)

```
client/
├── src/
│   ├── pages/              # Page components (views)
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── addMedication.jsx
│   │   ├── agents.jsx
│   │   ├── Reports.jsx
│   │   ├── ReportChat.jsx
│   │   ├── Analytics.jsx
│   │   └── ...
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── NotificationToast.jsx
│   ├── context/            # React Context for state management
│   │   ├── medicationContext.jsx
│   │   ├── notificationContext.jsx
│   │   ├── socketContext.jsx
│   │   └── calendarSyncContext.jsx
│   ├── services/           # API & external service helpers
│   │   └── socketService.js
│   ├── assets/             # Images, icons, static files
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # React entry point
│   └── global.css          # Global styles (Tailwind)
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html              # HTML template
```

### Backend (`server/`)

```
server/
├── src/
│   ├── index.js            # Entry point (Express + Socket.IO setup)
│   ├── routes/             # API route definitions
│   │   ├── auth.js         # Authentication routes
│   │   ├── medicineRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── agentsRoutes.js
│   │   ├── calendarSyncRoutes.js
│   │   └── oauth.js        # Google OAuth routes
│   ├── api/                # Controllers (business logic)
│   │   ├── addMedicineController.js
│   │   ├── notificationController.js
│   │   ├── reportController.js
│   │   ├── analyticsController.js
│   │   ├── calendarSyncController.js
│   │   └── ...
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── medicineModel.js
│   │   ├── HealthProfile.js
│   │   ├── ReportModel.js
│   │   ├── ConversationModel.js
│   │   └── ...
│   ├── utils/              # Utility functions and AI handlers
│   │   ├── medical_model.js     # Medical Q&A AI agent
│   │   ├── medicine_model.js    # Medication info AI agent
│   │   ├── emergency_model.js   # Emergency triage AI agent
│   │   ├── personal_health_model.js
│   │   ├── reportAnalysis.js    # PDF analysis logic
│   │   └── googleCalendar.js    # Google Calendar integration
│   ├── middlewares/        # Express middleware
│   │   └── authMiddleware.js
│   └── services/           # External service integrations
│       └── sendNotification.js
├── test/                   # Test files
├── package.json
├── .env                    # Environment variables (not in git)
└── .gitignore
```

---

## How to Contribute

### 1. Identify an Issue or Feature

- Check the [GitHub Issues](https://github.com/tirth-patel06/MedSync-AI/issues) for open items
- Look for issues labeled:
  - `good first issue` — Perfect for newcomers
  - `help wanted` — Needs community support
  - `enhancement` — New features
  - `bug` — Bugs to fix
- If you have a new idea, open a **Discussion** first to gather feedback

### 2. Comment to Get Assigned

- Comment on the issue saying you'd like to work on it
- Wait for maintainer feedback (we'll assign you)
- This prevents duplicate work

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/add-email-notifications` — New feature
- `fix/incorrect-medication-schedule` — Bug fix
- `docs/improve-setup-guide` — Documentation
- `refactor/simplify-auth-logic` — Code refactoring

### 4. Make Your Changes

- Write clean, readable code
- Follow the style guides (see below)
- Make commits with clear messages:

```bash
git add .
git commit -m "Add email notification feature for medication reminders"
```

### 5. Keep Your Branch Updated

Before submitting, sync with the latest upstream changes:

```bash
git fetch upstream
git rebase upstream/main
# or if rebasing is complex:
git merge upstream/main
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

1. Go to the [original repository](https://github.com/tirth-patel06/MedSync-AI)
2. Click **New Pull Request**
3. Select your branch from your fork
4. Fill in the PR template with:
   - Clear title: "Add email notifications for medication reminders"
   - Description of changes
   - Related issue(s): "Closes #123"
   - Screenshots (if UI changes)
   - Testing notes

---

## Development Guidelines

### Code Style

#### Frontend (React/JavaScript)

- Use **functional components** with hooks
- Use **camelCase** for variables and functions
- Use **PascalCase** for component names
- Use **descriptive variable names**

**Example:**

```jsx
// Good ✓
const MedicationCard = ({ medication, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteMedication(medication.id);
    } catch (error) {
      console.error('Failed to delete medication', error);
    }
  };

  return (
    <div className="medication-card">
      <h3>{medication.name}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

// Bad ✗
const med_card = ({ m, del }) => {
  const [loading, setLoading] = useState(false);
  // ...
};
```

#### Backend (Node.js/Express)

- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and mongoose models
- Use **SCREAMING_SNAKE_CASE** for constants
- Add **JSDoc comments** for functions

**Example:**

```javascript
// Good ✓
const MAX_RETRIES = 3;
const JWT_EXPIRY = '24h';

/**
 * Fetch all medications for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of medication documents
 * @throws {Error} If database query fails
 */
async function getUserMedications(userId) {
  try {
    const medications = await Medicine.find({ userId });
    return medications;
  } catch (error) {
    console.error('Error fetching medications:', error);
    throw error;
  }
}

// Bad ✗
async function get_meds(user_id) {
  // No documentation, no error handling
  return Medicine.find({ userId: user_id });
}
```

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add email notification for medication reminders
      
- Implement email service integration
- Add notification preference to user model
- Update notification controller to send emails

Closes #123
```

**Format:** `type(scope): subject`

**Types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `style:` — Code formatting (no logic changes)
- `refactor:` — Code refactoring
- `test:` — Adding/updating tests
- `chore:` — Build, dependencies, configuration

### Error Handling

Always implement proper error handling:

**Frontend:**
```jsx
try {
  const data = await fetchMedications();
  setMedications(data);
} catch (error) {
  toast.error('Failed to load medications: ' + error.message);
  console.error(error);
}
```

**Backend:**
```javascript
app.post('/api/medicines', async (req, res) => {
  try {
    const { name, dosage } = req.body;
    
    if (!name || !dosage) {
      return res.status(400).json({ error: 'Name and dosage required' });
    }
    
    const medicine = new Medicine({ name, dosage });
    await medicine.save();
    
    res.json(medicine);
  } catch (error) {
    console.error('Medicine creation error:', error);
    res.status(500).json({ error: 'Failed to create medicine' });
  }
});
```

### Comments and Documentation

- Write comments for **why**, not **what**
- Keep comments up-to-date with code changes
- Use JSDoc for functions and components

```javascript
// Why: Retry logic is needed because the Google API occasionally times out
const MAX_RETRIES = 3;

// Bad: This function gets the user
function getUser(id) { ... }

// Good: Fetch user by ID with caching to reduce database queries
function getUserById(id) { ... }
```

---

## Testing

### Frontend Testing

Currently, the frontend doesn't have automated tests set up. Contributors are welcome to:
- Add Jest + React Testing Library setup
- Write tests for key components and contexts
- Test user authentication flows

### Backend Testing

Currently, the backend doesn't have a test suite. Contributors can:
- Set up Jest for backend tests
- Write tests for API routes
- Add tests for controller logic and utilities

**Example test structure** (once tests are added):

```bash
npm test                  # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Generate coverage report
```

### Manual Testing Checklist

Before submitting a PR, test the following:

**Frontend:**
- [ ] App loads without console errors
- [ ] Login/Signup flow works
- [ ] Protected routes redirect unauthenticated users
- [ ] Medication CRUD operations work
- [ ] Real-time notifications display correctly
- [ ] Report upload and analysis works
- [ ] Responsive design works on mobile

**Backend:**
- [ ] All API endpoints return correct status codes
- [ ] Authentication middleware protects routes
- [ ] Database operations (CRUD) work correctly
- [ ] Error responses are properly formatted
- [ ] Socket.IO notifications are sent correctly

---

## Submitting Changes

### Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Branch is created from latest `main`
- [ ] Code follows style guidelines
- [ ] No console errors or warnings
- [ ] Descriptive commit messages
- [ ] PR title and description are clear
- [ ] Related issues are referenced
- [ ] Screenshots added (if UI changes)
- [ ] No sensitive data (API keys, passwords) in commits

### PR Template Example

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## How to Test
1. Step 1
2. Step 2
3. Verify expected behavior

## Screenshots (if applicable)
Include before/after screenshots for UI changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I've tested this locally
- [ ] No new warnings or errors
```

### What to Expect

- Maintainers will review your PR within 3-7 days
- Feedback will be provided if changes are needed
- Once approved, your PR will be merged and credited

---

## Common Development Tasks

### Adding a New API Endpoint

1. **Create a controller** in `server/src/api/yourFeatureController.js`:

```javascript
export const getYourFeature = async (req, res) => {
  try {
    const data = await YourModel.find({ userId: req.user.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

2. **Create/update a route** in `server/src/routes/yourRoutes.js`:

```javascript
import express from 'express';
import { getYourFeature } from '../api/yourFeatureController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/feature', authMiddleware, getYourFeature);

export default router;
```

3. **Register the route** in `server/src/index.js`:

```javascript
import yourRoutes from './routes/yourRoutes.js';
app.use('/api', yourRoutes);
```

4. **Call the endpoint from frontend**:

```javascript
const response = await fetch('http://localhost:8080/api/feature', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Adding a New Page Component

1. **Create the page** in `client/src/pages/YourPage.jsx`:

```jsx
import { useContext } from 'react';
import { MedicationContext } from '../context/medicationContext';

const YourPage = () => {
  const { medications } = useContext(MedicationContext);

  return (
    <div className="page-container">
      <h1>Your Page Title</h1>
      {/* Page content */}
    </div>
  );
};

export default YourPage;
```

2. **Add routing** in `client/src/App.jsx`:

```jsx
import YourPage from './pages/YourPage';

function App() {
  return (
    <Routes>
      {/* ... other routes */}
      <Route path="/your-page" element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
    </Routes>
  );
}
```

### Working with MongoDB Models

**Create a model** in `server/src/models/YourModel.js`:

```javascript
import mongoose from 'mongoose';

const yourSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('YourModel', yourSchema);
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::8080`

**Solution:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

#### MongoDB Connection Failed

**Problem:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
- Verify `MONGO_URI` in `.env` is correct
- Check MongoDB is running (if local)
- Ensure IP whitelist in MongoDB Atlas (if cloud)

#### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure `VITE_API_BASE_URL` in `client/.env` matches backend URL
- Check CORS configuration in `server/src/index.js`

#### Missing Dependencies

**Problem:** `Cannot find module 'xyz'`

**Solution:**
```bash
cd client && npm install   # or cd server && npm install
```

#### Socket.IO Not Connecting

**Problem:** Socket.IO connection times out

**Solution:**
- Verify `VITE_SOCKET_URL` matches backend address
- Check Socket.IO is initialized in `server/src/index.js`
- Ensure backend is running before frontend

---

## Questions or Need Help?

- **Ask in Discussions:** [GitHub Discussions](https://github.com/tirth-patel06/MedSync-AI/discussions)
- **Report Bugs:** [GitHub Issues](https://github.com/tirth-patel06/MedSync-AI/issues)
- **Email Maintainers:** Contact through GitHub profile

---

## Additional Resources

- [Git & GitHub Basics](https://guides.github.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [LangChain Documentation](https://js.langchain.com/)
- [Socket.IO Docs](https://socket.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Thank you for contributing to MedSync AI! Your efforts help improve medication adherence worldwide. Happy coding! 🚀**
