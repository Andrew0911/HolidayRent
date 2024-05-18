# HolidayRent

## Overview

The Holiday Rent `API` is a `RESTful API` coded using `NodeJS` + `Express` and designed to manage an online booking website in a secure fashion, alongside all of its features, by offering : 
  - An authentication system based on `JWT`
  - `Paginated` and `Sorted` Data
  - Browser `Cookies`
  - `Error` Handling
  - `Role-based` functionalities, and many more

## Database Connection

For this API, `MongoDB` was chosen as the database client, because it provides a unique and efficient way of storing data, while making sure thay stay organized by the 
use of `collections`. 
- DB Link : https://cloud.mongodb.com/v2/6641e8824c665c329cab498f#/metrics/replicaSet/6641e901b0d322483d899091/explorer/test

## Auhthentication System

The first contact with the API will require creating a new user, by providing a `username`, `email` and a `password`. The username and the email must be unique to avoid
redundancy, and, by deafult, the newly registered user will be saved with the `User` role, but he can be later updated in order to become an `Admin`. In order to keep a secure
environment, all the user passwords are kept encryped, using the `bcrypt ` library.

A similar flow will be found calling the API's `Login` endpoint. The user will provide the `username` and the `password`, and sending the request will generate an `access_token`, that will be
stored as a `Cookie`. Unsuccessful login attempts will display suggestive error messages, alongside their statuses.

## Endpoints

### User Endpoints 

All users are able to : 
- `GET` a specific Hotel by its `ID`
- `GET` the complete Hotels list
- `GET` their specific user information
- `DELETE` their own account
- `GET` a specific room by `ID`
- `GET` the list of all rooms
- `UPDATE` the availability of a specific hotel room

### Admin Endpoints

Additionally, admins can also able to :
- `GET` the list of all users and make any change on their account
- `CREATE` new hotels
- `UPDATE` + `DELETE` any hotel by its `ID`
- `CREATE` new rooms associated wit a specific hotel given by `ID`
- `UPDATE` any room by its `ID`
- `DELETE` any room from hotels

## Application Setup

Running the Holiday Rent API requires `NodeJS` and `Express` to be installed on your computer. After cloning the repository, the developer must access the `MongoDB Atlas` official website (https://www.mongodb.com/cloud/atlas/register), where he will `create/sign` in to his `account` and create a new `database`. After this step, an `.env` file has to be provided, with these variables :
- `MONGODB` -> which will be the URI provided by MongoDB when creating the database
- `JWT_KEY` -> a secret base64 encoded 32 bit length string that will be used as secret key for generating JWT Tokens
