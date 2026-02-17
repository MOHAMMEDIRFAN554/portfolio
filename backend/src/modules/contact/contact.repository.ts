import { Contact, IContact } from '../../models/contact.model';

export class ContactRepository {
    async findAll(): Promise<IContact[]> {
        return Contact.find().sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<IContact | null> {
        return Contact.findById(id);
    }

    async create(data: any): Promise<IContact> {
        const contact = new Contact(data);
        return contact.save();
    }

    async markAsRead(id: string): Promise<IContact | null> {
        return Contact.findByIdAndUpdate(id, { isRead: true }, { new: true });
    }

    async delete(id: string): Promise<IContact | null> {
        return Contact.findByIdAndDelete(id);
    }
}
