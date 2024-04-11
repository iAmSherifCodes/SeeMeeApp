# Welcome To SeeMeeApp

SeeMee is a social media application where users can post, see and interact with fellows feeds.

The API documentation is intended for developers who  want to interact with the application's backend services.

#### There are two controllers User and Post

## Create User
 - This function creates new users in the platform.
 POST (https://{hostname}/users/register)

### Sample Request Body
{
    "username": "John Doe",
    "password": "myP#s$1"
}

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
