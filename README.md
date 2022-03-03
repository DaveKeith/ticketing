# ticketing

## Introduction
MERN stack ticketing app based on Steven Grider's course on Udemy

https://www.udemy.com/course/microservices-with-node-js-and-react/

## Description 📝
This is a web app that allowed me to explore microservices in production environments.
The client interface is pretty bare bones as the project focused on the microservices aspect of the project.
Behind the scenes, there are 6 independent services managing the different features supported by the platform:
- Authentication
- Ticket Expiration
- Orders
- Payments
- Tickets
- Client

Each service is designed to act independently (from development to deployment). The Continuous Integration (CI) is done through github actions validating the build and tests are successful for services which have been worked on. Post validation, the updated services are deployed to a hosting provider via kubernetes such as DigitalOcean or AWS.

Common logic, middleware, types, etc. are stored on a publicly hosted NPM repository which standardizes definitions and related content between services. This ensures that all information is uniform across each server.

### Learning Experience

In this project we work the following technolgies:
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [NATS-Streaming](https://docs.nats.io/nats-streaming-concepts/intro)
- [Github Actions](https://docs.github.com/en/actions/learn-github-actions)
- [Custom NPM Packages](https://docs.npmjs.com/creating-node-js-modules)

## Getting Started

### Requirements
- Docker (Desktop)
- Kubernetes
- [Skaffold](https://skaffold.dev/docs/quickstart/)

### Installation (Mac)
1. Download [Docker desktop](https://hub.docker.com/editions/community/docker-ce-desktop-mac), run the .dmg and move the docker icon to applications
2. Open docker and log in
3. Click on the docker icon:
  - select preferences
  - click on the kubernetes tab and select the 'enable kubernetes' checkbox
  - hit the 'apply and restart' button to install' kubernetes
4. Install [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/) for Docker desktop
  - run the `kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission` in the command line
5. Update your hosts file:
  - type in your command line: sudo vi /etc/hosts
  - hit the 'i' key on your keyboard to enter editing mode
  - at the bottom of the file, add a few extra empty lines and add the following: `127.0.0.1 ticketing.dev`
  - hit the 'esc' key and enter ':wq' to write and quit (don't forget the colon)
6. Run the `skaffold dev` in the command line in the same directory as the skaffold.yaml file

### Notes
- If you try to open the url in chrome and you get a 'this connection is not safe', click anywhere on the page and type the phrase `thisisunsafe` to bypass security

## Features
This app has the following functionalities:
- Sign in/up
- Add a ticket to the marketplace (seller)
- Add ticket to cart (buyer) and mark it 'reserved' for 15 min
- Create order from cart 
- Checkout & pay for order 
