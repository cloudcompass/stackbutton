# Outline area for manual

1. Overview
2. Installation
3. Running the application
4. Components
5. Technology guide
7. Index of technologies

---------------------------------

# Game Plan

With time getting tight on Stackbutton, it looks like we won't get far on functionality, and we need to focus on the technical wrap up, and preparing the demonstration for the Symposium. We can continue this discussion online, but here are my thoughts on the direction for the last weeks of work:

For the symposium, i suggest you focus on presenting DevOps and the technologies involved in the implementation rather than functionality. That is, you focus on the foundation you have created for the continued evolution of the project, rather than on the functionality itself.  For example, the presentation could focus on:
The architecture of the solution
The set of technologies involved in the solution - Angular 2, PatternFly, APIs from components to be monitored, Mongo for local (Stackbutton) persistence, Time Series DB for collected data
The architecture of the code and deployment pieces.
The set of technologies involved in managing the solution - local code, github, build, deployment (ideally, we have OpenShift running by then)
The automation going from code to deployment - webhooks, triggers, builds, testing, deployments and promotions
From a remaining functionality perspective, I suggest we need to drive a story from first page to dashboard:
Fix up the landing page - for example, reuse the one from the initial Stackbutton for find a good example.  Let me know if you need me to help find one.  I can try to help with some text.
If not logged in - Register as the main message, log in as option
On login with new user:
Provide informational "getting started page" - again, I can do the text when needed.
Provide create dashboard option
Show transitional "Building initial dashboard" sequence - fake delay "Building..."
Update account data to know the user has already set up their dashboard
Go to the more or less static Dashboard
On login with a returning user (based on account data tracked above)
Go straight to the Dashboard
Aside from that flow, I suggest the remaining technical focus be on the following:
Markdown files in the repo on setup, development cycle and code components
I'm looking into the metrics APIs from OpenShift to provide some data for more widgets.  Extra time will be spent adding some more widgets.  Worst case, I'll find some that make more sense on the dashboard.
I would be interested to keep pushing on seeing if we can get:
The Angular 2 interface running with Sails and Mongo
Getting the full app - Stackbutton and Mongo - running on OpenShift.
For the booth, I again would recommend focusing on the architecture - the application and the workflow from code to deployment. Maybe some plantuml diagrams for you to walk through.

As noted - I wanted to summarize my thoughts on this and then we can continue to discuss online or in person.  Let me know if you want to meet before Friday.  My week is pretty open this week - although it is a short one.


---------------------------------
# Check-lists

The underpinnings: sails is the application platform that handles the API and communication with the database.

NodeJS

- JavaScript
- TypeScript
- Transpiling

The application structure

- sails
- angular
- mongodb

- angular2
- angular-cli
- webpack


Component driven design

- OpenShift
- Docker