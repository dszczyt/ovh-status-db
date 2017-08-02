'use strict';

const mapper = require('./category.mapper.js').get();

class CategoryService {
    constructor (mongoClient) {
        this.MongoClient = mongoClient;
    }
    
    collection() {
        // TODO: use bluebird to enable finally feature
        return this.MongoClient.connect()
        .then((db) => return db.collection("category"))
        .finally((db) => return db.close());
    }

    store (item) {
        item = mapper.toDB(item);

        var self = this;
        return collection.update(
            { _id: item._id },
            {
                $set: {
                    idProject: item.idProject,
                    name: item.name
                }
            },
            { upsert: true } 
        );
    }

    storeMany (items) {
        var self = this;
        return new Promise((resolve, reject) => {
            this.MongoClient.connect().then((db) => {
                var collection = db.collection("category");

                items.forEach((item) => {
                    item = mapper.toDB(item);
                    collection.update(
                        { _id: item._id },
                        {
                            $set: {
                                idProject: item.idProject,
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
                var collection = db.collection("category");
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
