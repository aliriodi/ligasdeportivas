import React from "react"
import Head from "next/head"
import Image from 'next/image'
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { PrismaClient } from '@prisma/client'
import logohome from '../images/baseball-icon-388.png'

export const getStaticProps: GetStaticProps = async () => {
    const prisma = new PrismaClient();
    //const feed = await prisma.user.findMany();



    //console.log('feed son objetos dentro de array con length= ' +  feed.length);
    return {

        props: JSON.parse(JSON.stringify({/* feed */})),
    };
};

type Props = {
    // feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
    return (
        <> <Head>
            <link rel="shortcut icon" href="../images/icons/favicon.ico" />
            </Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" ></link>
            <div className="topnav">
                <a href="/">Equipos</a>
                <a href="/posiciones">Posiciones</a>
                <a href="/resultados">Resultados</a>
                <a href="/"><Image className="logo" src={logohome} height="35" width="45" alt="Home"/></a>
                <a href="/estadisticas">Estadisticas</a>
                <a href="/router">Router Dario Salazar</a>
                <a href="/contact">Contacto</a>
                {/* <a href="#about">About</a> */}
            </div>
        </>
    );
};
export default Blog
