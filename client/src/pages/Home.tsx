import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpLeft,
  ChevronDown,
  Compass,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Play,
  Search,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type FilterKey = "all" | "heritage" | "nature" | "sea";

type Destination = {
  title: string;
  subtitle: string;
  category: Exclude<FilterKey, "all">;
  image: string;
  color: string;
  number: string;
  description: string;
};

const destinations: Destination[] = [
  {
    title: "البتراء",
    subtitle: "مدينة الأنباط الوردية",
    category: "heritage",
    image: "/manus-storage/petra_b4c9bc77.jpg",
    color: "#bc6948",
    number: "01",
    description: "ممرات منحوتة في قلب الجبل، حيث يبدأ كل منعطف بحكاية أقدم من الذاكرة.",
  },
  {
    title: "وادي رم",
    subtitle: "وادي القمر",
    category: "nature",
    image: "/manus-storage/wadi-rum_658c7df0.jpg",
    color: "#b87947",
    number: "02",
    description: "امتداد من الرمال الحمراء والسماء الواسعة؛ تجربة تشبه السير داخل لوحة سينمائية.",
  },
  {
    title: "البحر الميت",
    subtitle: "ماء يلامس السماء",
    category: "sea",
    image: "/manus-storage/dead-sea_8b8cf8eb.jpg",
    color: "#568c91",
    number: "03",
    description: "هدوء أزرق عميق وتجربة استرخاء طبيعية عند أخفض نقطة على وجه الأرض.",
  },
  {
    title: "ليالي الأردن",
    subtitle: "نوم تحت النجوم",
    category: "nature",
    image: "/manus-storage/experience_aebcba59.jpg",
    color: "#806c9a",
    number: "04",
    description: "خيمة دافئة، قهوة على الرمل، وسماء لا تشبه أي سماء رأيتها من قبل.",
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "كل التجارب" },
  { key: "heritage", label: "تراث وحكايات" },
  { key: "nature", label: "طبيعة ومغامرة" },
  { key: "sea", label: "بحر واسترخاء" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchValue, setSearchValue] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredDestinations = useMemo(
    () => (activeFilter === "all" ? destinations : destinations.filter((item) => item.category === activeFilter)),
    [activeFilter],
  );

  const runSearch = () => {
    setNotice(searchValue.trim() ? `نبحث لك عن «${searchValue.trim()}» في الأردن` : "اختر وجهة لنبدأ رحلة البحث");
    scrollToId("destinations");
  };

  const showNotice = (message: string) => setNotice(message);

  return (
    <main className="overflow-hidden bg-[#f5efe6] text-[#1b1713]">
      <section className="grain relative min-h-[720px] overflow-hidden bg-[#1b1713] text-[#fffaf3] lg:min-h-[860px]" id="top">
        <div className="absolute inset-0">
          <img src="/manus-storage/wadi-rum_658c7df0.jpg" alt="صحراء وادي رم في الأردن" className="h-full w-full object-cover object-center opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,15,12,.82)_0%,rgba(27,23,19,.18)_35%,rgba(27,23,19,.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(200,139,75,.25),transparent_28%),radial-gradient(circle_at_85%_5%,rgba(255,244,216,.12),transparent_21%)]" />
        </div>

        <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1b1713]/92 shadow-[0_12px_40px_rgba(0,0,0,.18)] backdrop-blur-xl" : "bg-transparent"}`}>
          <div className="mx-auto flex h-[82px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <button className="group flex items-center gap-3 text-right" onClick={() => scrollToId("top")} aria-label="العودة إلى البداية">
              <span className="relative grid h-11 w-11 place-items-center rounded-full border border-[#e8c595]/50 bg-[#e8c595]/10 transition-transform duration-300 group-hover:rotate-12">
                <span className="absolute h-6 w-6 rounded-full border border-[#e8c595]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8c595]" />
              </span>
              <span className="leading-none"><strong className="font-display block text-[15px] tracking-[-.04em]">أطياف</strong><small className="mt-1 block text-[9px] tracking-[.28em] text-[#e8c595]">JORDAN</small></span>
            </button>

            <div className="hidden items-center gap-9 text-[13px] text-white/70 lg:flex">
              <button className="transition-colors hover:text-[#e8c595]" onClick={() => scrollToId("destinations")}>وجهات مختارة</button>
              <button className="transition-colors hover:text-[#e8c595]" onClick={() => scrollToId("story")}>حكاية المكان</button>
              <button className="transition-colors hover:text-[#e8c595]" onClick={() => scrollToId("journal")}>مجلة أطياف</button>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => showNotice("سيكون مخطط الرحلة جاهزًا قريبًا — ابقَ قريبًا من أطياف")} className="hidden rounded-full border border-white/25 px-5 py-2.5 text-[12px] transition-all hover:border-[#e8c595] hover:bg-[#e8c595] hover:text-[#1b1713] sm:inline-flex">خطط رحلتك <ArrowUpLeft className="mr-2 h-3.5 w-3.5" /></button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="فتح القائمة">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-t border-white/10 bg-[#1b1713]/95 px-6 py-6 backdrop-blur-xl lg:hidden">
                <div className="flex flex-col gap-5 text-sm text-white/75">
                  {[['destinations', 'وجهات مختارة'], ['story', 'حكاية المكان'], ['journal', 'مجلة أطياف']].map(([id, label]) => <button key={id} className="text-right" onClick={() => { setMobileOpen(false); scrollToId(id); }}>{label}</button>)}
                  <button className="mt-1 flex items-center justify-between rounded-xl bg-[#e8c595] px-4 py-3 text-[#1b1713]" onClick={() => { setMobileOpen(false); showNotice("سيكون مخطط الرحلة جاهزًا قريبًا — ابقَ قريبًا من أطياف"); }}>خطط رحلتك <ArrowUpLeft className="h-4 w-4" /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1320px] flex-col justify-center px-5 pb-28 pt-36 sm:px-8 lg:min-h-[860px] lg:px-12">
          <div className="max-w-[830px]">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-7 flex items-center gap-3 text-[11px] font-medium tracking-[.22em] text-[#e8c595]">
              <span className="h-px w-10 bg-[#e8c595]" /> <span>رحلة تبدأ من هنا</span>
            </motion.div>
            <motion.h1 initial="hidden" animate="show" variants={fadeUp} transition={{ delay: .12 }} className="font-display text-[clamp(3.4rem,9vw,8.6rem)] font-semibold leading-[1.1] tracking-[-.1em] text-[#fff7ea]">
              الأردن،<br /><em className="mr-[.18em] font-normal not-italic text-[#e8c595]">بكل أطيافه.</em>
            </motion.h1>
            <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{ delay: .24 }} className="mt-7 max-w-[480px] text-[15px] leading-8 text-white/68 sm:text-[17px]">من نبض عمّان إلى صمت الصحراء، اكتشف بلدًا لا يكتفي بأن تراه — بل يترك أثره فيك.</motion.p>
            <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: .35 }} className="mt-9 flex flex-wrap items-center gap-4">
              <button onClick={() => scrollToId("destinations")} className="group flex items-center gap-4 rounded-full bg-[#e8c595] py-3 pl-3 pr-6 text-[13px] font-semibold text-[#271b13] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f2d5a5]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1b1713] text-[#e8c595] transition-transform duration-300 group-hover:-rotate-45"><ArrowLeft className="h-4 w-4" /></span> ابدأ الاستكشاف
              </button>
              <button onClick={() => showNotice("جولة قصيرة ستأخذك من البتراء إلى البحر الميت خلال 45 ثانية")} className="group flex items-center gap-3 text-[13px] text-white/75 transition-colors hover:text-[#e8c595]"><span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 transition-all group-hover:border-[#e8c595] group-hover:bg-[#e8c595]/10"><Play className="mr-[-2px] h-3.5 w-3.5 fill-current" /></span> شاهد الحكاية</button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65, duration: .8 }} className="absolute bottom-0 left-5 right-5 flex items-end justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12">
            <div className="hidden items-center gap-4 pb-8 text-[10px] tracking-[.28em] text-white/45 md:flex"><span className="h-12 w-px bg-white/25" /><span className="[writing-mode:vertical-rl]">31° 57′ N · 35° 56′ E</span></div>
            <div className="glass mb-[-1px] flex w-full max-w-[780px] flex-col gap-3 rounded-t-[24px] p-4 text-[#1b1713] shadow-2xl sm:flex-row sm:items-center sm:gap-5 sm:rounded-t-[28px] sm:p-5">
              <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#f2eadf] px-4 py-3"><MapPin className="h-4 w-4 text-[#b85b3b]" /><div className="min-w-0"><span className="block text-[10px] text-[#87786a]">إلى أين تأخذك خيالك؟</span><input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={(event) => event.key === "Enter" && runSearch()} placeholder="اكتب اسم الوجهة..." className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-[#a99a8a]" /></div></div>
              <div className="flex items-center gap-3 text-xs text-[#716354]"><span className="hidden h-7 w-px bg-[#d7c9b7] sm:block" /><button className="flex items-center gap-2 px-2 py-2 transition-colors hover:text-[#b85b3b]">مدة الرحلة <ChevronDown className="h-3.5 w-3.5" /></button><button onClick={runSearch} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#b85b3b] text-[#fffaf3] transition-all hover:bg-[#954329] hover:shadow-lg"><Search className="h-4 w-4" /></button></div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] tracking-[.24em] text-white/45 lg:flex"><span>مرر للاكتشاف</span><span className="h-9 w-px bg-white/30" /></div>
      </section>

      <section className="relative bg-[#f5efe6] py-24 sm:py-32" id="story">
        <div className="mx-auto grid max-w-[1320px] gap-16 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} variants={fadeUp} className="relative">
            <div className="absolute -right-5 -top-8 hidden h-32 w-32 rounded-full border border-[#c88b4b]/40 sm:block" />
            <div className="relative aspect-[4/5] max-w-[450px] overflow-hidden rounded-[40px] rounded-tl-[120px] bg-[#d4c0a5] shadow-[18px_22px_0_#e4d4be]">
              <img src="/manus-storage/petra_b4c9bc77.jpg" alt="ممرات البتراء الوردية" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1713]/65 via-transparent to-transparent" />
              <div className="absolute bottom-7 right-7 text-white"><span className="mb-2 block text-[10px] tracking-[.25em] text-[#e8c595]">ARCHIVE / 01</span><span className="font-display text-lg">الممر الوردي</span></div>
            </div>
            <div className="float-slow absolute -bottom-9 -left-3 grid h-28 w-28 place-items-center rounded-full bg-[#b85b3b] text-center text-[#fffaf3] shadow-xl sm:-left-7"><Compass className="mb-1 h-5 w-5" /><span className="block text-[10px] leading-4">خذ الطريق<br />الأقل ازدحامًا</span></div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} variants={fadeUp} className="lg:pb-2">
            <div className="mb-7 flex items-center gap-3 text-[11px] tracking-[.2em] text-[#b85b3b]"><span className="h-px w-9 bg-[#b85b3b]" /> لماذا الأردن؟</div>
            <h2 className="font-display max-w-[580px] text-[clamp(2.1rem,5vw,4.7rem)] font-semibold leading-[1.35] tracking-[-.08em]">هنا، كل طريق<br /><span className="text-[#b85b3b]">يحكي شيئًا.</span></h2>
            <p className="mt-7 max-w-[500px] text-[16px] leading-9 text-[#756a5f]">الأردن ليس مجرد وجهة على الخريطة. إنه تفاصيل صغيرة تتراكم لتصبح ذكرى كبيرة: ضوء الشمس فوق الصخور، رائحة الهيل في فنجان القهوة، وابتسامة لا تحتاج إلى ترجمة.</p>
            <div className="mt-10 grid max-w-[590px] grid-cols-3 gap-4 border-y border-[#2d2117]/10 py-6">
              {[['7', 'مواقع مدرجة\nعالميًا'], ['4,000+', 'سنة من\nالحكايات'], ['∞', 'لحظة\nلا تُنسى']].map(([value, label]) => <div key={value}><strong className="font-display block text-2xl font-semibold text-[#b85b3b] sm:text-3xl">{value}</strong><span className="mt-2 block whitespace-pre-line text-[11px] leading-5 text-[#8a7b6b]">{label}</span></div>)}
            </div>
            <button onClick={() => showNotice("قصة أطياف تُكتب مع كل مسافر — شكرًا لفضولك")} className="group mt-8 flex items-center gap-3 text-[13px] font-semibold text-[#2b211a]">اقرأ حكاية المكان <span className="grid h-9 w-9 place-items-center rounded-full border border-[#b85b3b]/40 text-[#b85b3b] transition-all group-hover:-rotate-45 group-hover:bg-[#b85b3b] group-hover:text-white"><ArrowLeft className="h-4 w-4" /></span></button>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#e9dfd1] py-24 sm:py-32" id="destinations">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }} variants={fadeUp} className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div><div className="mb-6 flex items-center gap-3 text-[11px] tracking-[.2em] text-[#b85b3b]"><span className="h-px w-9 bg-[#b85b3b]" /> اختيارات أطياف</div><h2 className="font-display text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[1.45] tracking-[-.08em]">وجهات تستحق<br /><span className="text-[#b85b3b]">أن تُعاش ببطء.</span></h2></div>
            <p className="max-w-[300px] text-[14px] leading-7 text-[#756a5f] lg:pb-2">لا نؤمن بقوائم “الأفضل”. نؤمن بالمكان الذي يشبهك، في الوقت الذي تحتاجه.</p>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-[#2d2117]/10 pb-5">
            {filters.map((filter) => <button key={filter.key} onClick={() => setActiveFilter(filter.key)} className={`rounded-full px-5 py-2.5 text-[12px] transition-all duration-300 ${activeFilter === filter.key ? "bg-[#1b1713] text-[#fffaf3] shadow-lg" : "text-[#74685b] hover:bg-[#f5efe6] hover:text-[#1b1713]"}`}>{filter.label}</button>)}
            <span className="mr-auto hidden items-center gap-2 text-[11px] text-[#8a7b6b] sm:flex"><Sparkles className="h-3.5 w-3.5 text-[#c88b4b]" /> {filteredDestinations.length} تجارب مقترحة</span>
          </div>

          <motion.div layout className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((destination, index) => <motion.article layout key={destination.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .45, delay: index * .06 }} className={`group relative overflow-hidden rounded-[28px] bg-[#1b1713] text-white ${index === 0 ? "sm:row-span-2 lg:col-span-1" : ""}`}>
                <button onClick={() => setSelectedDestination(destination)} className="relative block h-full min-h-[365px] w-full text-right sm:min-h-[390px]" aria-label={`استكشف ${destination.title}`}>
                  <img src={destination.image} alt={destination.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1713] via-[#1b1713]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6"><div className="mb-4 flex items-center justify-between"><span className="font-display text-sm text-white/55">{destination.number}</span><span className="rounded-full border border-white/25 px-3 py-1 text-[9px] text-white/75">{destination.category === 'heritage' ? 'تراث' : destination.category === 'nature' ? 'طبيعة' : 'بحر'}</span></div><h3 className="font-display text-[26px] font-semibold tracking-[-.08em]">{destination.title}</h3><p className="mt-1 text-[11px] text-[#e8c595]">{destination.subtitle}</p><div className="mt-5 flex max-h-0 items-center gap-2 overflow-hidden text-[11px] text-white/75 opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">اكتشف التفاصيل <ArrowLeft className="h-3.5 w-3.5" /></div></div>
                </button>
              </motion.article>)}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1b1713] py-24 text-[#fffaf3] sm:py-32" id="journal">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#b85b3b]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#c88b4b]/10 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-24 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }} variants={fadeUp}><div className="mb-6 flex items-center gap-3 text-[11px] tracking-[.2em] text-[#e8c595]"><span className="h-px w-9 bg-[#e8c595]" /> مذكرة من الطريق</div><h2 className="font-display text-[clamp(2.3rem,5vw,5.3rem)] font-semibold leading-[1.35] tracking-[-.09em]">السفر ليس<br /><span className="text-[#e8c595]">قائمة إنجاز.</span></h2><p className="mt-7 max-w-[500px] text-[15px] leading-8 text-white/55">اترك مساحة للمفاجأة. خذ الطريق الطويل. اسأل عن الاسم القديم للمكان. الأردن يكافئ من يصل بقلب مفتوح.</p><button onClick={() => showNotice("تم حفظ المذكرة — ستصلك حكايات أطياف قريبًا")} className="mt-8 flex items-center gap-3 rounded-full bg-[#e8c595] px-6 py-3 text-[12px] font-semibold text-[#1b1713] transition-all hover:-translate-y-1 hover:bg-[#f1d6aa]"><Heart className="h-4 w-4" /> احفظ هذه المذكرة</button></motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8 }} className="relative aspect-[4/3] overflow-hidden rounded-[36px] border border-white/15"><img src="/manus-storage/experience_aebcba59.jpg" alt="تجربة ليلية في الصحراء الأردنية" className="h-full w-full object-cover opacity-75 transition duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-tr from-[#1b1713]/80 via-transparent to-[#1b1713]/10" /><div className="absolute bottom-6 right-6"><span className="mb-2 block text-[10px] tracking-[.22em] text-[#e8c595]">FIELD NOTE / 07</span><span className="font-display text-lg">حين تصبح السماء أقرب</span></div><div className="pulse-ring absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur"><Sparkles className="h-4 w-4 text-[#e8c595]" /></div></motion.div>
        </div>
      </section>

      <footer className="bg-[#f5efe6] px-5 pb-8 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 border-b border-[#2d2117]/10 pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-[#b85b3b]/45"><span className="h-5 w-5 rounded-full border border-[#b85b3b]" /></span><span><strong className="font-display block text-sm">أطياف</strong><small className="text-[9px] tracking-[.26em] text-[#b85b3b]">JORDAN</small></span></div><h2 className="mt-8 max-w-[600px] font-display text-[clamp(1.8rem,4vw,3.7rem)] font-semibold leading-[1.55] tracking-[-.08em]">جاهز لترى الأردن<br /><span className="text-[#b85b3b]">بطريقة مختلفة؟</span></h2></div>
            <div className="w-full max-w-[380px]"><p className="mb-4 text-sm text-[#756a5f]">حكايات جديدة، وجهات بعيدة، وإلهام يصل إلى بريدك.</p><div className="flex items-center rounded-2xl border border-[#2d2117]/15 bg-[#fffaf3] p-2"><input placeholder="بريدك الإلكتروني" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#a99a8a]" /><button onClick={() => showNotice("شكرًا — انضممت إلى قائمة حكايات أطياف")} className="grid h-11 w-11 place-items-center rounded-xl bg-[#b85b3b] text-white transition-colors hover:bg-[#954329]" aria-label="اشتراك"><Send className="h-4 w-4" /></button></div></div>
          </div>
          <div className="flex flex-col justify-between gap-5 py-7 text-[11px] text-[#8b7d70] sm:flex-row sm:items-center"><span>© 2026 أطياف الأردن. صُنع بحب من عمّان.</span><div className="flex items-center gap-5"><button className="transition-colors hover:text-[#b85b3b]" onClick={() => showNotice("نحن نعمل على إعداد دليل السفر الكامل")} >دليل المسافر</button><button className="transition-colors hover:text-[#b85b3b]" onClick={() => showNotice("تواصل معنا عبر hello@atyaf.jo")}>تواصل</button><Instagram className="h-4 w-4 transition-colors hover:text-[#b85b3b]" /></div></div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedDestination && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-[#1b1713]/75 p-5 backdrop-blur-md" onClick={() => setSelectedDestination(null)}><motion.div initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ duration: .28 }} onClick={(event) => event.stopPropagation()} className="relative grid w-full max-w-3xl overflow-hidden rounded-[30px] bg-[#fffaf3] text-[#1b1713] shadow-2xl md:grid-cols-[.9fr_1.1fr]"><button onClick={() => setSelectedDestination(null)} className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#1b1713]/70 text-white backdrop-blur transition-colors hover:bg-[#b85b3b]" aria-label="إغلاق"><X className="h-4 w-4" /></button><img src={selectedDestination.image} alt={selectedDestination.title} className="h-72 w-full object-cover md:h-full" /><div className="p-7 sm:p-10"><span className="text-[10px] tracking-[.2em] text-[#b85b3b]">{selectedDestination.number} / ATYAF EDIT</span><h3 className="mt-4 font-display text-3xl font-semibold tracking-[-.08em]">{selectedDestination.title}</h3><p className="mt-2 text-sm text-[#b85b3b]">{selectedDestination.subtitle}</p><p className="mt-7 text-[15px] leading-8 text-[#756a5f]">{selectedDestination.description}</p><button onClick={() => { setSelectedDestination(null); showNotice(`أضفنا ${selectedDestination.title} إلى مخطط رحلتك`); }} className="mt-8 flex items-center gap-3 rounded-full bg-[#1b1713] px-5 py-3 text-xs text-white transition-colors hover:bg-[#b85b3b]">أضف إلى رحلتي <ArrowLeft className="h-4 w-4" /></button></div></motion.div></motion.div>}
      </AnimatePresence>

      <AnimatePresence>{notice && <motion.div initial={{ opacity: 0, y: 18, x: 18 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-6 left-6 z-[70] flex max-w-[min(360px,calc(100vw-3rem))] items-center gap-3 rounded-2xl bg-[#1b1713] px-5 py-4 text-xs text-white shadow-2xl"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e8c595] text-[#1b1713]"><Sparkles className="h-3.5 w-3.5" /></span>{notice}</motion.div>}</AnimatePresence>
    </main>
  );
}
