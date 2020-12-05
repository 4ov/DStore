import { existsSync } from "https://deno.land/std@0.79.0/fs/exists.ts"

export const readJson = (p : string) => JSON.parse(Deno.readTextFileSync(p))

export const writeJson = (p  : string, o : any) => Deno.writeTextFileSync(p, JSON.stringify(o))

export const cat = (fn : Function) =>{try{return fn()}catch(err){return undefined}}