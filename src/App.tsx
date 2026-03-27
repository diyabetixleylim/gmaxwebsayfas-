/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  Users, 
  MessageSquare, 
  MapPin, 
  Heart, 
  Bell, 
  ShieldCheck, 
  Menu, 
  X,
  ArrowRight,
  Smartphone,
  Stethoscope,
  Utensils,
  Share2,
  Code2,
  Cpu,
  Database,
  Globe,
  Zap,
  Terminal,
  ChevronDown,
  ChevronUp,
  Languages,
  Lock,
  Eye,
  LayoutDashboard,
  HandHelping,
  AlertCircle,
  User,
  Sparkles,
  Command,
  Fingerprint,
  Battery,
  ArrowUpRight,
  Settings,
  Mail,
  Instagram
} from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

type Language = "TR" | "EN";

const translations = {
  TR: {
    nav: ["Platform", "Teknoloji", "Mimari", "API"],
    hero: {
      tag: "GELECEĞİN ÇEKİRDEĞİ ŞEKİLLENİYOR",
      title: "Görünmez",
      subtitle: "Metabolik Zeka.",
      desc: "GmaX, biyolojinizi bir veri akışı gibi işleyen, sessiz ve kusursuz bir işletim sistemidir. Çok yakında, insan potansiyelini yeniden tanımlayan bu otonom mimari burada olacak.",
      cta: "Bekleme Listesine Katıl",
      comingSoon: "Uygulama Çok Yakında Burada",
      version: "v2.5.0-beta.hazırlık"
    },
    stats: {
      glucose: "Glikoz_Akışı",
      insulin: "İnsülin_Yükü",
      metabolic: "Metabolik_Verimlilik",
      optimal: "Kusursuz",
      live: "SİSTEM_HAZIRLANIYOR"
    },
    features: {
      title: "Biyolojik Verinin",
      subtitle: "Sessiz Devrimi.",
      desc: "GmaX, biyometrik verilerinizin derinliklerindeki görünmez desenleri çözen, otonom bir mimari üzerine inşa edilmiştir. Geleceğin çekirdeğini oluşturan bu mimari, insan biyolojisini bir veri disiplini olarak yeniden tanımlıyor.",
      analytics: "Derin Öngörü",
      analyticsDesc: "Hücresel düzeydeki değişimleri milisaniyelik hassasiyetle takip eden algoritmalarımız, biyolojik trendlerinizi henüz gerçekleşmeden sessizce öngörür.",
      ai: "Gubi: Otonom Gözlemci",
      aiDesc: "Sizi sizden daha iyi tanıyan bir zeka. Gubi, karmaşık metabolik verileri anlamlı ve uygulanabilir stratejik içgörülere dönüştüren sessiz bir rehberdir.",
      nutrition: "Mol-Sim",
      nutritionDesc: "Beslenmeyi bir mühendislik disiplinine dönüştürüyoruz. Her biyokimyasal etkileşimi simüle eden, veriye dayalı kusursuz bir modelleme.",
      community: "Vizyoner Ekosistem",
      communityDesc: "Veri ve deneyimin en yüksek gizlilik standartlarında paylaşıldığı, seçkin ve kapalı devre bir teknoloji ağı.",
      security: "Kriptografik Mühür",
      securityDesc: "Verileriniz askeri düzeyde AES-256 ile mühürlenir. Gizlilik, GmaX mimarisinin sarsılmaz temel taşıdır.",
      geo: "Lojistik Senkronizasyon",
      geoDesc: "Kritik anlarda en yakın destek ve veri noktalarını otonom olarak belirleyen, coğrafi sınırlardan bağımsız akıllı ağ."
    },
    api: {
      title: "Sınırsız",
      subtitle: "Dijital Senkronizasyon.",
      desc: "GmaX API, biyolojik verilerinizi dijital evrenin geri kalanıyla kusursuz bir şekilde birleştirir. Geliştiriciler için otonom ve gizemli bir dünya."
    },
    architecture: {
      title: "Kusursuz Mimari.",
      desc: "GmaX, sarsılmaz bir güven ve yüksek performans üzerine kurulu, görünmez bir teknolojik altyapıdır.",
      items: [
        { title: "Uçtan Uca Kripto", desc: "Verileriniz TLS 1.3 ve AES-256 katmanları arasında mutlak bir gizlilikle korunur." },
        { title: "Otonom Bulut", desc: "Kendi kendini onaran ve optimize eden mikroservisler ile kesintisiz süreklilik." },
        { title: "Küresel Güven", desc: "GDPR ve KVKK standartlarının ötesinde, mutlak veri egemenliği protokolleri." },
        { title: "Işık Hızında Veri", desc: "Veri, biyolojik düşünceden daha hızlı akar. Milisaniyelik gecikme toleransı." }
      ]
    },
    footer: {
      desc: "İnsan potansiyelini teknoloji ile genişletiyoruz. Görünmez, ölçeklenebilir ve mutlak güven üzerine kurulu bir gelecek.",
      status: "SİSTEM_DURUMU: HAZIRLANIYOR"
    },
    modal: {
      title: "Geleceğe İlk Adım",
      desc: "GmaX uygulaması çok yakında yayına girecek. Bekleme listesine katılarak öncelikli erişim hakkı kazanın.",
      emailLabel: "E-posta Adresiniz",
      submit: "Listeye Kaydol",
      success: "Kaydınız başarıyla alındı. Gelişmelerden sizi haberdar edeceğiz.",
      footer: "GmaX CORE TECHNOLOGIES © 2026"
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const t = translations.TR;

  const gubiImage = "https://i.imgur.com/ciDonip.jpeg"; // Updated Gubi image URL
  const gmaxLogo = "https://i.imgur.com/m1YFCzN.jpeg";

  // Gubi AI Log Simulation
  useEffect(() => {
    const logs = [
      "[14:43:02] Biyometrik desen analizi başlatıldı...",
      "\"Sistem çekirdeği optimize ediliyor. Gubi devrede.\"",
      "[14:43:45] Derin Öngörü Motoru: Aktif.",
      "[14:44:10] Metabolik sapma tespiti %99.9 hassasiyet.",
      "\"GmaX Core: Gelecek verisi şimdiki zamana işleniyor.\"",
      "[14:45:00] Kriptografik mühürler mühürlendi."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setAiLogs(prev => [...prev.slice(-4), logs[i]]);
      i = (i + 1) % logs.length;
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCtaClick = () => {
    const sagaSection = document.getElementById('saga');
    if (sagaSection) {
      sagaSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast.info("Gubi Protokolü başlatıldı. Hikaye aşağıda!");
  };

  const handleWaitlistClick = () => {
    setModalStep(marvelNarrative.length);
    setIsModalOpen(true);
  };

  const nextModalStep = () => setModalStep(prev => prev + 1);
  const prevModalStep = () => setModalStep(prev => Math.max(0, prev - 1));

  const handleDocumentationClick = (feature: string) => {
    toast.success(`${feature} detayları yakında paylaşılacak.`);
  };

  const features = [
    {
      icon: <Activity className="w-6 h-6 text-cyan-600" />,
      title: "DERİN ÖNGÖRÜ",
      description: "Gelecekteki metabolik değişimleri 45 dakika önceden milisaniyelik hassasiyetle öngörüyoruz. Gubi, biyometrik verilerini analiz ederek potansiyel riskleri henüz oluşmadan tespit eder.",
      details: "GmaX'in Derin Öngörü Motoru, sürekli glikoz izleme (CGM) verilerini, kalp hızı değişkenliğini (HRV) ve uyku mimarisini çapraz referanslayarak çalışır. Gubi, bu devasa veri setinde insan gözünün kaçıracağı mikro-desenleri yakalar. Örneğin, kan şekerinin 45 dakika içinde düşebileceği veya yükselebileceği uyarısını vererek seni proaktif olarak uyarır. Bu sadece bir tahmin değil, biyolojik bir simülasyondur.",
      tag: "FORESIGHT"
    },
    {
      icon: <img src={gubiImage} alt="Gubi" className="w-8 h-8 rounded-lg object-cover" />,
      title: "OTONOM METABOLİK ZEKA",
      description: "Gubi, senin biyolojik ikizini dijital ortamda oluşturur. Bu zeka, sadece veri toplamakla kalmaz, aynı zamanda bu verileri anlamlandırarak yaşam tarzına özel stratejiler geliştirir.",
      details: "Gubi, senin 'Metabolik İmzun'u çıkarır. Her bireyin kafeine, karbonhidrata veya egzersize verdiği yanıt farklıdır. Gubi, bu yanıtları öğrenerek sana 'şimdi ne yapman gerektiğini' fısıldar. 'Görünmez' bir asistan gibi, sen farkında bile olmadan metabolizmanı dengelemek için arka planda binlerce senaryoyu test eder ve en güvenli yolu seçer.",
      tag: "AI"
    },
    {
      icon: <Database className="w-6 h-6 text-cyan-600" />,
      title: "MOL-SİM",
      description: "Besinlerin hücresel düzeydeki etkilerini simüle ediyoruz. Gubi, tükettiğin her gıdanın biyokimyasal yanıtını önceden hesaplayarak sana en uygun rotayı çizer.",
      details: "Beslenme modülü, aldığın karbonhidrat miktarını kaydetmeni sağlar. Şu an verileri elle girerek Gubi'nin analizini görebilirsin. Çok yakında kamera ve barkod sistemi ile gıdaları anında tanıma özelliği de eklenecek. Gubi, bu verileri kullanarak senin spesifik biyokimyana göre önerilen insülin dozajını hesaplar ve glikoz yükselişini saniyeler içinde modelleyerek stratejik tavsiyeler sunar.",
      tag: "DATA"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-600" />,
      title: "KRİPTOGRAFİK GÜVENLİK",
      description: "Biyometrik verilerin, askeri düzeyde AES-256 şifreleme ve TLS 1.3 protokolleri ile korunur. Gubi, verilerinin gizliliğini sarsılmaz bir kale gibi savunur.",
      details: "GmaX mimarisinde verileriniz 'Zero-Knowledge' prensibiyle saklanır. Yani verilerinize sizden başka kimse, hatta biz bile erişemeyiz. Gubi, bu verileri yerel cihazında işleyerek buluta sadece anonimleştirilmiş ve şifrelenmiş özetler gönderir. Biyolojik verileriniz, dijital dünyadaki en değerli varlığınızdır ve biz onları sarsılmaz bir sadakatle koruyoruz.",
      tag: "SECURITY"
    }
  ];

  const systemModules = [
    {
      icon: <LayoutDashboard className="w-5 h-5 text-cyan-600" />,
      title: "Anasayfa Modülü",
      desc: "Anlık kan şekeri verileri, yapay zeka analizleri ve ilaç hatırlatıcılarının yer aldığı ana kontrol paneli."
    },
    {
      icon: <Utensils className="w-5 h-5 text-cyan-600" />,
      title: "Beslenme Takip Modülü",
      desc: "Karbonhidrat kaydı ve kişiselleştirilmiş insülin dozaj önerileri sunan beslenme asistanı."
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-600" />,
      title: "Topluluk Modülü",
      desc: "Diyabet hastalarının deneyimlerini paylaştığı ve iletişim kurduğu sosyal etkileşim alanı."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-cyan-600" />,
      title: "Açık İnsülin Modülü",
      desc: "Diyabet ile ilgili bilgilendirici içeriklerin ve deneyim paylaşımlarının bulunduğu forum alanı."
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-cyan-600" />,
      title: "Doktor İletişim Modülü",
      desc: "Sağlık uzmanları ile doğrudan ve güvenli iletişim kurmanızı sağlayan köprü."
    },
    {
      icon: <HandHelping className="w-5 h-5 text-cyan-600" />,
      title: "Askıda Malzeme Modülü",
      desc: "İhtiyaç sahibi diyabet hastalarına medikal malzeme desteği sağlama platformu."
    },
    {
      icon: <Share2 className="w-5 h-5 text-cyan-600" />,
      title: "Tarifler Modülü",
      desc: "Diyabet dostu tariflerin paylaşıldığı ve keşfedildiği özel mutfak alanı."
    },
    {
      icon: <MapPin className="w-5 h-5 text-cyan-600" />,
      title: "Harita Modülü",
      desc: "Yakın çevredeki sağlık merkezleri, eczaneler ve güvenli buluşma noktalarının takibi."
    },
    {
      icon: <Heart className="w-5 h-5 text-cyan-600" />,
      title: "Duygu Kavanozu Modülü",
      desc: "Günlük duygusal durumların kaydedildiği ve psikolojik sağlığın izlendiği alan."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-cyan-600" />,
      title: "Acil İnsülin Modülü",
      desc: "Acil durumlarda en yakın destek noktalarına veya kişilere hızlı erişim sistemi."
    },
    {
      icon: <Bell className="w-5 h-5 text-cyan-600" />,
      title: "Bildirim Sistemi",
      desc: "Riskli durumlar ve kritik sağlık verileri için otomatik akıllı uyarılar."
    },
    {
      icon: <User className="w-5 h-5 text-cyan-600" />,
      title: "Kullanıcı Profil Sistemi",
      desc: "Hastalık geçmişi, alerjiler ve ilaç bilgilerinin yer aldığı kişisel sağlık arşivi."
    }
  ];

  const marvelNarrative = [
    {
      title: "SELAM, BEN GUBI!",
      desc: "GmaX evrenine hoş geldin! Ben senin otonom metabolik rehberinim. Senin biyolojik verilerini bir süper kahraman gibi korumak ve yönetmek için buradayım. Bu yolculuk sadece kodlarla değil, gerçek bir hayat hikayesiyle başladı.",
      image: gubiImage,
      action: "Hikayeyi Başlat",
      reaction: "HELLO!",
      badge1: "GMA!",
      badge2: "GMAX!"
    },
    {
      title: "BİR KAHRAMANIN DOĞUŞU",
      desc: "Her şey bir mücadeleyle başladı. Kurucularımızdan biri, yıllardır Tip-1 diyabetin iniş çıkışlı yollarında yürüyen bir savaşçıydı. Her gün binlerce karar, bitmek bilmeyen hesaplamalar... GmaX, bu yorgunluğa son vermek için doğan bir umut ışığı oldu.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Devam Et",
      reaction: "VROOOM!",
      badge1: "BOOM!",
      badge2: "CRASH!"
    },
    {
      title: "DİYABETLE BARIŞMAK",
      desc: "O artık diyabetiyle savaşmıyor, onunla tam bir uyum içinde dans ediyor. GmaX'in sağladığı öngörü ve huzurla, diyabet artık hayatının merkezinde bir engel değil, sadece arka planda çalışan bir veri seti. Biz bu özgürlüğü seninle paylaşmaya geldik.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Güçlerimi Gör",
      reaction: "DANCE!",
      badge1: "SWISH!",
      badge2: "FLOW!"
    },
    {
      title: "45 DAKİKALIK ÖNGÖRÜ",
      desc: "Geleceği görmeye hazır mısın? Derin analiz motorumla kan şekerinin 45 dakika sonraki halini biliyorum. 'Acaba düşecek miyim?' endişesine son veriyorum. Ben senin için geleceği tarıyor ve seni her türlü sürprize karşı uyarıyorum.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Beslenme Analizi",
      reaction: "SCAN!",
      badge1: "WHIZ!",
      badge2: "BEEP!"
    },
    {
      title: "BESLENME SİMÜLASYONU",
      desc: "Yediğin her lokmanın vücudunda nasıl bir fırtına koparacağını önceden simüle ediyorum. Şimdilik verileri elle giriyoruz ama çok yakında kameramla her şeyi bir bakışta tanıyacağım. Hangi yemeğin sana ne yapacağını bilmek, en büyük süper gücün olacak.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Ekosistemi Keşfet",
      reaction: "YUM!",
      badge1: "CRUNCH!",
      badge2: "SİM!"
    },
    {
      title: "GmaX ORDUSU",
      desc: "Bu yolculukta asla yalnız değilsin. Topluluktan uzman doktorlara, acil durum protokollerinden duygu durum takibine kadar 12+ modüllük devasa bir ekosistem, senin her anında arkanda sarsılmaz bir ordu gibi duruyor.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Güvenlik Mührü",
      reaction: "UNIT!",
      badge1: "TEAM!",
      badge2: "WIN!"
    },
    {
      title: "KRİPTOGRAFİK KALE",
      desc: "Verilerin askeri düzeyde AES-256 şifreleme ile korunuyor. Senin biyolojik verilerin, senin en mahrem kalendir ve ben o kalenin sarsılmaz muhafızıyım. Gizliliğin, benim en kutsal görevim.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Bize Katıl",
      reaction: "LOCK!",
      badge1: "SAFE!",
      badge2: "SEC!"
    },
    {
      title: "SENİ DE BEKLİYORUZ!",
      desc: "GmaX devriminde yerini al. Metabolik özgürlüğüne giden bu yolculukta seni de aramızda görmek istiyoruz! Birlikte, diyabeti bir engel olmaktan çıkarıp bir yaşam tarzına dönüştüreceğiz.",
      image: "https://i.imgur.com/VXJPAMV.jpeg",
      action: "Listeye Kaydol",
      reaction: "JOIN!",
      badge1: "GO!",
      badge2: "NOW!"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-500/20 grid-bg scroll-smooth relative">
      <div className="page-bg" />
      <Toaster position="top-center" richColors />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .page-bg {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: url('https://i.imgur.com/m1YFCzN.jpeg');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.08;
          pointer-events: none;
          z-index: -50;
          animation: slow-rotate 120s linear infinite;
        }
        @keyframes slow-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .comic-panel {
          position: relative;
          background: white;
          border: 4px solid #0f172a;
          box-shadow: 8px 8px 0 #0f172a;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .comic-panel:hover {
          transform: translate(-4px, -4px);
          box-shadow: 12px 12px 0 #0891b2;
        }
        .halftone {
          background-image: radial-gradient(#0f172a 1px, transparent 1px);
          background-size: 4px 4px;
          opacity: 0.05;
        }
        .speech-bubble {
          position: relative;
          background: white;
          border: 3px solid #0f172a;
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          filter: drop-shadow(4px 4px 0 #0f172a);
        }
        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 20px;
          border-width: 12px 12px 0 0;
          border-style: solid;
          border-color: #0f172a transparent transparent transparent;
        }
        .speech-bubble-inner {
          position: relative;
          z-index: 1;
        }
        .comic-title {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          -webkit-text-stroke: 1px #0f172a;
        }
      `}} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-4xl font-black tracking-tighter text-slate-900 font-mono italic">
                GmaX
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {t.nav.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative flex items-center justify-center px-6 py-2 group"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-cyan-500/15 group-hover:text-cyan-500/30 transition-all duration-500 pointer-events-none">
                    <Fingerprint className="w-10 h-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                  </div>
                  <span className="relative z-10 text-[10px] font-bold text-slate-500 group-hover:text-cyan-600 transition-colors tracking-widest uppercase">
                    {item}
                  </span>
                </a>
              ))}
              <button 
                onClick={handleCtaClick}
                className="relative flex items-center justify-center px-6 py-2 group"
              >
                <div className="absolute inset-0 flex items-center justify-center text-cyan-500/15 group-hover:text-cyan-500/30 transition-all duration-500 pointer-events-none">
                  <Fingerprint className="w-10 h-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                </div>
                <span className="relative z-10 text-[10px] font-black text-cyan-600 group-hover:text-cyan-700 transition-colors tracking-[0.2em] uppercase italic">
                  GmaX SAGA
                </span>
              </button>

              <button 
                onClick={handleCtaClick}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-slate-200 active:scale-95 uppercase tracking-wider flex items-center gap-2"
              >
                <Command className="w-3 h-3" />
                Başla
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 px-4 py-8 flex flex-col gap-6 overflow-hidden"
            >
              {t.nav.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative flex items-center justify-between p-4 group overflow-hidden rounded-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/15 group-hover:text-cyan-500/25 transition-colors pointer-events-none">
                    <Fingerprint className="w-16 h-16 rotate-12" />
                  </div>
                  <span className="relative z-10 text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-cyan-600 transition-colors">
                    {item}
                  </span>
                </a>
              ))}
              <button 
                onClick={() => {
                  handleCtaClick();
                  setIsMenuOpen(false);
                }}
                className="relative flex items-center justify-between p-4 group overflow-hidden rounded-2xl"
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/15 group-hover:text-cyan-500/25 transition-colors pointer-events-none">
                  <Fingerprint className="w-16 h-16 -rotate-12" />
                </div>
                <span className="relative z-10 text-xs font-black text-cyan-600 uppercase tracking-[0.2em] italic group-hover:text-cyan-700 transition-colors">
                  GmaX SAGA: HİKAYEYİ GÖR
                </span>
              </button>
              <button 
                onClick={handleCtaClick}
                className="bg-cyan-600 text-white px-6 py-4 rounded-xl text-center font-bold uppercase tracking-widest"
              >
                Başla
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="platform" className="pt-32 pb-16 lg:pt-56 lg:pb-32 relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden z-[-1]">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: 360
            }}
            transition={{ 
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 300, repeat: Infinity, ease: "linear" }
            }}
            src={gmaxLogo} 
            alt="GmaX Background Logo" 
            className="w-[600px] sm:w-[1200px] h-[600px] sm:h-[1200px] object-contain mx-auto filter brightness-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-8 sm:mb-12">
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-[2rem] sm:rounded-[3rem] bg-white p-2 sm:p-3 shadow-2xl shadow-cyan-500/30 border border-slate-100 overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src="https://i.imgur.com/m1YFCzN.jpeg" 
                    alt="GmaX Core" 
                    className="w-full h-full object-cover rounded-[1.5rem] sm:rounded-[2.5rem] shadow-inner"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-cyan-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
                <Sparkles className="w-3 h-3 fill-current" />
                {t.hero.tag}
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-slate-900 leading-[1.1] sm:leading-[1] mb-8 tracking-tighter">
                {t.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">{t.hero.subtitle}</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4">
                {t.hero.desc}
              </p>
              <div className="flex flex-col sm:row gap-6 justify-center items-center">
                <div className="relative group">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 border-2 border-slate-900 px-3 py-1 font-black text-[10px] uppercase italic tracking-widest shadow-[3px_3px_0_rgba(0,0,0,1)] animate-bounce">
                    HİKAYEMİZ BURADA!
                  </div>
                  <button 
                    onClick={handleCtaClick}
                    className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-cyan-600 transition-all shadow-2xl shadow-slate-300 flex items-center gap-3 group uppercase tracking-widest border-b-4 border-slate-700"
                  >
                    GmaX SAGA'YI BAŞLAT
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="relative max-w-6xl mx-auto">
              {/* Ambient Glow behind the interface */}
              <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="relative overflow-visible">
                {/* Futuristic Frame Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-cyan-500/30 rounded-tl-3xl z-30"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-cyan-500/30 rounded-br-3xl z-30"></div>
                
                <div className="grid lg:grid-cols-12 gap-8 relative z-20">
                  {/* Gubi Hologram Interface */}
                  <div className="lg:col-span-12">
                    <div className="relative w-full aspect-[3/4] sm:aspect-video lg:aspect-[21/9] flex flex-col lg:items-center lg:justify-center overflow-hidden p-4 sm:p-20 rounded-3xl sm:rounded-[4rem] bg-slate-950 border-x-4 sm:border-x-8 border-slate-900 shadow-[0_0_150px_rgba(6,182,212,0.2)] group">
                      {/* Background Grid & Neural Network Effect */}
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #22d3ee 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
                      
                      {/* GUBI Watermark */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <span className="text-[30vw] lg:text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase select-none">GUBI</span>
                      </div>
                      
                      {/* Scanning Laser Beam */}
                      <motion.div 
                        animate={{ left: ["-10%", "110%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent skew-x-12 z-10"
                      ></motion.div>

                      {/* Hologram Base & Projection Light */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-gradient-to-t from-cyan-500/20 to-transparent blur-[40px]"></div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[400px] h-[4px] bg-cyan-400 shadow-[0_0_30px_#22d3ee] rounded-full z-20"></div>
                      
                      {/* Rotating HUD Elements */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                          className="absolute w-[800px] h-[800px] border border-cyan-500/5 rounded-full"
                        >
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500/40 rounded-full"></div>
                        </motion.div>
                        <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                          className="absolute w-[600px] h-[600px] border border-blue-500/5 rounded-full border-dashed"
                        ></motion.div>
                      </div>

                      {/* Left Side: Real-time Analytics */}
                      <div className="hidden lg:flex lg:absolute lg:left-10 lg:top-1/2 lg:-translate-y-1/2 flex-col gap-6 z-40">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Biometric_Data</p>
                          <div className="w-48 h-24 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-3 relative overflow-hidden">
                            <div className="flex items-end gap-1 h-full">
                              {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  animate={{ height: [`${h}%`, `${h-20}%`, `${h}%`] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                  className="flex-1 bg-cyan-500/40 rounded-t-sm"
                                ></motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural_Activity</p>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 flex items-center justify-center relative">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-cyan-500 rounded-full"
                              ></motion.div>
                              <span className="text-[10px] font-bold text-cyan-400">88%</span>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-white">SYNC_LEVEL</p>
                              <p className="text-[9px] text-slate-500">Optimizing...</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Central Gubi AI Entity */}
                      <div className="relative z-30 flex flex-col items-center justify-center h-full">
                        <motion.div 
                          animate={{ 
                            y: [0, -15, 0],
                            scale: [1, 1.02, 1],
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="relative"
                        >
                          {/* Outer Energy Rings */}
                          <motion.div 
                            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                            className="absolute -inset-8 sm:-inset-12 border-2 border-cyan-400/20 rounded-full border-t-transparent border-b-transparent"
                          ></motion.div>
                          <motion.div 
                            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                            className="absolute -inset-14 sm:-inset-20 border border-blue-400/10 rounded-full border-l-transparent border-r-transparent"
                          ></motion.div>

                          {/* Floating Gubi Companion Orb */}
                          <motion.div 
                            animate={{ 
                              rotate: 360,
                              x: [120, 140, 120],
                              y: [-30, -50, -30]
                            }}
                            transition={{ 
                              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute z-40 scale-75 sm:scale-100"
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_20px_#22d3ee] flex items-center justify-center p-1">
                              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                <span className="text-[10px] font-black text-cyan-400">G</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* The Gubi Core */}
                          <div className="relative w-40 h-40 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-[0_0_60px_rgba(6,182,212,0.5)]">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative">
                              <img 
                                src="https://i.imgur.com/VXJPAMV.jpeg" 
                                alt="Gubi AI Entity" 
                                className="w-full h-full object-cover mix-blend-screen opacity-90 scale-110" 
                                referrerPolicy="no-referrer" 
                              />
                              {/* Glitch & Hologram Overlay */}
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%]"></div>
                              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-transparent to-transparent"></div>
                            </div>
                          </div>

                          {/* Floating Status Tags around Core */}
                          <motion.div 
                            animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-12 sm:-top-10 sm:-right-20 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 px-2 sm:px-3 py-1 rounded-full flex items-center gap-2"
                          >
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                            <span className="text-[7px] sm:text-[9px] font-black text-cyan-400 uppercase tracking-widest">Neural_Link: Stable</span>
                          </motion.div>
                        </motion.div>

                        
                        <div className="mt-6 sm:mt-12 text-center relative">
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-1 sm:space-y-2"
                          >
                            <h3 className="text-2xl sm:text-5xl font-black text-white tracking-tighter italic flex items-center justify-center gap-2 sm:gap-4">
                              <span className="text-cyan-500">GUBI</span>
                              <span className="text-slate-400 opacity-50">/</span>
                              <span>AI CORE</span>
                            </h3>
                            <div className="flex items-center justify-center gap-4 sm:gap-6">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                                <span className="text-[8px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">System_Online</span>
                              </div>
                              <div className="w-px h-2 sm:h-3 bg-slate-800"></div>
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="text-[8px] sm:text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em]">Latency: 14ms</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Right Side: Quick Action Terminals */}
                      <div className="hidden lg:flex lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 flex-col gap-6 z-40">
                        <motion.button 
                          whileHover={{ scale: 1.05, x: -10 }}
                          className="w-64 flex items-center gap-4 bg-slate-900/80 hover:bg-cyan-500/10 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 p-5 rounded-3xl transition-all group"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                            <Utensils className="w-7 h-7 text-cyan-400 group-hover:text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-widest">Beslenme</p>
                            <p className="text-[14px] font-black text-white uppercase italic tracking-tighter">AI Analizi</p>
                          </div>
                        </motion.button>
                        
                        <motion.button 
                          whileHover={{ scale: 1.05, x: -10 }}
                          className="w-64 flex items-center gap-4 bg-slate-900/80 hover:bg-blue-500/10 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 p-5 rounded-3xl transition-all group"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <Activity className="w-7 h-7 text-blue-400 group-hover:text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-blue-400/60 uppercase tracking-widest">Aktivite</p>
                            <p className="text-[14px] font-black text-white uppercase italic tracking-tighter">AI Optimizasyon</p>
                          </div>
                        </motion.button>
                      </div>

                      {/* Bottom: Console Stream */}
                      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[600px] hidden sm:block">
                        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-3 sm:p-4 rounded-2xl flex items-center gap-4 sm:gap-6">
                          <div className="flex items-center gap-2 text-cyan-500 shrink-0">
                            <Terminal className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Live_Feed</span>
                          </div>
                          <div className="h-4 w-px bg-slate-800 shrink-0"></div>
                          <div className="flex-1 overflow-hidden h-5 relative">
                            <AnimatePresence mode="wait">
                              <motion.p 
                                key={aiLogs[0]}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-[10px] font-mono text-slate-400 truncate"
                              >
                                {aiLogs[0]}
                              </motion.p>
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Features Section (Teknoloji) */}
      <section id="teknoloji" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              {t.features.title} <br />
              <span className="text-cyan-600 italic">{t.features.subtitle}</span>
            </h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              {t.features.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-cyan-200 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.1] group-hover:opacity-[0.2] transition-opacity">
                  <Fingerprint className="w-32 h-32" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-black text-cyan-600 tracking-[0.3em] uppercase">{feature.tag}</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed font-light mb-6">{feature.description}</p>
                <button 
                  onClick={() => setExpandedFeature(expandedFeature === i ? null : i)}
                  className="text-xs font-bold text-cyan-600 flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest"
                >
                  {expandedFeature === i ? "Kapat" : "Detayları Gör"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {expandedFeature === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-slate-200 text-sm text-slate-500 leading-relaxed font-light">
                        {feature.details}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs / Code Section */}
      <section id="api" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
                {t.api.title} <br />
                <span className="text-cyan-600 italic">{t.api.subtitle}</span>
              </h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed font-light">
                {t.api.desc}
              </p>
              <div className="space-y-6">
                {[
                  { title: "RESTful API", desc: "JSON tabanlı esnek veri erişimi." },
                  { title: "Webhooks", desc: "Kritik olaylar için anlık bildirimler." },
                  { title: "SDK Support", desc: "React, Flutter ve Swift için hazır kütüphaneler." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 cursor-pointer group" onClick={() => toast.success(`${item.title} module active`)}>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:border-cyan-200 transition-colors">
                      <Code2 className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/5 blur-2xl rounded-full -z-10"></div>
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden font-mono text-[13px]">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  </div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-widest">gmax_init.ts</span>
                </div>
                <div className="p-10 space-y-1 text-slate-600">
                  <p><span className="text-cyan-600">import</span> &#123; GmaxClient &#125; <span className="text-cyan-600">from</span> <span className="text-blue-600">'@gmax/core'</span>;</p>
                  <p>&nbsp;</p>
                  <p><span className="text-slate-400">// Initialize GmaX Engine</span></p>
                  <p><span className="text-cyan-600">const</span> client = <span className="text-cyan-600">new</span> GmaxClient(&#123;</p>
                  <p>&nbsp;&nbsp;apiKey: process.env.GMAX_KEY,</p>
                  <p>&nbsp;&nbsp;mode: <span className="text-blue-600">'real-time'</span>,</p>
                  <p>&nbsp;&nbsp;encryption: <span className="text-blue-600">'AES-256'</span></p>
                  <p>&#125;);</p>
                  <p>&nbsp;</p>
                  <p>client.on(<span className="text-blue-600">'glucose_update'</span>, (data) =&gt; &#123;</p>
                  <p>&nbsp;&nbsp;<span className="text-cyan-600">if</span> (data.value &gt; <span className="text-blue-600">180</span>) &#123;</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;Gubi.notify(<span className="text-blue-600">'High glucose detected'</span>);</p>
                  <p>&nbsp;&nbsp;&#125;</p>
                  <p>&#125;);</p>
                  <p>&nbsp;</p>
                  <p><span className="text-slate-400">// Start monitoring</span></p>
                  <p><span className="text-cyan-600">await</span> client.connect();</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section (Mimari) */}
      <section id="mimari" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              {t.architecture.title}
            </h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              {t.architecture.desc}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.architecture.items.map((item, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-cyan-200 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  {i === 0 && <ShieldCheck className="w-6 h-6 text-cyan-600" />}
                  {i === 1 && <Cpu className="w-6 h-6 text-cyan-600" />}
                  {i === 2 && <Globe className="w-6 h-6 text-cyan-600" />}
                  {i === 3 && <Sparkles className="w-6 h-6 text-cyan-600" />}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GmaX SAGA: The Comic Section */}
      <section id="saga" className="py-32 bg-slate-900 relative overflow-hidden">
        {/* Halftone Background */}
        <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-yellow-400 border-4 border-white px-8 py-3 mb-8 transform -rotate-2 shadow-[8px_8px_0_rgba(255,255,255,0.2)]"
            >
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">GmaX SAGA: BÖLÜM 1</h2>
            </motion.div>
            <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase">Biyolojik Bir Destanın Başlangıcı</p>
          </div>

          <div className="space-y-32">
            {marvelNarrative.map((panel, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Comic Panel Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/40 transition-all duration-500 rounded-full"></div>
                    <div className="relative bg-white border-8 border-slate-800 rounded-[3rem] overflow-hidden shadow-[20px_20px_0_rgba(6,182,212,0.3)] transform group-hover:scale-[1.02] transition-transform duration-500">
                      <img 
                        src={panel.image} 
                        alt={panel.title} 
                        className="w-full h-[250px] sm:h-[400px] object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Comic Badge */}
                      <div className={`absolute ${idx % 2 === 0 ? 'top-8 -right-4' : 'top-8 -left-4'} bg-yellow-400 border-4 border-slate-900 px-6 py-2 font-black text-2xl text-slate-900 shadow-[5px_5px_0_rgba(0,0,0,1)] transform ${idx % 2 === 0 ? 'rotate-12' : '-rotate-12'}`}>
                        {panel.badge2}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comic Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="relative">
                    <h3 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tighter italic uppercase leading-none comic-title" style={{ WebkitTextStroke: '2px #0891b2' }}>
                      {panel.title}
                    </h3>
                    
                    <div className="relative">
                      {/* Speech Bubble Style */}
                      <div className="bg-white border-4 border-slate-800 p-6 sm:p-8 rounded-3xl shadow-[10px_10px_0_rgba(255,255,255,0.1)] relative">
                        <div className="absolute -top-4 left-8 w-8 h-8 bg-white border-l-4 border-t-4 border-slate-800 transform rotate-45"></div>
                        <p className="text-lg sm:text-xl text-slate-900 leading-tight font-black uppercase italic">
                          {panel.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {idx === marvelNarrative.length - 1 && (
                    <button 
                      onClick={handleWaitlistClick}
                      className="w-full bg-cyan-500 text-slate-900 px-12 py-6 rounded-none border-4 border-white font-black text-2xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[10px_10px_0_rgba(255,255,255,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-4"
                    >
                      ŞİMDİ KATIL
                      <ArrowRight className="w-8 h-8" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-500 pt-32 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl font-black tracking-tighter text-slate-900 font-mono italic">GmaX</span>
              </div>
              <p className="text-lg max-w-md mb-10 leading-relaxed font-light">
                {t.footer.desc}
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/_g.max/?utm_source=qr&r=nametag" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm">
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                  <a href="mailto:info@gmax.tr" className="text-slate-400 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm">
                    <Mail className="w-5 h-5" />
                    <span>info@gmax.tr</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-[10px]">Platform</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Architecture</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-[10px]">Resources</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Changelog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-[10px]">Company</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-cyan-600 transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-12 flex flex-col md:row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            <p>© 2026 GmaX_CORE_SYSTEM. ALL_RIGHTS_RESERVED.</p>
            <div className="flex gap-8">
              <span>{t.footer.status}</span>
              <span>VERSION: 2.4.12</span>
              <span>BUILD: 10.03.2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Get Started Modal */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            
            <motion.div
              key={modalStep}
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden border-4 border-slate-900"
            >
              {modalStep < marvelNarrative.length ? (
                <div className="relative min-h-[500px] max-h-[85vh] sm:h-[600px] flex flex-col comic-bg overflow-y-auto sm:overflow-hidden">
                  {/* Halftone Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                  
                  {/* Comic Header */}
                  <div className="bg-slate-900 text-white py-3 sm:py-4 px-6 sm:px-8 flex justify-between items-center sticky top-0 z-20">
                    <span className="font-black italic tracking-tighter text-lg sm:text-xl">GmaX COMICS #001</span>
                    <button onClick={() => setIsModalOpen(false)} className="hover:text-cyan-400 transition-colors">
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative z-10">
                    <motion.div 
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-32 h-32 sm:w-48 sm:h-48 rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-slate-900 shadow-[6px_6px_0_rgba(6,182,212,1)] sm:shadow-[10px_10px_0_rgba(6,182,212,1)] overflow-hidden mb-6 sm:mb-8 relative"
                    >
                      <img src={marvelNarrative[modalStep].image} alt="Gubi" className="w-full h-full object-cover" />
                    </motion.div>

                    <div className="relative w-full max-w-md">
                      {/* Speech Bubble Effect */}
                      <div className="absolute -top-12 -right-4 sm:-top-16 sm:-right-8 bg-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-6 sm:py-3 font-black text-[10px] sm:text-xs text-slate-900 shadow-[3px_3px_0_rgba(0,0,0,1)] sm:shadow-[5px_5px_0_rgba(0,0,0,1)] transform rotate-12 z-20">
                        {marvelNarrative[modalStep].reaction}
                      </div>

                      {/* Comic Badges */}
                      <div className="absolute -top-20 -left-4 sm:-top-24 sm:-left-12 bg-yellow-400 border-2 sm:border-4 border-slate-900 px-3 py-1 sm:px-4 sm:py-2 font-black text-sm sm:text-xl text-slate-900 shadow-[3px_3px_0_rgba(0,0,0,1)] sm:shadow-[5px_5px_0_rgba(0,0,0,1)] transform -rotate-12 z-20">
                        {marvelNarrative[modalStep].badge1}
                      </div>
                      <div className="absolute top-8 -right-8 sm:top-12 sm:-right-16 bg-cyan-400 border-2 sm:border-4 border-slate-900 px-3 py-1 sm:px-4 sm:py-2 font-black text-sm sm:text-xl text-slate-900 shadow-[3px_3px_0_rgba(0,0,0,1)] sm:shadow-[5px_5px_0_rgba(0,0,0,1)] transform rotate-12 z-20">
                        {marvelNarrative[modalStep].badge2}
                      </div>
                      
                      <h3 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tighter italic uppercase leading-none">
                        {marvelNarrative[modalStep].title}
                      </h3>
                      <div className="bg-white border-2 sm:border-4 border-slate-900 p-4 sm:p-6 shadow-[5px_5px_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_rgba(0,0,0,1)] mb-6 sm:mb-10 transform -rotate-1">
                        <p className="text-sm sm:text-lg text-slate-900 leading-tight font-black uppercase italic">
                          {marvelNarrative[modalStep].desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
                      {modalStep > 0 && (
                        <button 
                          onClick={prevModalStep}
                          className="flex-1 sm:flex-none bg-white text-slate-900 px-4 py-2 sm:px-6 sm:py-3 rounded-none border-2 sm:border-4 border-slate-900 font-black text-sm sm:text-lg uppercase tracking-widest hover:bg-slate-100 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)] sm:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                          Geri
                        </button>
                      )}
                      <button 
                        onClick={nextModalStep}
                        className="flex-[2] sm:flex-none bg-cyan-500 text-slate-900 px-6 py-3 sm:px-10 sm:py-4 rounded-none border-2 sm:border-4 border-slate-900 font-black text-sm sm:text-xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 sm:gap-3"
                      >
                        {marvelNarrative[modalStep].action}
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                      <button 
                        onClick={() => setModalStep(marvelNarrative.length)}
                        className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors mt-2 w-full"
                      >
                        Hikayeyi Geç ve Kaydol
                      </button>
                    </div>
                  </div>

                  {/* Comic Footer */}
                  <div className="bg-yellow-400 border-t-2 sm:border-t-4 border-slate-900 p-3 sm:p-4 flex justify-between items-center px-6 sm:px-8 sticky bottom-0 z-20">
                    <div className="flex gap-1.5 sm:gap-2">
                      {marvelNarrative.map((_, i) => (
                        <div key={i} className={`w-3 h-3 sm:w-4 sm:h-4 border-2 border-slate-900 ${i === modalStep ? 'bg-slate-900' : 'bg-white'}`}></div>
                      ))}
                    </div>
                    <span className="font-black italic text-xs text-slate-900 uppercase">PAGE {modalStep + 1} OF {marvelNarrative.length}</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 sm:p-12">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mb-8">
                    <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6">
                      <Command className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                      {t.modal.title}
                    </h3>
                    <p className="text-slate-500 font-light leading-relaxed">
                      {t.modal.desc}
                    </p>
                  </div>

                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const email = formData.get("email");
                      
                      try {
                        const response = await fetch("/api/bekleme-listesi", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        });
                        
                        if (response.ok) {
                          toast.success(t.modal.success);
                          setIsModalOpen(false);
                        } else {
                          toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
                        }
                      } catch (error) {
                        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                        {t.modal.emailLabel}
                      </label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="name@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                    >
                      {t.modal.submit}
                    </button>
                  </form>

                  <p className="mt-8 text-center text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                    {t.modal.footer}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
