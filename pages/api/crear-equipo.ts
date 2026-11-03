// pages/api/crear-equipo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo permitimos peticiones POST para escribir datos
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }

  try {
    const { name, idDivision } = req.body;

    // Validación básica de los datos recibidos
    if (!name || !idDivision) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (name o idDivision)' });
    }

    // Escribimos en la tabla 'team' usando Prisma
    const nuevoEquipo = await prisma.team.create({
      data: {
        name: name,
        idDivision: Number(idDivision),
      },
    });

    return res.status(201).json(nuevoEquipo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al guardar en la base de datos' });
  } finally {
    await prisma.$disconnect();
  }
}
