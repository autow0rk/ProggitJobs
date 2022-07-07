## About This Project
I made this project because I noticed that in some programming subreddits, there would be specific threads dedicated to curating job posts from community members. I wanted to aggregate those jobs and have them all in an easier place to view.

The website is an SPA, and can have jobs filtered by the subreddit which they come from, by text search of the job post, and the month of the job post.

The tech stack of the project was:
* Frontend: NextJS (React)
* Backend: Express (Node.js, TypeScript), Postgres

The Express server is hosted on DigitalOcean in a Droplet. The Droplet periodically runs cron jobs to run a script to fetch new jobs from specific subreddits, to be added to the Postgres database. The NextJS frontend requests all jobs the database has, by making a request to the backend Express server which fetches the jobs in the database.

## ProggitJobs in action
![ProggitJobs being used](proggit.gif)
