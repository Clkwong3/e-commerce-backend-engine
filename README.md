# e-commerce-backend-engine

![License](https://img.shields.io/badge/License-MIT-blue.svg)

The E-Commerce Backend Engine is a robust application that serves as the backbone of an online retail platform. It efficiently manages product data, categories, and tags, providing essential API endpoints for creating, updating, and retrieving information, making it an indispensable tool for building and maintaining e-commerce websites.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)
- [Link](#link)
- [Contact Me](#contact-me)
- [Upcoming Features](#upcoming-features)

## Installation

Users need to have the following installed or available to use this application:

- **Node.js:** A JavaScript runtime environment is required to run the application. Download from [nodejs.org](nodejs.org).

- **MySQL Database:** The application relies on a MySQL database and users need to have a MySQL server installed and running. Download and install MySQL from [mysql](https://dev.mysql.com/downloads/mysql/) or from [homebrew](https://formulae.brew.sh/formula/mysql).

- **Node.js Packages:** Use 'npm' (Node Package Manager) to install the required Node.js packages.

  - Open the terminal and navigate to the project directory.
  - Execute the following command to install the essential packages:
    ```sh
     npm install
    ```
  - This command will install the following packages and their dependencies:

    - **Sequelize:** Sequelize is an ORM used to interact with the MySQL database.

    - **Express.js:** This web application framework is used to create the API routes.

    - **dotenv:** This package helps manage environment variables

    - **Nodemon (optional):** Nodemon is a development dependency that automatically restarts the server when code changes are detected. It's not required but was useful during development.

## Features

Explore the capabilities of the E-Commerce Backend Engine:

- **Perform CRUD Operations:** Easily create, read, update, and delete products, categories, and tags.

- **Effortless Product Management:** Take control of product details like name, price, stock, and category.

- **Seamless Category Organization:** Organize products into categories for better navigation.

- **Tagging Made Simple:** Assign tags to products, enhancing categorization and search.

- **Robust Error Handling:** Built-in validation ensures data accuracy and integrity.

- **Efficient Database Integration:** Seamlessly connect to MySQL using the Sequelize ORM.

- **Accessible API Endpoints:** Interact with APIs to manage product, category, and tag data.

- **Versatile Tag Associations:** Associate multiple tags with products for improved searchability.

- **Reliable Validation:** Built-in checks maintain data consistency.

- **Powered by Express:** Our RESTful API is built on the Express.js framework for smooth HTTP handling.

E-Commerce Backend empowers you to efficiently manage and organize products for your platform.

## Usage

1. **Install Node.js:** Make sure to have Node.js installed on the computer.

2. **Clone the Repository:** Clone the project repository from the provided GitHub URL.

3. **Install Dependencies:** Navigate to the project directory in the terminal and run the following command to install the required dependencies:
   ```sh
   npm install
   ```
4. **Set up the Database:** Create a MySQL database and configure the .env file with the database name, username, and password.

5. **Seed the Database (Optional):** To populate the database with sample data, run the following command:
   ```sh
   npm run seed
   ```
6. **Start the Application:** To start the application, use the following command:
   ```sh
   npm start
   ```
   Alternatively, to use Nodemon and enable automatic server restart on code changes, use:
   ```sh
   npm run watch
   ```
7. **Testing Endpoints:** Use a tool like Insomnia to test the API endpoints.

8. **Exit the Application:** To stop the application, press Ctrl + C (or Cmd + C on macOS) in the terminal where the application is running.

   ### Please remember to put actual database credentials in the .env file.

## Testing

To test the application, perform various HTTP requests (e.g., GET, POST, PUT, DELETE) to interact with the API endpoints.

Follow these steps to test in <u>Insomnia</u>:

1. **Open Insomnia:** Launch the Insomnia application on your computer.

2. **Create a New Workspace (Optional):** Create a workspace by clicking on "Create New Workspace" and giving it a name.

3. **Create a New Request:** Inside the workspace, click on the "New Request" button or go to "File" > "New Request."

4. **Name the Request:** Give the request a name to identify its purpose (e.g., "API Test").

5. **Choose the Request Type:** Select the HTTP request type from the dropdown menu.

   - "GET" - To retrieve data
   - "POST" - To create new data
   - "PUT" - To update existing data
   - "DELETE' - To remove data

6. **Enter the Request URL:** In the URL field, enter the full URL of the API endpoint to test. This should include 'http://' or 'https://' and the specific route.

7. **Set Request Body (For POST and PUT Requests):** If the request type is POST or PUT and requires a request body (e.g., JSON data), switch to the "Body" tab and choose the format (e.g., JSON) and enter the request body data in the editor.

8. **Send the Request:** Click the "Send" button to execute the request. Insomnia will send the request to the API endpoint.

9. **View the Response** After sending the request, receive a response from the server. Insomnia will display the response headers, status code, and response body. Review the response body to make sure the API is behaving as expected.

10. **Inspect and Debug:** Inspect the response data to verify that the API endpoints are working correctly. The data can also be used for debugging and troubleshooting.

11. **Repeat for Other Endpoints:** Create additional requests in Insomnia to test different API endpoints or perform various actions.

12. **Save the Workspace (Optional):** Save the workspace in Insomnia to keep a record of the requests and responses for future testing and debugging purposes.

## License

All rights reserved. Licensed under the MIT license.

## Link

Here is the Starter Code for this project:

- Starter Code: [fantastic-umbrella](https://github.com/coding-boot-camp/fantastic-umbrella)

Here is the Walkthrough Video for this project:

- Walkthrough Video: [screencastify](https://drive.google.com/file/d/1s-K1T76Zz2rdk2QHWmkWpq_RkhPkTlzA/view)

## Contact Me

If you encounter any issues, please report them on the project's [GitHub repository](https://github.com/Clkwong3/e-commerce-backend-engine).

You can also connect with me on [GitHub](https://github.com/Clkwong3).

## Upcoming Features

- Apply testing suites for Models and Routes to ensure code reliability and maintainability
