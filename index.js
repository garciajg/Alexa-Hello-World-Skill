'use strict';

const Alexa = require('ask-sdk');
const blog = require('./parser.js');

const LaunchRequestHandler = {
    /* This is called when Alexa first launched the app */
    canHandle(handlerInput) {
        // returns true if the incoming request is a LauchRequest
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },

    handle(handlerInput) {
        // Generates and returns a basic greeting
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello! You can also say tell me number of blogs';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const BlogIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'BlogIntent';
      },

      async handle(handlerInput) {
        try {
            const slots = handlerInput.requestEnvelope.request.intent.slots; // This was specified on the console as numberOfBlogs : AMAZON.NUMBER
            const number = slots.numberOfBlogs.value; // The number specified by the user
            let blogs = await blog.getBlogTitles(Number(number))
            let speechtext = ""

            blogs.forEach( (blog, index) => {
                speechtext += `${index + 1}. ${blog}. `
            })
            
            const speechText = `Your blogs are: ${speechtext}.` // Alexa's response with the blogs
    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .withSimpleCard('What did I learn', speechText)
                .getResponse()
        } catch(err) {
            console.log(err)
        }
      },
}

const BlogDescriptionIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'BlogDescriptionIntent'
    },

    async handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots
        const placing = slots.blogPlacing.value

        try {
            let description = await blog.getBlogDescription(Number(placing))
            let speechText = `${description}`

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard("Blog's Description", speechText)
                .getResponse()

        } catch(err) {
            console.log(err)
        }
    }
}

const HelloWorldIntentHandler = {
    /* Hello Intent,  you specify invocations in the Alexa console */ 
    canHandle(handlerInput) {
        // Detects if the incoming request is an IntentRequest,
        // and returns true if the intent name is 'HelloWorldIntent'
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';

    },

    handle(handlerInput) {
        // Returns a Hello World response
        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('Hello World', speechText)
                .getResponse();
    }
};

/* Helper Intent Handler, this is called when you ask you app for help */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },

    handle(handlerInput) {
        const speechText = 'You can say hello to me! You can also say "tell me four blogs"';

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .withSimpleCard('Hello World', speechText)
                .getResponse();
    }
};

/* Cancel and Stop Intent Handlers*/
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
                    && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                    || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
    },

    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('Hello World', speechText)
                .getResponse();
    }
};

/* Session Ended Handlers */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },

    handle(handlerInput) {
        // any clean up logic if we need one goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

/* 
    Error Handler
    Introduced in ASK SDK v2:
    Better error handling:
        - Unhandled Request
        - API Service time out, etc.
*/
const ErrorHandler = {
    canHandle(handlerInput) {
        return true;
    },

    handle(handlerInput, error) {
        // console.log(`Error Handler: ${error.message}`);
        const speechError = "Sorry, I can't understand the command, Please say it again.";
        
        return handlerInput.responseBuilder
                .speak(speechError)
                .reprompt(speechError)
                .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         BlogIntentHandler, 
                         BlogDescriptionIntent,
                         HelloWorldIntentHandler,
                         HelpIntentHandler,
                         ErrorHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler,)
     .lambda();
