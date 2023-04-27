import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { PrismaClient } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async () => {
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
        <main>
          <div>Cantidad de jugadores: {props.feed.length}</div>
          <p></p>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
             
              <span>{post.idPlayer+"  "+post.firstname+" "+" "+post.lastname+" "}</span>
           </div>
          ))}
        </main>
      </div>
     
   </>
  );
};

export default Blog;
