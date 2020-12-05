import { ld as _ } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts';
import { cat, readJson, writeJson } from "./utils.ts"
import { existsSync } from 'https://deno.land/std@0.79.0/fs/exists.ts'





export default class DStore{
    private file : string
    private data : any
    constructor(file : string){
        this.file = file
        this.data = cat(()=>readJson(this.file)) || {}
        
    }

    private load(){
        this.data = cat(()=>readJson(this.file)) || {}
    }

    
    save(){
        writeJson(this.file, this.data)
    }
    /**
         * Gets a value from db
         * @param {string | object} path
         * @returns {any} 
    */
    get(path : string | object){
        if(path instanceof Array)return path.map(p=>_.get(this.data, p, undefined))
        else return _.get(this.data, path, undefined)
    }

    /**
         * Sets a value in db
         * @param {string | object} path
         * @returns {number} Sum of x and y
    */
    set(path : string, data : any){
            _.set(this.data, path, data)
            // _.set(this.data, path, data)
        return this
    }

    push(path : string, data : any, clean=false){
        let d = _.get(this.data, path, null)     
        
        if(d){
            d instanceof Array ? (d.push(data) && (clean ? _.set(this.data, path, [...new Set(d)]) : d))
            :
            typeof d === 'string' ? _.set(this.data, path, d+data)
            :
            ''    
        }   
        else this.set(path, [data])
        return this
    }

    update(path : string, fn : ((value : any)=>any)){
        _.set(this.data, path, fn(_.get(this.data, path, undefined)))
        return this
    }

    erase(){
        this.data = {}
        return this
    }

    delete(path : string){
        delete this.data[path]
        return this
    }

    toObject(){
        return this.data
    }

    all(){return this.toObject()}
    
}




