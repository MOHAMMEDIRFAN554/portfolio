import { IContact } from '../../models/contact.model';
import { AppError } from '../../middlewares/errorHandler';
import { sendContactNotification } from '../../utils/nodemailer';
import { ContactRepository } from './contact.repository';

export interface CreateContactInput {
  name: string;
  email: string;
  message: string;
}

export class ContactService {
  private repository = new ContactRepository();

  async submitContact(data: CreateContactInput, adminEmail: string): Promise<IContact> {
    const saved = await this.repository.create(data);
    await sendContactNotification(data.email, data.name, data.message, adminEmail);
    return saved;
  }

  async getAllMessages(): Promise<IContact[]> {
    return this.repository.findAll();
  }

  async markAsRead(id: string): Promise<IContact> {
    const contact = await this.repository.markAsRead(id);
    if (!contact) {
      throw new AppError(404, 'Contact message not found');
    }
    return contact;
  }
}
