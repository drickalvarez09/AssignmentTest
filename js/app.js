const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* ---------- content ---------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Listings", href: "#listings" },
  { label: "Let's Move", href: "#value-props" },
  { label: "About Us", href: "#about" },
];

// same images the original site uses, served from its own public CDN
const IMAGES = {
  logo: "https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/blob-6c0c2e0.png/:/rs=h:167,cg:true,m/qt=q:95",
  hero: "https://img1.wsimg.com/isteam/getty/2223376026/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1920,m",
  headshot: "https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/photo-5db79f9.jpg/:/cr=t:14.07%25,l:0%25,w:100%25,h:66.64%25/rs=w:600,h:600,cg:true",
  mountainFalls: "https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/mtn%20falls%20pond.jpg/:/rs=w:1200,m",
  heroCropWide: "https://img1.wsimg.com/isteam/getty/2223376026/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,m",
  // additional stock photography already licensed for this site, previously
  // only used as small section backgrounds — reused here at full size for
  // the photo gallery carousel
  stockListing: "https://img1.wsimg.com/isteam/stock/3395/:/cr=t:11.02%25,l:0%25,w:100%25,h:77.95%25/rs=w:1200,h:600,cg:true",
  stockSales: "https://img1.wsimg.com/isteam/stock/107927/:/rs=w:1200,h:600,cg:true,m/cr=w:1200,h:600",
  stockGuide: "https://img1.wsimg.com/isteam/stock/771/:/cr=t:5.36%25,l:1.76%25,w:96.47%25,h:89.29%25/rs=w:1200,h:600,cg:true,m",
  stockRealEstate: "https://img1.wsimg.com/isteam/stock/12792/:/rs=w:730,h:730,cg:true,m/cr=w:730,h:730",
  stockAnyBudget: "https://img1.wsimg.com/isteam/stock/43920/:/rs=w:730,h:730,cg:true,m/cr=w:730,h:730",
  stockExpertise: "https://img1.wsimg.com/isteam/stock/kayaJdA/:/rs=w:730,h:730,cg:true,m/cr=w:730,h:730",
};

const AGENT = {
  name: "Marci Metzger",
  brokerage: "The Ridge Realty Group",
  phone: "(206) 919-6886",
  phoneHref: "tel:+12069196886",
  address: "3190 HW-160, Suite F, Pahrump, Nevada 89048",
  hours: "Open daily, 8:00 am – 7:00 pm",
  hoursNote: "Appointments outside office hours are available on request — just call.",
};

const SAMPLE_LISTINGS = [
  { id: 1, address: "4841 E Stoneham St", area: "East Pahrump", price: 599900, beds: 4, baths: 3, sqft: 2329, type: "House", status: "Active", photo: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" },
  { id: 2, address: "230 Greenwater St", area: "Central Pahrump", price: 485000, beds: 2, baths: 1.5, sqft: 903, type: "House", status: "Active", photo: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" },
  { id: 3, address: "4914 E Beacon Ridge Dr", area: "Mountain Falls", price: 325000, beds: 2, baths: 2, sqft: 1470, type: "House", status: "Active", photo: "https://images.pexels.com/photos/259593/pexels-photo-259593.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" },
  { id: 4, address: "4510 S Birch Ct", area: "Mountain Falls", price: 339000, beds: 3, baths: 2, sqft: 1644, type: "House", status: "Pending", photo: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" },
  { id: 5, address: "5300 E La Terra Ave", area: "East Pahrump", price: 299000, beds: 4, baths: 3.5, sqft: 2740, type: "House", status: "Active", photo: "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" },
  { id: 6, address: "2558 Blossom Ave", area: "Central Pahrump", price: 374000, beds: 3, baths: 3, sqft: 2322, type: "House", status: "New", photo: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" },
];

const GALLERY = [
  { id: "backdrop", file: IMAGES.heroCropWide, caption: "The Spring Mountains, Pahrump's backdrop" },
  { id: "mountain-falls", file: IMAGES.mountainFalls, caption: "Mountain Falls, one of Pahrump's most sought-after communities" },
  { id: "listing", file: IMAGES.stockListing, caption: "Getting every listing in front of the right buyers" },
  { id: "sales", file: IMAGES.stockSales, caption: "Nearly three decades of local sales experience" },
  { id: "guide", file: IMAGES.stockGuide, caption: "A steady hand from first showing to closing day" },
  { id: "real-estate", file: IMAGES.stockRealEstate, caption: "Real estate done right, from search to sale" },
  { id: "any-budget", file: IMAGES.stockAnyBudget, caption: "Any property, any budget — we'll help you find it" },
  { id: "expertise", file: IMAGES.stockExpertise, caption: "Trusted guidance through financing and beyond" },
];

const SERVICES = [
  {
    title: "Buying & selling",
    body: "Getting ready to sell, hunting for an investment property, or just curious what your place is worth? Our team walks you through it so the process never feels like a mystery.",
  },
  {
    title: "Any property, any budget",
    body: "Condo or ranch, fixer-upper or move-in-ready — we know this community because we live in it, and we'll help you find the right place at the right price.",
  },
  {
    title: "Guidance you can rely on",
    body: "Questions about financing, credit, or loan options? We'll connect you with people who can give you real answers, quickly, so you always know where you stand.",
  },
];

/* ---------- icons (small hand-drawn line icons, no icon library) ---------- */

function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...props}>
      <path className="icon-line" d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...props}>
      <path className="icon-line" d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path className="icon-line" d="M6 3h3l2 5-2.5 2a11 11 0 0 0 5.5 5.5l2-2.5 5 2v3a2 2 0 0 1-2 2C11 20 4 13 4 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path className="icon-line" d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle className="icon-line" cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <circle className="icon-line" cx="10.5" cy="10.5" r="6.5" />
      <path className="icon-line" d="M20 20l-5-5" />
    </svg>
  );
}

function IconHouse(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
      <path className="icon-line" d="M4 11.5 12 4l8 7.5" />
      <path className="icon-line" d="M6 10v9h12v-9" />
      <path className="icon-line" d="M10 19v-5h4v5" />
    </svg>
  );
}

function IconKey(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
      <circle className="icon-line" cx="8" cy="9" r="4" />
      <path className="icon-line" d="M11.3 11.7 20 20.5M16.5 16 19 18.5M14 18.5l2 2" />
    </svg>
  );
}

function IconChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path className="icon-line" d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function IconChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path className="icon-line" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconHandshake(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
      <path className="icon-line" d="M2 12l4-4 4 3 3-2 3 2 4-3 2 2-6 7-3-2-3 2z" />
    </svg>
  );
}

/* real (freely-licensed) photo first; if it ever fails to load, falls back
   to the drawn illustration rather than a broken-image icon */
function ListingPhoto({ listing, flip }) {
  const [broken, setBroken] = useState(false);
  return broken ? (
    <ListingArt flip={flip} />
  ) : (
    <img src={listing.photo} alt={`${listing.address}, ${listing.area}`} onError={() => setBroken(true)} />
  );
}

/* fallback art for a listing photo, in case the real photo above fails to
   load — a drawn scene in the site's own palette reads better than a
   broken-image icon */
function ListingArt({ flip }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ "--flip": flip ? -1 : 1 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="listingSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#37485A" />
          <stop offset="100%" stopColor="#C89B3C" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#listingSky)" />
      <circle cx="325" cy="65" r="24" fill="#F3ECDD" opacity="0.85" />
      <path d="M0,178 L60,120 120,158 200,88 260,148 320,108 400,148 400,300 0,300 Z" fill="#2A3846" opacity="0.55" />
      <rect x="0" y="228" width="400" height="72" fill="#E7CE96" />
      <path d="M108,150 L200,93 292,150 Z" fill="#211D1A" />
      <rect x="120" y="150" width="160" height="90" fill="#9C4A28" />
      <rect x="250" y="103" width="14" height="37" fill="#211D1A" />
      <rect x="140" y="175" width="26" height="26" fill="#F3ECDD" />
      <rect x="234" y="175" width="26" height="26" fill="#F3ECDD" />
      <rect x="185" y="190" width="30" height="50" fill="#211D1A" />
      <g stroke="#4C6B62" strokeWidth="8" strokeLinecap="round" fill="none">
        <path d="M90,242 L90,192" />
        <path d="M90,212 L70,212 L70,197" />
        <path d="M90,222 L108,222 L108,207" />
      </g>
    </svg>
  );
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
      <path d="M20 12.047C20 7.603 16.418 4 12 4s-8 3.603-8 8.047c0 4.017 2.925 7.346 6.75 7.95v-5.624H8.719v-2.326h2.031v-1.773c0-2.017 1.194-3.13 3.022-3.13.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.325H13.25v5.624c3.825-.604 6.75-3.933 6.75-7.95z" />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
      <path d="M14.667 12a2.57 2.57 0 0 0-.782-1.885A2.57 2.57 0 0 0 12 9.333a2.57 2.57 0 0 0-1.885.782A2.57 2.57 0 0 0 9.333 12c0 .736.26 1.365.782 1.885.52.521 1.149.782 1.885.782a2.57 2.57 0 0 0 1.885-.782c.521-.52.782-1.149.782-1.885zm1.437 0c0 1.139-.4 2.108-1.198 2.906-.798.799-1.767 1.198-2.906 1.198-1.139 0-2.108-.4-2.906-1.198-.799-.798-1.198-1.767-1.198-2.906 0-1.139.4-2.108 1.198-2.906.798-.799 1.767-1.198 2.906-1.198 1.139 0 2.108.4 2.906 1.198.799.798 1.198 1.767 1.198 2.906zm1.125-4.27c0 .263-.094.489-.281.676a.923.923 0 0 1-.677.282.923.923 0 0 1-.677-.282.923.923 0 0 1-.281-.677c0-.264.093-.49.28-.677a.923.923 0 0 1 .678-.281c.264 0 .49.094.677.281a.923.923 0 0 1 .281.677zM12 5.437l-.797-.006a56.514 56.514 0 0 0-1.099 0c-.25.004-.585.014-1.005.032-.42.017-.778.052-1.073.104a4.177 4.177 0 0 0-.745.192c-.347.14-.653.34-.916.605-.264.263-.466.569-.605.916-.076.202-.14.45-.192.745a8.255 8.255 0 0 0-.104 1.073c-.018.42-.028.755-.032 1.005-.003.25-.003.616 0 1.1l.006.796-.006.797c-.003.483-.003.849 0 1.099.004.25.014.585.032 1.005.017.42.052.778.104 1.073.052.295.116.543.192.745.14.347.34.653.605.916.263.264.569.466.916.605.202.076.45.14.745.192.295.052.653.087 1.073.104.42.018.755.028 1.005.032.25.003.616.003 1.1 0l.796-.005.797.005c.483.003.849.003 1.099 0 .25-.004.585-.014 1.005-.032.42-.017.778-.052 1.073-.104.295-.052.543-.116.745-.192.347-.14.653-.34.916-.605.264-.263.466-.569.605-.916.076-.202.14-.45.192-.745.052-.295.087-.653.104-1.073.018-.42.028-.755.032-1.005.003-.25.003-.616 0-1.1L18.562 12l.006-.797c.003-.483.003-.849 0-1.099a38.59 38.59 0 0 0-.032-1.005 8.255 8.255 0 0 0-.104-1.073 4.177 4.177 0 0 0-.192-.745 2.703 2.703 0 0 0-.605-.916 2.703 2.703 0 0 0-.916-.605 4.177 4.177 0 0 0-.745-.192 8.255 8.255 0 0 0-1.073-.104c-.42-.018-.755-.028-1.005-.032-.25-.003-.616-.003-1.1 0L12 5.438zM20 12c0 1.59-.017 2.691-.052 3.302-.07 1.445-.5 2.563-1.292 3.354-.791.792-1.91 1.222-3.354 1.292-.611.035-1.712.052-3.302.052s-2.691-.017-3.302-.052c-1.445-.07-2.563-.5-3.354-1.292-.792-.791-1.222-1.91-1.292-3.354C4.017 14.691 4 13.59 4 12s.017-2.691.052-3.302c.07-1.445.5-2.563 1.292-3.354.791-.792 1.91-1.222 3.354-1.292C9.309 4.017 10.41 4 12 4s2.691.017 3.302.052c1.445.07 2.563.5 3.354 1.292.792.791 1.222 1.91 1.292 3.354.035.611.052 1.712.052 3.302z" />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
      <path d="M5.181 4h13.634C19.468 4 20 4.518 20 5.153v13.692c0 .638-.532 1.155-1.184 1.155H5.181C4.53 20 4 19.483 4 18.845V5.153c0-.636.53-1.152 1.181-1.152zm3.754 3.574a1.376 1.376 0 00-2.752 0A1.38 1.38 0 007.56 8.95c.758 0 1.375-.618 1.375-1.376zM8.75 9.998H6.372v7.635H8.75V9.999zm1.485 0h.003v7.633h2.371v-3.777c0-.995.19-1.96 1.425-1.96 1.217 0 1.233 1.14 1.233 2.025v3.714h2.372v-4.188c0-2.056-.444-3.637-2.847-3.637-1.159 0-1.933.633-2.25 1.233h-.031V9.999h-2.273v-.002l-.003.002z" />
    </svg>
  );
}

function IconYelp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
      <path d="M9.988 14.158c-.037.01-3.983 1.134-4.224 1.134-.554-.029-.674-.515-.726-.99a6.35 6.35 0 0 1 .011-1.487c.07-.596.201-1.431.883-1.396.175 0 2.447.822 4.11 1.41.624.215.679 1.136-.054 1.33zm2.112-3.616c.065 1.213-.93 1.54-1.722.454L6.501 5.663c-.055-.21.011-.394.193-.553.57-.523 3.626-1.263 4.432-1.082.273.06.441.194.503.4.048.263.42 5.314.47 6.114zm-.051 5.232c0 .146.007 3.696-.062 3.857-.084.19-.256.308-.522.356-.368.054-.988-.06-1.86-.34-.803-.257-2.068-.682-1.798-1.349.102-.219 1.874-1.994 2.82-2.971.437-.483 1.45-.175 1.422.447zm6.572-3.74c-.204.118-4.041.896-4.307.972l.01-.02c-.66.15-1.29-.586-.85-1.098.136-.117 2.404-2.933 2.656-3.08.19-.113.412-.12.667-.018.671.28 2.01 2.003 2.094 2.686-.004.092.044.371-.27.558zm.368 4.15c-.098.654-1.623 2.33-2.327 2.571-.251.083-.47.064-.645-.063-.183-.111-2.254-3.083-2.367-3.248-.398-.514.248-1.263.933-1.054 0 0 4.03 1.133 4.184 1.25.19.131.262.312.222.544z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/MarciHomes/", Icon: IconFacebook },
  { label: "Instagram", href: "https://www.instagram.com/marcimetzger_theridge/", Icon: IconInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marci-metzger-30642496/", Icon: IconLinkedIn },
  { label: "Yelp", href: "https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w", Icon: IconYelp },
];

/* ---------- header ---------- */

function Logo({ className }) {
  const [broken, setBroken] = useState(false);
  return (
    <a href="#home" className={"shrink-0 " + (className || "")}>
      {!broken ? (
        <img
          src={IMAGES.logo}
          alt="Marci Metzger Homes"
          className="h-10 w-auto transition-opacity hover:opacity-80"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="font-serif text-lg tracking-tight">
          Marci Metzger <span className="text-clay">Homes</span>
        </span>
      )}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-sand/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link hover:text-clay transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href={AGENT.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-clay text-sand px-4 py-2 text-sm hover:bg-claydark hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <IconPhone /> {AGENT.phone}
          </a>
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-sand px-5 pb-5 pt-2 flex flex-col gap-3 text-sm">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-1 hover:text-clay transition-colors">
              {link.label}
            </a>
          ))}
          <a href={AGENT.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-clay text-sand px-4 py-2 mt-1 w-fit hover:bg-claydark transition-colors">
            <IconPhone /> {AGENT.phone}
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="home" className="relative pt-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-40 sm:pt-36 sm:pb-52">
        <p className="text-sand/80 text-sm sm:text-base mb-4">{AGENT.name} · {AGENT.brokerage}</p>
        <h1 className="font-serif text-sand text-4xl sm:text-6xl leading-[1.08] max-w-2xl">
          Nearly three decades finding the right home in Pahrump.
        </h1>
        <p className="text-sand/85 mt-5 max-w-lg text-base sm:text-lg">
          A licensed broker's eye from Seattle, now put to work for buyers and sellers across Southern Nevada.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href={AGENT.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-6 py-3 font-medium hover:bg-sand hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <IconPhone /> Call {AGENT.phone}
          </a>
          <a
            href="#listings"
            className="inline-flex items-center gap-2 rounded-full border border-sand/50 text-sand px-6 py-3 font-medium hover:bg-sand/10 hover:border-sand transition-all"
          >
            Search listings
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- stats ---------- */

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function StatsBar() {
  const [ref, inView] = useInView();
  const years = useCountUp(28, inView);
  const clients = useCountUp(90, inView);
  const sales = useCountUp(285, inView);

  return (
    <section ref={ref} className="bg-ink text-sand py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-sand/70 text-sm mb-8">Top residential sales, five years running</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <p className="stat-number font-serif text-5xl">{years}+</p>
            <p className="mt-2 text-sand/70">years in real estate</p>
          </div>
          <div>
            <p className="stat-number font-serif text-5xl">{clients}</p>
            <p className="mt-2 text-sand/70">households served in 2021</p>
          </div>
          <div>
            <p className="stat-number font-serif text-5xl">${(sales / 10).toFixed(1)}M</p>
            <p className="mt-2 text-sand/70">closed in sales that year</p>
          </div>
        </div>
        <p className="mt-10 max-w-2xl text-sand/75 leading-relaxed">
          Our team works hard every day to grow and learn, so we can keep excelling in this market.
          Our clients deserve nothing less than our best — and we push to make that best a little
          better every year.
        </p>
      </div>
    </section>
  );
}

/* ---------- value props ---------- */

function ValueProps() {
  return (
    <section id="value-props" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-12">
        <div className="group">
          <IconKey className="text-clay transition-transform duration-300 group-hover:-translate-y-1" />
          <h2 className="font-serif text-2xl sm:text-3xl mt-4">Don't just list it.</h2>
          <p className="mt-3 text-ink/75 leading-relaxed max-w-md">
            We get it sold. We put your home in front of every buyer who might want it, using every
            channel available, so you walk away with the strongest offer the market will bear.
          </p>
        </div>
        <div className="group">
          <IconHouse className="text-clay transition-transform duration-300 group-hover:-translate-y-1" />
          <h2 className="font-serif text-2xl sm:text-3xl mt-4">A guide for buyers.</h2>
          <p className="mt-3 text-ink/75 leading-relaxed max-w-md">
            Nobody knows this market better than we do. You'll get a market analysis, an upgrades
            list, and a contractor on speed dial — a pro in your corner the whole way through.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- listings search ---------- */

function formatPrice(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const FIELD_CLASS =
  "filter-field rounded-lg border border-ink/20 bg-sand px-3 py-2 transition-colors hover:border-clay/50 focus:border-clay focus:outline-none";

function ListingsSearch() {
  const areas = useMemo(() => ["All areas", ...new Set(SAMPLE_LISTINGS.map((l) => l.area))], []);
  const [area, setArea] = useState("All areas");
  const [minBeds, setMinBeds] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeListing, setActiveListing] = useState(null);

  const filtered = useMemo(() => {
    let list = SAMPLE_LISTINGS.filter((l) => {
      if (area !== "All areas" && l.area !== area) return false;
      if (minBeds !== "Any" && l.beds < Number(minBeds)) return false;
      if (maxPrice && l.price > Number(maxPrice)) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "beds":
        list = [...list].sort((a, b) => b.beds - a.beds);
        break;
      default:
        list = [...list].sort((a, b) => b.id - a.id);
    }
    return list;
  }, [area, minBeds, maxPrice, sortBy]);

  // remounting the results block on every filter change is what lets the
  // CSS "resultsIn" keyframes (see style.css) replay as a quiet fade + rise,
  // instead of the cards just snapping to their new state
  const resultsKey = [area, minBeds, maxPrice, sortBy].join("|");

  return (
    <section id="listings" className="py-20 sm:py-28 bg-dusk/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Find your next home</h2>
            <p className="mt-2 text-ink/70">Sample listings shown below — connect a live MLS feed for real-time inventory.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <label className="flex flex-col gap-1 text-sm">
            Area
            <select value={area} onChange={(e) => setArea(e.target.value)} className={FIELD_CLASS}>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Bedrooms
            <select value={minBeds} onChange={(e) => setMinBeds(e.target.value)} className={FIELD_CLASS}>
              {["Any", "2", "3", "4"].map((n) => <option key={n} value={n}>{n === "Any" ? n : n + "+"}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Max price
            <input
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={FIELD_CLASS}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Sort by
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={FIELD_CLASS}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="beds">Bedrooms</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p key={resultsKey} className="results-transition text-ink/60 py-10 text-center">
            No listings match those filters right now — try widening your search.
          </p>
        ) : (
          <div key={resultsKey} className="results-transition grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l, i) => (
              <article
                key={l.id}
                style={{ "--i": i }}
                role="button"
                tabIndex={0}
                onClick={() => setActiveListing(l)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveListing(l);
                  }
                }}
                className="lift-on-hover bg-sand border border-ink/10 rounded-xl overflow-hidden cursor-pointer text-left"
              >
                <div className="photo-frame h-40 zoom-on-hover">
                  <ListingPhoto listing={l} flip={i % 2 === 1} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"></div>
                  <div className="fallback-label">{l.area}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-xl">{formatPrice(l.price)}</p>
                    <span className={
                      "text-xs px-2 py-1 rounded-full transition-transform hover:scale-105 " +
                      (l.status === "Active" ? "bg-dusk/10 text-dusk" : l.status === "Pending" ? "bg-gold/20 text-claydark" : "bg-clay/10 text-clay")
                    }>
                      {l.status}
                    </span>
                  </div>
                  <p className="mt-1 text-ink/80">{l.address}</p>
                  <p className="text-sm text-ink/55">{l.area}</p>
                  <div className="mt-3 flex gap-4 text-sm text-ink/70">
                    <span>{l.beds} bd</span>
                    <span>{l.baths} ba</span>
                    <span>{l.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <ListingModal listing={activeListing} onClose={() => setActiveListing(null)} />
    </section>
  );
}

/* a listing card opens this for a closer look — it's deliberately a dead
   end (a call button and a close button, nothing else) rather than a link
   to a "full listing" page, since this is a single page and that page
   doesn't exist */
function ListingModal({ listing, onClose }) {
  useEffect(() => {
    if (!listing) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [listing, onClose]);

  if (!listing) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="modal-panel max-w-lg w-full bg-sand rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="photo-frame h-44">
          <ListingPhoto listing={listing} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"></div>
          <div className="fallback-label">{listing.area}</div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-2xl">{formatPrice(listing.price)}</p>
              <p className="mt-1 text-ink/80">{listing.address}</p>
              <p className="text-sm text-ink/55">{listing.area}</p>
            </div>
            <span className={
              "shrink-0 text-xs px-2 py-1 rounded-full " +
              (listing.status === "Active" ? "bg-dusk/10 text-dusk" : listing.status === "Pending" ? "bg-gold/20 text-claydark" : "bg-clay/10 text-clay")
            }>
              {listing.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4 text-center border-y border-ink/10 py-4">
            <div>
              <p className="font-serif text-xl">{listing.beds}</p>
              <p className="text-xs text-ink/55 mt-1">Bedrooms</p>
            </div>
            <div>
              <p className="font-serif text-xl">{listing.baths}</p>
              <p className="text-xs text-ink/55 mt-1">Bathrooms</p>
            </div>
            <div>
              <p className="font-serif text-xl">{listing.sqft.toLocaleString()}</p>
              <p className="text-xs text-ink/55 mt-1">Sq. ft.</p>
            </div>
          </div>

          <p className="mt-5 text-sm text-ink/60">
            Sample listing shown for demonstration — connect a live MLS feed for real photos and full disclosures.
          </p>

          <div className="mt-6 flex items-center gap-5">
            <a
              href={AGENT.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-clay text-sand px-5 py-2.5 text-sm font-medium hover:bg-claydark hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <IconPhone /> Ask about this home
            </a>
            <button onClick={onClose} className="text-sm text-ink/60 hover:text-ink transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- gallery ---------- */

function GalleryTile({ item, onOpen }) {
  const [broken, setBroken] = useState(false);

  return (
    <button
      onClick={onOpen}
      aria-label={item.caption}
      className="photo-frame zoom-on-hover lift-on-hover aspect-[4/3] text-left w-full"
    >
      {!broken && (
        <img src={item.file} alt={item.caption} onError={() => setBroken(true)} />
      )}
    </button>
  );
}

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const touchStartX = useRef(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)),
    []
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)),
    []
  );

  // any tile opens the same carousel, starting on the photo that was
  // clicked, so the whole collection is always reachable from there
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex === null ? null : GALLERY[activeIndex];

  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl mb-10">Photo gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY.map((item, i) => (
            <div key={item.id} className="relative">
              <GalleryTile item={item} onOpen={() => setActiveIndex(i)} />
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox-backdrop" onClick={close}>
          <div className="modal-panel max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div
              className="carousel-frame photo-frame aspect-[16/10] relative"
              onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                touchStartX.current = null;
                // ignore small taps/jitter — only treat a deliberate horizontal
                // drag as a swipe, so tapping the image itself still does nothing
                if (Math.abs(dx) < 40) return;
                if (dx < 0) showNext(); else showPrev();
              }}
            >
              {/* keying by file makes React remount the img on every
                  navigation, which replays the CSS "frameIn" fade rather
                  than snapping straight to the next photo */}
              <img
                key={active.file}
                src={active.file}
                alt={active.caption}
                onError={(e) => (e.target.style.display = "none")}
              />

              <button
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                aria-label="Previous photo"
                className="carousel-arrow z-10 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-10 sm:w-10 rounded-full bg-ink/50 text-sand flex items-center justify-center"
              >
                <IconChevronLeft />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                aria-label="Next photo"
                className="carousel-arrow z-10 absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-10 sm:w-10 rounded-full bg-ink/50 text-sand flex items-center justify-center"
              >
                <IconChevronRight />
              </button>
            </div>

            <div className="flex items-center justify-end mt-4 gap-4">
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5">
                  {GALLERY.map((item, i) => (
                    <span
                      key={item.id}
                      aria-current={i === activeIndex}
                      className={"carousel-dot h-1.5 w-1.5 rounded-full " + (i === activeIndex ? "bg-gold" : "bg-sand/40")}
                    ></span>
                  ))}
                </div>
                <span className="text-sand/60 text-sm">{activeIndex + 1} / {GALLERY.length}</span>
                <button onClick={close} aria-label="Close gallery" className="text-sand/80 hover:text-sand transition-colors">
                  <IconClose />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- services ---------- */

function Services() {
  const icons = [IconHandshake, IconHouse, IconKey];
  return (
    <section className="py-20 sm:py-28 bg-ink text-sand">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl mb-12">Real estate, done right</h2>
        <div className="grid sm:grid-cols-3 gap-10">
          {SERVICES.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={s.title} className="group border-t border-sand/20 pt-6 transition-colors hover:border-gold/60">
                <Icon className="text-gold transition-transform duration-300 group-hover:-translate-y-1" />
                <h3 className="font-serif text-xl mt-4">{s.title}</h3>
                <p className="mt-3 text-sand/70 leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  const [broken, setBroken] = useState(false);
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-[220px_1fr] gap-10 items-start">
        <div className="photo-frame rounded-full w-40 h-40 md:w-52 md:h-52 mx-auto md:mx-0">
          {!broken ? (
            <img src={IMAGES.headshot} alt={AGENT.name} onError={() => setBroken(true)} className="rounded-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-serif text-3xl text-sand">MM</div>
          )}
        </div>
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl">About {AGENT.name}</h2>
          <p className="mt-4 text-ink/75 leading-relaxed max-w-2xl">
            Marci Metzger built her career as a licensed broker in Seattle before bringing that
            same standard of care to Southern Nevada. Today she's one of Pahrump's most trusted
            agents, working with {AGENT.brokerage} to help buyers and sellers move through one
            of the biggest decisions of their lives with confidence instead of stress.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sent");
  };

  return (
    <section className="py-20 sm:py-28 bg-dusk/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl">Call or visit</h2>
          <div className="mt-6 space-y-4 text-ink/80">
            <p className="flex items-center gap-3"><IconPin className="text-clay shrink-0" /> {AGENT.address}</p>
            <p className="flex items-center gap-3">
              <IconPhone className="text-clay shrink-0" />
              <a href={AGENT.phoneHref} className="hover:text-clay transition-colors underline-offset-4 hover:underline">{AGENT.phone}</a>
            </p>
          </div>
          <div className="mt-6">
            <p className="font-medium">Office hours</p>
            <p className="text-ink/70">{AGENT.hours}</p>
            <p className="text-ink/60 text-sm mt-1">{AGENT.hoursNote}</p>
          </div>
          <a
            href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(AGENT.address)}
            target="_blank" rel="noopener noreferrer"
            className="inline-block mt-6 text-clay hover:text-claydark underline underline-offset-4 transition-colors"
          >
            Get directions
          </a>
        </div>

        <div>
          <h2 className="font-serif text-3xl sm:text-4xl">Send a message</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
            <label className="block text-sm">
              Name
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-ink/20 bg-sand px-3 py-2 transition-colors hover:border-clay/50 focus:border-clay"
              />
            </label>
            <label className="block text-sm">
              Email
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-ink/20 bg-sand px-3 py-2 transition-colors hover:border-clay/50 focus:border-clay"
              />
            </label>
            <label className="block text-sm">
              Message
              <textarea
                name="message" rows="4" value={form.message} onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-ink/20 bg-sand px-3 py-2 transition-colors hover:border-clay/50 focus:border-clay"
              />
            </label>

            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-clay text-sand px-6 py-3 font-medium hover:bg-claydark hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Send
            </button>

            {status === "sent" && <p className="text-dusk">Thanks — Marci's team will get back to you shortly.</p>}
            {status === "error" && <p className="text-clay">Please add your name and email before sending.</p>}

            <p className="text-xs text-ink/50 pt-2">
              This site is protected by reCAPTCHA, and the Google Privacy Policy and Terms of
              Service apply.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="bg-ink text-sand/70 py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="text-sand/60 hover:text-gold transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm border-t border-sand/10 pt-6">
          <p>{AGENT.name} — {AGENT.brokerage}</p>
          <p>&copy; {new Date().getFullYear()} {AGENT.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- app ---------- */

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <ValueProps />
        <ListingsSearch />
        <Gallery />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
