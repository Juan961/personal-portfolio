'use client'

import Image from 'next/image';
import TitleSection from './TitleSection';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <section className="w-full flex flex-col font-jakarta">
      <TitleSection title="Contact" />

      <form onSubmit={handleSubmit} className="text-primary flex flex-col gap-3 max-w-md w-full mx-auto font-light">
        <input 
          name="email"
          value={formData.email}
          onChange={handleChange} 
          minLength={5} 
          maxLength={254} 
          type="email" 
          placeholder="Email" 
          className="bg-contrast-secondary/40 border-secondary border rounded px-2 py-1 bg-"
        />
        <input 
          name="subject"
          value={formData.subject}
          onChange={handleChange} 
          minLength={8} 
          maxLength={120} 
          type="text" 
          placeholder="Subject" 
          className="bg-contrast-secondary/40 border-secondary border rounded px-2 py-1"
        />
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange} 
          minLength={50} 
          maxLength={600}
          rows={6}
          placeholder="Message" 
          className="bg-contrast-secondary/40 border-secondary border rounded px-2 py-1"
        ></textarea>
        <button className='font-medium bg-white/30 border-contrast-primary border-2 cursor-not-allowed rounded py-2 hover:bg-contrast-primary transition-colors duration-500' type='submit'>Send</button>
      </form>

      <ul className='mt-10 flex gap-10 flex-wrap justify-center'>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/jotajotag/">
            <Image src="/icons/linkedin-logo.webp" alt="LinkedIn Logo" width={50} height={50} className='invert-50 hover:invert-0 transition-all duration-300' />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Juan961">
            <Image src="/icons/github-logo.webp" alt="GitHub Logo" width={50} height={50} className='invert-50 hover:invert-0 transition-all duration-300' />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://platzi.com/p/juan961">
            <Image src="/icons/platzi-logo.webp" alt="Platzi Logo" width={50} height={50} className='invert-50 hover:invert-100 transition-all duration-300' />
          </a>
        </li>
      </ul>
    </section>
  )
}
