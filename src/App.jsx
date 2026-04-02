import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#E8C790";
const CTA_DARK = "#38435C";

// Swahili Twilight Velvet palette: deep navy, slate violet, rosewood haze, and soft brass glow.

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(8,22,48,0.98)_0%,rgba(31,46,78,0.96)_34%,rgba(76,88,118,0.93)_70%,rgba(125,95,88,0.88)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(26,38,66,0.96)_0%,rgba(63,76,108,0.93)_54%,rgba(120,95,92,0.88)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const crystalFloat = (xRange, yRange, scaleRange, duration) => ({
  x: xRange,
  y: yRange,
  scale: scaleRange,
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
});

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  "border border-white/40 bg-[linear-gradient(135deg,rgba(14,26,50,0.90)_0%,rgba(43,57,88,0.82)_48%,rgba(119,92,86,0.62)_100%)] md:backdrop-blur-xl backdrop-blur-sm shadow-[0_18px_40px_rgba(0,0,0,0.24)]";
const softCard = `rounded-[2rem] ${glass}`;
const gradientOuterCard = `rounded-[2rem] border border-white/40 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.14)]`;

const navItems = [
  { label: "Sisi ni nani", href: "#about" },
  { label: "Vipengele", href: "#features" },
  { label: "Kazi zetu", href: "#portfolio" },
  { label: "Washirika wa mafanikio", href: "#partners" },
  { label: "Wasiliana nasi", href: "#contact" },
];

const stats = [
  { value: "+100", label: "Lugha za kimataifa zinazolengwa" },
  { value: "24/7", label: "Ufikiaji wa kimataifa wa kudumu" },
  { value: "114", label: "Sura kamili" },
  { value: "HQ", label: "Ubora wa juu wa sauti na picha" },
];

const heroCards = [
  { value: "114", label: "Sura kamili" },
  { value: "30", label: "Juzuu za Qurani" },
  { value: "Lenye ustadi", label: "Onyesho la sauti na picha" },
];

const heroBadges = [
  { icon: Sparkles, title: "Nuru na uzuri wa Qurani" },
  { icon: Globe, title: "Ujumbe kwa ulimwengu" },
];

const identityCards = [
  {
    icon: Users,
    title: "Sisi ni nani",
    text: "Sana ni mradi wa wakfu unaolenga kueneza maana za Qurani Tukufu duniani kupitia vituo vya sauti na picha vinavyounganisha usomaji mzuri na tafsiri sahihi, ili kutoa uzoefu wa kiimani unaoleta Maneno ya Allah karibu na nyoyo za watu katika lugha mbalimbali za dunia.",
  },
  {
    icon: Eye,
    title: "Dira",
    text: "Kuwa jukwaa la kimataifa linaloongoza katika kufikisha maana za Qurani Tukufu kwa kila mtu kwa lugha yake, kwa mtindo wa kisasa unaounganisha uzuri, ustadi, na teknolojia ya kisasa.",
  },
  {
    icon: Target,
    title: "Ujumbe",
    text: "Kutoa maudhui ya Qurani ya sauti na picha yaliyotafsiriwa, yanayorahisisha kuelewa maana za Qurani Tukufu kwa uwazi na urahisi, na kusaidia kusambaza uongofu na kuutambulisha ulimwengu kwa Maneno ya Allah kwa mtindo wenye mvuto na athari.",
  },
];

const features = [
  {
    icon: Languages,
    title: "Tafsiri za lugha nyingi",
    desc: "Kufikisha maana za Qurani Tukufu kwa watu kwa lugha zao kwa mtindo wazi na sahihi unaolinda maana na ujumbe.",
  },
  {
    icon: Headphones,
    title: "Uzoefu kamili wa sauti na picha",
    desc: "Vituo vinavyounganisha usomaji wenye athari na maandishi yaliyotafsiriwa katika uzoefu tulivu unaofaa utukufu wa Qurani Tukufu.",
  },
  {
    icon: Globe,
    title: "Uenezi wa kimataifa endelevu",
    desc: "Uwepo wa kidijitali na wa matangazo unaofungua milango ya kufikia mabara na majukwaa mbalimbali saa zote.",
  },
  {
    icon: HeartHandshake,
    title: "Wakfu kwa ajili ya Allah",
    desc: "Ujumbe wa kimataifa wa daawa ambao kila anayechangia kuusambaza, kuusaidia, au kunufaika nao hushiriki katika ujira wake.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "Vituo vya satelaiti na redio",
    desc: "Kueneza maana za Qurani Tukufu kupitia vituo vya sauti na picha vinavyowafikia watu wa mataifa mbalimbali kwa lugha zao.",
  },
  {
    icon: MonitorPlay,
    title: "Mitandao ya kijamii na tovuti",
    desc: "Uwepo wa kidijitali unaojirudia unaorahisisha kufikia maudhui ya Qurani na kuyaeneza kwa upana.",
  },
  {
    icon: Layers3,
    title: "Programu na vyombo vya kidijitali mbalimbali",
    desc: "Uzoefu wa kisasa na wa aina nyingi unaoruhusu kufuatilia maudhui ya Qurani kwa mbinu zinazofaa vifaa na majukwaa mbalimbali.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "Taasisi za kisheria na taasisi za Kiislamu",
    desc: "Ambazo zimechangia kutoa tafsiri zilizoidhinishwa za maana za Qurani Tukufu, kwa kuhakikisha usahihi na msingi wa kielimu wa Kiislamu.",
  },
  {
    icon: Mic2,
    title: "Wasomaji wenye athari na sauti nzuri",
    desc: "Walioimarisha mradi kwa visomo vya unyenyekevu na hisia vinavyofika moyoni kwa mtindo unaopendwa na wenye mvuto.",
  },
  {
    icon: Headphones,
    title: "Kampuni za uzalishaji wa sauti na teknolojia",
    desc: "Zilizotoa rekodi zenye ubora wa juu pamoja na usindikaji wa kitaalamu wa sauti na picha.",
  },
  {
    icon: Users,
    title: "Wazalishaji na wajitolea",
    desc: "Waliochangia kuendeleza maudhui na kuyasambaza ili yawafikie watu wengi zaidi duniani.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "Ufikiaji wa kimataifa",
    desc: "Ujumbe wa Qurani Tukufu umefika katika nyumba za nchi mbalimbali duniani kwa lugha nyingi zinazozungumza na watu kwa lugha yao ya kwanza.",
  },
  {
    icon: Languages,
    title: "Tafsiri zinazoaminika",
    desc: "Tafsiri sahihi za maana za Qurani Tukufu zimetolewa chini ya usimamizi wa taasisi za kielimu zinazoaminika ili kuhifadhi usahihi wa maana.",
  },
  {
    icon: Headphones,
    title: "Uzoefu uliokamilika",
    desc: "Maudhui yanayounganisha kisomo cha unyenyekevu na tafsiri ya kuona ili kutoa uzoefu wa kiimani wenye athari na rahisi kueleweka.",
  },
  {
    icon: Send,
    title: "Ujumbe unaoendelea",
    desc: "Mradi huu unachangia kusambaza uongofu na kuutambulisha ulimwengu kwa Maneno ya Allah kwa mtindo wa kisasa unaowafikia watu wa makundi mbalimbali.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

const crystalOrbs = [
  {
    className:
      "left-[-4%] top-[7%] h-40 w-40 sm:h-52 sm:w-52 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_34%,rgba(110,143,179,0.08)_60%,transparent_72%)] backdrop-blur-[3px] shadow-[inset_0_1px_12px_rgba(255,255,255,0.12),0_12px_30px_rgba(0,0,0,0.10)]",
    animate: crystalFloat([0, 18, 0], [0, 12, 0], [1, 1.04, 1], 18),
  },
  {
    className:
      "right-[6%] top-[14%] h-24 w-24 sm:h-32 sm:w-32 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),rgba(255,255,255,0.05)_32%,rgba(232,199,144,0.08)_58%,transparent_72%)] backdrop-blur-[2px] shadow-[inset_0_1px_10px_rgba(255,255,255,0.10),0_10px_24px_rgba(0,0,0,0.08)]",
    animate: crystalFloat([0, -16, 0], [0, 14, 0], [1, 1.05, 1], 16),
  },
  {
    className:
      "left-[12%] top-[42%] h-20 w-20 sm:h-28 sm:w-28 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0.05)_30%,rgba(199,212,229,0.08)_58%,transparent_72%)] backdrop-blur-[2px] shadow-[inset_0_1px_10px_rgba(255,255,255,0.10),0_8px_22px_rgba(0,0,0,0.08)]",
    animate: crystalFloat([0, 10, 0], [0, -12, 0], [1, 1.03, 1], 14),
  },
  {
    className:
      "right-[14%] top-[48%] h-32 w-32 sm:h-44 sm:w-44 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),rgba(255,255,255,0.05)_32%,rgba(110,143,179,0.07)_58%,transparent_72%)] backdrop-blur-[3px] shadow-[inset_0_1px_12px_rgba(255,255,255,0.12),0_12px_28px_rgba(0,0,0,0.08)]",
    animate: crystalFloat([0, -18, 0], [0, 16, 0], [1, 1.04, 1], 20),
  },
  {
    className:
      "left-[38%] bottom-[10%] h-28 w-28 sm:h-36 sm:w-36 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0.05)_30%,rgba(232,199,144,0.07)_56%,transparent_72%)] backdrop-blur-[2px] shadow-[inset_0_1px_10px_rgba(255,255,255,0.10),0_8px_24px_rgba(0,0,0,0.08)]",
    animate: crystalFloat([0, 14, 0], [0, -10, 0], [1, 1.04, 1], 17),
  },
  {
    className:
      "right-[-3%] bottom-[7%] h-44 w-44 sm:h-56 sm:w-56 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),rgba(255,255,255,0.05)_34%,rgba(199,212,229,0.08)_60%,transparent_74%)] backdrop-blur-[3px] shadow-[inset_0_1px_12px_rgba(255,255,255,0.12),0_14px_34px_rgba(0,0,0,0.10)]",
    animate: crystalFloat([0, -14, 0], [0, 12, 0], [1, 1.05, 1], 21),
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT +
          mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying, isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.35rem] border border-white/40 bg-[linear-gradient(135deg,rgba(36,47,74,0.90)_0%,rgba(72,84,116,0.82)_54%,rgba(121,98,96,0.72)_100%)] p-3 sm:p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(23,29,45,0.38)_0%,rgba(50,61,88,0.30)_56%,rgba(98,75,71,0.24)_100%)] px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-[#8C6A43] via-[#D6B16F] to-[#6E8FB3] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
          aria-label={isPlaying ? "Sitisha" : "Cheza"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
          aria-label="Rudi nyuma"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
          aria-label="Anza tena"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
          aria-label="Songa mbele"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
          aria-label="Sauti"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-[#274463]">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8C6A43] via-[#D6B16F] to-[#6E8FB3]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-gradient-to-r from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(37,47,73,0.88)_0%,rgba(74,87,119,0.80)_52%,rgba(120,98,97,0.70)_100%)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-gradient-to-r from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(37,47,73,0.88)_0%,rgba(74,87,119,0.80)_52%,rgba(120,98,97,0.70)_100%)] px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-gradient-to-r from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(37,47,73,0.88)_0%,rgba(74,87,119,0.80)_52%,rgba(120,98,97,0.70)_100%)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  videoId,
  registerVideo,
  unregisterVideo,
  requestExclusivePlay,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    registerVideo(videoId, element);

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      requestExclusivePlay(videoId);
      setIsPlaying(true);
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      unregisterVideo(videoId);
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [registerVideo, requestExclusivePlay, unregisterVideo, videoId]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(18,24,38,0.82)_0%,rgba(35,44,68,0.74)_60%,rgba(74,58,58,0.62)_100%)]">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(18,24,38,0.34)_0%,rgba(46,56,82,0.28)_58%,rgba(92,72,70,0.24)_100%)] transition hover:bg-[linear-gradient(135deg,rgba(23,29,45,0.38)_0%,rgba(50,61,88,0.30)_56%,rgba(98,75,71,0.24)_100%)]"
            aria-label="Cheza video"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-[#44536B] backdrop-blur-md shadow-[0_0_22px_rgba(39,121,167,0.22)] sm:h-18 sm:w-18">
              <Play className="mr-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/40 bg-[linear-gradient(135deg,rgba(18,24,38,0.82)_0%,rgba(35,44,68,0.74)_60%,rgba(74,58,58,0.62)_100%)] px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "Muonekano unaonekana kabla ya kucheza" : "Hakikisho linaandaliwa"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-white/40 bg-[linear-gradient(135deg,rgba(36,47,74,0.90)_0%,rgba(72,84,116,0.82)_54%,rgba(121,98,96,0.72)_100%)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
            aria-label="Nyamazisha au washa sauti"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
            aria-label="Anza tena"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white transition hover:bg-[#44536B]"
            aria-label={isPlaying ? "Sitisha" : "Cheza"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-[#274463]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8C6A43] via-[#D6B16F] to-[#6E8FB3]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const videoElementsRef = useRef({});

  const registerVideo = (videoId, element) => {
    videoElementsRef.current[videoId] = element;
  };

  const unregisterVideo = (videoId) => {
    delete videoElementsRef.current[videoId];
  };

  const requestExclusivePlay = (activeVideoId) => {
    Object.entries(videoElementsRef.current).forEach(([videoId, element]) => {
      if (videoId !== String(activeVideoId) && element && !element.paused) {
        element.pause();
      }
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white selection:bg-[#E7C58F]/28"
      >
        <div className="absolute inset-0 bg-[#0F223A]" />

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(232,199,144,0.10),transparent_34%),radial-gradient(circle_at_76%_20%,rgba(110,143,179,0.10),transparent_38%),radial-gradient(circle_at_50%_82%,rgba(255,255,255,0.045),transparent_48%),radial-gradient(circle_at_30%_60%,rgba(199,212,229,0.05),transparent_36%)]" />
          {!isMobile &&
            crystalOrbs.map((orb, index) => (
              <motion.div
                key={index}
                className={`absolute ${orb.className}`}
                animate={orb.animate}
              />
            ))}
        </div>

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E7C58F]/20 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] shadow-[0_0_22px_rgba(231,197,143,0.16)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="Nembo ya Vituo vya Qurani vya Sana"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  Vituo vya Qurani vya Sana
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[#D6B16F]/35 hover:bg-[#44536B] hover:text-[#F1DEC0]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7C58F]/20 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Sana... Ujumbe kwa walimwengu</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-gradient-to-r from-[#F6E7C8] via-[#D6B16F] to-[#C7D4E5] bg-clip-text text-transparent">
                  Vituo vya Qurani vya Sana
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                Vituo vya sauti na picha vya tafsiri za maana za Qurani Tukufu kwa lugha zote za kimataifa - wakfu kwa ajili ya Allah.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(243,231,179,0.18)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  Gundua jukwaa
                </a>

                <a
                  href="https://youtube.com/@san-ar-m5i?si=RpejWa62nYgs2LGQ"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[#44536B] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  Tembelea chaneli yetu
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div className="text-xl font-black sm:text-2xl" style={{ color: ACCENT }}>
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className="rounded-[1.6rem] border border-white/40 bg-gradient-to-br from-white/10 to-white/5 p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">Lugha ya sasa</p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        Qurani kwa Kiarabu
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[#6E8FB3]/25 bg-[#A69498]/18 px-4 py-2 text-xs text-[#DCE8F5] sm:text-sm">
                      Matangazo ya moja kwa moja
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(44,57,88,0.92)_0%,rgba(83,97,130,0.84)_55%,rgba(129,104,102,0.76)_100%)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[#B8CBE3] sm:mt-0" />
                      <span>Sikiliza kisomo huku ukiona tafsiri ya maana za Qurani Tukufu</span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ width: [`${w - 14}%`, `${w}%`, `${w - 8}%`] }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-[#8C6A43] via-[#D6B16F] to-[#6E8FB3]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-3 sm:p-4"
                        >
                          <div className="text-sm font-bold sm:text-lg" style={{ color: ACCENT }}>
                            {item.value}
                          </div>
                          <div className="mt-1 text-[11px] text-white/60 sm:text-xs">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge icon={BookOpen} text="Utambulisho wa Qurani wa kimataifa" />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge icon={Building2} text="Utekelezaji na usimamizi" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[#0F223A]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-white/40 bg-[linear-gradient(135deg,rgba(34,46,73,0.86)_0%,rgba(70,83,114,0.78)_52%,rgba(119,96,94,0.68)_100%)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        Ushirikiano wa utekelezaji unaoaminika
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        Mradi wa 
                        <span className="font-bold text-white">Vituo vya Qurani vya Sana</span>{" "}
                        unatekelezwa na 
                        <span className="font-bold" style={{ color: ACCENT }}>
                          Saudi Jordanian Satellite Broadcasting Company (JASCO)
                        </span>{" "}
                        – Amman, Jordan, kwa uzoefu wa hali ya juu katika uzalishaji na utangazaji wa vyombo vya habari.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/40 bg-[linear-gradient(135deg,rgba(17,28,49,0.82)_0%,rgba(44,56,85,0.74)_60%,rgba(107,82,79,0.58)_100%)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4 sm:p-5">
                      <div className="text-sm text-white/60">Tovuti rasmi</div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">Jasco Media City</div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[#E7C58F]/25 bg-[#E7C58F]/10 px-5 py-3 text-sm text-[#F7E7C8] transition hover:bg-white/12 sm:text-base"
                      >
                        Tembelea tovuti ya Jasco
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "Vipengele vya jukwaa")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Sana... Ujumbe kwa walimwengu
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Jukwaa la Qurani linalotumia mbinu za kisasa kufikisha maana za Qurani Tukufu kwa walimwengu, kwa mtindo unaounganisha msingi wa kielimu wa Kiislamu na teknolojia za kisasa.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "Njia za uchapishaji na ufikiaji")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">Njia nyingi za uwepo</h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "Kazi zetu")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">Mifano ya kazi zetu</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Visomo vya Qurani vyenye utulivu na tafsiri za maana za aya za Qurani Tukufu kwa lugha mbalimbali za dunia - Sana... Ujumbe kwa walimwengu.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  videoId={i}
                  registerVideo={registerVideo}
                  unregisterVideo={unregisterVideo}
                  requestExclusivePlay={requestExclusivePlay}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "Athari ya mradi")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Athari ya mradi na uenezi wake duniani
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Ujumbe wa Qurani wa kimataifa uliotoa tafsiri zinazoaminika na uzoefu wenye athari,
                na kusaidia kufikisha maana za Qurani Tukufu katika nyumba duniani kote.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "Washirika wa mafanikio")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">Mafanikio yaliyojengwa na ushirikiano</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Mradi huu ulifanikiwa kwa ushirikiano wa kundi la taasisi bora, zikiwemo taasisi za kisheria, vyombo vya habari, uzalishaji, na wajitolea.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/40 bg-[#44536B] px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <span>Wasiliana nasi</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  Sana ni ujumbe wa kimataifa wa daawa, na tunafurahi kuwasiliana nanyi na kupokea maswali yenu, mapendekezo yenu, na ushirikiano wenu wakati wowote kwa njia wazi na ya moja kwa moja.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,rgba(17,28,49,0.82)_0%,rgba(44,56,85,0.74)_60%,rgba(107,82,79,0.58)_100%)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">Wasiliana nasi</div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-3 text-sm sm:text-base">
                        Timu yetu itafurahi kuwasaidia na kuwajibu haraka iwezekanavyo.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#E7C58F]/24 bg-[#E7C58F]/10 px-4 py-3 text-center text-sm font-semibold text-[#F7E7C8] transition hover:bg-white/12 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        Tuma
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-white/40 p-4 text-center sm:p-6 ${INNER_GRADIENT} flex h-full flex-col items-center justify-center`}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="Nembo ya Sana"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      Vituo vya Qurani vya Sana
                    </span>
                  </div>

                  <div className="mt-4 text-2xl font-black sm:text-3xl" style={{ color: ACCENT }}>
                    Sana... Ujumbe kwa walimwengu
                  </div>

                  <p className="mx-auto mt-4 max-w-[30rem] rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] px-4 py-4 text-sm leading-7 text-white/78 sm:px-5 sm:text-base sm:leading-8">
                    Vituo vya sauti na picha vya tafsiri za maana za Qurani Tukufu kwa lugha zote
                    za kimataifa, katika mradi wa wakfu unaounganisha uzuri wa uwasilishaji, usahihi wa maana, na roho
                    Ujumbe.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4 sm:p-5 flex flex-col items-center justify-center text-center">
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                      <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>Maelezo yetu</span>
                  </div>

                  <div className="w-full space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center justify-center gap-3 break-all rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(37,47,73,0.88)_0%,rgba(74,87,119,0.80)_52%,rgba(120,98,97,0.70)_100%)] px-4 py-3 text-sm transition hover:bg-[#44536B] sm:text-base"
                    >
                      <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      snachannel159@gmail.com
                    </a>

                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(37,47,73,0.88)_0%,rgba(74,87,119,0.80)_52%,rgba(120,98,97,0.70)_100%)] px-4 py-3 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      Amman - Jordan
                    </div>
                  </div>

                  <div className="mt-6 w-full rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(34,46,73,0.86)_0%,rgba(70,83,114,0.78)_52%,rgba(119,96,94,0.68)_100%)] p-4">
                    <a
                      href="https://www.facebook.com/share/1FVbmggbzc/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-[#44536B]"
                    >
                      <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                      Tufuate kwenye Facebook
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      Anza safari yako ya Qurani sasa
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/40 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 backdrop-blur-md sm:p-5 flex flex-col items-center justify-center text-center">
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                      <Link2 className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>Viungo vya programu yetu</span>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(34,46,73,0.86)_0%,rgba(70,83,114,0.78)_52%,rgba(119,96,94,0.68)_100%)] p-4">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      Pakua programu na anza kufuatilia maudhui ya Qurani kwa urahisi kupitia majukwaa rasmi.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4 transition hover:-translate-y-0.5 hover:bg-[#44536B]"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] p-4 transition hover:-translate-y-0.5 hover:bg-[#44536B]"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(121,95,88,0.18)_0%,rgba(72,82,109,0.28)_56%,rgba(42,52,78,0.34)_100%)] text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-white/40 bg-[linear-gradient(135deg,rgba(44,57,88,0.88)_0%,rgba(83,97,130,0.80)_55%,rgba(129,104,102,0.72)_100%)] p-4">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span>⭐ Ukadiriaji 4.9</span>
                        <span>🌍 Nchi 100+</span>
                      </div>

                      <a
                        href="https://www.youtube.com/@SAN-AR-m5i"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7C58F]/24 bg-[#E7C58F]/10 py-3 text-sm font-bold text-[#F7E7C8] transition hover:scale-[1.01] hover:bg-white/12"
                      >
                        <Sparkles className="h-4 w-4" />
                        Anza sasa
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/40 pt-5 text-center text-xs text-white/55 sm:text-sm">
                Haki zote zimehifadhiwa © Vituo vya Qurani vya Sana.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}