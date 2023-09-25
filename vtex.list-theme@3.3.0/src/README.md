# List application
 
The List is an application turned to events such as birthdays, weddings, baby showers, etc.

The customer will be able to add the products from the store to their list to share with people of interest who want to presents them

Purchasing a product on a given list will generate store credits where the list owner will be able to convert these credits into products of their choice.
 
![List](https://acupula.vtexassets.com/arquivos/AppList.png)
 
## Prerequisites
 
>ℹ️ The List app usually is done in a sub-account where we need to make some configurations to work correctly
 
1. Access your VTEX account by the Admin.

2. Create a sub-account accessing:
Account management > Account > configure this store

**you can use this documentation for that**:

[How to configure domains in Account Management](https://help.vtex.com/en/tutorial/configurando-dominios-no-gerenciamento-da-conta--tutorials_2450)

3. In your terminal, login to your new sub-account and change the edition type to VTEX IO if you prefer

**you can use this documentation for that**:

[Edition App](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-edition-app)

4. After being logged in to your sub-account, run this command to install the apps and routes needed to run your Lists app:

```
vtex install vtex.list-theme0.19.0
```
 
## Configuration

>ℹ️ We need to do some configurations for our application work properly.

1. Order Hook.

2. Custom data in order Form.

3. Product search setup.

**Order Hook**:

>ℹ️ We must configure the order hook, so that all orders, when they are "invoiced" status, do the process that will credit the value to the customer.

1- Install the list app that contains GraphQL (list-graphql), with vtex install in the workspace that will be used, this configuration can be done in the master workspace also if it is in production.

- list-graphql configuration:

> When installing list-graphql, you must setup this app.
In the admin, go to my apps, and search for List GraphQL.
Then click to setup.
Add VTEX App Key and VTEX App Token.

![List](https://acupula.vtexassets.com/arquivos/graphqL%20app.png)

-Also add “VTEX Order Hook Token“:

![List](https://acupula.vtexassets.com/arquivos/orderHookToken.png)

>Important: Must be the same used in the following steps to create or update the order hook (in the “hg-token-credit-system” field).


2- According to the documentation:
[Get hook configuration](https://developers.vtex.com/vtex-rest-api/reference/gethookconfiguration)
check if there is any existing configuration.

3- Submit the new settings according to the VTEX documentation:
[Create or update hook configuration](https://developers.vtex.com/vtex-rest-api/reference/hookconfiguration)

- Add a token of your choice for validation in the “hg-token-credit-system” field.

-Example of body structure for order hook creation or update:

```json
  {
    "filter": {
        "status": [
            "invoiced"
        ],
        "type": "FromWorkflow"
    },
    "hook": {
        "url": "https://workspaceName--accountName.environment.com/_v/orderHook",
        "headers": {
            "hg-token-credit-system": ""
        }
    }
}
```

 **Custom data in order Form**:

>When you do a purchase on a subAccount, this purchase will send the Main Account to analyze it to identify if the purchase is being made through the list and not in any other way, such as a customer buying a product normally in the main account.

For this, we use a change in the orderform.

This change would be to add a new markup in the orderForm, where we will add the values ​​inside the CustomData `customData.customApp.app.id`

But to be able to set this value you have to create a “space” inside the orderForm and to create it we have to use an API:
[Update orderForm configuration](https://developers.vtex.com/vtex-rest-api/reference/updateorderformconfiguration)


With this “space” created, we can set the field to be `customData.customApp.app.id = list`, so we can confirm that only information about gifts given by the List App will be added to our masterdata.

- Example of use:

If a merchant loses his old orderForm, it will be necessary to get the orderForm configuration API

API:
[Get orderForm configuration](https://developers.vtex.com/vtex-rest-api/reference/getorderformconfiguration)

cURL:
```
curl --request GET \
     --url https://acupula.vtexcommercestable.com.br/api/checkout/pvt/configuration/orderForm \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'X-VTEX-API-AppKey: xxx-xxx' \
     --header 'X-VTEX-API-AppToken: xxx-xxx'
```

response:
```json
{
  "paymentConfiguration": {
    "requiresAuthenticationForPreAuthorizedPaymentOption": false,
    "allowInstallmentsMerge": null,
    "blockPaymentSession": null,
    "paymentSystemToCheckFirstInstallment": null,
    "defaultPaymentSystemToApplyOnUserOrderForm": null
  },
  "taxConfiguration": null,
  "minimumQuantityAccumulatedForItems": 1,
  "decimalDigitsPrecision": 2,
  "minimumValueAccumulated": null,
  "apps": [
    {
      "fields": [
        "quantity",
        "deadlines_1",
        "deadlines_2",
        "deadlines_3"
      ],
      "id": "customer-credit",
      "major": 1
    },
    {
      "fields": [
        "ownerListName",
        "ownerListEmail",
        "ownerListId"
      ],
      "id": "list",
      "major": 1
    }
  ],
  "allowMultipleDeliveries": true,
  "allowManualPrice": true,
  "savePersonalDataAsOptIn": false,
  "maxNumberOfWhiteLabelSellers": null,
  "maskFirstPurchaseData": null,
  "recaptchaValidation": null,
  "maskStateOnAddress": null
}

```

Then copy this orderForm and add it to the updateorderformconfiguration API, as shown:

API:
[Update orderForm configuration](https://developers.vtex.com/vtex-rest-api/reference/updateorderformconfiguration)

Structure example:

```json
curl --request POST \
     --url https://acupula.vtexcommercestable.com.br/api/checkout/pvt/configuration/orderForm \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'X-VTEX-API-AppKey: xxx-xxx' \
     --header 'X-VTEX-API-AppToken: xxx-xxx' \
     --data '
{
     "paymentConfiguration": {
          "requiresAuthenticationForPreAuthorizedPaymentOption": false
     },
     "apps": {
          "fields": [
               "ownerListName",
               "ownerListEmail",
               "ownerListId"
          ],
          "id": "list",
          "major": 1
     },
     "recaptchaValidation": "vtexCriteria",
     "allowMultipleDeliveries": true,
     "allowManualPrice": true
}
```

**Important:

Inside the app (array) in the orderForm we have to add the fields “fields”, “id”, “major”, as in the example:

```json
{
  "fields": [
      "ownerListName",
      "ownerListEmail",
      "ownerListId"
    ],
    "id": "list",
    "major": 1
}
```

**Product search setup**

>When using a sub-account, which will normally always be the case for Lists, it will be necessary to configure this environment in the Admin, so that it brings the products of the main Account.

1 - In your sub-account ADMIN, go to:
search > Integration configuration:

![List](https://acupula.vtexassets.com/arquivos/instegrationConfig.png)

→ or if you prefer, use this path in your url:

 `admin/search/integration-settings`

 2 - click on the “Start Integration” button:

 ![List](https://acupula.vtexassets.com/arquivos/buttonIntegration.png)

 3 - Check the three positive integration status:

![List](https://acupula.vtexassets.com/arquivos/statusIntegration.png)

 
## Customization
 
No CSS Handles are available yet for the app customization.
 
<!-- DOCS-IGNORE:start -->
## Contributors ✨
 
Thanks goes to these wonderful people:

This project thanks all collaborators who contributed to make the project possible.
 
 
