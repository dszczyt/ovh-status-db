'use strict';

const mongo = require('mongodb');

// TODO : Créer les indexes : db.collection.createIndex(  ==> https://docs.mongodb.com/manual/indexes/

class MongoDatabaseProvider {
    constructor (settings) {
        this.MongoClient = mongo.MongoClient;

        this.settings = {
            server: settings.server,
            port: settings.port || 27017,
            db: settings.db
        };
    }

    connect () {
        var self = this;
        return new Promise((resolve, reject) => {
            var url = 'mongodb://'+this.settings.server+':'+self.settings.port+'/'+self.settings.db;
            self.MongoClient.connect(url, function(err, db) {
              console.log("Connected correctly to server : " + self.settings.db);
              return resolve(db);
            });
        });
    }
};

var Factory = {
    get : (settings) => { return new MongoDatabaseProvider(settings); }
}

module.exports = Factory;
