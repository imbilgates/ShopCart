# MERN Stack Product Management App

<div align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" alt="MongoDB Logo" width="50" />
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z"></path>
</svg>
  <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React Logo" width="50" />
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="Node.js Logo" width="50" />
</div>

This project is a **MERN Stack Application** that allows users to:

- **Create** a product
- **Remove** a product
- **Update** a product
- **Display** a list of products

## Tech Stack

- **MongoDB**: Database to store product information
- **Express.js**: Backend framework for API routing
- **React.js**: Frontend library for building the user interface
- **Node.js**: Runtime environment for backend development

## Features

- **CRUD Operations**:
  - Add new products with essential details
  - View all available products in a modern UI
  - Update product details
  - Delete products

- **Responsive Design**: Optimized for all devices.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` folder and add:

     ```env
     MONGO_URI=<your-mongodb-uri>
     PORT=5000
     ```

4. Start the server:

   ```bash
   npm start
   ```

