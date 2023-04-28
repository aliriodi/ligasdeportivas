import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () =>{
  const prisma = new PrismaClient()
  const feed = await prisma.user.findMany();

  //
  await fetch('https://graph.netlify.com/graphql?app_id=b83d3c66-7e5b-47e6-96b4-5ef3cc6f57b6&show_metrics=true',
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
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <span>{post.idPlayer+"  "+post.firstname+" "+" "+post.lastname+" "+post.createdAt}</span>
           </div>
          ))}
        </main>
      </div>
     
   </>
  );
};
export default Blog
