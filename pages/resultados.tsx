import React from "react"
import { GetStaticProps } from "next"
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'
import { access } from "fs"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const team = await prisma.team.findMany();
  const user = await prisma.user.findMany();
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();
  const game = await prisma.game.findMany({
    orderBy: { Date:'desc', }
  }
  )
  /* Como esta promesa me dio problemas al retornar lo hice directamente 
  en el returnn del front
  .then(response => response.map(e=> // Del arreglo de juegos se mapea en los equipos
                                      // para sacar el nombre de los equipos y se anexa al juego
                                      //para renderizar luego el=OBJ de equipo e=OBJ de juego
                                       {team.find(el=>el.idTeam===e.idTeam1)?e['team1name']=team.find(el=>el.idTeam===e.idTeam1).name:null ;
                                       team.find(el=>el.idTeam===e.idTeam2)?e['team2name']=team.find(el=>el.idTeam===e.idTeam2).name:null;
                                        }))
   */ 
                                      
       let fecha = game.reduce((acc,item)=>{
        //la funcion item.Date.getTime() transforma la fecha 
        //en un numero entero para poder filtrar y comparar fechas repetidas
       acc.includes(item.Date.getTime())?null:acc.push(item.Date.getTime());
       return acc
      },[])
     
      //De esta forma reasigno los numeros enteros a una nueva fecha
      //asi me queda un array con fechas no repetidas
      fecha= fecha.map(e=> new Date(e))
  //    console.log(fecha)  
  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    props: JSON.parse(JSON.stringify({ user,league,team,division,game,fecha})),
  };
};

type Props = {
  user: PostProps[];
  league:PostProps[];
  team:PostProps[];
  game:PostProps[];
  division:PostProps[];
  fecha:PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <Nav {...props} />
      <div className="page">
        <main>

          {props.user.map((post) => (
            <div key={post.id} className="post">
              <span>{post.idPlayer + "  " + post.firstname + " " + " " + post.lastname + " " + post.createdAt}</span>
            </div>
          ))}
          <p></p><div className="center">
          <h1 > <p >Liga Dario Salazar </p></h1></div>
         
          { props.fecha.map(f=><div>{f}</div>)}
          {
            props.game.map((post) => (
            <div key={post.idGame} className="post">
              <span>
              {props.team.find(t=>t.idTeam===post.idTeam1)?props.team.find(t=>t.idTeam===post.idTeam1).name:null} {+ "  " + post.CTeam1 + " " + " " }
              {props.team.find(t=>t.idTeam===post.idTeam2)?props.team.find(t=>t.idTeam===post.idTeam2).name:null}{ + " " + post.CTeam2+ " "+post.GroupG+" "+new Date(post.Date).getDate()+'/'}{new Date(post.Date).getMonth()+1}</span>
            </div>
          ))}
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
