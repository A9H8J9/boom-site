import type { Accent } from "@/lib/accents";

export const currentUser = {
  name: "سارا محمدی",
  email: "sara@boom.studio",
  initials: "س‌م",
  role: "مالک فضای کاری",
  plan: "حرفه‌ای",
};

export const recentCanvases = [
  { title: "نقشهٔ راه بهار", accent: "clay" as Accent, emoji: "🌱" },
  { title: "بریف کمپین نوروز", accent: "amber" as Accent, emoji: "✨" },
  { title: "ایده‌های نیمه‌کاره", accent: "violet" as Accent, emoji: "💡" },
  { title: "دفترچهٔ جلسه‌ها", accent: "teal" as Accent, emoji: "🗒️" },
];

export const workspaces = [
  {
    name: "استودیو بوم",
    description: "دفترچهٔ ایده‌های تیم محصول؛ از جرقه تا انتشار.",
    accent: "clay" as Accent,
    emoji: "🎨",
    members: 8,
    canvases: 24,
    updated: "۳ دقیقه پیش",
    avatars: ["س‌م", "ا‌ر", "ن‌ک", "م‌ت"],
  },
  {
    name: "پروژهٔ نور",
    description: "راه‌اندازی نسخهٔ تازهٔ محصول و کمپین معرفی.",
    accent: "teal" as Accent,
    emoji: "🛠️",
    members: 5,
    canvases: 12,
    updated: "۱ ساعت پیش",
    avatars: ["س‌م", "م‌ت", "پ‌ن"],
  },
  {
    name: "آتلیه",
    description: "مرجع بصری، بریف‌ها و فایل‌های طراحی.",
    accent: "violet" as Accent,
    emoji: "🖌️",
    members: 3,
    canvases: 18,
    updated: "دیروز",
    avatars: ["ن‌ک", "س‌م", "ر‌ب"],
  },
  {
    name: "یادداشت‌های من",
    description: "جایی برای فکرهای نیمه‌کاره و لیست‌های شخصی.",
    accent: "amber" as Accent,
    emoji: "📓",
    members: 1,
    canvases: 31,
    updated: "۲ روز پیش",
    avatars: ["س‌م"],
  },
  {
    name: "تحصیل",
    description: "درس‌ها، خلاصه‌ها و برنامهٔ مطالعهٔ هفتگی.",
    accent: "sage" as Accent,
    emoji: "📚",
    members: 2,
    canvases: 9,
    updated: "۴ روز پیش",
    avatars: ["س‌م", "ه‌ا"],
  },
  {
    name: "سفر",
    description: "برنامه‌ریزی سفرها، بودجه و لیست وسایل.",
    accent: "rose" as Accent,
    emoji: "🧭",
    members: 2,
    canvases: 6,
    updated: "۱ هفته پیش",
    avatars: ["س‌م", "ا‌ر"],
  },
];

export const projects = [
  {
    name: "بازطراحی وب‌سایت",
    description: "زبان بصری تازه، صفحهٔ اصلی و صفحات محصول.",
    accent: "clay" as Accent,
    status: "در جریان",
    progress: 72,
    due: "۲۲ آبان",
    tasks: 14,
    members: ["س‌م", "ن‌ک", "ا‌ر"],
    cover: "canvas" as const,
  },
  {
    name: "انتشار نسخهٔ ۲",
    description: "همگام‌سازی تیم فنی تا روز انتشار.",
    accent: "teal" as Accent,
    status: "در جریان",
    progress: 48,
    due: "۵ آذر",
    tasks: 26,
    members: ["م‌ت", "س‌م", "پ‌ن"],
    cover: "board" as const,
  },
  {
    name: "کمپین بهار",
    description: "تقویم محتوا، کپی و هماهنگی با رسانه‌ها.",
    accent: "amber" as Accent,
    status: "در جریان",
    progress: 35,
    due: "۱۸ آذر",
    tasks: 18,
    members: ["ا‌ر", "ر‌ب"],
    cover: "timeline" as const,
  },
  {
    name: "کتاب راهنمای برند",
    description: "لحن، رنگ، تایپوگرافی و اجزای بصری.",
    accent: "violet" as Accent,
    status: "بازبینی",
    progress: 88,
    due: "۱۲ آبان",
    tasks: 9,
    members: ["ن‌ک", "س‌م"],
    cover: "doc" as const,
  },
  {
    name: "پژوهش کاربر",
    description: "مصاحبه‌ها، یافته‌ها و نقشهٔ سفر مشتری.",
    accent: "sage" as Accent,
    status: "بازبینی",
    progress: 61,
    due: "۲۸ آبان",
    tasks: 11,
    members: ["پ‌ن", "س‌م", "ه‌ا"],
    cover: "table" as const,
  },
  {
    name: "اپ موبایل",
    description: "نمونهٔ اولیهٔ جریان ساخت روی بوم.",
    accent: "sky" as Accent,
    status: "طرح‌ریزی",
    progress: 12,
    due: "به‌زودی",
    tasks: 7,
    members: ["م‌ت", "س‌م"],
    cover: "gallery" as const,
  },
];

export const projectTabs = ["همه", "در جریان", "بازبینی", "طرح‌ریزی"];

export type Task = {
  title: string;
  accent: Accent;
  tag: string;
  due: string;
  assignee: string;
  comments?: number;
  subtasks?: string;
  done?: boolean;
  priority?: "بالا" | "متوسط" | "پایین";
};

export const taskColumns: { title: string; count: number; tasks: Task[] }[] = [
  {
    title: "صف انتظار",
    count: 4,
    tasks: [
      {
        title: "نوشتن بریف صفحهٔ اصلی",
        accent: "clay",
        tag: "محتوا",
        due: "شنبه",
        assignee: "س‌م",
        comments: 3,
        subtasks: "۱/۵",
        priority: "بالا",
      },
      {
        title: "جمع‌آوری مراجع بصری",
        accent: "violet",
        tag: "طراحی",
        due: "یک‌شنبه",
        assignee: "ن‌ک",
        comments: 1,
        priority: "متوسط",
      },
      {
        title: "لیست کانال‌های کمپین",
        accent: "amber",
        tag: "بازاریابی",
        due: "بدون تاریخ",
        assignee: "ر‌ب",
        priority: "پایین",
      },
      {
        title: "بررسی دسترسی‌پذیری رنگ‌ها",
        accent: "teal",
        tag: "کیفیت",
        due: "دوشنبه",
        assignee: "ا‌ر",
        comments: 2,
        priority: "متوسط",
      },
    ],
  },
  {
    title: "در حال انجام",
    count: 3,
    tasks: [
      {
        title: "طراحی صفحهٔ قالب‌ها",
        accent: "clay",
        tag: "طراحی",
        due: "امروز",
        assignee: "ن‌ک",
        comments: 5,
        subtasks: "۳/۶",
        priority: "بالا",
      },
      {
        title: "پیاده‌سازی ویرایشگر بوم",
        accent: "teal",
        tag: "مهندسی",
        due: "چهارشنبه",
        assignee: "م‌ت",
        comments: 4,
        subtasks: "۲/۸",
        priority: "بالا",
      },
      {
        title: "مصاحبهٔ کاربر پنجم",
        accent: "sage",
        tag: "پژوهش",
        due: "فردا",
        assignee: "پ‌ن",
        priority: "متوسط",
      },
    ],
  },
  {
    title: "بازبینی",
    count: 2,
    tasks: [
      {
        title: "لحن متن اعلان‌ها",
        accent: "violet",
        tag: "محتوا",
        due: "امروز",
        assignee: "س‌م",
        comments: 6,
        priority: "متوسط",
      },
      {
        title: "نسخهٔ اول راهنمای برند",
        accent: "amber",
        tag: "برند",
        due: "پنج‌شنبه",
        assignee: "ر‌ب",
        comments: 2,
        subtasks: "۵/۵",
        priority: "پایین",
      },
    ],
  },
  {
    title: "انجام شده",
    count: 3,
    tasks: [
      {
        title: "تعریف ساختار فضای کاری",
        accent: "teal",
        tag: "محصول",
        due: "دیروز",
        assignee: "س‌م",
        done: true,
      },
      {
        title: "راه‌اندازی مخزن طراحی",
        accent: "sage",
        tag: "طراحی",
        due: "۲ روز پیش",
        assignee: "ن‌ک",
        done: true,
      },
      {
        title: "انتخاب فونت فارسی",
        accent: "clay",
        tag: "برند",
        due: "۳ روز پیش",
        assignee: "س‌م",
        done: true,
      },
    ],
  },
];

export const templateCategories = [
  "همه",
  "بوم آزاد",
  "محصول",
  "طراحی",
  "شخصی",
  "تیم",
];

export const templates = [
  {
    name: "بوم خالی",
    description: "یک صفحهٔ سفید با شبکهٔ نقطه‌ای؛ هرچی خواستی بساز.",
    category: "بوم آزاد",
    accent: "slate" as Accent,
    kind: "canvas" as const,
    uses: "۱۲٫۴ هزار",
    badge: "پرجستجو",
  },
  {
    name: "نقشهٔ راه محصول",
    description: "از ایده تا انتشار، روی یک تخته.",
    category: "محصول",
    accent: "clay" as Accent,
    kind: "timeline" as const,
    uses: "۸٫۱ هزار",
  },
  {
    name: "برد وظایف",
    description: "ستون‌های کشیدنی برای مدیریت جریان کار.",
    category: "تیم",
    accent: "teal" as Accent,
    kind: "board" as const,
    uses: "۹٫۷ هزار",
  },
  {
    name: "سند بریف طراحی",
    description: "قالبی روشن برای نوشتن بریف و جمع‌آوری بازخورد.",
    category: "طراحی",
    accent: "violet" as Accent,
    kind: "doc" as const,
    uses: "۶٫۳ هزار",
  },
  {
    name: "پایگاه‌دادهٔ مراجع",
    description: "جدولی مرتب از منابع، لینک‌ها و وضعیت.",
    category: "طراحی",
    accent: "amber" as Accent,
    kind: "table" as const,
    uses: "۵٫۲ هزار",
  },
  {
    name: "دفترچهٔ ایده‌ها",
    description: "یادداشت‌های سریع با تگ، تاریخ و حال‌وهوا.",
    category: "شخصی",
    accent: "rose" as Accent,
    kind: "list" as const,
    uses: "۴٫۸ هزار",
  },
  {
    name: "ویکی تیم",
    description: "دانش تیم، فرایندها و پاسخ‌های پرتکرار.",
    category: "تیم",
    accent: "sage" as Accent,
    kind: "wiki" as const,
    uses: "۳٫۹ هزار",
  },
  {
    name: "پژوهش کاربر",
    description: "مصاحبه‌ها، یافته‌ها و بینش‌های کلیدی.",
    category: "محصول",
    accent: "sky" as Accent,
    kind: "gallery" as const,
    uses: "۲٫۶ هزار",
  },
];

export const activity = [
  {
    person: "نگار کیانی",
    initials: "ن‌ک",
    accent: "violet" as Accent,
    action: "سه بلوک تازه به",
    target: "بازطراحی وب‌سایت",
    time: "۱۲ دقیقه پیش",
    kind: "added" as const,
  },
  {
    person: "امیر رضایی",
    initials: "ا‌ر",
    accent: "teal" as Accent,
    action: "برد وظایف را به‌روز کرد:",
    target: "انتشار نسخهٔ ۲",
    time: "۴۵ دقیقه پیش",
    kind: "updated" as const,
  },
  {
    person: "سارا محمدی",
    initials: "س‌م",
    accent: "clay" as Accent,
    action: "قالب تازه‌ای ساخت:",
    target: "نقشهٔ سفر مشتری",
    time: "۲ ساعت پیش",
    kind: "created" as const,
  },
  {
    person: "پویا نادری",
    initials: "پ‌ن",
    accent: "sky" as Accent,
    action: "در",
    target: "پژوهش کاربر",
    time: "دیروز",
    kind: "commented" as const,
  },
  {
    person: "رها بهرامی",
    initials: "ر‌ب",
    accent: "amber" as Accent,
    action: "فایلی پیوست کرد به",
    target: "کمپین بهار",
    time: "دیروز",
    kind: "added" as const,
  },
];

export const team = [
  {
    name: "سارا محمدی",
    email: "sara@boom.studio",
    initials: "س‌م",
    accent: "clay" as Accent,
    role: "مالک",
    status: "فعال",
    lastSeen: "الان آنلاین",
  },
  {
    name: "امیر رضایی",
    email: "amir@boom.studio",
    initials: "ا‌ر",
    accent: "teal" as Accent,
    role: "مدیر",
    status: "فعال",
    lastSeen: "۵ دقیقه پیش",
  },
  {
    name: "نگار کیانی",
    email: "negar@boom.studio",
    initials: "ن‌ک",
    accent: "violet" as Accent,
    role: "ویرایشگر",
    status: "فعال",
    lastSeen: "۲۰ دقیقه پیش",
  },
  {
    name: "محمد تهرانی",
    email: "mohammad@boom.studio",
    initials: "م‌ت",
    accent: "sage" as Accent,
    role: "ویرایشگر",
    status: "فعال",
    lastSeen: "۱ ساعت پیش",
  },
  {
    name: "پویا نادری",
    email: "pouya@boom.studio",
    initials: "پ‌ن",
    accent: "sky" as Accent,
    role: "عضو",
    status: "فعال",
    lastSeen: "دیروز",
  },
  {
    name: "رها بهرامی",
    email: "raha@boom.studio",
    initials: "ر‌ب",
    accent: "amber" as Accent,
    role: "عضو",
    status: "دعوت‌شده",
    lastSeen: "در انتظار پذیرش",
  },
  {
    name: "هستی اکبری",
    email: "hasti@boom.studio",
    initials: "ه‌ا",
    accent: "rose" as Accent,
    role: "مهمان",
    status: "فعال",
    lastSeen: "۳ روز پیش",
  },
];

export const favoriteItems = [
  {
    title: "نقشهٔ راه بهار",
    type: "بوم",
    workspace: "استودیو بوم",
    updated: "۳ دقیقه پیش",
    accent: "clay" as Accent,
    kind: "canvas" as const,
  },
  {
    title: "کتاب راهنمای برند",
    type: "سند",
    workspace: "آتلیه",
    updated: "دیروز",
    accent: "violet" as Accent,
    kind: "doc" as const,
  },
  {
    title: "برد وظایف محصول",
    type: "تخته",
    workspace: "پروژهٔ نور",
    updated: "۲ ساعت پیش",
    accent: "teal" as Accent,
    kind: "board" as const,
  },
  {
    title: "مراجع بصری ۱۴۰۵",
    type: "پایگاه‌داده",
    workspace: "آتلیه",
    updated: "۲ روز پیش",
    accent: "amber" as Accent,
    kind: "table" as const,
  },
  {
    title: "دفترچهٔ جلسه‌ها",
    type: "یادداشت",
    workspace: "یادداشت‌های من",
    updated: "۴ روز پیش",
    accent: "sage" as Accent,
    kind: "list" as const,
  },
  {
    title: "طرح اولیهٔ اپ",
    type: "نمونه",
    workspace: "پروژهٔ نور",
    updated: "۱ هفته پیش",
    accent: "sky" as Accent,
    kind: "gallery" as const,
  },
];

export const trashItems = [
  {
    title: "ایده‌های دورریز",
    type: "بوم",
    deleted: "امروز، ۱۴:۲۲",
    by: "سارا محمدی",
    days: 29,
  },
  {
    title: "نسخهٔ قدیمی بریف",
    type: "سند",
    deleted: "دیروز، ۰۹:۱۰",
    by: "نگار کیانی",
    days: 28,
  },
  {
    title: "جدول بودجهٔ آزمایشی",
    type: "پایگاه‌داده",
    deleted: "۳ آبان",
    by: "امیر رضایی",
    days: 24,
  },
  {
    title: "یادداشت جلسهٔ لغوشده",
    type: "یادداشت",
    deleted: "۲۸ مهر",
    by: "سارا محمدی",
    days: 19,
  },
  {
    title: "تصاویر بدون استفاده",
    type: "فایل",
    deleted: "۲۱ مهر",
    by: "رها بهرامی",
    days: 12,
  },
];

export const aiConversations = [
  { title: "خلاصهٔ مصاحبه‌های کاربر", time: "امروز", accent: "clay" as Accent },
  { title: "ایده برای کمپین بهار", time: "دیروز", accent: "amber" as Accent },
  { title: "بازنویسی لحنページ اصلی", time: "۳ روز پیش", accent: "violet" as Accent },
  { title: "ساخت نقشهٔ راه", time: "هفتهٔ پیش", accent: "teal" as Accent },
  { title: "بررسی ساختار بوم", time: "هفتهٔ پیش", accent: "sage" as Accent },
];

export const blogPosts = [
  {
    title: "چرا فکر کردن روی کاغذ هنوز کار می‌کند؟",
    excerpt:
      "دربارهٔ ارزش فضای باز و بی‌ساختار در برابر قالب‌های آماده؛ و اینکه چطور بوم تلاش می‌کند آن حس را به صفحه بیاورد.",
    category: "طرز فکر",
    date: "۱۸ آبان ۱۴۰۵",
    read: "۶ دقیقه",
    accent: "clay" as Accent,
    kind: "canvas" as const,
    featured: true,
  },
  {
    title: "بوم را برای چه چیزی بسازیم؟",
    excerpt: "پنج الگوی ساده برای شروع: از جمع‌آوری خام ایده تا نقشهٔ راه.",
    category: "راهنما",
    date: "۱۲ آبان ۱۴۰۵",
    read: "۴ دقیقه",
    accent: "teal" as Accent,
    kind: "board" as const,
  },
  {
    title: "داستان تایپوگرافی فارسی بوم",
    excerpt: "چطور به وزیرمتن رسیدیم و چرا خوانایی از زیبایی مهم‌تر است.",
    category: "طراحی",
    date: "۵ آبان ۱۴۰۵",
    read: "۷ دقیقه",
    accent: "violet" as Accent,
    kind: "doc" as const,
  },
  {
    title: "از ایده تا انتشار در چهار هفته",
    excerpt: "گزارشی از روند ساخت نسخهٔ اول با یک تیم چهارنفره.",
    category: "پشت صحنه",
    date: "۲۸ مهر ۱۴۰۵",
    read: "۹ دقیقه",
    accent: "amber" as Accent,
    kind: "timeline" as const,
  },
  {
    title: "قالب‌هایی که واقعاً استفاده می‌کنیم",
    excerpt: "هشت قالب محبوب تیم بوم و دلیلی که هر کدام کار می‌کند.",
    category: "قالب",
    date: "۲۱ مهر ۱۴۰۵",
    read: "۵ دقیقه",
    accent: "sage" as Accent,
    kind: "table" as const,
  },
];

export const notifications = [
  {
    title: "نگار تو را به یک بوم دعوت کرد",
    time: "۱۲ دقیقه پیش",
    accent: "violet" as Accent,
  },
  {
    title: "امیر در وظیفهٔ «ویرایشگر بوم» برچسب تو را گذاشت",
    time: "۴۵ دقیقه پیش",
    accent: "teal" as Accent,
  },
  {
    title: "یادآوری: انتشار نسخهٔ ۲ چهار روز دیگر",
    time: "۲ ساعت پیش",
    accent: "amber" as Accent,
  },
];

export const weekTasks = [
  { title: "بازبینی متن صفحهٔ اصلی", done: true },
  { title: "جلسهٔ هماهنگی با تیم طراحی", done: true },
  { title: "آماده‌سازی قالب‌های تازه", done: false },
  { title: "نوشتن گزارش پژوهش کاربر", done: false },
  { title: "به‌روزرسانی نقشهٔ راه", done: false },
];

export const stats = [
  { label: "بوم‌ها", value: "۱۰۰", delta: "+۱۲", hint: "در این ماه" },
  { label: "بلوک‌ها", value: "۲٫۴هزار", delta: "+۱۸۰", hint: "این هفته" },
  { label: "همکاران", value: "۸", delta: "+۱", hint: "دعوت تازه" },
  { label: "فضای مصرفی", value: "۶۴٪", delta: "۲٫۱GB", hint: "از ۵GB" },
];

export const pricingPlans = [
  {
    name: "رایگان",
    tagline: "برای شروع و آزمون‌وخطا.",
    monthly: 0,
    yearly: 0,
    cta: "شروع رایگان",
    featured: false,
    features: [
      "۳ بوم نامحدود",
      "۲۰۰ بلوک",
      "۵ مگابایت فضا",
      "قالب‌های پایه",
      "دسترسی به هوش مصنوعی: ۲۰ پیام",
    ],
  },
  {
    name: "حرفه‌ای",
    tagline: "برای کسانی که هر روز می‌سازند.",
    monthly: 29,
    yearly: 24,
    cta: "ارتقا به حرفه‌ای",
    featured: true,
    features: [
      "بوم‌های نامحدود",
      "بلوک نامحدود",
      "۲۰ گیگابایت فضا",
      "همهٔ قالب‌ها",
      "هوش مصنوعی نامحدود",
      "تاریخچهٔ نسخه‌ها تا ۳۰ روز",
    ],
  },
  {
    name: "تیم",
    tagline: "برای ساختن مشترک، بدون اصطکاک.",
    monthly: 79,
    yearly: 64,
    cta: "شروع آزمایش تیم",
    featured: false,
    features: [
      "همهٔ امکانات حرفه‌ای",
      "تا ۲۰ عضو",
      "مجوزهای پیشرفته",
      "تاریخچهٔ نامحدود",
      "پشتیبانی اولویت‌دار",
    ],
  },
];
