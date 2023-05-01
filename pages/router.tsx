import React from "react"
import { GetStaticProps } from "next"
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'


export const getStaticProps: GetStaticProps = async () => {
    //Funcion para cargar usuarios controlados de la BD sin saturar 
  //la busqueda
  async function getdataBD(idDivision: number, idTeam: number) {
    const prisma = new PrismaClient()
    const league = await prisma.league.findMany();
    const division = await prisma.division.findMany();

    if (idDivision) {
      const team = await prisma.team.findMany({
        where: {
          idDivision: idDivision,
        },
      });
    }

    if (idTeam) {
      const player = await prisma.player.findMany({
        where: {
          idTeam: idTeam,
        },
      });
      const tiporesult = await prisma.result.findMany();
      const valueresult = await prisma.resultPlayer.findMany({
        where: { idTeam: idTeam, },
        orderBy: { idResult: 'asc', }
      });
    }
  }
  //Funcion para buscar de la BD los elementos de los Select 
  const prisma = new PrismaClient()
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();

  const team = await prisma.team.findMany({
    where: {
     // idDivision: 1,
    },
  });
  const player = await prisma.player.findMany({
    where: {
     // idTeam: 0,
    },
  });

  const tiporesult = await prisma.result.findMany();
  const valueresult = await prisma.resultPlayer.findMany({
    //where: { idTeam: 0, },
    orderBy: { idResult: 'asc', }
  });
  
  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    props: JSON.parse(JSON.stringify({
      player,
      team,
      division,
      league,
      tiporesult,
      valueresult,
      })),
  };
};

type Props = {
  player: PostProps[];
  team: PostProps[];
  division: PostProps[];
  league: PostProps[];
  tiporesult: PostProps[];
  valueresult: PostProps[];
   };

const Blog: React.FC<Props> = (props) => {

  return (
    <>
      <Nav {...props} />
      <div className="page">
        {/* <h1>Creado por Equipo desarrollador ARQUICOM AJ</h1> */}
        <p></p>
        <div>Cantidad de jugadores cargados: {" " + props.player.length + " "} pertencientes a {" " + props.team.length} equipos</div>
        <p></p>
        <main>
          <p><button type="button"  className="btn btn-primary">Primary</button></p>
         
          <select className="custom-select" id="inputGroupSelect01" >
            <option value="0">Liga</option>
            <option value="1">Dario Salazar</option>
            <option value="2">Liga 2</option>
          </select>
        
          {props.league.map(p => <span>{'Liga ' + p.idLeague + " " + p.name}</span>)}
          {props.team.map(
            post => (
              <div key={post.idTeam}>Equipo:  {post.name}
                <p>Division: {props.division.filter(element => element.idDivision === post.idDivision)[0].name}</p>
                <div>
                  <table className="table table-hover">
                    <tbody>
                      {/* <!-- Aplicadas en las filas --> */}
                      {/* Fila de tipo resultados */}
                      <tr>
                        <th>Nombre</th>
                        {props.tiporesult.map(result => <th>{result.name}</th>)}
                      </tr>
                      {/* Fila de Jugador mapeado nombre y datos  */}
                      {props.player.map((player) => (
                        //Metodo de empezar a escribir una Fila por participante y en 1era coolumna su nombre
                        player.idTeam === post.idTeam ? <tr className="active"><td>{player.firstname + "  " + player.lastname}</td>
                          {/* Mapeando los idResult primero, luego a la tabla  */}
                          {props.tiporesult.map(tiporesult => <td>{props.valueresult.filter(valueresult => valueresult.idPlayer === player.idPlayer)[tiporesult.idResult - 1] ?

                            props.valueresult.filter(valueresult => valueresult.idPlayer === player.idPlayer)[tiporesult.idResult - 1].value : null}</td>)}</tr> : null))}
                      {/* //metodo para ordenar el vector por id y se imprima bien */}
                      {/* sort((x, y) =>x.idResult >y.idResult?1:-1). */}
                      {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}
                    </tbody>
                  </table>
                </div>

                {/* {props.player.map((post2) => (
                  post2.idTeam === post.idTeam ?
                    <div key={post2.idPlayer} className="post">
                      <span>{post2.idPlayer + "  " + post2.firstname + " " + " " + post2.lastname + " "}</span>
                      <span>{post2.idPlayer}</span>
                    </div>
                    : null
                ))}    <p></p> */}

              </div>
            )
          )}
        </main>
      </div>
    </>
  );
};
export default Blog
