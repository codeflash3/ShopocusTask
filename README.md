# ShopocusTask  
https://shopocus616-api.herokuapp.com/  
Shopocus Login, SignIn, getProfile API Routes

User Model consists of fields and constraints:   
Name - String required  
Email - String required along with isEmail validator and custom error message  
Password - String required with minimun 6 characters constraint  
timestamp  
  
/api/users/register - Route  
@desc Register User and get token  
@route POST /api/users/login  
@access Public  
example of JSON to be passed in postman which satisfy constraints mentioned above  
{
    "name": "Aditya Muthal",
    "email": "aditya@gmail.com",
    "password": "123456"
}
  
/api/users/login - Route  
@desc Auth user and get token  
@route POST /api/users/login  
@access Public 
example of JSON to be passed in postman  
{
    "email": "andrew@gmail.com",
    "password": "123456"
} 
  
Both above routes generated JSON web token which needs to be inserted in header by key name of 'x-auth-token'   
to access /api/users/profile route which is protected by auth middleware  
  
/api/users/profile - Route with auth middleware  
@desc Get logedIn user profile  
@route GET /api/users/profile   
@access Private  
  
Auth Middleware  
Receives JSONwebToken from header - 'x-auth-token'  
decodes it using JWT_SECRET key from .env file  
and assigns it to req.user  
  
getProfile (UserController) - extracts the userID to which the token belongs and it finds the Id from the database and responses it  

