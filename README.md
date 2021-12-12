## CAM Challenge
A simple trade records page with search and export function

### Prerequisites
- Node.js v14.x LTS
- Docker

### Assumptions
- Broker support all product types
- Report support in csv/json format

### Local Development
Install dependencies

```
npm install
```

Start development server with watch mode

```
npm run dev
```

### Deployment
Execute below commands to start with Docker

```
docker build . -t cam-client
docker run -p {port for public}:5000 cam-client
```