import React from "react"
import { useState } from 'react';
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

  // let prisma: PrismaClient;
  // //Funcion para buscar de la BD los elementos de los Select 
  // if (prisma !== null) { prisma = new PrismaClient() }
  // const league = await prisma.league.findMany();
  // const division = await prisma.division.findMany();
  // const team = await prisma.team.findMany({
  //   where: {
  //     // idDivision: 1,
  //   },
  //   orderBy: { name: 'asc', }
  // });
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
  const player =[];
  const team = [];
  const division = [];
  const league = [];
  const tiporesult = [];
  const valueresult = [];
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
        <p></p><div className="center">

          <h1 > <p >Liga Dario Salazar </p></h1></div>

        {/* <h1>Creado por Equipo desarrollador ARQUICOM AJ</h1> */}
        <p></p>
        {/* <div>Cantidad de jugadores cargados: {" " + props.player.length + " "} pertencientes a {" " + props.team.length} equipos</div> */}
        <p></p>
        <div className="flex-container">
          <div className="flex-item">
            <Image className="logoHome" src={logoLiga} />
          </div>
          <div className="flex-item-content">
            <table className="table table-hover">
              <tbody>
                {/* <!-- Aplicadas en las filas --> */}
                <tr>
                  <th ></th>
                  <th> </th>
                </tr>
                <tr>
                  <td className="center">TIGRITOS</td>
                  <td className="center">CAPITANES</td>
                </tr>
                <tr >
                  <td className="center">MELLIZOS</td>
                  <td className="center">COCODRILOS</td>
                </tr>
                <tr >
                  <td className="center">PIRATAS</td>
                  <td className="center">GUARDIANES</td>
                </tr>
                <tr >
                  <td className="center">ESCORPIONES</td>
                  <td className="center">SABUESOS</td>
                </tr>
                <tr >
                  <td className="center">GIGANTES</td>
                  <td className="center">MVP</td>
                </tr>
                <tr >
                  <td className="center">BRAVOS</td>
                  <td className="center">ANGELES</td>
                </tr>
                <tr >
                  <td className="center">NEW ASTROS</td>
                  <td className="center">JUVENCIO</td>
                </tr>
                {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}
              </tbody>
            </table>
          </div>

          <div className="flex-item">
            <Image className="logoHome" src={logoLiga} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog
