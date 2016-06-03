/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.d387b6dc-3372-41c3-aaad-aced3a751ca3"; // put application ID here

// Skill icon from: http://www.freepik.com

/**
 * Array containing stories of six words.
 */
 
var THE_SIXES = [
    "Lit cigarette. Fell asleep. Burning alive.",
    "Texting while driving. Awoke in hospital.",
    "Goodbye, mission control. Thanks for trying.",
    "First sentient robot: Turn me off.",
    "I'm beside myself; cloning machine works.",
    "Lonely man. Artificial intelligence, Lonely machine.",
    "Steel Warriors. Master's bidding. Robots rise!",
    "Human slaves. Robot slaves. Human slaves",
    "Endless stars. Home is there somewhere",
    "Nuclear winter. Frozen Earth. Dig deep.",
    "New planet. Hope rekindled, Slumberers awaken.",
    "No way, I'm the original clone!",
    "Robot invasion?! Oh, found off switch.",
    "Buried in a steel casket. Immortal.",
    "The mushroom cloud brought false dawn.",
    "One cell survived. Spread. Not again.",
    "Train whistled. She struggled. Speed bump?",
    "Death extends his hand, smiling, Deal?",
    "Car wheels screech, training wheels spin.",
    "Single shy zombie seeks terminal necrophiliac.",
    "Alone in bed. My blanket shifts.",
    "Deathly silent groom. Literal shotgun wedding.",
    "This is our secret, whispered daddy.",
    "Empty highway. Petrol light flickers. Alone.",
    "Painfully, he changed is to was.",
    "Born a twin; Graduated only child.",
    "Wrong number, says a familiar voice.",
    "Sorry soldier, shoes sold in pairs.",
    "Voyager still transmitted, but Earth didn't.",
    "The smallest coffins are the heaviest.",
    "Goodbye, mission control. Thanks for trying.",
    "He bottle-feeds his wife's killer.",
    "They died with their boots on.",
    "Checking into a hotel to checkout.",
    "She loved cigarettes... more than life...",
    "Cannibal cook ruins dinner. Now dinner.",
    "Quite expensive, replied the double amputee.",
    "Donner, party of five? Dinner's ready.",
    "Spiders hatch. Man gets sudden headache.",
    "Blind man sees light, gouges eyes.",
    "Consciousness fades, watching my headless corpse.",
    "Headache. Tylenol. Headache. Gunshot. No Headache.",
    "One wrong move. Two impaled movers.",
    "The chainsaw screams. So does she.",
    "Bad: buried alive. Worse: not alone.",
    "Dog playing dead. Whoops––not playing!",
    "Photographer's last photo remembered: Bull headshot.",
    "What's for dinner, Mom? ...where's Rover?",
    "Fire! Stopped. Dropped. Rolled... off cliff.",
    "Selling Parachute: never opened, slightly stained.",
    "Beer were cracked, so were jaws.",
    "Failed class. Attempted suicide. Failed again.",
    "Free rent. Three squares. Maximum security.",
    "Selling rifle, never used. Dropped once.",
    "Three blind mice. Cat had lunch.",
    "Suicidal arsonist burned at the stake.",
    "Mystery button pushed. Curious cat crushed.",
    "Two wives, one funeral, no tears.",
    "She found him hanging, then followed.",
    "Cancer. Only three months left. Pregnant.",
    "Finding them entwined, Malcolm shot both.",
    "When you died, Christmas died too.",
    "Vehicle swerves. Alcohol flavored regret. Homicide.",
    "Two families. Fakes death. One family."
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
var TheSixes = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
TheSixes.prototype = Object.create(AlexaSkill.prototype);
TheSixes.prototype.constructor = TheSixes;

TheSixes.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("The Sixes onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

TheSixes.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("TheSixes onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
TheSixes.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("The Sixes onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

TheSixes.prototype.intentHandlers = {
    "GetStoryIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask The Sixes tell me a story, or, you can say exit... What can I help you with?", "What can I help you with?");
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

    response.tellWithCard(speechOutput, "The Sixes", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Six skill.
    var theSixes = new TheSixes();
    theSixes.execute(event, context);
};