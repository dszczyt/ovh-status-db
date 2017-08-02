'use strict';

class ProjectMapper {
    constructor () {
    }

    toDB (item) {
        return {
            _id: item.id,
            name: item.name
        };
    }

    fromDB (item) {
        return {
            id: item._id,
            name: item.name
        };
    }
};

var Factory = {
    get : () => { return new ProjectMapper(); }
}

module.exports = Factory;
