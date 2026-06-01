import fs from 'fs';
import path from 'path';

export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, message } = req.body || {};
  if(!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const filePath = path.join(process.cwd(), 'submissions.json');
  try{
    let submissions = [];
    if(fs.existsSync(filePath)){
      const raw = fs.readFileSync(filePath, 'utf8');
      submissions = raw ? JSON.parse(raw) : [];
    }
    const entry = { id: Date.now(), name, email, message, created_at: new Date().toISOString() };
    submissions.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    return res.status(200).json({ ok: true });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Failed to save' });
  }
}
