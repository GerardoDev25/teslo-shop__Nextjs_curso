import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: any = await getSession({ req });

  if (!session)
    return res.status(401).json({
      message: 'Debe de estar autorizado para acceder a este recurso',
    });

  const validRoles = ['admin', 'super-user'];

  if (!validRoles.includes(session.user.role)) {
    return res.status(401).json({
      message: 'Debe de estar autorizado para acceder a este recurso',
    });
  }

  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);

    default:
      return res.status(400).json({ message: 'bad request' });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  // const data = fs.readFileSync(file.filepath);

  // fs.writeFileSync(`./public/${file.originalFilename}`, data);
  // fs.unlinkSync(file.filepath);
  // return;

  const { secure_url } = await cloudinary.uploader.upload(file.filepath);
  return secure_url;
};

const parseFile = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fiels, files) => {
      if (err) {
        return reject(err);
      }
      const filePath = await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFile(req);

  return res.status(200).json({ message: imageUrl });
};
