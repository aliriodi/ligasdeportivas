import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () =>{
  const prisma = new PrismaClient()
  const player = await prisma.player.findMany();
  const team = await prisma.team.findMany();
  const division = await prisma.division.findMany();
  
    //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    
    props:  JSON.parse(JSON.stringify({player,team,division})) ,
  };
};

type Props = {
  player:   PostProps[];
  team:     PostProps[];
  division: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <div className="page">
        <h1>Creado por Alirio</h1>
        <p></p>
        <div>Cantidad de jugadores cargados: {" "+props.player.length+" "} pertencientes a {" "+props.team.length} equipos</div>
        <p></p>
        <main>
          {props.team.map(
            post => (
              <div key={post.idTeam}>Equipo:  {post.name}  
                                  <p>Division: {props.division.length}</p>
               {props.player.map((post2) => (
              post2.idTeam === post.idTeam ? 
            <div key={post2.idPlayer} className="post">
              <span>{post2.idPlayer+"  "+post2.firstname+" "+" "+post2.lastname+" "}</span>
            </div>
             : null
          ))}    <p></p>
              </div>
              
              )
          )}
          
        </main>
      </div>
     
   </>
  );
};
export default Blog
