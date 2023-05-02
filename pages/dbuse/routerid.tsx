
import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
    if (req.method === 'GET') {
      // Process a POST request
        async function getdataBD(idDivision: number, idTeam: number) {
        let prisma = new PrismaClient();
        const league = await prisma.league.findMany();
        const division = await prisma.division.findMany();
      
        if (idDivision) {
          const team = await prisma.team.findMany({
            where: {
              idDivision: idDivision,
            },
          });
        }
      
        if (idTeam) {
          const player = await prisma.player.findMany({
            where: {
              idTeam: idTeam,
            },
          });
          const tiporesult = await prisma.result.findMany();
          const valueresult = await prisma.resultPlayer.findMany({
            where: { idTeam: idTeam, },
            orderBy: { idResult: 'asc', }
          });
        }
      }
      
    } else {
      // Handle any other HTTP method
    }
  }
  