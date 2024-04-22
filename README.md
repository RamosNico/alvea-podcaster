# Podcaster

## Description

Podcaster is a dynamic web application built with modern web technologies including Vite, TypeScript, TanStack Router, TanStack Query, and TailwindCSS. It allows users to explore and listen to the top podcasts fetched from the iTunes RSS feed. With features like on-demand data fetching, caching, and efficient route management, Podcaster provides a seamless user experience for podcast enthusiasts.

## Technologies

- [**Vite**: A build tool that offers faster and leaner development.](https://vitejs.dev/)
- [**TypeScript**: Ensures type safety across the application.](https://www.typescriptlang.org/)
- [**TanStack Router**: Manages routing with a file-based system.](https://tanstack.com/router/latest)
- [**TanStack Query**: Handles server state and caching.](https://tanstack.com/query/latest)
- [**TailwindCSS**: Provides utility-first CSS for rapid UI development.](https://tailwindcss.com/)

## Check it deployed

You can [click here](https://podcaster-inditex.vercel.app/) to access to the deploy from Vercel in order to quickly have a look at the project.

## Local Development

To start the project locally:

```bash
# Install dependencies
pnpm install
# or should be able to use npm, too
npm install

# Start the development server
pnpm dev
# or
npm run dev
```

## Building for Production

To create a production build:

```bash
# Create a production build
pnpm build
# or
npm run build

# Preview the production build
pnpm preview
# or
npm run preview
```

## Project Structure
This project uses [TanStack Router File-Based Routing.](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)

Inside the 'routes' folder we can find:
- __root.tsx: Root layout file for the application.
- podcast/: Folder that contains the podcast (/podcast/$podcastId) and episode (/podcast/$podcastId/episode/$episodeId) pages.
- routeTree.gen.ts: Automatically generated routing tree with vite's plugin (currently disabled because it's breaking the $episodeId page).

## Data Loading
We make use of [TanStack Router data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading) to take advantage of it's convenient loading/error handling, as well as the integrated caching.

It's important to keep in mind that for the podcast details, in the case of the description and high-resolution cover image, they need to be obtained from a request to the **feedUrl**, which is included in the data from the first request to the podcast details inside **fetchPodcastDetails**.

The request for the description and image can get really slow, mainly because of having to make the request through [allorigins.win](https://allorigins.win/) and parsing an XML. We use TanStack Query to make sure we only need to make that request once.

## Contact
Walter Nicolás Ramos

Email: ramos.nicolas@hotmail.es