"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import { Neo4jUser } from '@/types'
import * as  React from 'react'
import TinderCard from 'react-tinder-card'
import { neo4jswipe } from "../neo4j.action"

interface HomePageClientComponentProps{
    currentUser:Neo4jUser,
    users:Neo4jUser[]
}

const HomePageClientComponent:React.FC<HomePageClientComponentProps>=({currentUser,users})=>{

    const handleSwipe=async (direction:string,userId:string)=>{
        const isMatched=await neo4jswipe(currentUser.applicationId,direction,userId);
        if(isMatched)
        {
            alert(`Congrats!!Its a match`)
        }
    }
    return(
        <div className='w-screen h-screen flex justify-center items-center'>
            <div>
            <div>
                <h1 className='text-4xl'>Hello {currentUser.firstName} {currentUser.lastName}</h1>
            </div>
            <div className="mt-4 relative">
                {users.map((user=> <TinderCard onSwipe={(direction)=>handleSwipe(direction,user.applicationId)} className="absolute" key={user.applicationId}>
                    <Card>
                    <CardHeader>
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    </Card>
                </TinderCard>))}
            </div>
            </div>
        </div>
    )
}

export default HomePageClientComponent;