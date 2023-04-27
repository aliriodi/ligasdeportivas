const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
//Leer tabla de equipos para poder colocarlo en archivo.csv
async function leerTablaTeam()
     {
const getTeam = await prisma.team.findMany({},
).then(response=> 
    {console.log(response.length)
   response.map(r=> console.log(r.idLeague+','+r.idDivision+','+r.name+','+r.picture))
    }
    ).catch(console.error).finally(() => prisma.$disconnect())}

//leerTablaTeam()

async function leerTablaResult()
     {
const getResult = await prisma.Result.findMany({},
).then(response=> 
    {console.log(response.length)
   response.map(r=> console.log(r.name))
    }
    ).catch(console.error).finally(() => prisma.$disconnect())}

   // leerTablaResult()