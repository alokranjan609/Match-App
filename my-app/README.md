# Match-App

## Overview

This project is an alternative to the Tinder app, providing similar functionalities for matchmaking and user interactions. It leverages Kinde for authentication and Neo4j for managing the graph data structure of user connections and interactions.

## Features

- **User Authentication**: Secure login and signup using Kinde authentication.
- **Matchmaking**: Algorithmic matchmaking to find compatible users.
- **User Profiles**: Create and update user profiles with personal information and preferences.
- **Connections**: Manage user connections using Neo4j graph database.

## Technologies Used

- **Frontend**: [React/Next.js] for building the user interface.
- **Backend**: [Node.js] for handling server-side logic.
- **Authentication**: Kinde for secure user authentication.
- **Database**: Neo4j for managing graph data of user interactions.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Neo4j](https://neo4j.com/) database set up and running.
- [Kinde](https://kinde.com/) account for authentication.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/alokranjan609/Match-App.git
   cd your-repository
   ```
2.Install the dependencies:   

  ```bash
  npm install
  ```

3.Configure environment variables:
- Create a .env file in the root directory and add the following variables:
```bash
KIND_AUTH_CLIENT_ID=your-kinde-client-id
KIND_AUTH_CLIENT_SECRET=your-kinde-client-secret
NEO4J_URI=your-neo4j-uri
NEO4J_USERNAME=your-neo4j-username
NEO4J_PASSWORD=your-neo4j-password
```

4.Start the development server:
```bash
  npm run dev
```

### Usage
- Visit http://localhost:3000 in your browser.
- Sign up or log in using Kinde authentication.
- Create your profile and start exploring matches.
  
### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
