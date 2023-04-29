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

const Blog: React.FC<Props> = (props) => {
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
         <h2> <p>Resultados Jueves 27/04/23 </p></h2>
          <p></p>
          <table className="table table-hover">
            <tbody>
              {/* <!-- Aplicadas en las filas --> */}
              <tr >
                <th >Categoria</th>
                <th >Equipo1</th>
                <th >Carreras</th>
                <th >Equipo2</th>
                <th >Carreras</th>
                <th >Ganador</th>
              </tr>
              <tr >
                <td >Preparatoria</td>
                <td >Tigritos A</td>
                <td >8</td>
                <td >Escorpiones</td>
                <td >2</td>
                <td>Tigritos A</td>
              </tr>
              <tr >
                <td >Infantil</td>
                <td >Tigritos A</td>
                <td >14</td>
                <td >Piratas</td>
                <td >4</td>
                <td>Tigritos A</td>
              </tr>
              <tr >
                <td >Preinfantil</td>
                <td >Tigritos B</td>
                <td >30</td>
                <td >Tigritos A</td>
                <td >10</td>
                <td>Tigritos B</td>
              </tr>

              {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}

            </tbody>
          </table>

        </main>
      </div>

    </>
  );
};
export default Blog
