## AssuredApp Endpoints

#### Create Account:
`/api/account/create`

```
{
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "companyName": "string"
}
```
The above object is the minimum required info needed to create an account. Behind the scene this creates a company account then associates the user to the account.

#### Login
`/api/user/login`

```
{
  "email": "example@email.com",
  "password": "the_password"
}
```
A successful login will create a http-only cookie in the browser for 12 hours, this will be used to authenticate all API calls to the server

#### Authenticate
`/api/user/me`

Calling this endpoint will return the logged in user's account information including the company details and corresponding stripe customer ID. This endpoint will also be used to check if a user is logged in or not. API call will return an error if a user is not logged in.

#### Get Product
`/api/product/{product_id}`

This will return the product details from stripe, this will include the available plans that will be used to create a subscrioption with an order.

#### Create Order
`/api/order/create`

```
{
  planId: "string", // this is the planId from stripe
  sourceData: "token" // this is the credit card token created by stripe
}
```

Orders can only be created if a user is authenticate. The client only needs to send the above info but behind the scene the API uses the authenticated user's info to create a customer and add a payment source in stripe, it then creates a subscription using the `planId`. We then add reference with the stripe's customer info into the current account's information on our DB.

#### Get Invoice
`/api/order/invoice/{invoice_id}`

This endpoint returns the invoice and receipt information of an order from stripe.

#### Get Assessment by ID
`/api/assessment/{assessment_id}`

This endpoint will return an array of assessment questions answerable by yes or no. This will be used to show the questions to the customer.

#### Get Assessment by SKU
`/api/assessment/{sku}`

This endpoint will return an array of assessment questions answerable by yes or no. This will be used to show the questions to the customer.

#### Assessment Result
`/api/result/{result_id}`

This endpoint will return an assessment result for a particular assessment taken by the customer.
