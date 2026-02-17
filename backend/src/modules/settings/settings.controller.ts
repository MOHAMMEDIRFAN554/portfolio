import { Request, Response } from 'express';
import { SettingsService } from './settings.service';

export class SettingsController {
    private service: SettingsService;

    constructor() {
        this.service = new SettingsService();
    }

    getAllSettings = async (req: Request, res: Response) => {
        try {
            const settings = await this.service.getAllSettings();
            res.json(settings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch settings' });
        }
    };

    updateSettings = async (req: Request, res: Response) => {
        try {
            const settings = await this.service.updateSettings(req.body);
            res.json(settings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update settings' });
        }
    };
}
