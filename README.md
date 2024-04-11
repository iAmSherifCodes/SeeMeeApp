# Welcome To SeeMeeApp

SeeMee is a social media application where users can post, see, and interact with fellows' feeds.

The API documentation is intended for developers who  want to interact with the application's backend services.

#### There are two controllers User and Post

# USER API

## Create User
 - This function creates new users in the platform.
 - 
 POST (https://{hostname}/users/register)


### Sample Request Header
    'Content-Type: application/json'

### Sample Request Body
    {
        "username": "John Doe",
        "password": "myP#s$1"
    }

### Sample Response Body
    {
        "success": true,
        "data": {
            "username": "John Doe",
            "password": "$2b$10$SZAP/znq82HNOH15C6Ahi.XTPnU8NgV4eewK6vO4pNmscLRMCZxlm",
            "salt": "$2b$10$SZAP/znq82HNOH15C6Ahi.",
            "followers": [],
            "createdAt": "2024-04-11T09:32:49.350Z",
            "updatedAt": "2024-04-11T09:32:49.350Z",
            "id": "6617ae4125e9421cf1a316ba"
        }
    }

## Login User
 - This function logs users in the platform.
 - 
   POST (https://{hostname}/users/login)

### Sample Request Header
    'Content-Type: application/json'

### Sample Request Body
    {
        "username": "John Doe",
        "password": "myP#s$1"
    }

### Sample Response Body
    {
        "success": true,
        "data": {
            "username": "John Doe",
            "salt": "$2b$10$SZAP/znq82HNOH15C6Ahi.",
            "followers": [],
            "createdAt": "2024-04-11T09:32:49.350Z",
            "updatedAt": "2024-04-11T09:32:49.350Z",
            "id": "6617ae4125e9421cf1a316ba",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvcWVlYiIsImlkIjoiNjYxN2FlNDEyNWU5NDIxY2YxYTMxNmJhIiwiaWF0IjoxNzEyODI5NzYzLCJleHAiOjE3MTI5MTYxNjN9.TFBZ9Ofwalbv9ICtvKCv6Gwr-HL1Ec83C8tOxcOFvQw"
        }
    }


## Follow User
 - This function allows users to follow other users on the platform.
 POST (https://{hostname}/users/follow)

### Sample Request Header
    'Content-Type: application/json'
    'Authorization: Bearer  <Bearer Token>'

### Sample Request Body
    {
        "userId": "661788b14967229067b49cc8",
        "followerId": "6617889f4967229067b49cc2"
    }

### Sample Response Body
    {
        "success": true,
        "data": {
            "username": "john doe",
            "password": "$2b$10$oi6dVqO8eK7e.79DiqY1X.woFhsAR1c2IqSMsINcHxr2mRP4/1fYO",
            "salt": "$2b$10$oi6dVqO8eK7e.79DiqY1X.",
            "followers": [
                {
                    "username": "janet doe"
                }
            ],
            "createdAt": "2024-04-11T16:59:07.187Z",
            "updatedAt": "2024-04-11T16:59:54.135Z",
            "id": "661816dbca2b2ac2493316d5"
        }
    }

# POST API

AUTH

## Create Post
 - This function creates a new post in the platform.
 POST (https://{hostname}/posts/post)

### Sample Request Header
    'Content-Type: application/json'
    'Authorization: Bearer  <Bearer Token>'
### Sample Request Body
    {
        "userId": "661816dbca2b2ac2493316d5",
        "description": "Love with your brain"
    }

### Sample Response Body
    {
        "success": true,
        "data": {
            "userId": "661816dbca2b2ac2493316d5",
            "description": "Love with your brain",
            "likes": [],
            "comments": [],
            "createdAt": "2024-04-11T17:02:53.492Z",
            "updatedAt": "2024-04-11T17:02:53.492Z",
            "id": "661817bdca2b2ac2493316e1"
        }
    }

## Like Post
 - This function allows a user to like a post on the platform.
 POST (https://{hostname}/post/like)

### Sample Request Header
    'Content-Type: application/json'
    'Authorization: Bearer  <Bearer Token>'

### Sample Request Body
    {
    "postId": "661817bdca2b2ac2493316e1",
    "userId": "661816dbca2b2ac2493316d5"
    }

### Sample Response Body
    {
       "success": true,
       "data": {
           "userId": "661816dbca2b2ac2493316d5",
           "description": "Love with your brain",
           "likes": [
               {
                   "username": "you"
               }
           ],
           "comments": [],
           "createdAt": "2024-04-11T17:02:53.492Z",
           "updatedAt": "2024-04-11T17:10:02.582Z",
           "id": "661817bdca2b2ac2493316e1"
       }
    }

## Comment Post
 - This function allows users on the platform to comment on a post on the platform.
 - 
 POST (https://{hostname}/posts/comment)

### Sample Request Header
    'Content-Type: application/json'
    'Authorization: Bearer  <Bearer Token>'

### Sample Request Body
    {
    "postId": "661817bdca2b2ac2493316e1",
    "userId": "661816dbca2b2ac2493316d5",
    "comment": "Like this post!"
    }

### Sample Response Body
    {
        "success": true,
        "data": {
            "userId": "661816dbca2b2ac2493316d5",
            "description": "Love with your brain",
            "likes": [
                {
                    "username": "you"
                }
            ],
            "comments": [
                {
                    "comment": "Like this post!",
                    "author": "john doe"
                }
            ],
            "createdAt": "2024-04-11T17:02:53.492Z",
            "updatedAt": "2024-04-11T17:12:17.133Z",
            "id": "661817bdca2b2ac2493316e1"
        }
    }


## View Number Of Likes
 - This function allows users on the platform to view the number of likes on a post on the platform.
 - 
 POST (https://{hostname}/posts/viewNumberOfLikes)

### Sample Request Header
    'Content-Type: application/json'
    'Authorization: Bearer  <Bearer Token>'

### Sample Request Body
    {
    "postId": "661817bdca2b2ac2493316e1",
    }

### Sample Response Body
    {
    "success": true,
    "data": 1
    }


## View Comment
 - This function allows users on the platform to view comment of a post on the platform.
 - 
 POST (https://{hostname}/posts/viewComments)

### Sample Request Header
    'Content-Type: application/json'
    'Authorization: Bearer  <Bearer Token>'

### Sample Request Body
    {
    "postId": "661817bdca2b2ac2493316e1",
    }

### Sample Response Body
    {
        "success": true,
        "data": {
            "results": [
                {
                    "comment": "Like this post!",
                    "author": "john doe"
                }
            ]
        }
    }

