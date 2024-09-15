
# Onlyjobs

This application allows users to submit requests, which are stored in a MySQL database.

## Features

- Users can leave their email addresses via a form.
- Emails are validated before submission.
- Integration with external email verification service to ensure valid email addresses.
- Stores valid email addresses in the database.
- Provides an API for checking/create/show.

## Installation

1. Clone my repository on your pc:

```bash
git clone https://github.com/RqtHqck/visolut_internship.git
```

2. In project directory:

```bash
npm install
```

3. Create your .env file relying on my .env.example file.
4. Set up your MySQL database by importing the provided SQL file or running the Sequelize migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

   For new migrations:

   ```bash
   npx sequelize-cli migration:generate --name <add-new-field-to-users>
   ```

   Decline migrations:

   ```
   npx sequelize-cli db:migrate:undo:all
   ```
5. Run the application:

```bash
npm start
```

## Usage

    Open a browser and navigate to http://localhost:PORT (replace PORT with your specified port).
    Use the form to submit your email.
    Emails will be verified and stored in the database.

## API Endpoints

    POST /api/user/create – Submits a new user email to the database.
    GET /api/user/check – Checks if an email already exists in the database.
    GET /api/user/all – Retrieves all submitted email addresses.

## Third-party API

    Used https://hunter.io/api-keys API for email validation.
    Their API:
    https://api.hunter.io/v2/email-verifier?email=email&api_key=api_key

## Technologies

    Node.js
    Express.js
    Sequelize ORM
    MySQL
    Express-validator for email validation

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
