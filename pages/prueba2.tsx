import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () =>{
  const prisma = new PrismaClient()
  const feed = await prisma.player.findMany();
    //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    
    props:  JSON.parse(JSON.stringify({feed})) ,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <div className="page">
        <h1>Creado por Alirio</h1>
        <p></p>
        <div>Cantidad de jugadores cargados: {" "+props.feed.length}</div>
        <main>
          {props.feed.map((post) => (
            <div key={post.idPlayer} className="post">
              <span>{post.idPlayer+"  "+post.firstname+" "+" "+post.lastname+" "}</span>
           </div>
          ))}
        </main>
      </div>
     
   </>
  );
};
export default Blog
