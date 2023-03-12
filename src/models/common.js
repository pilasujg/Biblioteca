import dotenv from 'dotenv'
dotenv.config()


import {
    ObjectId
} from 'mongodb';

export function getId(id) {
    if (id) {
        if (id.length !== 24) {
            return id;
        }
    }
    return ObjectId(id);
};