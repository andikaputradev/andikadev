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
  'Kebijakan privasi andikadev.com menjelaskan data yang dikumpulkan melalui formulir kontak, analitik performa, dan komitmen perlindungan data sesuai UU PDP Nomor 27 Tahun 2022.'
const path = '/kebijakan-privasi'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Kebijakan Privasi',
    'Perlindungan Data Pribadi',
    'UU PDP Nomor 27 Tahun 2022',
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
        <p>Prinsip pengumpulan, penggunaan, dan perlindungan data pribadi pengunjung situs.</p>
      </PageHero>

      <SectionWrapper variant="default" padding="large">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-wp-navy/20 hover:bg-wp-navy/5 dark:border-wp-blue/20 dark:hover:bg-wp-blue/10"
            >
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
                Di Andika Putra Dev (https://andikadev.com), saya berkomitmen menjaga kerahasiaan dan privasi data pengunjung situs serta calon klien.
                Dokumen ini merinci jenis data yang dikumpulkan secara nyata di situs ini, cara penggunaannya, serta hak Anda sebagai subjek data.
              </p>

              <h2>Data yang benar-benar dikumpulkan</h2>
              <p>Situs ini membatasi pengumpulan data hanya pada hal yang diperlukan untuk fungsi situs dan komunikasi kerja sama:</p>
              <ul>
                <li>
                  <strong>Formulir kontak langsung:</strong> Ketika Anda mengirim pesan melalui formulir di halaman kontak, sistem menerima nama lengkap, alamat email, kategori layanan yang dipilih, dan teks pesan kebutuhan Anda. Data ini semata-mata digunakan untuk membalas konsultasi teknis dan menyusun rencana kerja.
                </li>
                <li>
                  <strong>Analitik performa tanpa data pribadi (Vercel Analytics dan Speed Insights):</strong> Situs ini menggunakan modul analitik dari Vercel untuk memantau metrik performa teknis (Core Web Vitals, waktu respons server, jenis peramban, dan sistem operasi). Pengukuran ini berjalan tanpa melacak profil individu, tanpa kuki pelacak lintas situs, dan tanpa menyimpan alamat IP pribadi pengunjung.
                </li>
              </ul>

              <h2>Pemroses data pihak ketiga</h2>
              <p>
                Saya bekerja sama dengan penyedia infrastruktur pihak ketiga yang bertindak sebagai pemroses data teknis:
              </p>
              <ul>
                <li>
                  <strong>Resend:</strong> Penyedia layanan pengiriman email yang memproses penerusan isi formulir kontak dari server situs ke alamat email pengembang. Resend beroperasi dengan enkripsi standar industri dan tidak menggunakan data Anda untuk tujuan pemasaran mereka.
                </li>
                <li>
                  <strong>Vercel Inc.:</strong> Penyedia infrastruktur serverless hosting yang menyajikan aset situs web dan menjalankan server actions dengan standar keamanan modern.
                </li>
              </ul>

              <h2>Tujuan pemrosesan data</h2>
              <p>Data yang diterima diproses secara terbatas untuk:</p>
              <ul>
                <li>Menjawab pertanyaan, mengevaluasi spesifikasi teknis, dan memberikan penawaran lingkup kerja proyek.</li>
                <li>Menjalin komunikasi langsung melalui email atau WhatsApp resmi setelah adanya permintaan dari pihak Anda.</li>
                <li>Memantau keandalan teknis sistem dan mencegah penyalahgunaan formulir (seperti serangan bot spam).</li>
              </ul>

              <h2>Rujukan Undang-Undang Perlindungan Data Pribadi (UU PDP)</h2>
              <p>
                Pengelolaan data pribadi di situs ini mengacu pada prinsip dasar Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP).
                Sesuai ketentuan UU PDP, Anda sebagai subjek data pribadi memiliki hak untuk:
              </p>
              <ul>
                <li>Mendapatkan kejelasan mengenai identitas pihak yang memproses data pribadi Anda.</li>
                <li>Meminta informasi mengenai data pribadi Anda yang tersimpan di sistem saya.</li>
                <li>Meminta pembaruan atau perbaikan apabila terdapat kekeliruan data kontak Anda.</li>
                <li>Meminta penghapusan atau pemusnahan riwayat kontak email Anda dari sistem penyimpanan saya setelah komunikasi atau proyek selesai.</li>
              </ul>
              <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
                <p className="font-semibold">Catatan penting tinjauan hukum:</p>
                <p className="mt-1">
                  Rujukan pada bagian ini disusun berdasarkan prinsip umum UU PDP Nomor 27 Tahun 2022 dan perlu ditinjau kembali secara berkala oleh pemilik situs atau penasihat hukum resmi sesuai regulasi turunan dan kebutuhan operasional yang berlaku.
                </p>
              </div>

              <h2>Keamanan data dan pencatatan (logging)</h2>
              <p>
                Saya menerapkan praktik rekayasa perangkat lunak defensif untuk melindungi data:
              </p>
              <ul>
                <li>Isi pesan formulir dan alamat email pribadi tidak dicatat ke dalam log publik server maupun konsol aplikasi.</li>
                <li>Formulir dilengkapi sistem proteksi honeypot untuk menyaring pengiriman otomatis oleh bot jahat.</li>
                <li>Komunikasi web dilindungi oleh protokol enkripsi HTTPS (Transport Layer Security).</li>
              </ul>

              <h2>Kontak pengelola data</h2>
              <p>
                Bila Anda ingin memperbarui data atau meminta penghapusan pesan yang pernah Anda kirimkan, silakan hubungi saya melalui saluran resmi:
              </p>
              <ul>
                <li>
                  Email:{' '}
                  <a href="mailto:wahyuandikaputra.co.id@gmail.com" className="text-wp-blue hover:text-wp-blue/80">
                    wahyuandikaputra.co.id@gmail.com
                  </a>
                </li>
                <li>
                  WhatsApp:{' '}
                  <a
                    href="https://wa.me/6287730139582"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wp-blue hover:text-wp-blue/80"
                  >
                    +62 877-3013-9582
                  </a>
                </li>
              </ul>
            </div>
          </EnhancedCard>

          <div className="mt-16 text-center">
            <Button asChild variant="wp-primary">
              <Link href="/kontak">Hubungi saya untuk konsultasi proyek</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
