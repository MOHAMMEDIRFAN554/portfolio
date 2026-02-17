import { Settings, ISettings } from '../../models/settings.model';

export class SettingsRepository {
    async getAllSettings(): Promise<ISettings[]> {
        return Settings.find();
    }

    async getSettingByKey(key: string): Promise<ISettings | null> {
        return Settings.findOne({ key });
    }

    async upsertSetting(key: string, value: string, description?: string): Promise<ISettings> {
        return Settings.findOneAndUpdate(
            { key },
            { value, description },
            { new: true, upsert: true }
        );
    }

    async bulkUpsert(settings: { key: string; value: string; description?: string }[]): Promise<void> {
        const operations = settings.map((s) => ({
            updateOne: {
                filter: { key: s.key },
                update: { $set: { value: s.value, description: s.description } },
                upsert: true
            }
        }));
        await Settings.bulkWrite(operations);
    }
}
