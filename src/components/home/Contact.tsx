'use client'

import Image from 'next/image';
import TitleSection from './TitleSection';
import { useState } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Contact() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [error, setError] = useState<string | null>(null)

  const [sent, setSent] = useState<boolean>(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    if (sent || isLoading) return;

    e.preventDefault();

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
 
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
 
      const status = response.status;

      if (status !== 200) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      setSent(true)

    } catch (error) {
      // @ts-expect-error This is fine for catching generic errors
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full flex flex-col font-jakarta">
      <TitleSection title="Contact" />

      <form onSubmit={handleSubmit} className="text-primary flex flex-col gap-3 max-w-md w-full mx-auto font-light">
        <input 
          name="email"
          required
          readOnly={isLoading || sent}
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
          required
          readOnly={isLoading || sent}
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
          required
          readOnly={isLoading || sent}
          value={formData.message}
          onChange={handleChange} 
          minLength={50} 
          maxLength={600}
          rows={6}
          placeholder="Message" 
          className="w-full resize-y bg-contrast-secondary/40 border-secondary border rounded px-2 py-1"
        ></textarea>

        <button className='font-medium bg-white/30 border-contrast-primary border-2 cursor-pointer rounded py-2 hover:bg-contrast-primary transition-colors duration-500' type='submit'>{isLoading ? <ArrowPathIcon className="animate-spin h-5 w-5 mx-auto" /> : 'Send'}</button>

        {
          sent ? <p className='text-green-500'>Message sent successfully</p> : null
        }

        {
          error && !sent ? <p className='text-red-500'>Failed to send message</p> : null
        }

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
