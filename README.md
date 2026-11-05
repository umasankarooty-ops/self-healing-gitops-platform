# Self-Healing GitOps Platform

A hands-on DevOps project demonstrating automated CI, Docker containerization, Kubernetes deployment, health monitoring, and self-healing.

## Technology Stack

- Node.js 22
- Docker
- Git and GitHub
- GitHub Actions
- Kubernetes
- Minikube
- kubectl

## Architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
GitHub Actions CI
   |
   +--> Run Tests
   |
   +--> Build Docker Image
   |
   v
Docker Image
   |
   v
Kubernetes (Minikube)
   |
   v
Kubernetes Deployment
   |
   +--> Application Pod 1
   |
   +--> Application Pod 2
   |
   v
Kubernetes Service
   |
   v
Application

```

## Application Endpoints

| Endpoint | Description |
|---|---|
| `/` | Application information |
| `/health` | Application health status |

## Run Locally

```bash
cd app
npm test
npm start
```

Open http://localhost:3000/health

## Build Docker Image

```bash
docker build -t self-healing-gitops-app:v1 ./app
```

## Kubernetes Deployment

Start Minikube:

```bash
minikube start --driver=docker
```

Load the Docker image:

```bash
minikube image load self-healing-gitops-app:v1
```

Deploy the application:

```bash
kubectl apply -f k8s/
```

Check deployment:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

## Access the Application

```bash
kubectl port-forward service/self-healing-gitops-service 8080:3000
```

Open:

- http://localhost:8080/
- http://localhost:8080/health

## Health Monitoring

The Kubernetes Deployment includes:

- Readiness probe using `/health`
- Liveness probe using `/health`
- CPU and memory requests and limits
- Two application replicas

## Self-Healing Demonstration

Delete one application pod:

```bash
kubectl delete pod <pod-name>
```

Watch Kubernetes recreate the deleted pod:

```bash
kubectl get pods -w
```

The Deployment controller maintains the desired replica count of two.

## CI Pipeline

GitHub Actions automatically:

1. Checks out the source code.
2. Sets up Node.js 22.
3. Runs application tests.
4. Builds the Docker image.

Workflow file:

`.github/workflows/ci.yml`

## Project Structure

```text
self-healing-gitops-platform/
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   ├── src/
│   │   ├── server.js
│   │   └── server.test.js
│   ├── Dockerfile
│   └── package.json
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── .gitignore
└── README.md
```

## Future Enhancements

- GitOps deployment using ArgoCD
- Automated image publishing
- Prometheus and Grafana monitoring
- Automated recovery and alerting
