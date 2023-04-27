import { PrismaClient } from '@prisma/client'
import React, { useState, useEffect } from "react";
  
//Funcion para crear Usuario en 
//BD Sqlite con Prisma
const prisma = new PrismaClient()
async function main( name:string,email:string,role:number) {
  const userCreate = await prisma.user.create({
    data: {
      email: email,
      name: name,
      role: role,
    },
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect())
  console.log(userCreate);
 
}
let name:string = '';
let email:string = '';
let role:number = 0;
function CreateUser() {
  //Creando conexion con la BD para usarla

  // Mi BD posee la tabla 
  //user
  // idUser | createdAT | email  (string)| name (string)| role (number)

  
  
 
  //main( name, email, role)
  const [input, setInput] = useState({
    name: "",
    email: "",
    role: 0, });
    //Declarando funcion para ir modificando el input a medida
    //que se escribe
    function handleOnChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      // setErrors(
      //   validate({
      //     ...input,
      //     [e.target.name]: e.target.value,
      //   })
      // );
    }
    function handleSubmit(e) {
      e.preventDefault();
      const form = e.currentTarget
      if (input.name.length < 4) {
        return alert("Nombre requiere mas de 4 caracetres");
      }}

    return ( <>
      <h1>Agrega Nuevo Producto</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Name */}
        <div className="txt_field">
          <input
            onChange={handleOnChange}
            onBlur={handleOnChange}
            type="text"
            name="email"
            value={input.email}
          />
            <span></span>
              <label>Nombre</label>
              </div>
           </form>
          </>
    )
  
}
  export default CreateUser;
 