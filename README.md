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
- [x] If beds exist in the db, display them instead of the form
- [x] Layout beds to span 90% of screen width
- [x] Add option --reload to main.py
- [x] Fix height/width ratio of beds
- [x] Show loading indicator instead of form when entering /garden
- [x] Try out ODMs
    - [x] mongoengine
    - [ ] ~beany~
- [x] Add form to add plant families to db
- [x] Create header that allows navigation back to front page

### Next up
- [ ] Add capability to assign plant families to beds
    - [x] Needs an overview that fits all beds on a single page. Flex box?
    - [x] Nice drag-and-drop
    - [ ] highlight which beds are still open for assignment
    - [x] each plant family can be assigned to multiple beds
    - [ ] each family can only be assigned once per bed
    - [ ] don't move beds no matter how many families are added
- [ ] Add sql db

### Later

- [ ] Add tests
    - [ ] backend
    - [ ] frontend
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
