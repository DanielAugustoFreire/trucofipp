

export default class BaseModel {

    constructor(){

    }

    toJSON(){
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        let json = {};
        for(let prop of props){
            if((typeof this[prop] === 'string' || 
                typeof this[prop] === 'number' || 
                this[prop] instanceof BaseModel) && 
                this[prop]){
                json[prop] = this[prop];
            }
        }
        return json;
    }
    

}