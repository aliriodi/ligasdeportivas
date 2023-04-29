import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () =>{
  const prisma = new PrismaClient()
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();
  const team = await prisma.team.findMany();
  const player = await prisma.player.findMany();
  

  
    //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    
    props:  JSON.parse(JSON.stringify({player,team,division,league})) ,
  };
};

type Props = {
  player:   PostProps[];
  team:     PostProps[];
  division: PostProps[];
  league:   PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <div className="topnav">
           <a  href="#home">Home</a>
           <a  href="#news">News</a>
           <a  href="#contact">Contact</a>
           <a  href="#about">About</a>
               </div> 

      
      <div className="page">
        <h1>Creado por Alirio</h1>
        <p></p>
        <div>Cantidad de jugadores cargados: {" "+props.player.length+" "} pertencientes a {" "+props.team.length} equipos</div>
        <p></p>
        <main>
          {props.league.map(p=><span>{p.idLeague+" "+p.name}</span>)}
          {props.team.map(
            post => (
              <div key={post.idTeam}>Equipo:  {post.name}  
                                  <p>Division: { props.division.filter(element => element.idDivision ===  post.idDivision)[0].name }</p>
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
