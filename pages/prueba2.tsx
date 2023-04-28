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
  

  //metricas de netlify
  await fetch('https://graph.netlify.com/graphql?app_id=b83d3c66-7e5b-47e6-96b4-5ef3cc6f57b6&show_metrics=false',
  {
    method: 'POST',
    body: JSON.stringify({
      query: `query HelloNetlifyGraph {
    helloGraph(sessionId: "b4ee97b4-ccce-4772-9fb2-70a3be57cf2b") {
      welcome
      about
      whatToDoNext
    }
  }`,
    }),
  }
)
.then((r) => r.json())
  //
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
