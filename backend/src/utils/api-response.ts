export const ok=<T>(data:T,message="Success")=>({success:true,message,data}); export const created=<T>(data:T,message="Created")=>({success:true,message,data});
