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
 
  // Generando un nuevo jugador con todos sus datos
  let playerFull = player.map(p=>{ //busco a cual equipo pertenece el player y le asingno el Nombre de equipo y la idDivision
                          if(team.some(t=>t.idTeam===p.idTeam)){p['Nteam']=team.find(t=>t.idTeam===p.idTeam).name;
                                                                p['idDivision']=team.find(t=>t.idTeam===p.idTeam).idDivision;
                                                                //Busco ahora el nombre de la division para asignarselo
                                                                if(division.some(d=>d.idDivision===p['idDivision'])) {p['NDivision']=division.find(d=>d.idDivision===p['idDivision']).name}                                   }
                          //mapeo los resultados y se los asigno al jugador
                         
                          const result = tiporesult.map(type => {
                            type['value']=0;
                            const playerResult = valueresult.find(v => v.idPlayer === p.idPlayer && v.idResult === type.idResult);
                            const value = playerResult ? playerResult.value : 0;
                            return { ...type, value };
                          });

                          p['values']=result;
                          return p  }
                             )
  //ordeno por AVE los resultados
  playerFull.sort((b,a)=>a['values'][14].value-b['values'][14].value)                            
   return {
    props: JSON.parse(JSON.stringify({
      player,
      team,
      division,
      league,
      tiporesult,
      valueresult,
      playerFull,
      
      })),
  };
};

type Props = {
  team: PostProps[];
  division: PostProps[];
  league: PostProps[];
  tiporesult: PostProps[];
  valueresult: PostProps[];
  playerFull:PostProps[];
  
}
const Blog: React.FC<Props> = (props) => {
  const [IDTEAM, setIDTEAM] = useState(0);
  const [IDDIVISION, setIDDIVISION] = useState(0);
  let aux = [];
  props.playerFull.map(p=>aux.push(p))
  const [render, setRender] = useState(aux);
  const handleSort = (idResult:number) => {
    const sortedPlayerFull = [...render].sort(
      (a, b) => b['values'][idResult-1].value - a['values'][idResult -1].value
    );
    console.log(render)
    setRender(sortedPlayerFull);
  };
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
        <main>
        <div className="center">
          {/* <p><button type="button"  onClick={()=>setIDTEAM(IDTEAM===50?0:IDTEAM+1)} className="btn btn-primary">Primary</button></p> */}
          {/* {props.league.map(p => <span>{'Liga ' + p.idLeague + " " + p.name}</span>)} */}
          {/* <p>{IDTEAM}{IDDIVISION}</p> */}
        
          {props.division.map(D=>
          <p>
          <button className="btn btn-dark ">{D.name}</button>
          <div key={D.idDivision}>
                  <table key={D.idDivision} className="table table-hover">
                    <tbody key={D.idDivision}>
                      {/* <!-- Aplicadas en las filas --> */}
                      {/* Fila de tipo resultados */}
                      <tr>
                        <th>Nombre</th>
                        {props.tiporesult.map(result => <th key={result.idResult}><button onClick={() => handleSort(result.idResult)}>{result.name}</button></th>)}
                      </tr>
                      {/* Fila de Jugador mapeado nombre y datos  */}
                      {render.filter(p=>p.idDivision===D.idDivision).slice(0,20).map((player) => (
                        //Metodo de empezar a escribir una Fila por participante y en 1era coolumna su nombre
                        player.idDivision === D.idDivision ? <tr key={player.idPlayer} className="active"><td>{player.firstname + "  " + player.lastname}</td>
                          {/* Mapeando los idResult primero, luego a la tabla  */}
                          {player.values.map(tiporesult => <td >{
                          
                          tiporesult['value']? tiporesult['value'] : 0}</td>)}</tr> : null))}
                     
                    </tbody>
                  </table>
                </div>
          </p>
          )  }
          </div>
         
        </main>
      </div>
    </>
  );
};
export default Blog
