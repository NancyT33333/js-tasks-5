module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */

    eventsObj: {},

    on: function (event, subscriber, handler) {
        var event=event
        this.eventsObj.event = {
            subscriber: subscriber,
            handler: handler,
        };

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {



        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {


        return this;
    }
};
