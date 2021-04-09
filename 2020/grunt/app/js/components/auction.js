const anims = require("./animations.js");

export default class Auction {
    constructor(el) {
        this.el = el;
        this.endpoint = this.el.getAttribute("data-auction-endpoint");
        this.init();
    }

    init() {
        console.log("Auction component init");
        this.initTimer();
        this.initBidUpdates();
        this.initForm();
    }

    initTimer() {
        const timeEl = this.el.querySelector(".auction-info--timer-value"),
            endTime = Date.parse(timeEl.innerText),
            now = Date.now(),
            delta = Math.abs(endTime - now) / 1000;

        let clockHolder = document.createElement("div");
        clockHolder.classList.add("auction-info--timer-clock");
        timeEl.innerHTML = "";
        timeEl.appendChild(clockHolder);
        let clock = new FlipClock($(clockHolder), delta, {
            clockFace: 'DailyCounter',
            autoStart: true,
            countdown: true
        });
    }

    initBidUpdates() {
        const bidStatus = this.el.querySelector(".auction-info--bid-value");

        if (bidStatus) {
            console.log("High bid element exists... initialising bid status script.");

            this.loadScript("/Scripts/jquery.signalR-2.2.2.js")
                .then(() => this.loadScript(this.endpoint + "/hubs"))
                .then(() => this.initSignalR())
                .catch(error => console.error("Error in SignalR init chain:", error));

            this.attachBidUpdateEvents();
        }
    }

    attachBidUpdateEvents() {
        const bidButton = this.el.querySelector(".auction-info--bid-button"),
            that = this;

        bidButton.addEventListener("click", () => {
            that.goToBidForm();
        });
    }

    goToBidForm() {
        var formSelector = '.form-component-outer';
        const formTab = document.querySelector("a[href='#tabs-compo-2']");
        const event = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": true
        });
        if (formTab !== null) {
            formSelector = '.tabs-component-outer.is-auction-page';
            formTab.dispatchEvent(event);
        }

        const tabs = document.querySelector(formSelector);

        anims.scrollTo(document.scrollingElement || document.documentElement, tabs, 500);
    }

    initSignalR() {
        const that = this;

        $.connection.hub.url = this.endpoint;
        this.ticker = $.connection.auctionHub; // the generated client-side hub proxy
        console.log("this.ticker:", this.ticker);

        this.ticker.client.newHighestBid = message => {
            this.handleNewBid(message);
        };

        // Start the connection
        $.connection.hub.start()
            .done(() => { that.connectionInit(that) })
            .fail((reason) => {
                console.log("SignalR connection failed: " + reason);
            });
    }

    connectionInit(that) {
        console.log("SignalR connection to", that.endpoint, "succeeded");


        that.ticker.server.getHighestBid();
    }

    handleNewBid(message) {
        const statusBid = this.el.querySelector(".auction-info--bid"),
            formStatusBid = document.querySelector(".is-auction-page form .auction-info--bid"),
            bidAmount = message.BidAmount;

        console.log("New high bid received: ", message.BidAmount);

        this.updateHighBid(statusBid, bidAmount);
        if (formStatusBid) {
            this.updateHighBid(formStatusBid, bidAmount);
        }
    }

    updateHighBid(parent, bid) {
        const valueEl = parent.querySelector(".auction-info--bid-value");

        parent.classList.add("is-updating");
        valueEl.innerHTML = bid.toLocaleString("en-GB", { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        valueEl.setAttribute("data-bid-value", bid);
        setTimeout(() => {
            parent.classList.remove("is-updating");
        }, 50);
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            var script = document.createElement('script');
            script.onload = () => {
                resolve(true);
            };
            script.src = src;

            document.body.appendChild(script);
        });
    }

    initForm() {
        const auctionForm = document.querySelector(".is-auction-page form");

        if (auctionForm) {
            this.attachFormEvents(auctionForm);
        }
    }

    attachFormEvents(form) {
        const that = this;

        form.addEventListener("submit", event => {
            event.preventDefault();
            that.handleBid(form);
        });
    }

    handleBid(form) {
        const that = this;

        console.log("Valid form?", $(form).valid());

        const bidField = form.querySelector(".auction-bid-field input"),
            currentBid = parseInt(form.querySelector(".auction-info--bid-value").getAttribute("data-bid-value"), 10),
            bidAmountError = form.querySelector(".bid-amount-error");

        if (bidField.value < currentBid + 250) {
            bidAmountError.classList.add("is-visible");

            $('input[type="submit"]').prop("disabled", false);
            $('input[type="submit"]').val('Bid');

            return false;
        }

        if ($(form).valid()) {
            bidAmountError.classList.remove("is-visible");
            console.log("Compiling JSON object of field values...");
            const fields = Array.prototype.slice.call(form.querySelectorAll("input:not([type='hidden']):not([type='submit']), input[name='Form.SalesforceId'], input[name='Form.SalesforceEnquiry']")),
                fieldNames = ["firstName", "surname", "email", "phone", "bid", "SalesforceEnquiry", "SalesforceId"];
            let fieldsJSON = {};

            fields.forEach((field, index) => {
                fieldsJSON[fieldNames[index]] = field.value;
            });
            console.log("Compiled JSON object for submitting:", fieldsJSON);
            console.log("Function bid is to be submitted to:", this.ticker.server);

            this.ticker.server.placeBid(JSON.stringify(fieldsJSON))
                .done(function (data) {
                    if (data === "EmailNotRegistered") {
                        that.showNotRegisteredMessage(form);
                    } else {
                        that.showThankyouMessage(form);
                    }
                })
                .fail(message => {
                    console.error(message);
                });

        }
    }

    showThankyouMessage(form) {
        const message = document.querySelector(".auction-form-thankyou-message");
        console.log("Bid successfully submitted:");
        form.classList.add("is-hidden");
        message.classList.add("is-visible");

        $('input[type="submit"]').prop("disabled", false);
        $('input[type="submit"]').val('Bid');

        setTimeout(() => {
            message.classList.remove("is-visible");
            form.classList.remove("is-hidden");
        }, 4000);
    }

    showNotRegisteredMessage() {
        window.location.href = $('input[name="Form.ErrorPageUrl"]').val().trim();
    }
}
