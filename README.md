# Plain Pages

This is just a simple website built with Vite React, Typescript and Firebase.

![Screenshot of the website's homepage and how it looks when it is opened in a browser](https://drive.google.com/uc?id=1-dW0pv3r0L9cRbEhSU7sfPz3TgK671E9)

## Purpose

Its purpose is to help me learn to use authentication and Firebase. Since it doesn't have a back-end, it's relying on Firebase.

## What it includes

The project itself imitates a blog, contains various articles, more of which can be added on Firebase. It also allows the user to sign up and log in which allows them to see different articles and access their profile page where they can change their profile image and description.
The images and descriptions are stored in Firebase and they stay relevant for the current user, i.e. they stay even when the user changes the page or logs out and back in; they are not the same for every user.

It's fully responsive and adjusted for different screen sizes:

1920 x 1335:

![Screenshot of the website's homepage and how it looks when it is opened in a browser](https://drive.google.com/uc?id=1pv2KJUjPHBk7c-FIgP1U_iHEFVR1bwqf)

880 x 2050:

![Screenshot of the website's homepage and how it looks when it is opened in a browser](https://drive.google.com/uc?id=1SujkfmpLaqIwVbwIWiXgIynDudFdPZdO)

## What it doesn't include

The project doesn't allow users to change their email addresses or passwords. The authentication is also limited as it checks only emails and passwords. The usernames do not, unfortunately, have to match as they are not stored in Firebase.

## Requirements

### Git

You will need Git to install the project.

#### on macOS

You will need the Terminal, it can be found here: /Applications/Utilities/Terminal.app.

1.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2.

```
brew install git
```

#### on Linux

Write these commands:

```
sudo apt update
sudo apt install git
```

#### on Windows

Go to [Git website](https://git-scm.com/) and install it.

### Node

To install the project, one will need Node, it also includes NPM.

#### on macOS

You will need the Terminal, it can be found here: /Applications/Utilities/Terminal.app.

1.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2.

```
brew install node
```

#### on Linux

Write these commands:

```
sudo apt update
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
```

#### on Windows

Go to [Node.js website](https://nodejs.org/en) and install it.

## Installation

```
$ git clone "https://github.com/theTix/Plain-Pages.git"
$ cd Plain-Pages
$ npm install
```

## Watch

```
$ npm start
```

or

```
npm run dev
```

## Languages used

### HTML

### Javascript

- [React](https://react.dev/)
- [React-router](https://reactrouter.com/en/main)
- [React icons](https://react-icons.github.io/react-icons/)
- [Typescript](https://www.typescriptlang.org/)

### CSS

### Other:

- [Firebase](https://firebase.google.com/)
