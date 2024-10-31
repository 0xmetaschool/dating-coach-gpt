# DateMatch: AI-Powered Dating Application
DateMatch is a modern dating app that uses AI to help you find meaningful connections. It creates personalized matches based on your preferences, interests, and compatibility factors. The app uses advanced AI to analyze profiles, suggest conversation starters, and help you put your best foot forward in the dating world.

## Table of Contents
- [DateMatch: AI-Powered Dating Application](#DateMatch-ai-powered-dating-application)
  - [Table of Contents](#table-of-contents)
  - [Live Demo](#live-demo)
  - [Screenshots](#screenshots)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [How to use the application](#how-to-use-the-application)
  - [API Reference](#api-reference)
  - [Use Cases & Future Enhancements](#use-cases-and-future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [FAQ](#faq)

## Live Demo

[https://datematch.vercel.app](https://datematch.vercel.app)

## Features

- User Authentication and Profile Management
- AI-Powered Smart Matching Algorithm
- Interactive Chat with Ice-Breaker Suggestions
- Photo Analysis and Profile Enhancement Tips
- Real-time Notifications and Match Alerts
- Advanced Privacy and Safety Features

## Technologies Used

- Next.js for Frontend and Backend
- Chakra UI for Responsive Design
- OpenAI GPT-4 Model for AI-Powered Features
- MongoDB for Database Management
- OpenAI API for Profile Analysis
- Jose for Authentication
- AWS S3 for Image Storage

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- MongoDB 
- OpenAI API key
- AWS Account for S3

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/date-match
   cd date-match
   ```

2. Install dependencies:

   ```
   npm install
   ```

   This will install the following key dependencies:
   - next: React framework for production
   - react and react-dom: Core React libraries
   - @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion: UI component library and its dependencies
   - @fontsource/source-sans-pro: Source Sans Pro font
   - axios: Promise-based HTTP client for making API requests
   - openai: OpenAI API client for Node.js
   - mongodb: MongoDB driver for Node.js
   - jose: Modern JavaScript implementation of JSON Web Tokens
   - bcryptjs: Library for hashing passwords
   - react-icons: Icon library for React
   - aws-sdk: AWS SDK for S3 integration
   - socket.io: Real-time chat functionality
   - sharp: Image processing library

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret  
     OPENAI_API_KEY=your_openai_api_key
     AWS_ACCESS_KEY_ID=your_aws_access_key
     AWS_SECRET_ACCESS_KEY=your_aws_secret_key
     AWS_REGION=your_aws_region
     S3_BUCKET_NAME=your_bucket_name
     ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Screenshots

<div style="display: flex; justify-content: space-between;">
  <img src="screenshots/home.png" alt="Home Page" style="width: 49%; border: 2px solid black;" />
  <img src="screenshots/matches.png" alt="Matches Page" style="width: 49%; border: 2px solid black;" />
</div>

<div style="margin-top: 10px;">
  <img src="screenshots/profile.png" alt="Profile Page" style="width: 100%; border: 2px solid black;" />
</div>

<div style="margin-top: 10px;">
  <img src="screenshots/chat.png" alt="Chat Page" style="width: 100%; border: 2px solid black;" />
</div>

## How to use the application

1. Creating your dating profile:
   - Sign up or log in to your account
   - Upload your best photos
   - Fill out your interests and preferences
   - Receive AI-powered suggestions to enhance your profile

2. Finding matches:
   - Browse through AI-curated potential matches
   - Use the smart filtering system
   - Send likes or super-likes
   - Start conversations with matches using AI-suggested ice-breakers

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | Creates a new user account |
| `/api/auth/login` | POST | Logs in an existing user |
| `/api/profile` | POST | Updates user profile |
| `/api/matches` | GET | Retrieves potential matches |
| `/api/likes` | POST | Sends a like to another user |
| `/api/chat` | POST | Sends a message to a match |
| `/api/photos` | POST | Uploads profile photos |
| `/api/preferences` | PUT | Updates matching preferences |
| `/api/suggestions` | GET | Gets AI-powered conversation starters |
| `/api/block` | POST | Blocks a user |

Note: All endpoints except `/api/auth/signup` and `/api/auth/login` require authentication via a Bearer token in the Authorization header.

## Use Cases & Future Enhancements

**Current Use Cases:**
- Find potential matches based on compatibility
- Engage in meaningful conversations with AI assistance
- Share and view verified profile photos
- Set dating preferences and filters
- Report inappropriate behavior

**Coming Soon:**
- Video chat integration
- AI-powered date planning suggestions
- Virtual dating events
- Advanced matching algorithms
- Profile verification badges
- Location-based matching
- Integration with social media platforms

Want to contribute? Check out our contributing guidelines below!

## Contributing

We love contributions! Here's how you can help make the project even better:

- Fork the project (gh repo fork https://github.com/yourusername/date-match)
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for the GPT-4 API
- Chakra UI team for their React component library
- AWS for cloud storage solutions

## FAQ

**Q: Is DateMatch free to use?**
A: DateMatch offers both free and premium tiers. Basic matching and messaging are free, while advanced features require a subscription.

**Q: How does the AI matching work?**
A: Our AI analyzes profiles, interests, behavior patterns, and stated preferences to suggest compatible matches.

**Q: Is my data secure?**
A: Yes, we take data security and privacy very seriously. All user data is encrypted, and we never share your personal information with third parties.