module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */

    eventsObj: {},

    on: function (event, subscriber, handler) {


        if ( !this.eventsObj.hasOwnProperty(event)) {
            this.eventsObj[event] = []
        };
            this.eventsObj[event].push({
            subscriber: subscriber,
            handler: handler,
        });

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (typeof this.eventsObj[event] !== 'undefined' && subscriber == undefined) {
            for (let i = this.eventsObj[event].length-1; i>=0; --i) {
                this.eventsObj[event].splice(i, 1);
            }
        } else if (typeof this.eventsObj[event] !== 'undefined') {
            for (let i = this.eventsObj[event].length-1; i>=0; --i) {

                if (this.eventsObj[event][i]['subscriber'] === subscriber) {
                    this.eventsObj[event].splice(i, 1);
                }

            }

        }


        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.eventsObj.hasOwnProperty(event)) {

            this.eventsObj[event].forEach((action) => action['handler'].call(action['subscriber']))
            }


        return this;
    }
};
