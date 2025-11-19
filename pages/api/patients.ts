import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { IPatient } from "@/lib/interfaces";
import { ObjectId } from "mongodb";

interface PatientResult {
  patients?: Array<IPatient> | IPatient;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>
) {
  if (req.method === "POST") return await create(req, res);
  if (req.method === "PUT") return await update(req, res);
  if (req.method === "GET") return await read(req, res);
  if (req.method === "DELETE") return await del(req, res);

  return res.status(405).json({ message: "Method not allowed" });
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const data = req.body as IPatient;

    const result = await db.collection("patients").insertOne(data);

    return res.status(201).json({ patients: result });
  } catch (error) {
    return res.status(500).json({ message: "Error creating patient" });
  }
};
const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    const updatedPatient = req.body as IPatient;

    const result = await db
      .collection("patients")
      .updateOne(
        { _id: new ObjectId(id as string) }, 
        { $set: updatedPatient }            
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ patients: updatedPatient });
  } catch (error) {
    console.error("PUT Error:", error);
    return res.status(500).json({ message: "Error updating patient" });
  }
};
const read = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const patients = await db.collection("patients").find().toArray();

    return res.status(200).json({ patients });
  } catch (error) {
    return res.status(500).json({ message: "Error loading patients" });
  }
};
const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const { id } = req.query;

    const result = await db
      .collection("patients")
      .deleteOne({ _id: new ObjectId(id as string) });

    return res.status(200).json({ patients: result });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting patient" });
  }
};
