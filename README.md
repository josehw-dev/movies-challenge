# MoviesChallange

## Setup

1. Install dependencies:

   ```bash
   npm install

   npx react-native run-ios
   # or
   npx react-native run-android

   Test
   npm test
   ```
   
2. API Key Setup
   Before running the project, you need to create a .env file in the root directory of the project to store sensitive configuration like API keys.

   ```bash
   touch .env

   API_KEY=your_api_key_here
   ```

3. Run the App
   Start the Expo development server:

   ```bash
      npx expo start
   ```

4. Running Tests
   ```bash
      npm test
   ```
---

## 🚀 Tech Stack

| Tech                     | Why it’s used                                         |
|--------------------------|--------------------------------------------------------|
| **Expo**                | Easiest way to build and test React Native apps       |
| **TypeScript**          | Strong typing and better developer experience         |
| **@tanstack/react-query** | Efficient and powerful data fetching & caching layer |
| **react-native-ui-lib** | Modular UI system with great built-in components      |
| **@react-navigation**   | Screen navigation and routing                         |
| **Axios**               | Easy and readable HTTP requests                       |
| **Jest**                | Unit testing framework                                |

---