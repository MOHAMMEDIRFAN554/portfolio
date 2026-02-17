import { Request, Response } from 'express';
import { ContactService } from './contact.service';

export class ContactController {
  private contactService = new ContactService();

  async submitContact(req: Request, res: Response) {
    try {
      const adminEmail = (req.app.get('config') as any).adminEmail;
      const contact = await this.contactService.submitContact(req.body, adminEmail);
      res.status(201).json({ message: 'Message submitted successfully', contact });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to submit contact' });
    }
  }

  async getAllMessages(req: Request, res: Response) {
    try {
      const messages = await this.contactService.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contact = await this.contactService.markAsRead(id);
      res.json(contact);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }
}
