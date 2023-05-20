import React from "react"
import { useState, useEffect } from 'react';
import { GetStaticProps } from "next"
import Image from 'next/image'
import Nav from "../components/Nav"
import Post, { PostProps } from "../components/Post"
import logoLiga from "../images/LigaDarioSalazar.png"
import { Prisma, PrismaClient } from '@prisma/client'

export async function getdataBD(idDivision: number, idTeam: number) {
  let prisma = new PrismaClient();
  const league = await prisma.league.findMany().then(prisma.$disconnect);
  const division = await prisma.division.findMany().then(prisma.$disconnect);

  if (idDivision) {
    const team = await prisma.team.findMany({
      where: {
        idDivision: idDivision,
      },
      orderBy: { name: 'asc', }
    }).then(prisma.$disconnect);
  }

  if (idTeam) {
    const player = await prisma.player.findMany({
      where: {
        idTeam: idTeam,
      },

    }).then(prisma.$disconnect);
    const tiporesult = await prisma.result.findMany();
    const valueresult = await prisma.resultPlayer.findMany({
      where: { idTeam: idTeam, },
      orderBy: { idResult: 'asc', }
    });
  }
}



export const getStaticProps: GetStaticProps = async () => {
  // //Funcion para cargar usuarios controlados de la BD sin saturar 
  // //la busqueda
  let prisma: PrismaClient;
  // //Funcion para buscar de la BD los elementos de los Select 
  if (prisma !== null) { prisma = new PrismaClient() }
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();
  const team1 = await prisma.team.findMany({
    where: {
      idDivision: 1,
    },
    orderBy: { name: 'asc', }
  });
  const team2 = await prisma.team.findMany({
    where: {
       idDivision: 2,
    },
    orderBy: { name: 'asc', }
  });
  const team3 = await prisma.team.findMany({
    where: {
       idDivision: 3,
    },
    orderBy: { name: 'asc', }
  });
  const team4 = await prisma.team.findMany({
    where: {
       idDivision: 4,
    },
    orderBy: { name: 'asc', }
  });
  const team5 = await prisma.team.findMany({
    where: {
       idDivision: 5,
    },
    orderBy: { name: 'asc', }
  });
  // const player = await prisma.player.findMany({
  //   where: {
  //     //  idTeam: 2,
  //   },
  // });

  // const tiporesult = await prisma.result.findMany();
  // const valueresult = await prisma.resultPlayer.findMany({
  //   //where: { idTeam: 0, },
  //   orderBy: { idResult: 'asc', }
  // });

  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  const player = [];
  const tiporesult = [];
  const valueresult = [];
  await prisma.$disconnect();
  return {
    props: JSON.parse(JSON.stringify({
      player,
      team1,
      team2,
      team3,
      team4,
      team5,
      division,
      league,
      tiporesult,
      valueresult,
    })),
  };

};

type Props = {
  player: PostProps[];
  team1: PostProps[];
  team2: PostProps[];
  team3: PostProps[];
  team4: PostProps[];
  team5: PostProps[];
  division: PostProps[];
  league: PostProps[];
  tiporesult: PostProps[];
  valueresult: PostProps[];
}
const Blog: React.FC<Props> = (props) => {
  const [IDTEAM, setIDTEAM] = useState(0);
  const [IDDIVISION, setIDDIVISION] = useState(0);
  //const [contador, setContador] = useState(0);
  let contador = 0;
  function tabla(Division:any): JSX.Element[] {
    const rows = [];

    for (let i = 0; i < Math.ceil(Division.length / 5); i++) {
      const cols = [];

      for (let j = 0; j < 5; j++) {
        const z = i*5+j;
        {Division[z]?cols.push(<td key={Division[z].name}>{Division[z].name}</td>):null}
        
      }

      rows.push(<tr key={i}>{cols}</tr>);
    }

    return rows;
  }
  
  return (
    <>
      <Nav {...props} />
      <div key='0' className="page">
        <p></p><div key='3' className="center">

          <h1 > <p >Liga Dario Salazar </p></h1></div>

        {/* <h1>Creado por Equipo desarrollador ARQUICOM AJ</h1> */}
        <p></p>
        {props.league ?
          props.league.map(league =>
            props.division.map(division =>
              <div key={division.idDivision}>
                <div key ={division.idDivision} className="center"><h3>{division.name}</h3></div>
                <p></p>
                <table className="table table-hover">
                  <tbody>
                    {1 === division.idDivision ? tabla(props.team1):null}
                    {2 === division.idDivision ? tabla(props.team2):null}
                    {3 === division.idDivision ? tabla(props.team3):null}
                    {4 === division.idDivision ? tabla(props.team4):null}
                    {5 === division.idDivision ? tabla(props.team5):null}
                    {/* {props.team.map((team1) =>
                        team1.idDivision === division.idDivision ?
                          tabla(props.team):null)} */}
                    
                    {/* <tr>
                      {props.team1.map((team) => 
                        team.idDivision === division.idDivision ? 
                          contador >10 ? <td>{contador}</td>: <td>{team.name}{ contador = contador + 1 }</td> : null)}
                    </tr> */}
                  </tbody>
                </table>
                <p></p>
              </div>
            )
          ) : null}
        {/* <div>Cantidad de jugadores cargados: {" " + props.player.length + " "} pertencientes a {" " + props.team.length} equipos</div> */}
        <p></p>
      </div>
    </>
  );
};
export default Blog
