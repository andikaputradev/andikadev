'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Trophy } from 'lucide-react'
import { projects } from './server-page'
import { contactHref } from '@/lib/contact-services'

export default function ClientProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(projects.map((p) => p.category))]

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects

  return (
    <>
      {/* Hero Section */}
      <section className="text-center pt-8 pb-16">
        {/* Badge */}
        <div 
          className="inline-flex bg-white/60 rounded-full mb-8 py-1.5 pr-4 pl-3 shadow-sm backdrop-blur-sm items-center gap-2"
          style={{
            position: 'relative',
            // @ts-expect-error CSS custom properties
            '--border-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))',
            '--border-radius-before': '9999px'
          }}
        >
          <Trophy className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-600">Portofolio</span>
        </div>

        {/* Title */}
        <h1 className="leading-[0.95] lg:text-[4rem] text-4xl font-medium text-zinc-900 tracking-tighter mb-6">
          Proyek dan
          {' '}<span className="block gradient-text font-light">hasil kerja</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
          Daftar proyek resmi yang dikerjakan oleh Wahyu Andika Putra. Hubungi saya untuk informasi teknis lebih lanjut atau konsultasi kebutuhan sistem Anda.
        </p>

        {/* CTA */}
        <Link 
          href={contactHref('other')}
          className="btn-primary hover:scale-[1.02] transition-all inline-flex group shadow-zinc-900/10 hover:shadow-2xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 text-sm font-medium text-zinc-900 rounded-full py-3 px-6 gap-3 items-center"
        >
          <span className="text-sm font-medium tracking-tight">Kirimkan rencana proyek Anda</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-12 opacity-60" />

      {projects.length > 0 ? (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Semua proyek
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {filteredProjects.map((project) => (
              <article 
                key={project.id}
                className="bg-white h-full flex flex-col hover:bg-zinc-50 transition-colors rounded-2xl overflow-hidden shadow-sm hover:shadow-lg group border-0"
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center p-8">
                  {project.logo && (
                    <Image
                      src={project.logo}
                      alt={project.title}
                      width={200}
                      height={100}
                      className="object-contain max-h-16 w-auto"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-zinc-900 group-hover:text-orange-500 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-zinc-50 rounded text-[10px] text-zinc-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-zinc-100">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-zinc-900 group-hover:text-orange-500 transition-colors"
                    >
                      Buka tautan proyek
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 px-4 mb-16">
          <p className="text-zinc-500 max-w-md mx-auto text-sm leading-relaxed">
            Daftar portofolio resmi sedang dalam tahap pendataan dan verifikasi. Silakan hubungi langsung untuk melihat sampel hasil kerja yang relevan.
          </p>
        </div>
      )}

      {/* CTA Section */}
      <section className="overflow-hidden shadow-zinc-900/30 bg-zinc-900 rounded-[2rem] relative shadow-2xl mb-8">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="flex flex-col items-center justify-center text-center px-6 py-12 md:px-12 md:py-14 relative">
          <h2 className="md:text-4xl lg:text-5xl leading-tight text-3xl font-normal text-white tracking-tight mb-6 max-w-2xl">
            Ingin membangun sistem atau aplikasi serupa?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg font-medium">
            Kirimkan gambaran fitur yang Anda butuhkan. Saya akan memberikan tanggapan lugas mengenai estimasi pengerjaan.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href={contactHref('other')}
              className="group flex items-center gap-3 bg-white hover:bg-zinc-100 transition-all text-zinc-900 text-sm font-medium rounded-full px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Hubungi saya untuk diskusi proyek</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
