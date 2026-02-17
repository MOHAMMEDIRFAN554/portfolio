import { SettingsRepository } from './settings.repository';

export class SettingsService {
    private repository: SettingsRepository;

    constructor() {
        this.repository = new SettingsRepository();
    }

    async getAllSettings() {
        const settings = await this.repository.getAllSettings();
        const settingsMap: Record<string, string> = {};
        settings.forEach((s) => {
            settingsMap[s.key] = s.value;
        });
        return settingsMap;
    }

    async updateSettings(settings: Record<string, string>) {
        const updatePayload = Object.entries(settings).map(([key, value]) => ({
            key,
            value: String(value)
        }));
        await this.repository.bulkUpsert(updatePayload);
        return this.getAllSettings();
    }
}
