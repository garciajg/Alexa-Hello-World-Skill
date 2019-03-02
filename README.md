# Alexa Hello World Skill - NodeJS

## Table of contents

- [Setup](#setup)
- [Testing the skill](#testing-the-skill)
  - [Test Locally](#test-locally)
  - [Test with an AWS Lambda Function](#test-with-an-aws-lambda-function)

## SetUp

Run `npm install`

This will install Alexa's `ASK_SDK` and a framework called `alexa-skill-local` that can host you Skill locally.

Sign into your [Alexa Console](https://developer.amazon.com/alexa/)

Create a new skill and give it a name.

Under the `Build` tab, add a **Custom** intent and name it `HelloWorldIntent`

Add some Sample Utterances such as:

```
hi
hello
how are you
how is it going
what's going on
```

## Testing the skill

### Test Locally

On your Alexa's Console main page, right under your skill's name click on `View Skill ID`   

On the `asl-config.json` file change the current `skillId` to your skill's ID

On the command line go to the root of the project and run:

```bash
alexa-skill-local
```

It will the ask you to open you browser on `localhost:3001` and sign into your amazon account

Once you succesfully log in it will give you an Alexa Skill Endpoint: `https://******.ngrok.io`

Go to your Alexa Console, under the `Build` tab click on `Endpoint` and select `HTTPS`

Add the url to the `Default Region` and under the `ssh certicate` put `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority.`, then save your endpoint.

Go to the `Invocation` tab on the left side and remember your `Invocation Name`

Go to the `Test` tab and turn `Development` on if it's not select.

On the Alexa Simulator type: `open invocationName`; where `invocationName` is the name on your `Invocation` tab

Then type: `hi` and it will say `Hello World!`

### Test with an AWS Lambda Function

Compress **ONLY** the `index.js` file and the `node_modules` directory in a zip file.

Create a Lambda Function from scratch

- Give it a name
- Leave `Node.js 8.10` as a runtime option
- For execution role
  - Create a new role from AWS policy template
  - Give the role a name
  - For `Policy templates` choose `Simple microservice permissions`
- Create Function

Under your Lambdas function `Configuration` tab go the `Function Code` window

- For `Code entry type` select: `Upload a .zip file`
- For `Handler` leave `index.handler` as the option
- Upload your zip file
- Save funtion

Scroll all the way up on your Lambda Function's page and copy the `ARN` on the right hand side of the page

Go to your Alexa Console and select your skill

Click on `Enpoint` on the left navigation tab

Select `AWS Lambda ARN` and copy your Lambdas Function's ARN as the `Default Region` 

Go to the `Invocation` tab on the left side and remember your `Invocation Name`

Go to the `Test` tab and turn `Development` on if it's not select.

On the Alexa Simulator type: `open invocationName`; where `invocationName` is the name on your `Invocation` tab

Then type: `hi` and it will say `Hello World!`