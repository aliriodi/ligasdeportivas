import React from "react"
import { useState } from 'react';
import { GetStaticProps } from "next"
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"


import { PrismaClient } from '@prisma/client'

export  async function getdataBD(idDivision: number, idTeam: number) {
  let prisma = new PrismaClient();
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();

  if (idDivision) {
    const team = await prisma.team.findMany({
      where: {
        idDivision: idDivision,
      },
      orderBy: { name:'asc', }
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



export const getStaticProps: GetStaticProps = async () => {
    //Funcion para cargar usuarios controlados de la BD sin saturar 
  //la busqueda
      

  //Funcion para buscar de la BD los elementos de los Select 
  const prisma = new PrismaClient()
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();

  const team = await prisma.team.findMany({
    where: {
     // idDivision: 1,
    },
    orderBy: { name:'asc', }
  });
  const player = await prisma.player.findMany({
    where: {
    //  idTeam: 2,
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
}
const Blog: React.FC<Props> = (props) => {
  const [IDTEAM, setIDTEAM] = useState(0);
  const [IDDIVISION, setIDDIVISION] = useState(0);
   return (
    <>
      <Nav {...props} />
      <div className="page">
        {/* <h1>Creado por Equipo desarrollador ARQUICOM AJ</h1> */}
        <p></p>
        <div>Cantidad de jugadores cargados: {" " + props.player.length + " "} pertencientes a {" " + props.team.length} equipos</div>
        <p></p>
        <main>
          {/* <p><button type="button"  onClick={()=>setIDTEAM(IDTEAM===50?0:IDTEAM+1)} className="btn btn-primary">Primary</button></p> */}
          {props.league.map(p => <span>{'Liga ' + p.idLeague + " " + p.name}</span>)}
          <p>{IDTEAM}{IDDIVISION}</p>
          <form>
          <select className="custom-select" id="input2" onChange={()=>setIDDIVISION(parseInt((document.getElementById("input2")as HTMLInputElement).value)) } >
            <option value="0">Seleccione Division</option>
            {props.division.map(
              division => <option value={division.idDivision}>{division.name}</option>
            )}
            
          </select>
                                                                           {/* JS = parseInt(document.getElementById("input1").value))  */}
          <select className="custom-select" id="input1" onChange={()=>setIDTEAM(parseInt((document.getElementById("input1")as HTMLInputElement).value)) } >
            <option value="0">Seleccione Equipo</option>
            {props.team.map(
              team0 => team0.idDivision===IDDIVISION?<option value={team0.idTeam}>{team0.name}</option>:null
                       
            )}
            
          </select>
          </form>
         
          {props.team.filter(team0 => team0.idTeam ===IDTEAM).map(
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
