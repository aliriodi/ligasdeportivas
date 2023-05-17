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
    orderBy: { GroupG: 'asc' },

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

  //Arreglo de juegos ordenados por grupo y categoria connombres tambien
  const gameGC = [];
  division.map(division1 => //mapeo divisiones para buscar juegos de los equipos de la division
    game.map(game1 => //mapeo juegos para ver los id de los equipos
    {
      if (team.find(team1 => //busco equipos que contengan el idDivision
        team1.idTeam === game1.idTeam1 || team1.idTeam === game1.idTeam2).idDivision === division1.idDivision)
      //encontrando los juegos por divisiones hago un nuevo arreglo de 
      //juegos por divisiones y categorias ordenados por grupo y categorias
      //se anexan nombres tambien
      {
        team.find(t => t.idTeam === game1.idTeam1) ? game1['NTeam1'] = team.find(t => t.idTeam === game1.idTeam1).name : null;
        team.find(t => t.idTeam === game1.idTeam1) ? game1['NTeam2'] = team.find(t => t.idTeam === game1.idTeam2).name : null;
        game1['category'] = division1.name;
        gameGC.push(game1)
      }
    }))
  //  console.log(gameGC)
  //Equipos que han jugado por temporada
  //Este codigo no funciono 
  // const teamCP = [];
  // gameGC.map(game1 => { //Si los equipos no estan incluidos dentro del arreglo incluyelo
  //   if (!teamCP.includes({ NTeam: game1.NTeam1, category: game1.category })) { teamCP.push({ NTeam: game1.NTeam1, category: game1.category }); }
  //   else if (teamCP.includes({ NTeam: game1.NTeam2, category: game1.category })) { teamCP.push({ NTeam: game1.NTeam2, category: game1.category }); }
  // })
  const teamCP = [];
  //recorremos gameGC y creamos teamCP para luego trabajarlo como deseamos renderizar
  gameGC.forEach(game1 => {
    if (!teamCP.some(item => item.NTeam === game1.NTeam1 && item.category === game1.category)) {
      teamCP.push({ idTeam:game1.idTeam1, NTeam: game1.NTeam1, category: game1.category });
    }
    if (game1.NTeam2 && !teamCP.some(item => item.NTeam === game1.NTeam2 && item.category === game1.category)) {
      teamCP.push({ idTeam:game1.idTeam2,NTeam: game1.NTeam2, category: game1.category });
    }
    });
 
    //CA CARRERAS ANOTADAS
    //CR CARRERAS DEL OTRO EQUIPO CON EL CUAL JUGO
    teamCP.forEach(team1=> { let aux ={JJ:0,JG:0,JP:0,CA:0,CR:0};
                             
                            gameGC.map(game1=> //En caso de que el primer equipo sea el que seleccionamos
                                               // sumamos el juego jugado, vemos quein gano y las carreras anotadas y remolcadas o en contra
                                              {if(team1.idTeam===game1.idTeam1){team1['JJ']=aux.JJ+1;
                                                                                if(game1.CTeam1>game1.CTeam2){team1['JG']=aux.JG+1;
                                                                                                              team1['JP']=aux.JP;}
                                                                                if(game1.CTeam1<game1.CTeam2){team1['JG']=aux.JG;
                                                                                                              team1['JP']=aux.JP+1;}
                                                                                team1['CA']=aux.CA+game1.CTeam1;
                                                                                team1['CR']=aux.CR+game1.CTeam2;}
                                                // En caso contrario sumamos al otro
                                                if(team1.idTeam===game1.idTeam2){team1['JJ']=aux.JJ+1;
                                                                                if(game1.CTeam1>game1.CTeam2){team1['JG']=aux.JG;
                                                                                                              team1['JP']=aux.JP+1;}
                                                                                if(game1.CTeam1<game1.CTeam2){team1['JG']=aux.JG+1;
                                                                                                              team1['JP']=aux.JP;}
                                                                                team1['CA']=aux.CA+game1.CTeam2;
                                                                                team1['CR']=aux.CR+game1.CTeam1;}

                                                                                                                                                                                           }
                                                                                

                                              )
    })
   //console.log(teamCP)
  // console.log(teamCP.length)

  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    props: JSON.parse(JSON.stringify({ user, league, team, division, game, fecha, gameGC,teamCP })),
  };
};

type Props = {
  user: PostProps[];
  league: PostProps[];
  team: PostProps[];
  game: PostProps[];
  division: PostProps[];
  fecha: number[];
  gameGC: PostProps[];
  teamCP:PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <div >
      <Nav {...props} />
      <div className="page">
        <main >

          <p></p><div key={0} className="center">
            <h1 > <p >Liga Dario Salazar </p></h1></div>

          {props.division.map(D =>
            <div className='center' key={D.idDivision}>
              <h2>{D.name}</h2>
              <table id={'1'} className={"table table-hover"}>
                <tbody >
                  {/* <!-- Aplicadas en las filas --> */}
                  <tr key={0}>
                    {/* <th >Categoria</th> */}
                    <th> Home</th>
                    <th >JJ </th>
                    <th >JG</th>
                    <th >JP</th>
                    <th >CA</th>
                    <th >CR</th>
                  </tr>
                  {
                    props.teamCP.map(team1 =>
                      //BUSCO SOLO LA SELECCION DE LOS EQUIPOS TIPO
                      // COMPOTA O PREPARATORIO O .... INFANTIL
                      team1.category===D.name?
                        <tr key={team1.idTeam}>
                          {/* <td>{team1.category} </td> */}
                          <td>{team1.NTeam}</td>
                          <td>{team1.JJ} </td>
                          <td>{team1.JG}</td>
                          <td>{team1.JP}</td>
                          <td>{team1.CA}</td>
                          <td> {team1.CR}</td>
                        </tr> :null

                    )
                  }
                </tbody>
              </table>
            </div>)}


        </main>
      </div>

    </div>
  );
};
export default Blog
