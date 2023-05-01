import React from "react"
import { GetStaticProps } from "next"
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const feed = await prisma.user.findMany();



  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {

    props: JSON.parse(JSON.stringify({ feed })),
  };
};

type Props = {
  feed: PostProps[];
};

const Contact: React.FC<Props> = (props) => {
  return (
    <>
      <Nav {...props} />
      <div className="page">
        <main>

          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <span>{post.idPlayer + "  " + post.firstname + " " + " " + post.lastname + " " + post.createdAt}</span>
            </div>
          ))}
         <p></p>
          <h1> Si desea contactarnos hagalo a traves de:</h1>
         <h2> <p>Elio Presilla: +58 424-8387327 </p></h2>
         <h2> <p>Alirio Diaz:   +54 3516132710 </p></h2>
         <h2> <p>arquicomaj@gmail.com </p></h2>
         <h2> <a href='https://www.youtube.com/channel/UCi0682aL2y8l2pJ3i5_gFXA'>youtuve</a></h2>
          <p></p>
          
          
        </main>
      </div>

    </>
  );
};
export default Contact
