# Welcome to grow-frontend

## Features/Capabilities

- [x] Initialized FE with react Router
- [x] Welcome page
- [x] Garden page: Display beds
- [x] Database design
- [x] Mongo database created
- [x] Link from Welcome to Garden page
- [x] User can select number of beds and they are saved in Mongo
- [x] Encapsulated styling

### Next up

- [ ] If beds exist in the db, display them instead of the form
- [ ] Layout beds to span 90% of screen width
- [ ] Add option --reload to main.py

### Later

- [ ] Add form to add plant families to db
- [ ] Add capability to assign plant families to beds
- [ ] Add form to add plants to db
- [ ] Add form to add plantings to db and display them in a table


## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Attributions

- Favicon: [Agriculture icons created by Mihimihi - Flaticon](https://www.flaticon.com/free-icons/agriculture)

---

Built with ❤️ using React Router.
