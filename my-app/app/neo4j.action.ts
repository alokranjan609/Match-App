'use server';
import "server-only";
import {driver} from "../db/index"
import { Neo4jUser } from "@/types";
import { Record } from "neo4j-driver";

export const getUserByID=async(Id:string)=>{
 const result=await driver.executeQuery(`MATCH (u:User {applicationId:$applicationId})
     RETURN u`,{applicationId:Id}
 );

 const users=result.records.map((record)=>record.get("u").properties);
 if(users.length===0)
 {
    return null;
 }
 return users[0] as Neo4jUser;
}

export const createUser=async(user:Neo4jUser)=>{
    const {applicationId,firstName,lastName,email}=user;
    await driver.executeQuery(`CREATE (u:User {applicationId:$applicationId,email:$email,firstName:$firstName,lastName:$lastName})`,
        {applicationId,email,firstName,lastName}
    )
}

export const getUsersWithNoConnection=async (Id:string)=>{
    const result=await driver.executeQuery(`
        MATCH (cu:User{applicationId:$applicationId}) MATCH (ou:User) WHERE NOT (cu)-[:LIKE|:DISLIKE]->(ou) AND cu <> ou RETURN ou`,
        {applicationId:Id}
    )
    const users=result.records.map((record)=>record.get("ou").properties);
    return users as Neo4jUser[]
}

export const neo4jswipe=async(id:string,swipe:string,userId:string)=>{
    const type=swipe==="left"?"DISLIKE":"LIKE";
    await driver.executeQuery(
        `MATCH (cu:User {applicationId:$id}),(ou:User{applicationId:$userId}) CREATE (cu)-[:${type}]->(ou)`,
        {
          id,
          userId
        }
    );

    if(type==="LIKE")
    {
        const result=await driver.executeQuery(
            `MATCH (cu:User {applicationId:$id}),(ou:User{applicationId:$userId}) WHERE (ou)-[:LIKE]->(cu) RETURN ou as match`,
            {
                id,
                userId
            }
        )

        const matches=result.records.map(
            (record)=>record.get("match").properties
        );
        return Boolean(matches.length>0)
    }

}

export const getMatches=async (currentUserId:string)=>{
    const result=await driver.executeQuery(
        `MATCH (cu:User{applicationId:$id})-[:LIKE]->(ou:User)-[:LIKE]->(cu) RETURN ou as match`,
        {id:currentUserId}
    );
    const matches=result.records.map(
        (record)=>record.get("match").properties
    );
    return matches as Neo4jUser[];

}
