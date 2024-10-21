import Database from "../db/database.js";


export default class BaseRepository {

    #db;
    get db() {
        return this.#db;
    }
     
    constructor(db) {
        this.#db = db ? db : new Database();
    }
}