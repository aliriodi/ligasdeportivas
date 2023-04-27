const fs = require("fs");
const {PrismaClient} = require('@prisma/client');

 function hola(idequipo, archivo,action){
    console.log('Programa para cargar csv a SQLITE')
    console.log('fsreadFile')
   fs.readFile(archivo, 'utf8', function (err, data) {
    //Convierto en Array por lineas por los enter
    let data2 =data.split(/\r?\n|\r/);
    console.log(data2.length);
    //Separo una linea en ARRAY separado por ,
 //   console.log(data2[1].split(','))
 //   console.log(typeof(data2[0].split(',')))

    //console.log('fscreateStream')
    ///const stream = fs.createReadStream("./1COMtigritosA.csv");
    //console.log(stream)
    //console.log(typeof(stream))
    console.log('abriendo conexion a Base de Datos');
    const prisma = new PrismaClient();
//  funcion Crear usuario enbase de datos
    async function crearUsuario(idTeam,firstname ,lastname,picture,phone,address,
        email,primary_position,secundary_position,third_position,createdAt)
         {
const playerCreate = await prisma.player.create({
data: {
 idTeam:idTeam,
 firstname:firstname,
 lastname:lastname,
 picture:picture,
 phone:phone,
 address:address,
 email: email,
 primary_position,
 secudary_position:secundary_position,
 third_position,
 createdAt,                                                     
},
}).catch(console.error).finally(() => prisma.$disconnect())}

//  funcion Crear RESULTADO usuario enbase de datos
// JJ VB CA HC BB GP H2 H3 HR BA CI SO BR AL AVE

async function crearResult(idGame,idResult,idPlayer,idTeam,value)
         {
          const resultCreate = await prisma.resultPlayer.create({
          data: {
               idGame:idGame,
               idResult:idResult,
               idPlayer:idPlayer,
               idTeam:idTeam,
               value:value,                                   
                },
          }).catch(console.error).finally(() => prisma.$disconnect())}       

//Funcion para Tomar idPlayer usuario teniendo el NOMBRE
//tabla Player y creando ResultPlayer de una vez
          async function getIdPlayer(firstname,lastname,idResult,value)
          {
            console.log('56 '+firstname); 
            const player = await prisma.player.findFirst({
                where: {
                  firstname:firstname ,
                  lastname:lastname,
                },
              }).then(response=> crearResult(1,idResult,response.idPlayer,idequipo,value))
              //.then(response => console.log(response? response.idPlayer+' '+ response.firstname +' '+ response.lastname:null))
           .catch(console.error).finally(() => prisma.$disconnect())}       
 

// crea un nuevo objeto `Date`
var today = new Date();
// obtener la fecha y la hora
var now = today.toLocaleString();
 //      console.log(now)

 //creando JUGADORES en PLAYER
   for(i=1;i<data2.length;i++){
    //console.log('ubicacion ' +data2[i])
                    //NOMBRE                   //APELLIDO      
  //  console.log(data2[i].split(' ')[0]+ ', '+data2[i].split(' ')[1]  )
  if(action===0){  crearUsuario(idequipo,data2[i].split(' ')[0],data2[i].split(' ')[1],'0','0','0','0','0','0','0',);}
  //   console.log(i+'Usuario creado')
  let data3 = data2[i].split(',');
   console.log(data3[0])

     for(j=1;j<16;j++){
  if(action===1) {  getIdPlayer(data3[0].split(' ')[0],data3[0].split(' ')[1],j,parseInt(data3[j]))}
                      }
       console.log('Leyendo promesa')
    
    
                  //JJ                       VB                           CA
  // console.log('idResult[1]= '+data3[1]+'  idResult[2]= '+data3[2]+'  CA[3]= '+data3[3]);           
 
  
    }
    
        });
}



function cargarResultTeams(){
    console.log('Programa para cargar Result table desde .csv')
    console.log('Metodo fsreadFile')

   fs.readFile('Result.csv', 'utf8', function (err, data){
    let data2 =data.split(/\r?\n|\r/);
    const prisma = new PrismaClient();
    async function Result(name)
         { const resultCreate = await prisma.result.create({
           data: {name:name,},
}).catch(console.error).finally(() => prisma.$disconnect())}
         console.log(data2.length+' Result posibles')
         //Este mapeo solo se usa para cargar Resul posibles en lotes
         data2.map(d=> Result(d)) 
        
   })

   fs.readFile('Team.csv', 'utf8', function (err, data){
    let data2 =data.split(/\r?\n|\r/);
    const prisma = new PrismaClient();
    async function Team(idLeague, idDivision, name,picture)
         { const temaCreate = await prisma.team.create({
           data: {
            idLeague:idLeague,
            idDivision:idDivision,
            name:name,
            picture:picture,
        },
}).catch(console.error).finally(() => prisma.$disconnect())}
         console.log(data2.length+' Equipos')
         
         for(i=0;i<data2.length;i++)
         {
            let data3 = data2[i].split(',');
            Team(parseInt(data3[0]),parseInt(data3[1]),data3[2],'data3[4]')
         }  
   })
}



//cargarResultTeams();

//Esta funcion tiene dos grandes promesas
//una para cargar Jugadores y otra para
//cargar resultados por jugador en la 
//tabla Result 
//hola(idTeam,archivo,0= crearUsuario || 1=Crear Resultado)
hola(18,'25NEWASTROS18.csv',1);