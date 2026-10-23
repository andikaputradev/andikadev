import type { Metadata } from 'next'
import { Code2, CheckCircle2, Cpu, Layers, TestTube, AlertOctagon } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { Faq } from '@/components/page/faq'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/web3-blockchain'
const pageTitle = 'Pengembangan Web3 dan Smart Contract'
const pageDescription =
  'Layanan pengembangan smart contract Solidity, pengujian kode terdesentralisasi, integrasi dApp, dan tinjauan keamanan awal yang aman.'

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Bahasa dan kakas apa yang digunakan dalam pengembangan smart contract?',
    answer:
      'Pengembangan smart contract menggunakan Solidity, dengan pengujian dan kakas seperti Hardhat atau Foundry sesuai kebutuhan proyek.',
  },
  {
    question: 'Apakah tinjauan keamanan awal sama dengan audit formal?',
    answer:
      'Tidak. Tinjauan keamanan awal adalah langkah pemeriksaan mandiri untuk mendeteksi kelemahan logika dasar. Untuk protokol berskala besar dengan dana publik tinggi, saya tetap menyarankan audit independen dari firma audit keamanan khusus.',
  },
  {
    question: 'Bagaimana jika kontrak pintar sudah terlanjur dideploy ke mainnet?',
    answer:
      'Kode kontrak di jaringan blockchain bersifat tidak dapat diubah (immutable). Oleh karena itu, pengujian menyeluruh di lingkungan lokal dan testnet wajib diselesaikan sebelum deployment produksi.',
  },
  {
    question: 'Apakah Anda melayani konsultasi harga atau strategi investasi token?',
    answer:
      'Tidak. Layanan ini murni berfokus pada rekayasa perangkat lunak dan arsitektur teknis Web3. Saya tidak melayani konsultasi spekulasi finansial, pergerakan harga pasar, atau janji imbal hasil investasi.',
  },
  {
    question: 'Apakah antarmuka web dapat langsung terhubung ke dompet pengguna?',
    answer:
      'Ya. Saya mengintegrasikan dApp dengan penyedia koneksi dompet Web3 modern sehingga pengguna dapat berinteraksi langsung dengan kontrak pintar secara transparan.',
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Pengembangan Web3',
    'Smart Contract Solidity',
    'Integrasi dApp',
    'Audit Smart Contract Awal',
    'Developer Blockchain Jawa Tengah',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [
    { name: 'Layanan', path: '/layanan' },
    { name: 'Web3 dan Blockchain', path },
  ],
  faqs: faqs.map(({ question, answer }) => ({ question, answer })),
})

const outcomes = [
  {
    icon: Cpu,
    title: 'Kontrak pintar teruji',
    description: 'Logika smart contract yang dirancang dengan kontrol akses ketat, pengujian matematis, dan efisiensi konsumsi gas.',
  },
  {
    icon: Layers,
    title: 'Integrasi dApp interaktif',
    description: 'Antarmuka web modern yang terhubung langsung dengan dompet Web3 pengguna dan node jaringan blockchain.',
  },
  {
    icon: TestTube,
    title: 'Tinjauan keamanan awal',
    description: 'Pemeriksaan mandiri terhadap potensi kerentanan kode dasar seperti reentrancy dan hak akses sebelum kontrak diluncurkan.',
  },
]

const scopes = [
  {
    title: 'Pengembangan smart contract (Solidity)',
    description: 'Penulisan kontrak pintar terstruktur untuk token standar (ERC-20, ERC-721, ERC-1155), sistem voting, atau logika bisnis terdesentralisasi.',
  },
  {
    title: 'Pengujian menyeluruh (testing suite)',
    description: 'Menjalankan uji unit fungsional (unit testing), uji acak parameter masukan (fuzz testing), dan uji invarian (invariant testing).',
  },
  {
    title: 'Integrasi antarmuka dApp',
    description: 'Menghubungkan aplikasi web ke kontrak pintar melalui penyedia koneksi dompet dan panggilan RPC yang stabil.',
  },
  {
    title: 'Tinjauan keamanan kode awal',
    description: 'Pemeriksaan mandiri pada kode sumber untuk menyaring potensi kesalahan logika umum sebelum deployment ke testnet dan mainnet.',
  },
]

const riskDisclosures = [
  'Kontrak yang telah dideploy ke jaringan rantai blok (mainnet) bersifat permanen dan sangat sulit diubah (immutable), sehingga seluruh logika wajib diuji tuntas sebelum peluncuran.',
  'Tinjauan keamanan awal berfungsi sebagai langkah pencegahan mandiri internal. Klien tetap disarankan menjadwalkan audit independen resmi dari firma audit khusus sebelum peluncuran protokol berskala besar.',
  'Protokol terdesentralisasi memiliki risiko ekonomi dan tata kelola yang bergantung pada dinamika interaksi pengguna di luar jangkauan kode program.',
  'Saya tidak menyediakan nasihat investasi, tidak memberikan rekomendasi finansial, tidak menjanjikan keuntungan, dan tidak menyediakan layanan rekayasa harga token.',
]

const workflowSteps = [
  {
    number: '01',
    title: 'Perancangan logika kontrak',
    description: 'Mendiskusikan aturan bisnis, batasan hak akses admin, dan alur transaksi pengguna.',
  },
  {
    number: '02',
    title: 'Pengkodean dan pengujian',
    description: 'Menulis kontrak pintar Solidity serta menjalankan uji unit, fuzzing, dan verifikasi invariant.',
  },
  {
    number: '03',
    title: 'Deployment ke testnet',
    description: 'Menerbitkan kontrak ke jaringan uji coba publik dan menghubungkannya dengan antarmuka dApp.',
  },
  {
    number: '04',
    title: 'Tinjauan awal dan rilis',
    description: 'Melakukan evaluasi akhir, penyerahan kode terverifikasi di penjelajah blok, dan dokumentasi integrasi.',
  },
]

export default function Web3ServicePage() {
  const whatsappUrl =
    'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pengembangan%20Web3%20dan%20smart%20contract.'

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={{ icon: <Code2 className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Pengembangan Web3 dan Smart Contract"
        accent="Solidity, Pengujian Ketat, dan Integrasi dApp"
      >
        <p>{pageDescription}</p>
      </PageHero>

      {/* Ringkasan Hasil Bagi Klien */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Hasil rekayasa terstruktur untuk ekosistem terdesentralisasi
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Menghadirkan arsitektur kontrak pintar yang aman, hemat gas, dan terintegrasi dengan antarmuka pengguna yang responsif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outcomes.map((item) => (
            <div key={item.title} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ruang Lingkup Layanan */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Ruang lingkup pengembangan Web3
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Layanan teknis dari penulisan kontrak cerdas hingga penyambungan antarmuka aplikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scopes.map((scope) => (
            <div key={scope.title} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60">
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{scope.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{scope.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pengungkapan Risiko Wajib */}
      <section className="mb-16">
        <div className="bg-amber-50/60 rounded-2xl p-8 border border-amber-200/80 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Pengungkapan risiko dan batasan tanggung jawab</h2>
          </div>
          <p className="text-sm text-zinc-700 mb-6 leading-relaxed">
            Pengembangan teknologi blockchain melibatkan karakteristik teknis khusus yang wajib dipahami bersama:
          </p>
          <ul className="space-y-3">
            {riskDisclosures.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Alur pengembangan smart contract
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Tahapan cermat sebelum kontrak diterbitkan ke lingkungan jaringan terdesentralisasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div key={step.number} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/60 shadow-sm">
              <span className="text-xs font-mono font-semibold text-zinc-400 block mb-3">{step.number}</span>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Terlihat */}
      <Faq id="faq-web3" title="Pertanyaan seputar pengembangan Web3" faqs={faqs} />

      {/* CTA Band Khusus */}
      <CtaBand
        title="Ingin membangun arsitektur Web3 yang aman?"
        body="Diskusikan konsep kontrak pintar dan kebutuhan sistem terdesentralisasi Anda tanpa janji spekulasi finansial."
        primary={{
          href: whatsappUrl,
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('web3'),
          label: 'Isi formulir kontak',
        }}
      />
    </>
  )
}
