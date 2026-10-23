import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page/hero'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { EnhancedCard } from '@/components/ui/enhanced-card'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

const pageTitle = 'Kebijakan Privasi'
const pageDescription =
  'Kebijakan privasi andikadev.com menjelaskan bagaimana data pribadi Anda dikumpulkan, digunakan, dan dilindungi saat mengakses situs ini.'
const path = '/kebijakan-privasi'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Kebijakan Privasi',
    'Perlindungan Data',
    'Privasi Pengguna',
    'Keamanan Informasi',
    'Andika Putra Dev',
  ],
})

const privacyStructuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  type: 'WebPage',
  breadcrumbs: [{ name: 'Kebijakan Privasi', path }],
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={privacyStructuredData} />
      <PageHero
        eyebrow={{ icon: <Shield className="w-4 h-4 text-orange-500" />, label: 'Informasi Hukum' }}
        title="Kebijakan Privasi"
      >
        <p>Cara saya mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p>
      </PageHero>

      <SectionWrapper variant="default" padding="large">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button asChild variant="outline" className="border-wp-navy/20 hover:bg-wp-navy/5 dark:border-wp-blue/20 dark:hover:bg-wp-blue/10">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            <p className="text-wp-navy/70 dark:text-muted-foreground text-sm">
              Terakhir diperbarui: 23 Oktober 2026
            </p>
          </div>

          <EnhancedCard variant="glass" className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-wp-navy dark:prose-headings:text-foreground prose-p:text-wp-navy/80 dark:prose-p:text-muted-foreground prose-a:text-wp-blue hover:prose-a:text-wp-blue/80 prose-strong:text-wp-navy dark:prose-strong:text-foreground prose-li:text-wp-navy/80 dark:prose-li:text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Di Andika Putra Dev (https://andikadev.com), saya berkomitmen menjaga kerahasiaan dan privasi data pengunjung situs serta klien saya.
                Dokumen Kebijakan Privasi ini menjelaskan jenis informasi yang dikumpulkan, bagaimana informasi tersebut digunakan, dan langkah yang diambil untuk melindunginya.
              </p>

              <h2>Informasi yang saya kumpulkan</h2>
              <p>Saya hanya mengumpulkan data yang relevan dan dibutuhkan untuk komunikasi serta pelaksanaan layanan:</p>
              <ul>
                <li>
                  <strong>Informasi kontak langsung:</strong> Ketika Anda mengisi formulir konsultasi atau menghubungi saya melalui email atau WhatsApp, saya menerima nama, alamat email, nomor telepon, dan rincian pesan kebutuhan proyek yang Anda sampaikan.
                </li>
                <li>
                  <strong>Data teknis kunjungan:</strong> Informasi umum yang secara standar dicatat oleh server web saat Anda mengakses situs, seperti alamat IP, jenis peramban, resolusi layar, halaman yang dibuka, serta durasi kunjungan untuk keperluan analitik performa.
                </li>
                <li>
                  <strong>Kuki (cookies):</strong> Situs ini dapat memanfaatkan kuki teknis untuk mengingat preferensi tampilan dan memastikan fungsi situs berjalan normal.
                </li>
              </ul>

              <h2>Tujuan penggunaan informasi</h2>
              <p>Informasi yang diterima digunakan secara terbatas untuk keperluan berikut:</p>
              <ul>
                <li>Merespons pertanyaan dan konsultasi proyek yang Anda ajukan.</li>
                <li>Menyusun penawaran teknis dan ruang lingkup kerja sama.</li>
                <li>Menjaga kestabilan, kecepatan, dan keamanan sistem situs web.</li>
                <li>Mencegah akses yang tidak sah dan mematuhi kewajiban hukum yang berlaku di Indonesia.</li>
              </ul>

              <h2>Keamanan data</h2>
              <p>
                Saya menerapkan langkah pengamanan teknis yang wajar untuk mencegah kebocoran, perubahan, atau akses tanpa izin terhadap data pribadi Anda.
                Meskipun demikian, transmisi data melalui internet tidak pernah dapat dijamin seratus persen aman, sehingga saya mengimbau Anda untuk tidak mengirimkan informasi rahasia yang tidak relevan dengan kebutuhan proyek.
              </p>

              <h2>Layanan pihak ketiga</h2>
              <p>
                Situs ini dapat menggunakan infrastruktur penyedia layanan pihak ketiga, seperti penyedia hosting, layanan pengiriman email transaksi, dan pemantau performa situs.
                Pihak ketiga tersebut hanya memproses data sesuai instruksi teknis yang dibutuhkan dan tidak berhak membagikan data Anda untuk kepentingan lain.
              </p>

              <h2>Hak Anda atas data pribadi</h2>
              <p>Anda berhak untuk:</p>
              <ul>
                <li>Menanyakan data pribadi apa saja milik Anda yang tersimpan di sistem saya.</li>
                <li>Meminta pembaruan atau perbaikan jika ada data yang keliru.</li>
                <li>Meminta penghapusan data kontak Anda setelah proses konsultasi selesai.</li>
              </ul>

              <h2>Perubahan kebijakan privasi</h2>
              <p>
                Kebijakan Privasi ini dapat diperbarui sewaktu waktu untuk menyesuaikan perkembangan teknis maupun regulasi hukum.
                Setiap pembaruan akan langsung dipublikasikan di halaman ini dengan tanggal pembaruan terbaru.
              </p>

              <h2>Kontak saya</h2>
              <p>
                Bila Anda memiliki pertanyaan mengenai kebijakan privasi ini atau pengelolaan data Anda, silakan hubungi saya melalui:
              </p>
              <p>
                Email:{' '}
                <a href="mailto:wahyuandikaputra.co.id@gmail.com" className="text-wp-blue hover:text-wp-blue/80">
                  wahyuandikaputra.co.id@gmail.com
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a href="https://wa.me/6287730139582" target="_blank" rel="noopener noreferrer" className="text-wp-blue hover:text-wp-blue/80">
                  +62 877-3013-9582
                </a>
              </p>

              <div className="mt-12 pt-8 border-t border-wp-navy/10 dark:border-wp-blue/20">
                <p className="text-wp-navy/60 dark:text-muted-foreground text-sm">
                  Dengan menggunakan situs ini, Anda menyatakan memahami dan menyetujui ketentuan yang tercantum dalam Kebijakan Privasi ini.
                </p>
              </div>
            </div>
          </EnhancedCard>

          <div className="mt-16 text-center">
            <Button asChild variant="wp-primary">
              <Link href="/kontak">
                Hubungi saya mengenai privasi data
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
