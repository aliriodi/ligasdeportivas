import React from "react"
import { GetStaticProps } from "next"
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () => {
  // const prisma = new PrismaClient()
  // const feed = await prisma.user.findMany();

  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {

    props: JSON.parse(JSON.stringify({/* feed */})),
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <Nav {...props} />
      <div className="page">
        <main>

        
          <p></p><div className="center ">
          <h1 > <p >Liga Dario Salazar </p></h1></div>
           <div className="center estadisticas">
         <p></p><h2>BOX SCORE PAGINA EN CONSTRUCCCION</h2> 
          </div>
       
        </main>
      </div>

    </>
  );
};
export default Blog
