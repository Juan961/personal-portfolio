'use client'

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowPathIcon, CommandLineIcon } from '@heroicons/react/24/solid';

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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <section className="relative py-24 px-6 lg:px-12 bg-[#0c1018]" id="about">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-8">
          <CommandLineIcon className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Bridging the Gap</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          I am a multidisciplinary engineer who speaks both languages: the physics of machines and the logic of code. My work focuses on creating seamless integrations between physical hardware and intelligent software systems.
        </p>
        <div className="border-t border-[#232f48] pt-12" id="contact">
          <h3 className="text-xl font-bold text-white mb-8">GET IN TOUCH</h3>
          <div className="w-full max-w-lg mx-auto bg-surface-dark p-8 rounded-xl border border-[#232f48]">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full rounded-lg bg-background-dark border border-[#232f48] px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="Project Inquiry"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-background-dark border border-[#232f48] px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="your.email@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={50}
                  className="w-full rounded-lg bg-background-dark border border-[#232f48] px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors min-h-30"
                  placeholder="How can we work together? (Min 50 chars)"
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {sent && <p className="text-green-500 text-sm">Message sent successfully!</p>}

              <button 
                disabled={isLoading || sent}
                className={`w-full flex items-center justify-center rounded-lg px-6 py-4 text-sm font-bold text-white transition-colors cursor-pointer ${isLoading || sent ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'}`} 
                type="submit"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                    SENDING...
                  </>
                ) : sent ? (
                  'MESSAGE SENT'
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
            <Link className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jotajotag/">
              <Image src="/icons/linkedin-logo.webp" alt="LinkedIn Logo" width={24} height={24} className='invert-50 group-hover:invert-0 transition-all duration-300' />
              <span className="text-lg font-medium">LinkedIn</span>
            </Link>
            <Link className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" href="https://github.com/Juan961">
              <Image src="/icons/github-logo.webp" alt="GitHub Logo" width={24} height={24} className='invert-50 group-hover:invert-0 transition-all duration-300' />
              <span className="text-lg font-medium">GitHub</span>
            </Link>
            <Link className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" href="https://platzi.com/p/juan961">
              <Image src="/icons/platzi-logo.webp" alt="Platzi Logo" width={24} height={24} className='invert-50 group-hover:invert-100 transition-all duration-300' />
              <span className="text-lg font-medium">Platzi</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
