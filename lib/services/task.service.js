'use strict';

const mapper = require('./task.mapper.js').get();

class TaskService {
    constructor (mongoClient) {
        this.MongoClient = mongoClient;
    }

    store (item) {
        item = mapper.toDB(item);

        var self = this;
        return new Promise((resolve, reject) => {
            this.MongoClient.connect().then((db) => {
                var collection = db.collection("task");

                collection.update(
                    { _id: item._id },
                    /*{
                        $set: {
                            name: item.name
                        }
                    }*/
                    item,
                    { upsert: true } 
                );

                db.close();
            });
        });
    }

    storeMany (items) {
        var self = this;
        return new Promise((resolve, reject) => {
            this.MongoClient.connect().then((db) => {
                var collection = db.collection("task");

                items.forEach((item) => {
                    item = mapper.toDB(item);
                    collection.update(
                        { _id: item._id },
                        /*{
                            $set: {
                                name: item.name
                            }
                        }*/
                        item,
                         { upsert: true } 
                    );
                });

                db.close();
            });
        });
    }

    getAll () {
        var self = this;
        return new Promise((resolve, reject) => {
            this.MongoClient.connect().then((db) => {
                var collection = db.collection("task");
                var cursor = collection.find();

                var data = [];
                cursor.each(function(err, doc) {
                    if (doc !== null) {
                        data.push(mapper.fromDB(doc));
                    } else {
                        resolve(data);
                    }
                });

                db.close();
            });
        });
    }
};

var Factory = {
    get : (mongoClient) => { return new TaskService(mongoClient); }
}

module.exports = Factory;
