import React from "react"
import { GetStaticProps } from "next"
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'


export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const team = await prisma.team.findMany();
  const user = await prisma.user.findMany();
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();
  const game = await prisma.game.findMany({
    orderBy: { Date: 'desc' },

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
  //Para tener fechas no repetidas de juegos                               
  let fecha = game.reduce((acc, item) => {
    //la funcion item.Date.getTime() transforma la fecha 
    //en un numero entero para poder filtrar y comparar fechas repetidas
    acc.includes(item.Date.getTime()) ? null : acc.push(item.Date.getTime());
    return acc
  }, [])

  //De esta forma reasigno los numeros enteros a una nueva fecha
  //asi me queda un array con fechas no repetidas
  // fecha= fecha.map(e=> new Date(e))

  //    console.log(fecha)  
  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    props: JSON.parse(JSON.stringify({ user, league, team, division, game, fecha })),
  };
};

type Props = {
  user: PostProps[];
  league: PostProps[];
  team: PostProps[];
  game: PostProps[];
  division: PostProps[];
  fecha: number[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <div >
      <Nav {...props} />
      <div className="page">
        <main >

          {props.user.map((post) => (
            <div key={post.id} className="post">
              <span key={post.id+1}>{post.idPlayer + "  " + post.firstname + " " + " " + post.lastname + " " + post.createdAt}</span>
            </div>
          ))}
          <p></p><div key={0} className="center">
            <h1 > <p >Liga Dario Salazar </p></h1></div>

          {/* Mapeo las fechas para empezar a imprimir botnoes por fechas */}
          {props.fecha.map(f => <div>
            <div className='center' key={f}>
              <h2 key={f-1}><button key={f-2} className="btn btn-dark " onClick={() => document.getElementById(f.toString()).className === "table table-hover visually-hidden" ? document.getElementById(f.toString()).className = 'table table-hover' :
                document.getElementById(f.toString()).className = "table table-hover visually-hidden"}>
                Resultados {new Date(f).getDate() + 1}{' /'} {new Date(f).getMonth() + 1}{' / ' + new Date(f).getFullYear()}
              </button></h2>
            </div>
            <div className='center resultados' key={f + 1}>
              <table key={f + 2} id={f.toString()} className={"table table-hover visually-hidden"}>
                <tbody key={f+3}>
                  {/* <!-- Aplicadas en las filas --> */}
                  <tr key={f + 4}>
                    <th >Categoria</th>
                    <th >Home</th>
                    <th >Carreras Home</th>
                    <th >Visitantes</th>
                    <th >Carreras Visitantes</th>
                    <th >Grupo</th>
                  </tr>
                  {
                    props.game.map(post =>
                      f === new Date(post.Date).getTime() ?

                        <tr key={post.idGame }>
                          <td>{props.team.find(t => t.idTeam === post.idTeam1) ?
                            props.division.find(d => d.idDivision === props.team.find(t => t.idTeam === post.idTeam1).idDivision).name : null}  </td>
                          <td>{props.team.find(t => t.idTeam === post.idTeam1) ? props.team.find(t => t.idTeam === post.idTeam1).name : null}</td>
                          <td>{post.CTeam1}</td>
                          <td>{props.team.find(t => t.idTeam === post.idTeam2) ? props.team.find(t => t.idTeam === post.idTeam2).name : null}</td>
                          <td>{post.CTeam2}</td>
                          <td> {post.GroupG}</td>
                        </tr> : null

                    )
                  }
                </tbody>
              </table>
            </div> </div>)}


        </main>
      </div>

    </div>
  );
};
export default Blog
