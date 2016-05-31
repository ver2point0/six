/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
var APP_ID = undefined; // put application ID here

// Skill icon from: http://www.freepik.com

/**
 * Array containing stories of six words.
 */
var THE_SIXES = [
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * 
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Six = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Six.prototype = Object.create(AlexaSkill.prototype);
Six.prototype.constructor = Six;

Six.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Six onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Six.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Six onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Six.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Six onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Six.prototype.intentHandlers = {
    "GetStoryIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Six tell me a story, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random story from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random story from the story list
    var storyIndex = Math.floor(Math.random() * THE_SIXES.length);
    var story = THE_SIXES[storyIndex];

    // Create speech output
    var speechOutput = "Here's your story: " + story;

    response.tellWithCard(speechOutput, "Six", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Six skill.
    var six = new Six();
    six.execute(event, context);
};
