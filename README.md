# Memory Game

A memory game built with Next.js, React, and TypeScript.

## Installation

### Local Development (No Docker)

1. **Clone the repository**

```

git clone <REPO_URL>
cd memory_game

```

2. **Install dependencies**

```

npm install

```

3. **Start the development server**

```

npm run dev

```

This will launch the app in development mode using Next.js Turbo.

### Docker-Based Development

**Important:**  
If you use Docker for development, do **not** run `npm install` or `npm run dev` directly on your host machine unless you are certain you want to update dependencies outside the container. Running these commands inside the container is preferred to avoid file locks and to ensure consistency.

1. **Clone the repository**

```

git clone <your-repository-url>
cd memory_game

```

2. **Start the Docker development environment**

```

docker-compose -f docker-compose.dev.yml up --build

```

This will:

- Build a development container with all dependencies installed inside.
- Mount your source code for hot reloading.
- Run the development server inside the container.

**All dependency installation and development server commands are handled within the container.**

### Production Deployment

To build and run the app in production using Docker:

```

docker-compose -f docker-compose.prod.yml up --build -d

```

The `-d` flag runs the containers in detached (background) mode.

> **Note:**
>
> - **Dockerfile** is used for multi-stage builds (development and production).
> - **docker-compose.dev.yml** and **docker-compose.prod.yml** define environment-specific configurations.
> - **Do not run `npm install` or `npm run dev` on the host if you are using Docker for development, to avoid file lock or `package-lock.json` conflicts.**

## Testing

The project uses Jest for testing.

- **Run all tests**

```

npm run test

```

- **Run tests in watch mode**

```

npm run test:watch

```

- **Run tests with coverage report**

```

npm run test:coverage

```

> **If you are using Docker for development, you can run tests inside the container by attaching to it and executing these commands, or by adding a test service in your compose file.**

## Husky Setup

Husky is used to manage Git hooks for linting and formatting.

1. **Husky is configured via the `prepare` script in `package.json`.**
   When you run `npm run prepare`, Husky is installed and Git hooks are set up.

---

## Summary

- **Local Install:** `npm install`
- **Local Run:** `npm run dev`
- **Docker Development:** `docker-compose -f docker-compose.dev.yml up --build`
- **Docker Production:** `docker-compose -f docker-compose.prod.yml up --build -d`
- **Test:** `npm run test` (or `test:watch`, `test:coverage`)
- **Husky:** Installed automatically via `prepare` script

**When using Docker for development, always manage dependencies and run scripts inside the container to avoid file lock issues and ensure environment consistency.**
