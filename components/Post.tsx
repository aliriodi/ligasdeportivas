import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  idGame:number;
  idTeam1:number;
  idTeam2:number;
  CTeam1:number;
  CTeam2:number;
  Date:Date;
  GroupG:string;
  idResult:number;
  idLeague:number;
  idPlayer:number;
  idTeam:number;
  idDivision:number;
  value:number;
  firstname:string;
  lastname:string;
  title: string;
  idUser: number;
  name:string;
  email:string;
  createdAt:string;
  NTeam:string;
  category:string;
  JJ:Number;
  JG:number;
  JP:Number;
  CA:Number;
  CR:number;
  DIF:number;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
