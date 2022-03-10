add.reviewers.for.tfs.2013.js
===============

Tampermonkey script that would simplify adding reviewers for pull requests in TFS 2013

![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2.svg)

## prerequisites
 
 - greasemonkey addon for your browser
 - chrome: [tampermonkey extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

## installation

 - install the appropriate addon for your browser
 - open the [add.reviewers.for.tfs.2013.js](add.reviewers.for.tfs.2013.user.js?raw=true) script in your browser and click the install button.
 - edit @match section to follow your tfs url. Example: https://tfs.somedomain.com/tfs/DefaultCollection/*/Workflow/_git/Workflow/pullrequests*
 - populate `reviewers` array with valid reviewers
 
 ## usage

 - open TFS portal
 - navigate to Code -> Pull Requests -> New Pull Request
 - select branch
 - click on Add reviewers link to populate reviewers.

![Screenshot](screenshot.png?raw=true "Screenshot of the UI")
