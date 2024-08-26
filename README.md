# Servicio - Restaurant Service System

[![License](https://img.shields.io/github/license/nirmeir/Final_Project_Servicio)](https://github.com/nirmeir/Final_Project_Servicio/blob/main/LICENSE)
[![Angular](https://img.shields.io/badge/Angular-%5E14.0.0-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E4.0.0-blue)](https://www.typescriptlang.org/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
  - [Components](#components)
- [Technologies Used](#technologies-used)
- [Installation](#installation)


## Overview

**Servicio** is a comprehensive system designed for restaurants to enhance customer experience by providing seamless access to menus and service requests. Customers can easily scan QR codes or use NFC technology to view the menu, call for service, and interact with the restaurant in a modern and efficient manner.

## Features

- **QR Code and NFC Support**: Customers can scan QR codes or use NFC to access services.
- **Interactive Menus**: View detailed menus with descriptions and images.
- **Service Requests**: Easily call for service directly from your table.
- **Real-time Monitoring**: Restaurant staff can monitor and respond to customer requests in real-time.
- **User-Friendly Interface**: Intuitive design for both customers and restaurant staff.
- **Responsive Design**: Optimized for all devices, including smartphones, tablets, and desktops.

## Architecture

Servicio is built using Angular and TypeScript, organized into a modular architecture for scalability and maintainability.

### Components

1. **Monitor**
   - **Description**: Responsible for displaying the tables and monitoring customer service requests.
   - **Features**:
     - Real-time updates of table statuses.
     - Notifications for new service requests.
     - Management interface for staff to respond to requests.

2. **Restaurant Guest**
   - **Description**: Manages the guest-side functionalities, allowing customers to interact with the system.
   - **Features**:
     - Access and view the restaurant menu.
     - Send service requests.
     - Personalize dining experience through user preferences.

3. **Restaurant Landing**
   - **Description**: Serves as the landing page for customers accessing the system.
   - **Features**:
     - Welcome interface with options to scan QR or use NFC.
     - Information about the restaurant.
     - Easy navigation to menu and service request sections.

4. **Shared**
   - **Description**: Handles the REST API interactions and shared services across the application.
   - **Features**:
     - API integration for data fetching and posting.
     - Shared utilities and services used by other components.
     - Authentication and authorization mechanisms.

## Technologies Used

- **Frontend**:
  - [Angular](https://angular.io/) - Frontend framework
  - [TypeScript](https://www.typescriptlang.org/) - Programming language
  - [SCSS](https://sass-lang.com/) - Styling

- **Backend**:
  - [Node.js](https://nodejs.org/) - JavaScript runtime
  - [Express](https://expressjs.com/) - Web framework for Node.js
  - [REST APIs](https://restfulapi.net/) - API communication

- **Database**:
  - [FireBase](https://firebase.google.com/) - NoSQL database

- **Other Tools**:
  - [Git](https://git-scm.com/) - Version control
  - [GitHub](https://github.com/) - Repository hosting
  - [NFC Tools](https://www.nfc-tools.org/) - NFC implementation
  - [QR Code Libraries](https://github.com/zxing/zxing) - QR code generation and scanning

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Angular CLI**: Install Angular CLI globally using npm:
  ```bash
  npm install -g @angular/cli
  ```
### Clone the Repository
```bash
git clone https://github.com/nirmeir/Final_Project_Servicio.git
cd Final_Project_Servicio
```
### For the main Angular workspace
```bash
npm install
```
### Build the project
```bash
ng build
```
### Run the Application
```bash
ng serve
```




