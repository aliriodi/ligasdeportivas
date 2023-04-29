import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'


export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const league = await prisma.league.findMany();
  const division = await prisma.division.findMany();
  const team = await prisma.team.findMany();
  const player = await prisma.player.findMany();
  const tiporesult = await prisma.result.findMany();
  const valueresult = await prisma.resultPlayer.findMany();



  //console.log('feed son objetos dentro de array con length= ' +  feed.length);
  return {
  props: JSON.parse(JSON.stringify({ player, team, division, league,tiporesult, valueresult})),
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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" ></link>
      <div className="topnav">
        <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>

        <ul className="nav">
          <li><a href="#">Servicios</a>
            <ul>
              <li><a href="#Submenu1">Submenu1</a></li>
              <li><a href="#Submenu1">Submenu2</a></li>
              <li><a href="#Submenu1">Submenu3</a></li>
              <li><a href="#Submenu1">Submenu4</a>
                <ul>
                  <li><a href="#Submenu1">Submenu12</a></li>
                  <li><a href="#Submenu1">Submenu22</a></li>
                  <li><a href="#Submenu1">Submenu32</a></li>
                  <li><a href="#Submenu1">Submenu42</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="page">
        <h1>Creado por Equipo desarrollador ARQUICOM AJ</h1>
        <p></p>
        <div>Cantidad de jugadores cargados: {" " + props.player.length + " "} pertencientes a {" " + props.team.length} equipos</div>
        <p></p>
        <main>
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
                  player.idTeam === post.idTeam ?<tr className="active"><td>{player.firstname +"  "+player.lastname}</td></tr>:null))}
                       
                                            

                      {/* <!-- Aplicadas en las celdas (<td> o <th>) --> */}
                      <tr>
                        <th className="active">.A.</th>
                        <td className="active">.A.</td>
                        <td className="success">.B.</td>
                        <td className="warning">.C.</td>
                        <td className="danger">.D.</td>
                      </tr>
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
