import type { Metadata } from 'next'
import ClientProjectsPage from './client-page'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { productionUrl } from '@/lib/seo/config'

export interface ProjectItem {
  id: number
  title: string
  description: string
  logo: string
  tags: string[]
  link: string
  category: string
}

// Data proyek resmi (saat ini kosong menunggu data resmi dari pemilik)
export const projects: ProjectItem[] = []

const pageTitle = 'Portofolio Proyek'
const pageDescription =
  'Daftar proyek dan portofolio pengembangan website dan aplikasi oleh Wahyu Andika Putra.'

const pageGraph = buildPageGraph({
  path: '/projects',
  name: pageTitle,
  description: pageDescription,
  type: 'CollectionPage',
  breadcrumbs: [{ name: 'Projects', path: '/projects' }],
})

export const projectsStructuredData = {
  ...pageGraph,
  '@graph': [
    ...pageGraph['@graph'],
    {
      '@type': 'ItemList',
      '@id': `${productionUrl}/projects#projects`,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebSite',
          name: project.title,
          description: project.description,
          url: project.link,
        },
      })),
    },
  ],
}

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/projects',
  keywords: [
    'Portofolio pengembang',
    'Proyek website',
    'Aplikasi mobile',
    'Wahyu Andika Putra',
  ],
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsStructuredData} />
      <ClientProjectsPage />
    </>
  )
}
