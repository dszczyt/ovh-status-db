'use strict';

class CategoryMapper {
    constructor () {
    }

    toDB (item) {
        return {
            _id: item.id,
            idProject: item.idProject,
            name: item.name
        };
    }

    fromDB (item) {
        return {
            id: item._id,
            idProject: item.idProject,
            name: item.name
        };
    }
};

var Factory = {
    get : () => { return new CategoryMapper(); }
}

module.exports = Factory;
