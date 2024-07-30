import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createUser, getUserByID } from "../neo4j.action";
import { create } from "domain";


export default async function CallbackPage()
{
    const {isAuthenticated,getUser}=getKindeServerSession();

    if(!(await isAuthenticated()))
        {
          return redirect(
            "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
          );
        }
        
        
        const user=await getUser();


        if(!user)
            {
              return redirect(
                "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
              );
            }

            //Check if user is already in neo4j database
            const dbUser=await getUserByID(user.id);
            if(!dbUser)
            {
                //create user in neo4j
                await createUser({applicationId:user.id,
                    email:user.email!,
                    firstName:user.given_name!,
                    lastName:user.family_name ?? undefined});
            }

    return redirect("/");
}