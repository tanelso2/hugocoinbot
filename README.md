# HugoCoinBot

Node.js backend for Slack API keeping totals of everyone's "Hugocoins" on Slack. Manages tables of initial totals and historical transactions to calculate running totals.

## Local setup

1. Pull local mysql docker image
  * https://hub.docker.com/_/mysql

2. Setup local .env file
  * PORT - node port, default 8080
  * DB_USER - db user, default root
  * DB_PASS - db password
  * DB_NAME - db name

  * DB_HOST - db host
  * DB_PORT - db port

  * SLACK_VERIFICATION_TOKEN - found in slack api page for security purposes
    * there should be no sensitive data here but just in case,
    * any requests missing Slack auth token should return 403

3. Run node server
  * Run locally using nodemon for hotswapping
    * npm run start:hot


4. Expose using ngrok
  * https://github.com/inconshreveable/ngrok

5. Set request URL to generated https port in slack api manager
  * https://api.slack.com/apps/AS4RD8XN2/slash-commands?

# Slack slash commands

/hc\_init - initialize your current hugocoin count. Every has different amounts by now,
  hopefully everyone is aware of their totals and can provide this on their own.

/hc\_get [@user\_id (optional)] - get total hugocoin of the user correlating to the
  user id passed. If no id is passed, return total counts of all users

/hc\_give [@user\_id] [n] - give n coins to user. Must have sufficient balance.

/hc\_help - get documentation blurb for different commands
