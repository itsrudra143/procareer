
# ProCareer - Job Matching and Career Development Platform

**ProCareer** is a full-stack web application that connects job seekers with employers. The platform provides a streamlined and modern user interface for creating professional profiles, searching for jobs, and managing job applications. Employers can post job listings, review applications, and communicate with potential candidates. Built with EJS, CSS, and JavaScript for the front-end and a custom-built back-end.

## Features

- **User Authentication**: Users can sign up and log in as either job seekers (employees) or employers.
- **Profile Management**: Job seekers can create and update their profiles, including personal details, skills, education, and a summary.
- **Job Listings**: Employers can create job postings with details like job title, description, and requirements.
- **Job Search**: Employees can browse and search for jobs that match their skills.
- **Job Application**: Users can apply for jobs directly through the platform, and employers can review applicants.
- **Responsive UI**: The platform is mobile-friendly and designed with modern web technologies for a clean and responsive experience.

## Tech Stack

### Front-end:
- **HTML/CSS**: Structure and styling for the web pages.
- **EJS (Embedded JavaScript)**: Template engine for rendering dynamic web pages.
- **JavaScript**: Client-side functionality.

### Back-end:
- **Express.js**: Framework for handling routes, middleware, and server-side logic.
- **MongoDB**: Database for storing user profiles, job listings, and applications.
- **Node.js**: Server-side JavaScript runtime environment.
  
## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/procareer.git
```

2. Navigate into the project directory:

```bash
cd procareer
```

3. Install the dependencies:

```bash
npm install
```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables such as `MONGO_URI`, `PORT`, and `SECRET_KEY`.

5. Start the server:

```bash
npm start
```

6. Open the browser and go to:

```
http://localhost:3000
```

## Usage

- **Job Seeker**: Create a profile, browse job listings, and apply for jobs.
- **Employer**: Create job posts, manage applications, and find suitable candidates.

## Folder Structure

```
/procareer
|-- /public               # Static files (CSS, JS, images)
|-- /views                # EJS templates for rendering UI
|-- /routes               # Express routes (auth, jobs, profiles)
|-- /models               # MongoDB models for users, jobs, applications
|-- /controllers          # Controller logic for handling requests
|-- /config               # Configuration files (DB connection, environment)
|-- server.js             # Main entry point of the application
|-- package.json          # Project dependencies and scripts
```

## Future Enhancements

- **Notifications**: Implement real-time notifications for job applications and job postings.
- **Advanced Search**: Add filtering options for job searches based on location, salary, etc.
- **Chat Functionality**: Enable direct messaging between employers and job seekers.
  
## Contributing

Feel free to submit issues or pull requests if you find bugs or want to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

