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
          <h1> <p>Resultados Playoff Liga Dario Salazar </p></h1>
          <h2> <p>Resultados Domingo 30/04/23 </p></h2>
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
                <td >Preinfantil</td>
                <td >Tigritos A</td>
                <td >3</td>
                <td >Mellizos A</td>
                <td >13</td>
                <td>Mellizos A</td>
              </tr>
              <tr >
                <td >Preinfantil</td>
                <td >Tigritos B</td>
                <td >14</td>
                <td >Cocodrilos B</td>
                <td >2</td>
                <td>Tigritos B</td>
              </tr>
              <tr >
                <td >Compota</td>
                <td >Tigritos A</td>
                <td >19</td>
                <td >Bravos B</td>
                <td >3</td>
                <td>Tigritos A</td>
              </tr>
              
              <tr >
                <td >Compota</td>
                <td >Tigritos B</td>
                <td >24</td>
                <td >Capitanes</td>
                <td >4</td>
                <td>Tigritos B</td>
              </tr>
              <tr >
                <td >Preinfantil</td>
                <td >Tigritos C</td>
                <td >17</td>
                <td >Capitanes </td>
                <td >7</td>
                <td>Tigritos C</td>
              </tr>
              <tr >
                <td >Preparatorio</td>
                <td >Tigritos A</td>
                <td >7</td>
                <td >Mellizos A</td>
                <td >0</td>
                <td>Tigritos A</td>
              </tr>

              {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}

            </tbody>
          </table>
        <p></p>
          <h2> <p>Resultados Sabado 29/04/23 </p></h2>
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
                <td >Compota</td>
                <td >Tigritos B</td>
                <td >18</td>
                <td >Bravos</td>
                <td >8</td>
                <td>Tigritos B</td>
              </tr>
              <tr >
                <td >Preinfantil</td>
                <td >Tigritos B</td>
                <td >4</td>
                <td >Mellizos B</td>
                <td >17</td>
                <td>Mellizos B</td>
              </tr>
              <tr >
                <td >Preparatorio</td>
                <td >Tigritos A</td>
                <td >11</td>
                <td >Juvencio</td>
                <td >4</td>
                <td>Tigritos A</td>
              </tr>

              {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}

            </tbody>
          </table>
        <p></p>
          <h2> <p>Resultados Viernes 28/04/23 </p></h2>
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
                <td >Preinfantil</td>
                <td >Tigritos C</td>
                <td >13</td>
                <td >Gigantes</td>
                <td >3</td>
                <td>Tigritos C</td>
              </tr>
              <tr >
                <td >Infantil</td>
                <td >Tigritos A</td>
                <td >12</td>
                <td >Mellizos</td>
                <td >0</td>
                <td>Tigritos A</td>
              </tr>
              <tr >
                <td >Compota</td>
                <td >Tigritos A</td>
                <td >14</td>
                <td >Mellizos</td>
                <td >13</td>
                <td>Tigritos A</td>
              </tr>

              {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}

            </tbody>
          </table>

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
