'use strict';

const mapper = require('./project.mapper.js').get();

class CategoryService {
    constructor (mongoClient) {
        this.MongoClient = mongoClient;
    }

    store (item) {
        item = mapper.toDB(item);

        var self = this;
        return new Promise((resolve, reject) => {
            this.MongoClient.connect().then((db) => {
                var collection = db.collection("project");

                collection.update(
                    { _id: item._id },
                    {
                        $set: {
                            name: item.name
                        }
                    },
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
                var collection = db.collection("project");

                items.forEach((item) => {
                    item = mapper.toDB(item);
                    collection.update(
                        { _id: item._id },
                        {
                            $set: {
                                name: item.name
                            }
                        },
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
                var collection = db.collection("project");
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
    get : (mongoClient) => { return new CategoryService(mongoClient); }
}

module.exports = Factory;
