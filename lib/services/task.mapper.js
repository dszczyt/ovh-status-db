'use strict';

class TaskMapper {
    constructor () {
    }

    toDB (item) {
        return {
            _id: item.id,
            type: item.type,
            category: item.category,
            summary: item.summary,
            status: item.status,
            opened: item.opened,
            lastedit: item.lastedit,
            projectId: item.projectId,
            project: item.project,
            progress: item.progress,
            details: item.details,
            comments: item.comments
        };
    }

    fromDB (item) {
        return {
            id: item._id,
            type: item.type,
            category: item.category,
            summary: item.summary,
            status: item.status,
            opened: item.opened,
            lastedit: item.lastedit,
            projectId: item.projectId,
            project: item.project,
            progress: item.progress,
            details: item.details,
            comments: item.comments
        };
    }
};

var Factory = {
    get : () => { return new TaskMapper(); }
}

module.exports = Factory;
