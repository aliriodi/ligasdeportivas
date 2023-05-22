import React, { useState } from "react";
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
        team.find(t => t.idTeam === game1.idTeam2) ? game1['NTeam2'] = team.find(t => t.idTeam === game1.idTeam2).name : null;
        game1['category'] = division1.name;
        gameGC.push(game1)
      }
    }))
    //console.log(gameGC)
  //Equipos que han jugado por temporada
  //Este codigo no funciono 
  // const teamCP = [];
  // gameGC.map(game1 => { //Si los equipos no estan incluidos dentro del arreglo incluyelo
  //   if (!teamCP.includes({ NTeam: game1.NTeam1, category: game1.category })) { teamCP.push({ NTeam: game1.NTeam1, category: game1.category }); }
  //   else if (teamCP.includes({ NTeam: game1.NTeam2, category: game1.category })) { teamCP.push({ NTeam: game1.NTeam2, category: game1.category }); }
  // })
  let teamCP = [];
  //recorremos gameGC y creamos teamCP para luego trabajarlo como deseamos renderizar
  gameGC.forEach(game1 => {
    if (!teamCP.some(item => item.NTeam === game1.NTeam1 && item.category === game1.category && item.GroupG === game1.GroupG)) {
      teamCP.push({ idTeam:game1.idTeam1, NTeam: game1.NTeam1, category: game1.category ,GroupG:game1.GroupG});
    }
    if (!teamCP.some(item => item.NTeam === game1.NTeam2 && item.category === game1.category && item.GroupG === game1.GroupG)) {
      teamCP.push({ idTeam:game1.idTeam2,NTeam: game1.NTeam2, category: game1.category ,GroupG:game1.GroupG});
    }
    });
    
    //Creando grupos para CLASIFICACION DE JUEGOS juegos
   // console.log(teamCP)
    const GroupG1 = [];
    teamCP.forEach(team1=> {
    //  team1.GroupG === ''? team1.GroupG='SEMIFINAL':null;
      if(!GroupG1.some(e=> e.GroupG===team1.GroupG && e.category===team1.category))
                          {GroupG1.push({category: team1.category,
                            GroupG: team1.GroupG      })}
                    })
       GroupG1.reverse();           
    //CA CARRERAS ANOTADAS
    //CR CARRERAS DEL OTRO EQUIPO CON EL CUAL JUGO
    //Creo esta funcion de ordenamiento para pasar las clasificaciones
    //de los grupos y saque los parametros por grupo A REDNERIZAR
    //cada grupo: A Compota, B Compota semifinal Compota,
    //           Intantil A, Infantil B, Semifinal Inffantil, Final Infantil
    //           debe pasar por un ordenamiento 
  
    ///GroupG1 array con objetos [{category:'COMPOTA', Group: 'B'},{}]
    //G = GroupG1[i]

    //Game = {NTeam1, CTeam1, Nteam2, Cteam2, GroupG, category}
    //Team = {NTeam,                          GroupG, category}
    
    teamCP.map(team1 => {
      let aux = { JJ: 0, JG: 0, JP: 0, CA: 0, CR: 0, category:null,GroupG:null,Date:null};
       // console.log(gameGC[0])
      gameGC.map(game1 => {
       if((game1.category===team1.category && game1.GroupG ===team1.GroupG )&& 
           (team1.idTeam === game1.idTeam1||team1.idTeam === game1.idTeam2)) {
          
         if (team1.idTeam === game1.idTeam1) {
          aux.JJ += 1;
          if (game1.CTeam1 > game1.CTeam2) {
            aux.JG += 1;
         } else if (game1.CTeam1 < game1.CTeam2) {
            aux.JP += 1;
        }
          aux.CA += game1.CTeam1;
          aux.CR += game1.CTeam2;
          aux.Date = game1.Date;
        } else if (team1.idTeam === game1.idTeam2) {
          aux.JJ += 1;
         if (game1.CTeam2 > game1.CTeam1) {
            aux.JG += 1;
          } else if (game1.CTeam2 < game1.CTeam1) {
            aux.JP += 1;
          }
          aux.CA += game1.CTeam2;
          aux.CR += game1.CTeam1;
          aux.Date = game1.Date;
         }
       } 
       team1.Date = aux.Date;
       team1.JJ = aux.JJ;
       team1.JP = aux.JP;
       team1.JG = aux.JG;
       team1.DIF= team1.JJ - team1.JG;
       team1.CA = aux.CA;
       team1.CR = aux.CR;
      }
       );
      });
    
   //console.log(GroupG1[0])
  // console.log(GroupG1)
    //teamCP = teamCP2;
 
   // console.log(teamCP)
    //Ordenando por CA-CR && DIF && GroupG
    teamCP.sort((b,a)  =>(a.CA-a.CR)-(b.CA-b.CR))
          .sort((a, b) =>   a.DIF   -  b.DIF)
          .sort((b, a) => a.GroupG.localeCompare(b.GroupG));
  
   //       console.log(GroupG1)
    // Ahora ordeno el array por DIF
 //   console.log(teamCP)
//console.log(teamCP.length)
//console.log(gameGC.map(e=> e.category +'  '+e.GroupG))
//console.log(gameGC.length)
//console.log(teamCP)   

//console.log(teamCP)
 //  console.log(GroupG1)
 //   console.log(GroupG1.length)
 //   console.log(teamCP)
  //  console.log(teamCP.length)
  // console.log(teamCP.length)

  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    props: JSON.parse(JSON.stringify({ user, league, team, division, gameGC,teamCP,GroupG1 })),
  };
};

type Props = {
  user: PostProps[];
  league: PostProps[];
  team: PostProps[];
  division: PostProps[];
  gameGC: PostProps[];
  teamCP:PostProps[];
  GroupG1:PostProps[];
};

const Posiciones: React.FC<Props> = (props) => {
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setHiddenCategories((prevHiddenCategories) =>
      prevHiddenCategories.includes(category)
        ? prevHiddenCategories.filter((cat) => cat !== category)
        : [...prevHiddenCategories, category]
    );
  };
  return (
    <div key={'cero'}>
      <Nav {...props} />
      <div key={'uno'} className="page">
        <main >
        
          <p></p><div key={0} className="center">
            <h1 > <p >Liga Dario Salazar </p> </h1></div>

          {props.division.map(D => 
            <div className='center posiciones' key={D.idDivision}>
              <h2 key={D.name}><button className="btn btn-dark " 
               onClick={() => toggleCategory(D.name)}
               >
                {D.name}
              </button></h2>
             
          {   
           props.teamCP.some(team=> team.category===D.name)?
           props.GroupG1.map(G=>
            G.category===D.name && props.teamCP.some(team=> team.GroupG===G.GroupG)?
            
             <div id={D.name} className={hiddenCategories.includes(D.name) ?'' :  'visually-hidden'} key={G.GroupG+G.category}> 
              <h3  id={D.name}  className={""} key={D.name}>{G.category +' '} {G.GroupG==='ZFINAL'?'FINAL':G.GroupG}</h3>
              
              <table id={D.name} key={D.name+'table'} className={"table table-hover "}>
                <tbody  key={D.name+'tbody'} >
                  {/* <!-- Aplicadas en las filas --> */}
                  <tr key={D.name+D.category}>
                    {/* <th >Categoria</th> */}
                    <th> Home</th>
                    <th >JJ </th>
                    <th >JG</th>
                    <th >JP</th>
                    <th> DIF</th>
                    <th >CA</th>
                    <th >CR</th>
                    {/* <th >Category</th>
                    <th >Group</th> */}
                  </tr>
                  {
                    props.teamCP.map(team1 =>
                      //BUSCO SOLO LA SELECCION DE LOS EQUIPOS TIPO
                      // COMPOTA O PREPARATORIO O .... INFANTIL
                      team1.category===D.name && team1.GroupG===G.GroupG ?
                        <tr key={team1.idTeam}>
                          {/* <td>{team1.category} </td> */}
                          <td>{team1.NTeam==='TIG B'?'TIGRITOS B':team1.NTeam}</td>
                          <td>{team1.JJ} </td>
                          <td>{team1.JG}</td>
                          <td>{team1.JP}</td>
                          <td>{team1.JJ === team1.JG?'-':team1.DIF}</td>
                          <td>{team1.CA}</td>
                          <td> {team1.CR}</td>
                          {/* <td> {team1.category}</td>
                          <td> {team1.GroupG}</td> */}
                        </tr> :null 

                    )
                  }
                </tbody>
              </table>
              </div> :null):null }     </div>)}

       
        </main>
      </div>

    </div>
  );
};
export default Posiciones