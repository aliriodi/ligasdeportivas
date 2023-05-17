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
    orderBy: { GroupG:'asc' },
              
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
       // fecha= fecha.map(e=> new Date(e))
       //    console.log(fecha)  
      
       //Arreglo de juegos ordenados por grupo y categoria connombres tambien
       const gameGC = [];
       division.map(division1=> //mapeo divisiones para buscar juegos de los equipos de la division
                               game.map(game1=> //mapeo juegos para ver los id de los equipos
                                              {if( team.find(team1=> //busco equipos que contengan el idDivision
                                                                team1.idTeam===game1.idTeam1||team1.idTeam===game1.idTeam2).idDivision===division1.idDivision)
                                                                //encontrando los juegos por divisiones hago un nuevo arreglo de 
                                                                //juegos por divisiones y categorias ordenados por grupo y categorias
                                                                //se anexan nombres tambien
                                                                { team.find(t=>t.idTeam===game1.idTeam1)?game1['NTeam1']=team.find(t=>t.idTeam===game1.idTeam1).name:null;
                                                                  team.find(t=>t.idTeam===game1.idTeam1)?game1['NTeam2']=team.find(t=>t.idTeam===game1.idTeam2).name:null;
                                                                  game1['category']=division1.name;
                                                                gameGC.push(game1)}}))
       //  console.log(gameGC)
        const teamCP = [];
        gameGC.map(game1=>{teamCP.push({NTeam:game1.NTeam1,category:game1.category});
                           teamCP.push({NTeam:game1.NTeam2,category:game1.category});    

                          })
        console.log(teamCP)
    
  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
    props: JSON.parse(JSON.stringify({ user,league,team,division,game,fecha,gameGC})),
  };
};

type Props = {
  user: PostProps[];
  league:PostProps[];
  team:PostProps[];
  game:PostProps[];
  division:PostProps[];
  fecha:number[];
  gameGC:PostProps;
};

const Blog: React.FC<Props> = (props) => {
   return (
    <div >
      <Nav {...props} />
      <div  className="page">
        <main >

          {props.user.map((post) => (
            <div key={post.id} className="post">
              <span key={post.id}>{post.idPlayer + "  " + post.firstname + " " + " " + post.lastname + " " + post.createdAt}</span>
            </div>
          ))}
          <p></p><div key={0} className="center">
          <h1 > <p >Liga Dario Salazar </p></h1></div>
         
         
          { props.division.map(f=>
          <div className='center' key={f.idDivision}>
          <h2>{f.name}</h2>
          <table id={'1'} className={"table table-hover" }>
             <tbody >
                   {/* <!-- Aplicadas en las filas --> */}
                   <tr key={0}>
                <th >Categoria</th>
                <th> Home</th>
                <th >JJ </th>
                <th >Carreras Home</th>
                <th >Visitantes</th>
                <th >Carreras Visitantes</th>
                <th >Grupo</th>
              </tr>
              {
            props.game.map(post => 
              //BUSCO SOLO LA SELECCION DE LOS EQUIPOS TIPO
              // COMPOTA O PREPARATORIO O .... INFANTIL
           f.idDivision===props.team.find(t=>t.idTeam===post.idTeam1)?.idDivision?
              
              <tr key={post.idGame}>
              <td>{props.team.find(t=>t.idTeam===post.idTeam1)?
                  props.division.find(d=>d.idDivision===props.team.find(t=>t.idTeam===post.idTeam1).idDivision).name:null}  </td>
              <td>{props.team.find(t=>t.idTeam===post.idTeam1)?props.team.find(t=>t.idTeam===post.idTeam1).name:null}</td>
              <td> </td>
              <td>{ post.CTeam1 }</td>
              <td>{props.team.find(t=>t.idTeam===post.idTeam2)?props.team.find(t=>t.idTeam===post.idTeam2).name:null}</td>
              <td>{ post.CTeam2}</td>
              <td> {post.GroupG}</td>
              </tr>:null
            
          )
          }
          </tbody>
          </table>
          </div> )}
          
         
        </main>
      </div>

    </div>
  );
};
export default Blog
