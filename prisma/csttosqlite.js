const fs = require("fs");
const {PrismaClient} = require('@prisma/client');
const { parse } = require('date-fns');

 function hola(idequipo, archivo,action){
    console.log('Programa para cargar csv a SQLITE')
    console.log('fsreadFile')
   fs.readFile(archivo, 'utf8', function (err, data) {
    //Convierto en Array por lineas por los enter
    let data2 =data.split(/\r?\n|\r/);
    console.log('10 Longitud de data2'+data2.length);
    console.log(data2)

    //Separo una linea en ARRAY separado por ,
 //   console.log(data2[1].split(','))
 //   console.log(typeof(data2[0].split(',')))

    //console.log('fscreateStream')
    ///const stream = fs.createReadStream("./1COMtigritosA.csv");
    //console.log(stream)
    //console.log(typeof(stream))
    console.log('abriendo conexion a Base de Datos');
    const prisma = new PrismaClient();
//  funcion Crear JUGADOR enbase de datos
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

   console.log('86. longitud de data3: ' +data3.length)
  console.log(data3)
     for(j=1;j<16;j++){
  if(action===1) { 
                console.log('92 datos getIdPlayer('+data3[0].split(' ')[0]+','+data3[0].split(' ')[1]+','+j+','+parseInt(data3[j])) 
                getIdPlayer(data3[0].split(' ')[0],data3[0].split(' ')[1],j,parseInt(data3[j]));
  }
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
            Team(parseInt(data3[0]),parseInt(data3[1]),data3[2],'data3[4]')
         }  
   })
}

function cargarGame(archivo){
   console.log('Programa para cargar Game table desde: '+archivo)
   fs.readFile(archivo, 'utf8', function (err, data){
       //Convierto en Array por lineas por los enter
       let data2 =data.split(/\r?\n|\r/);
       console.log('Linea 155 csttosqlite.js: Longitud de data2[]: '+data2.length);
       //console.log(data2)
       console.log('E1=Home E2=Visitante')
       console.log(data2.map(data =>
                   'E1: '+ data.split(',')[2]+
                 '  CE1: '+data.split(',')[3]+
                  ' E2: '+data.split(',')[4]+
                  ' CE2: '+data.split(',')[5]+
                  ' Liga: '+data.split(',')[6]+
                  ' Group: '+data.split(',')[7]+
                  ' Hora: '+data.split(',')[8]+
                  ' Location: '+data.split(',')[9]))  
   
   //Creando conexion a BD   
   const prisma = new PrismaClient();
   //creando juego en BD prisma
   async function GameCreate(idTeam1, CTeam1, idTeam2,CTeam2,Date,GroupG,Location)
   { const GameCreate = await prisma.game.create({
     data: {
      idTeam1:idTeam1,
      CTeam1:CTeam1,
      idTeam2:idTeam2,
      CTeam2:CTeam2,
      GroupG:GroupG,
      Date:Date,
      Location:Location,
      quantityIning:9,
      quantityHits:0,
      quantityError:0,
      quantityQB:0,
  },
}).catch(console.error).finally(() => prisma.$disconnect())}
for(let i =2; i<data2.length;i++){
   //'E1: '+ data2[i].split(',')[2]
   //Equipo 1 proviene de la linea i de data2
   //separados por , la 2da posicion
   
   // console.log('E1: '+ data2[i].split(',')[2]+
   // '  CE1: '+data2[i].split(',')[3]+
   //  ' E2: '+data2[i].split(',')[4]+
   //  ' CE2: '+data2[i].split(',')[5]+
   //  ' idDivision: '+data2[i].split(',')[6]+
   //  ' Group: '+data2[i].split(',')[7]+
   //  ' Hora: '+data2[i].split(',')[8]+
   //  ' Location: '+data2[i].split(',')[9])

  async function getIdTeam(idDivision, name){
    idDivision=='COMPOTA'?idDivision=1:null;
    idDivision=='PREPARATORIO'?idDivision=2:null;
    idDivision=='PREINFANTIL'?idDivision=3:null;
    idDivision=='INFANTIL'?idDivision=4:null;
    idDivision=='JUNIOR'?idDivision=5:null;

    const prisma = new PrismaClient();
    const team = await prisma.team.findFirst({
      where: {
        idDivision:parseInt(idDivision) ,
        name:name,
      },
    }).then(response=> response.idTeam)
    //.then(response => console.log(response? response.idPlayer+' '+ response.firstname +' '+ response.lastname:null))
 .catch(console.error).finally(() => prisma.$disconnect())
 return team;
   }
   getIdTeam(data2[i].split(',')[6],data2[i].split(',')[2])
   .then( response1 => getIdTeam(data2[i].split(',')[6],data2[i].split(',')[4])
                    //concateno promesas para traerme solo los ID de equipo
                    // y luego debo escribir el game de acuerdo a resultados con otra promesa
                    //a declarar
                    .then(response2 => 
                     //abro codigo escribir BDGAME
                     {console.log(i+'  response 1: '+response1 + ' response 2: '+response2)
                      console.log('Cargando')
                      // GameCreate(response1,parseInt(data2[i].split(',')[3]),
                      //            response2,parseInt(data2[i].split(',')[5]),
                      //            parse('05/07/2023','MM/dd/yyyy' , new Date()) ,
                      //            data2[i].split(',')[7],
                      //            data2[i].split(',')[9])
                  
                 } 
                  //cierro codigo escribir BDGAME
   ))
  
      // GameCreate(data2[i].split(',')[2],
      //          data2[i].split(',')[3],
      //          data2[i].split(',')[4],
      //          data2[i].split(',')[5],
      //          5/28/2023,data2[i].split(',')[7])
           }
  })
 
}

//cargarResultTeams();

//Esta funcion tiene dos grandes promesas
//una para cargar Jugadores y otra para
//cargar resultados por jugador en la 
//tabla Result 
//hola(idTeam,archivo,0= crearUsuario || 1=Crear Resultado)
//hola(50,'1COMtigritosA50.csv',1);
//hola(51,'51TIGRITOSA50.csv',1);
// hola(37,'43MELLIZOSC37.csv',1);
// hola(38,'44NEWASTROSA38.csv',1);
// hola(39,'45NEWASTROSB39.csv',1);
// hola(40,'46GIGANTES40.csv',1);
// hola(42,'47COCODA42.csv',1);
// hola(43,'48COCODB43.csv',1);
//Esta funcion es diseñada para cargar Games
cargarGame('Game6.csv')