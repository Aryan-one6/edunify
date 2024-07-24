// src/pages/api/schools.js

import mysql from 'mysql2/promise';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'edunify',
};

const connection = mysql.createPool(dbConfig);

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const form = new IncomingForm({
            uploadDir: path.join(process.cwd(), 'public/schoolImages'),
            keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parsing error:', err);
                res.status(500).json({ error: 'Error parsing the form' });
                return;
            }

            // Clean up field data
            const cleanFields = (field) => {
                if (Array.isArray(field)) {
                    return field[0];
                }
                return field;
            };

            const { name, address, city, state, contact, email_id } = fields;

            // Get image file details
            const imageFile = files.image ? files.image[0] : null;
            const image = imageFile ? imageFile.newFilename : '';

            // Check if image file is present
            if (imageFile && imageFile.filepath) {
                try {
                    const newPath = path.join(form.uploadDir, image);
                    fs.renameSync(imageFile.filepath, newPath);
                } catch (fileError) {
                    console.error('File moving error:', fileError);
                    res.status(500).json({ error: 'Error moving the uploaded file' });
                    return;
                }
            }

            try {
                // Insert data into the database with cleaned fields
                const [result] = await connection.execute(
                    'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        cleanFields(name),
                        cleanFields(address),
                        cleanFields(city),
                        cleanFields(state),
                        cleanFields(contact),
                        image, // Image filename
                        cleanFields(email_id),
                    ]
                );
                res.status(201).json({ message: 'School added successfully!' });
            } catch (dbError) {
                console.error('Database error:', dbError);
                res.status(500).json({ error: 'Error saving to database' });
            }
        });
    } else if (req.method === 'GET') {
        try {
            const [rows] = await connection.query('SELECT * FROM schools');
            res.status(200).json(rows);
        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ error: 'Error fetching data' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
