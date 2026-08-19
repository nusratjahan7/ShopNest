export interface AiProvider{name:string;generate(input:{prompt:string;system?:string}):Promise<string>}
