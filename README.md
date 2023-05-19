# NestJS API ANTIFRAUD

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- NodeJs
- Kafka Broker
- Database MongoDB
- Docker

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/IngenieroCesar/api-antifraud
```


### 1.3 Project Docker Image

``` sh
docker pull ghcr.io/ingenierocesar/api-antifraud:v0.0.1
```

## 2. Project structure

The project has been developed with: 
- Modular/clean architecture (Hexagonal)
- Command Query Responsibility Segregation (CQRS) pattern.