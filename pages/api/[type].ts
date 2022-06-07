import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'utils/prisma'

type Data = {
  user: User
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query

  let user = await prisma.user.findUnique({
    where: {
      fingerprint: id as string
    },
    include: {
      votes: true,
      comments: true
    }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        fingerprint: id as string
      },
      include: {
        votes: true,
        comments: true
      }
    })
  }

  res.status(200).json({ user })
}

export default handler