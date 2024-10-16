
---

# JobBoard

This is a JobBoard application From where you can send job posting to any User by email

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Saurav-Pant/jobBoard.git
   cd jobBoard
   ```

2. **Frontend (Client) Setup:**

   - Navigate to the client directory:

     ```bash
     cd client
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

    - **Configure Environment Variables:**

     - Rename `.env.example` file to `.env`:

       ```bash
       cp .env.example .env
       ```


   - Start the frontend server:

     ```bash
     npm run dev
     ```

   The frontend will run on `http://localhost:3000`.

3. **Backend (Server) Setup:**

   - Navigate to the server directory:

     ```bash
     cd ../server
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - **Configure Environment Variables:**

     - Rename `.env.example` file to `.env`:

       ```bash
       cp .env.example .env
       ```

     - Add your MongoDB URI to the `.env` file and all the other variable (generate EMAIL_APP_PASSWORD):

       ```
       DATABASE_URL=<your-mongo-uri>
       ```

   - Build the TypeScript code:

     ```bash
     tsc -b
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

   The backend will run on `http://localhost:8080`.
---
