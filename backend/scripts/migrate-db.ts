
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from '../src/models/project.model';
import { Admin } from '../src/models/admin.model';
import { Contact } from '../src/models/contact.model';
import { Resume } from '../src/models/resume.model';
import { Settings } from '../src/models/settings.model';

dotenv.config();

const SOURCE_URI = 'mongodb://localhost:27017/portfolio';
const DEST_URI = process.env.MONGODB_URI;

if (!DEST_URI) {
    console.error('MONGODB_URI is not defined in .env');
    process.exit(1);
}

async function migrate() {
    try {
        console.log('Connecting to SOURCE DB:', SOURCE_URI);
        const sourceConn = await mongoose.createConnection(SOURCE_URI).asPromise();
        console.log('Connected to SOURCE DB');

        console.log('Connecting to DESTINATION DB:', DEST_URI); // Log URI to verify
        const destConn = await mongoose.createConnection(DEST_URI, { family: 4 } as any).asPromise();
        console.log('Connected to DESTINATION DB');

        // Models on Source Connection
        const SourceProject = sourceConn.model('Project', Project.schema);
        const SourceAdmin = sourceConn.model('Admin', Admin.schema);
        const SourceContact = sourceConn.model('Contact', Contact.schema);
        const SourceResume = sourceConn.model('Resume', Resume.schema);
        const SourceSettings = sourceConn.model('Settings', Settings.schema);

        // Models on Destination Connection
        const DestProject = destConn.model('Project', Project.schema);
        const DestAdmin = destConn.model('Admin', Admin.schema);
        const DestContact = destConn.model('Contact', Contact.schema);
        const DestResume = destConn.model('Resume', Resume.schema);
        const DestSettings = destConn.model('Settings', Settings.schema);

        // --- Migrate Projects ---
        console.log('Migrating Projects...');
        const projects = await SourceProject.find();
        console.log(`Found ${projects.length} projects.`);
        if (projects.length > 0) {
            await DestProject.deleteMany({}); // Optional: Clear destination first? Maybe safer not to if user has data there. Let's assume overwrite or clean slate.
            // Better to check if empty or just insert. Let's deleteMany to ensure clean state and avoid duplicates if run multiple times.
            await DestProject.insertMany(projects);
            console.log('Projects migrated.');
        }

        // --- Migrate Admins ---
        console.log('Migrating Admins...');
        const admins = await SourceAdmin.find();
        console.log(`Found ${admins.length} admins.`);
        if (admins.length > 0) {
            await DestAdmin.deleteMany({});
            await DestAdmin.insertMany(admins);
            console.log('Admins migrated.');
        }

        // --- Migrate Contacts ---
        console.log('Migrating Contacts...');
        const contacts = await SourceContact.find();
        console.log(`Found ${contacts.length} contacts.`);
        if (contacts.length > 0) {
            await DestContact.deleteMany({});
            await DestContact.insertMany(contacts);
            console.log('Contacts migrated.');
        }

        // --- Migrate Resume ---
        console.log('Migrating Resumes...');
        const resumes = await SourceResume.find();
        console.log(`Found ${resumes.length} resumes.`);
        if (resumes.length > 0) {
            await DestResume.deleteMany({});
            await DestResume.insertMany(resumes);
            console.log('Resumes migrated.');
        }

        // --- Migrate Settings ---
        console.log('Migrating Settings...');
        const settings = await SourceSettings.find();
        console.log(`Found ${settings.length} settings.`);
        if (settings.length > 0) {
            await DestSettings.deleteMany({});
            await DestSettings.insertMany(settings);
        }

        console.log('Migration COMPLETED successfully.');

        await sourceConn.close();
        await destConn.close();
        process.exit(0);

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
