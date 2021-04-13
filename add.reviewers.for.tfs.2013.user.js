// ==UserScript==
// @name         add.reviewers.for.tfs.2013.user.js
// @namespace    https://github.com/lerthe61/add.reviewers.for.tfs.2013.js
// @version      0.1
// @description  Add 'Add reviewers' link to TFS PullRequest creation page. (TFS 2013)
// @author       lerthe61
// @match        https://tfs.somedomain.com/tfs/DefaultCollection/*/Workflow/_git/Workflow/pullrequests*
// @require      https://code.jquery.com/jquery-3.4.1.slim.min.js
// @grant        none
// ==/UserScript==

(function() {
    // Watcher is watching for window, detecting when specific elements become available and invoke controller. Controller will run scheduled actions.
    // This level of complication was introduced because window can be updated after ajax calls and url not always reflect what is the current view is.

    'use strict';
    /* globals jQuery */
    var $_new = jQuery.noConflict(true);

    var reviewers = ["Mickey.Mouse", "Donald.Duck"];
    // represent a queue for actions. Every reviewer from this array would be added. Populated when user click on 'Add reviewers' link
    var currentReviewers = [];

    var document = window.document;
    var list = undefined;

    // Adding 'Add reviewers' link
    //<li>
    // <a class="linkAction" onClick="addReviewersClick(); return false;">Add reviewers</a>
    //</li>
    function addReviewersLink() {

        function addReviewersClick() {
            currentReviewers = reviewers.slice(0);
        };

        var liElement = document.createElement("li");
        var aElement = document.createElement("a");
        aElement.className = "linkAction";
        aElement.onclick = addReviewersClick;
        aElement.innerText = "Add reviewers";
        liElement.appendChild(aElement);
        list.appendChild(liElement);
    };

    function addReviewer() {
        var inputNode = $_new("div.identity-picker-control > div.identity-picker-main > div.identity-input-wrapper > div > div > div.dropdown-input-main > div.dropdown-input-inputarea > input.dropdown-input-text.dropdown-input-name")[0];
        var checkNamesLink = $_new("a#check-name-action");

        // do not override data in Input field
        // 'Display name or domain\username' is a hint and can be ignored
        var inputVal = $_new(inputNode).val();
        if (typeof inputVal !== "undefined" && (inputVal.length != 0 && inputVal !== "Display name or domain\\username")) return;

        // do not start if we still waiting for ajax request to complete
        if (checkNamesLink[0].text !== "Check name") return;

        var reviewer = currentReviewers.shift();
        if (typeof reviewer === "undefined") return;

        $_new(inputNode).focus();
        for (var i = 0; i < reviewer.length; i++) {
            var e = $_new.Event("keydown", { keyCode: reviewer.charCodeAt(i)});
            $_new(inputNode).trigger(e);
            e = $_new.Event("keyup", { keyCode: reviewer.charCodeAt(i)});
            $_new(inputNode).trigger(e);
            e = $_new.Event("keypress", { keyCode: reviewer.charCodeAt(i)});
            $_new(inputNode).trigger(e);
            $_new(inputNode).change();
        }
        $_new(inputNode).val(reviewer);
        $_new(inputNode).change();
        $_new(checkNamesLink)[0].click();
    };

    function controller() {
        if (list == "undefined") return;

        // if 'Add reviewers' is not added
        if (list.childElementCount === 3) {
            addReviewersLink();
        };

        // if reviewers population was scheduled
        if (currentReviewers !== "undefined" || currentReviewers.length !== 0) {
            addReviewer();
        };
    };

    function watcher(){
        list = $_new("div.identity-picker-control > div.identity-picker-main > div.add-identities-actions-section.actions-section > ul")[0];
        if(typeof list == "undefined"){
            window.setTimeout(watcher,100);
        }
        else{
            controller();
            window.setTimeout(watcher,100);
        }
    };
    watcher();
})();