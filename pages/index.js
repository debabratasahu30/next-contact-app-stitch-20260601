import { useState } from 'react';

export default function Home(){
  const [form, setForm] = useState({name:'', email:'', message:''});
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = async e =>{
    e.preventDefault();
    setStatus('sending');
    try{
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if(res.ok){ setStatus('sent'); setForm({name:'', email:'', message:''}); }
      else { const j = await res.json(); setStatus('error: ' + (j?.error || res.status)); }
    }catch(err){ setStatus('error'); }
  }

  return (
    <main style={{maxWidth:800, margin:'40px auto', padding:'0 16px'}}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} required type="email" />
        </label>
        <br />
        <label>
          Message
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
      <div style={{marginTop:20}}>Status: {status}</div>
    </main>
  )
}
