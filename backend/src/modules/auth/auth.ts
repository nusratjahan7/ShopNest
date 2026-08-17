import {betterAuth} from "better-auth"; import {mongodbAdapter} from "better-auth/adapters/mongodb"; import {MongoClient} from "mongodb"; import {env} from "../../config/env.js";
const client=new MongoClient(env.MONGO_URI); const db=client.db(env.MONGO_DB_NAME);
export const auth=betterAuth({database:mongodbAdapter(db),baseURL:env.BETTER_AUTH_URL,secret:env.BETTER_AUTH_SECRET,trustedOrigins:[env.FRONTEND_URL],emailAndPassword:{enabled:true,autoSignIn:true},session:{expiresIn:60*60*24*7,updateAge:60*60*24}});
