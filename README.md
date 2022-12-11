Welcome to CardMaster, a project created for ValueChainLabs.

## Tech Stack

- ReactJS
- NextJS
- TypeScript
- Redux (RTK & RTK Query)
- SCSS Modules
- NodeJS for API Endpoints

## Approach

I decided to use NextJS as the framework of choice as I wanted to demonstrate my ability to work within Next, using React and TypeScript. If I get the job, I believe this is a framework I would recommend we look into to build out the front end.

Of course, TypeScript is a must too, makes not only the developer's life better, but also less prone to errors at runtime, which is also a must!

In this project, I chose Redux to demonstrate my use of states, specifically RTK Query. This is a powerful library built for consuming data from endpoints, and supporting CRUD operations. I have also built this in a way within this project that it can be easily extended to add the state management that may be needed for a larger frontend application.

For the components directory, I have decided to use atomic design, creating directories for atoms, molecules, and organisms. This way, it has a clean, universally understood layout of how each component works. Inside each component directory are subdirectories containing the `.tsx` files, as well as their SCSS modules, and a `index.ts` file that helps cleanly export the component.

Within the `tsconfig.ts` file, I have also set up absolute paths, so internal file imports across the project can be more cleanly imported.

For my mock API, I have used the `/api` directory that NextJS provides, and have written my endpoints in NodeJS. I chose to store the data for this project in a JSON file, which the API reads and writes to as needed. With more time I would have looked to setup a database, or a NoSQL database, which I have emulated here with the JSON document, similar to GCP Firestore. I'm aware this isn't a backend task, so most likely won't be judged too heavily on that, but if you have the time, do take a look.

As for mobile responsiveness, I have also built this in too, so feel free to check it out in the inspect window on your browser for ease.

## Conculsion

I hope you find this project interesting and innovative. I also hope it's simple to use, with a modern, minimalist aesthetic. I wanted to build a project that you could theoretically take to market. My hope is that I have shown off some of my frontend muscle here, and would love to answer any questions you may have!

Thank you! Speak soon.

Adam Redfern

## Now the fun bit, running the project

First, install requried `node_modules/`

```bash
npm install
```

Then, run the dev server with the following command

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
