import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Certificate } from "../entity/certificate.entity";
import { UserInfo } from "../entity/user.entity";

export const createCertificate = async (req: Request, res: Response) => {
    const { userId, courseName } = req.body;
    const users = AppDataSource.getRepository(UserInfo);
    const certificateRepo = AppDataSource.getRepository(Certificate);

    if (!userId || !courseName) {
        return res.status(404).json({ message: "certificate not found" })
    }
    try {
        const user = await users.findOne({ where: { id: req.user?.id } })
        if (!user) {
            return res.status(404).json({message: "user not found",})

    }

        const certificate = new Certificate();
        certificate.user = user
        certificate.courseName = courseName
        await certificateRepo.save(certificate)

        res.status(201).json({
            id: certificate.id,
            userId: user.id,   
            courseName: certificate.courseName,
            createdAt: certificate.createdAt
        })

    } catch (err) {
        return res.status(500).json({
            message: "Interal server not found"
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const { userId } = req.params;

    try {
        const certificates = await certificateRepo.find({
            where: { user: { id: userId } },
        });

        return res.status(200).json(certificates);
    } catch (error) {
        return res.status(500).json({ error: "certificate error" });
    }
};

export const getById = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const { id } = req.params;

    try {
        const certificate = await certificateRepo.findOne({
            where: { id },
        });

        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }

        return res.status(200).json(certificate);
    } catch (error) {
        return res.status(500).json({ error: "certificate error" });
    }
};

export const deleteCertificate = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const { id } = req.params;

    try {
        const certificate = await certificateRepo.findOne({ where: { id } });
        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }

        await certificateRepo.remove(certificate);
        return res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting certificate" });
    }
};  

 
