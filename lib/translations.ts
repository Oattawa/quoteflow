export type Lang = "en" | "th";

const translations = {
  en: {
    // Nav
    nav: {
      pricing: "Pricing",
      signIn: "Sign in",
      signUpFree: "Sign up free",
      myProposals: "My Proposals",
      new: "New",
      signOut: "Sign out",
    },
    // Hero
    hero: {
      badge: "AI-powered proposals",
      words: ["proposals", "pitches", "quotes", "bids"],
      headline1: "Write winning",
      headline2: "in 60 seconds",
      subheadline:
        "Fill in a few details about your project and let QuoteFlow generate a professional, client-ready proposal instantly.",
      cta: "Start for free",
      perks: ["No credit card required", "Free to start", "Export as PDF"],
      generating: "Generating proposal…",
      readyToSend: "✓ Ready to send",
    },
    // How it works
    howItWorks: {
      label: "How it works",
      heading: "From blank page to sent proposal in 3 steps",
      steps: [
        {
          title: "Fill in your project details",
          description:
            "Enter the client name, project type, scope, timeline, and budget. Takes about 30 seconds.",
        },
        {
          title: "AI writes your proposal",
          description:
            "QuoteFlow instantly generates a structured, professional proposal tailored to your project.",
        },
        {
          title: "Send it and win the job",
          description:
            "Copy, export as PDF, or paste directly into your email. Close more clients.",
        },
      ],
    },
    // Features
    features: {
      label: "Features",
      heading: "Everything a freelancer needs",
      items: [
        {
          title: "AI-powered writing",
          description:
            "Powered by Claude — the same AI used by top companies worldwide.",
        },
        {
          title: "Ready in 60 seconds",
          description:
            "Stop spending hours writing proposals. Generate one in under a minute.",
        },
        {
          title: "Proposal library",
          description:
            "Every proposal is saved. Browse, revisit, and share past work anytime.",
        },
        {
          title: "PDF export",
          description:
            "Download a clean, print-ready PDF to send directly to your client.",
        },
        {
          title: "Professional structure",
          description:
            "Scope, timeline, pricing, and next steps — structured to win trust.",
        },
        {
          title: "Unlimited proposals",
          description:
            "On Pro, generate as many proposals as you need with no monthly cap.",
        },
      ],
    },
    // Pricing
    pricing: {
      label: "Pricing",
      heading: "Simple, honest pricing",
      subheading: "Start free. Upgrade when you're ready.",
      starter: {
        label: "Starter",
        per: "/month",
        description: "Great for trying QuoteFlow",
        cta: "Get started free",
      },
      pro: {
        label: "Pro",
        per: "/month",
        badge: "Most popular",
        description: "For active freelancers",
        cta: "Start free, then upgrade",
        note: "Cancel anytime.",
      },
      business: {
        label: "Business",
        per: "/month",
        description: "For agencies & teams",
        cta: "Contact us",
        note: "Coming soon.",
      },
    },
    // Free/Pro/Business features
    freeFeatures: [
      "3 proposals per month",
      "AI-powered generation",
      "Copy to clipboard",
      "Public share link",
    ],
    proFeatures: [
      "Unlimited proposals",
      "Full proposal library",
      "PDF export",
      "Client 'Accept' button on share page",
      "View tracking (see when client opens proposal)",
      "AI-powered generation",
      "Priority support",
    ],
    businessFeatures: [
      "Everything in Pro",
      "Custom branding on share page",
      "Follow-up reminders",
      "Proposal analytics",
      "5 team seats",
      "Dedicated support",
    ],
    // FAQ
    faq: {
      label: "FAQ",
      heading: "Common questions about QuoteFlow",
      items: [
        {
          q: "How do I write a freelance proposal?",
          a: "With QuoteFlow, enter your client name, project type, scope, timeline, and budget. The AI generates a structured, professional proposal — including scope of work, pricing, timeline, and next steps — in under 60 seconds.",
        },
        {
          q: "Is QuoteFlow free to use?",
          a: "Yes. QuoteFlow is free to start with 3 AI-generated proposals per month, no credit card required. Pro plans are $19/month for unlimited proposals, a full proposal library, and PDF export.",
        },
        {
          q: "What should a freelance proposal include?",
          a: "A strong freelance proposal includes a personalised introduction, clear scope of work, estimated timeline, pricing, your relevant experience, and specific next steps. QuoteFlow's AI automatically structures all of these based on your project details.",
        },
        {
          q: "Can I export my proposal as a PDF?",
          a: "Yes. QuoteFlow Pro users can download any proposal as a clean, print-ready PDF to send directly to clients.",
        },
        {
          q: "How is QuoteFlow different from proposal templates?",
          a: "Unlike static templates, QuoteFlow uses AI to write a unique proposal tailored to your specific client, project type, scope, and budget — not generic fill-in-the-blank text. Every proposal is different.",
        },
        {
          q: "How long does it take to generate a proposal?",
          a: "Most proposals are ready in under 60 seconds. Fill in your project details (about 30 seconds), click Generate, and QuoteFlow delivers a complete, professional proposal instantly.",
        },
      ],
    },
    // Final CTA
    cta: {
      heading: "Stop losing jobs to slow proposals",
      body: "Freelancers who respond faster win more. Start generating professional proposals in under 60 seconds — for free.",
      button: "Start for free today",
    },
    // Footer
    footer: "All rights reserved.",
    // AI Assistant
    assistant: {
      title: "AI Assistant",
      greeting: "Hi! I'm your QuoteFlow assistant. Ask me anything about proposals, the platform, or freelancing tips.",
      placeholder: "Ask me anything…",
      send: "Send",
      thinking: "Thinking…",
      clearChat: "Clear",
      suggestedLabel: "Try asking:",
      errorFallback: "Sorry, something went wrong. Please try again.",
      suggestions: {
        dashboard: [
          "How do I get started?",
          "What's in the Pro plan?",
          "How to write a great proposal?",
        ],
        "new-proposal": [
          "What should I write in the scope?",
          "How do I set the right budget?",
          "Tips for a winning proposal",
        ],
        proposals: [
          "How do I improve my win rate?",
          "When should I follow up?",
          "What makes a great proposal?",
        ],
        "proposal-detail": [
          "How can I improve this proposal?",
          "How do I share with my client?",
          "Should I follow up today?",
        ],
        upgrade: [
          "Is Pro worth it?",
          "What's included in Pro?",
          "Can I cancel anytime?",
        ],
      },
    },
    // Dashboard
    dashboard: {
      title: "Dashboard",
      newProposal: "New Proposal",
      plan: "Plan",
      upgradeToPro: "Upgrade to Pro",
      thisMonth: "This Month",
      proposals: "proposals",
      limitReached: "Limit reached",
      totalProposals: "Total Proposals",
      saved: "saved",
      recentProposals: "Recent Proposals",
      viewAll: "View all",
      noProposals: "No proposals yet.",
      generateFirst: "Generate your first proposal →",
      generateIn60: "Generate in 60 seconds",
      myProposals: "My Proposals",
      viewManageAll: "View & manage all",
      view: "View →",
    },
    // Login
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your account",
      email: "Email",
      password: "Password",
      signingIn: "Signing in...",
      signIn: "Sign in",
      noAccount: "Don't have an account?",
      signUpFree: "Sign up free",
    },
    // Signup
    signup: {
      title: "Create account",
      subtitle: "Start writing winning proposals in 60 seconds",
      email: "Email",
      password: "Password",
      passwordPlaceholder: "Min. 8 characters",
      passwordError: "Password must be at least 8 characters.",
      creating: "Creating account...",
      create: "Create account",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
      successTitle: "Check your email",
      successBody1: "We sent a confirmation link to",
      successBody2: "Click it to activate your account and start generating proposals.",
      backToSignIn: "Back to sign in",
    },
  },

  th: {
    // Nav
    nav: {
      pricing: "ราคา",
      signIn: "เข้าสู่ระบบ",
      signUpFree: "สมัครฟรี",
      myProposals: "ข้อเสนอของฉัน",
      new: "ใหม่",
      signOut: "ออกจากระบบ",
    },
    // Hero
    hero: {
      badge: "ข้อเสนองานขับเคลื่อนด้วย AI",
      words: ["ข้อเสนองาน", "การนำเสนอ", "ใบเสนอราคา", "การประมูล"],
      headline1: "เขียน",
      headline2: "ที่ชนะใจใน 60 วินาที",
      subheadline:
        "กรอกรายละเอียดโครงการแล้วให้ QuoteFlow สร้างข้อเสนอที่เป็นมืออาชีพและพร้อมส่งให้ลูกค้าทันที",
      cta: "เริ่มใช้งานฟรี",
      perks: ["ไม่ต้องใช้บัตรเครดิต", "เริ่มต้นฟรี", "ส่งออกเป็น PDF"],
      generating: "กำลังสร้างข้อเสนอ…",
      readyToSend: "✓ พร้อมส่งแล้ว",
    },
    // How it works
    howItWorks: {
      label: "วิธีการทำงาน",
      heading: "จากหน้าว่างสู่ข้อเสนอที่พร้อมส่งใน 3 ขั้นตอน",
      steps: [
        {
          title: "กรอกรายละเอียดโครงการ",
          description:
            "ใส่ชื่อลูกค้า ประเภทโครงการ ขอบเขตงาน ระยะเวลา และงบประมาณ ใช้เวลาประมาณ 30 วินาที",
        },
        {
          title: "AI เขียนข้อเสนอให้คุณ",
          description:
            "QuoteFlow สร้างข้อเสนอที่มีโครงสร้างชัดเจนและเป็นมืออาชีพตามรายละเอียดโครงการของคุณทันที",
        },
        {
          title: "ส่งและชนะงาน",
          description:
            "คัดลอก ส่งออกเป็น PDF หรือวางลงในอีเมลโดยตรง ปิดงานได้มากขึ้น",
        },
      ],
    },
    // Features
    features: {
      label: "คุณสมบัติ",
      heading: "ทุกสิ่งที่ฟรีแลนซ์ต้องการ",
      items: [
        {
          title: "การเขียนขับเคลื่อนด้วย AI",
          description:
            "ขับเคลื่อนโดย Claude — AI ที่บริษัทชั้นนำทั่วโลกใช้งาน",
        },
        {
          title: "พร้อมใช้งานใน 60 วินาที",
          description:
            "หยุดเสียเวลาชั่วโมงๆ กับการเขียนข้อเสนอ สร้างได้ภายในหนึ่งนาที",
        },
        {
          title: "คลังข้อเสนองาน",
          description:
            "ทุกข้อเสนอถูกบันทึกไว้ เรียกดู กลับมาดูซ้ำ และแชร์งานเก่าได้ตลอดเวลา",
        },
        {
          title: "ส่งออกเป็น PDF",
          description:
            "ดาวน์โหลด PDF ที่พร้อมพิมพ์เพื่อส่งให้ลูกค้าโดยตรง",
        },
        {
          title: "โครงสร้างมืออาชีพ",
          description:
            "ขอบเขตงาน ระยะเวลา ราคา และขั้นตอนต่อไป — จัดโครงสร้างเพื่อสร้างความน่าเชื่อถือ",
        },
        {
          title: "ข้อเสนอไม่จำกัด",
          description:
            "สำหรับ Pro สร้างข้อเสนอได้เท่าที่ต้องการโดยไม่มีโควต้ารายเดือน",
        },
      ],
    },
    // Pricing
    pricing: {
      label: "ราคา",
      heading: "ราคาโปร่งใสและตรงไปตรงมา",
      subheading: "เริ่มต้นฟรี อัปเกรดเมื่อพร้อม",
      starter: {
        label: "สตาร์เตอร์",
        per: "/เดือน",
        description: "เหมาะสำหรับทดลองใช้ QuoteFlow",
        cta: "เริ่มใช้งานฟรี",
      },
      pro: {
        label: "Pro",
        per: "/เดือน",
        badge: "ยอดนิยม",
        description: "สำหรับฟรีแลนซ์ที่ทำงานอยู่",
        cta: "เริ่มฟรี จากนั้นอัปเกรด",
        note: "ยกเลิกได้ตลอดเวลา",
      },
      business: {
        label: "บิสซิเนส",
        per: "/เดือน",
        description: "สำหรับเอเจนซี่และทีม",
        cta: "ติดต่อเรา",
        note: "เร็วๆ นี้",
      },
    },
    // Free/Pro/Business features
    freeFeatures: [
      "3 ข้อเสนอต่อเดือน",
      "สร้างด้วย AI",
      "คัดลอกไปยังคลิปบอร์ด",
      "ลิงก์แชร์สาธารณะ",
    ],
    proFeatures: [
      "ข้อเสนอไม่จำกัด",
      "คลังข้อเสนอครบครัน",
      "ส่งออกเป็น PDF",
      "ปุ่ม 'ยอมรับ' สำหรับลูกค้าบนหน้าแชร์",
      "ติดตามการเปิดดู (ดูว่าลูกค้าเปิดข้อเสนอเมื่อไร)",
      "สร้างด้วย AI",
      "การสนับสนุนแบบ Priority",
    ],
    businessFeatures: [
      "ทุกอย่างใน Pro",
      "แบรนดิ้งแบบกำหนดเองบนหน้าแชร์",
      "การแจ้งเตือนติดตามผล",
      "การวิเคราะห์ข้อเสนอ",
      "5 ที่นั่งในทีม",
      "การสนับสนุนแบบเฉพาะ",
    ],
    // FAQ
    faq: {
      label: "คำถามที่พบบ่อย",
      heading: "คำถามทั่วไปเกี่ยวกับ QuoteFlow",
      items: [
        {
          q: "ฉันจะเขียนข้อเสนอฟรีแลนซ์ได้อย่างไร?",
          a: "ด้วย QuoteFlow ใส่ชื่อลูกค้า ประเภทโครงการ ขอบเขต ระยะเวลา และงบประมาณ AI จะสร้างข้อเสนอที่มีโครงสร้างชัดเจนและเป็นมืออาชีพ รวมถึงขอบเขตงาน ราคา ระยะเวลา และขั้นตอนต่อไป ภายในเวลาไม่ถึง 60 วินาที",
        },
        {
          q: "QuoteFlow ใช้งานฟรีหรือไม่?",
          a: "ใช่ QuoteFlow เริ่มต้นใช้งานฟรีด้วย 3 ข้อเสนอที่สร้างโดย AI ต่อเดือน ไม่ต้องใช้บัตรเครดิต แผน Pro ราคา $19/เดือน สำหรับข้อเสนอไม่จำกัด คลังข้อเสนอครบครัน และการส่งออก PDF",
        },
        {
          q: "ข้อเสนอฟรีแลนซ์ควรมีอะไรบ้าง?",
          a: "ข้อเสนอฟรีแลนซ์ที่ดีควรมีการแนะนำตัวที่เป็นส่วนตัว ขอบเขตงานที่ชัดเจน ระยะเวลาโดยประมาณ ราคา ประสบการณ์ที่เกี่ยวข้อง และขั้นตอนต่อไปที่ชัดเจน AI ของ QuoteFlow จัดโครงสร้างทั้งหมดนี้โดยอัตโนมัติตามรายละเอียดโครงการของคุณ",
        },
        {
          q: "ฉันสามารถส่งออกข้อเสนอเป็น PDF ได้หรือไม่?",
          a: "ได้ ผู้ใช้ QuoteFlow Pro สามารถดาวน์โหลดข้อเสนอเป็น PDF ที่พร้อมพิมพ์เพื่อส่งให้ลูกค้าโดยตรง",
        },
        {
          q: "QuoteFlow แตกต่างจากเทมเพลตข้อเสนออย่างไร?",
          a: "ต่างจากเทมเพลตสำเร็จรูป QuoteFlow ใช้ AI เขียนข้อเสนอที่ไม่ซ้ำกันและปรับแต่งตามลูกค้า ประเภทโครงการ ขอบเขต และงบประมาณของคุณโดยเฉพาะ ไม่ใช่ข้อความทั่วไปที่ต้องกรอกเอง ทุกข้อเสนอแตกต่างกัน",
        },
        {
          q: "ใช้เวลานานแค่ไหนในการสร้างข้อเสนอ?",
          a: "ข้อเสนอส่วนใหญ่พร้อมในเวลาไม่ถึง 60 วินาที กรอกรายละเอียดโครงการ (ประมาณ 30 วินาที) คลิก Generate แล้ว QuoteFlow จะส่งมอบข้อเสนอที่สมบูรณ์และเป็นมืออาชีพทันที",
        },
      ],
    },
    // Final CTA
    cta: {
      heading: "หยุดเสียงานเพราะข้อเสนอที่ช้า",
      body: "ฟรีแลนซ์ที่ตอบสนองเร็วกว่าชนะมากกว่า เริ่มสร้างข้อเสนอที่เป็นมืออาชีพในเวลาน้อยกว่า 60 วินาที — ฟรี",
      button: "เริ่มใช้งานฟรีวันนี้",
    },
    // Footer
    footer: "สงวนลิขสิทธิ์",
    // AI Assistant
    assistant: {
      title: "ผู้ช่วย AI",
      greeting: "สวัสดี! ฉันคือผู้ช่วย QuoteFlow ถามอะไรเกี่ยวกับข้อเสนอ แพลตฟอร์ม หรือเคล็ดลับฟรีแลนซ์ได้เลย",
      placeholder: "ถามอะไรก็ได้…",
      send: "ส่ง",
      thinking: "กำลังคิด…",
      clearChat: "ล้าง",
      suggestedLabel: "ลองถามว่า:",
      errorFallback: "ขอโทษ มีปัญหาเกิดขึ้น กรุณาลองใหม่",
      suggestions: {
        dashboard: [
          "เริ่มต้นอย่างไร?",
          "แผน Pro มีอะไรบ้าง?",
          "เขียนข้อเสนอที่ดีอย่างไร?",
        ],
        "new-proposal": [
          "ควรเขียนอะไรในช่อง Scope?",
          "จะกำหนดงบประมาณที่เหมาะสมได้อย่างไร?",
          "เคล็ดลับข้อเสนอที่ชนะใจ",
        ],
        proposals: [
          "จะเพิ่มอัตราการชนะงานได้อย่างไร?",
          "ควรติดตามผลเมื่อไร?",
          "อะไรทำให้ข้อเสนอดีเลิศ?",
        ],
        "proposal-detail": [
          "จะปรับปรุงข้อเสนอนี้ได้อย่างไร?",
          "แชร์ให้ลูกค้าได้อย่างไร?",
          "ควรติดตามผลวันนี้ไหม?",
        ],
        upgrade: [
          "Pro คุ้มค่าไหม?",
          "Pro มีอะไรบ้าง?",
          "ยกเลิกได้ตลอดเวลาไหม?",
        ],
      },
    },
    // Dashboard
    dashboard: {
      title: "แดชบอร์ด",
      newProposal: "ข้อเสนอใหม่",
      plan: "แผน",
      upgradeToPro: "อัปเกรดเป็น Pro",
      thisMonth: "เดือนนี้",
      proposals: "ข้อเสนอ",
      limitReached: "ถึงขีดจำกัดแล้ว",
      totalProposals: "ข้อเสนอทั้งหมด",
      saved: "บันทึกแล้ว",
      recentProposals: "ข้อเสนอล่าสุด",
      viewAll: "ดูทั้งหมด",
      noProposals: "ยังไม่มีข้อเสนอ",
      generateFirst: "สร้างข้อเสนอแรกของคุณ →",
      generateIn60: "สร้างใน 60 วินาที",
      myProposals: "ข้อเสนอของฉัน",
      viewManageAll: "ดูและจัดการทั้งหมด",
      view: "ดู →",
    },
    // Login
    login: {
      title: "ยินดีต้อนรับกลับ",
      subtitle: "เข้าสู่ระบบบัญชีของคุณ",
      email: "อีเมล",
      password: "รหัสผ่าน",
      signingIn: "กำลังเข้าสู่ระบบ...",
      signIn: "เข้าสู่ระบบ",
      noAccount: "ยังไม่มีบัญชี?",
      signUpFree: "สมัครฟรี",
    },
    // Signup
    signup: {
      title: "สร้างบัญชี",
      subtitle: "เริ่มเขียนข้อเสนอที่ชนะใจใน 60 วินาที",
      email: "อีเมล",
      password: "รหัสผ่าน",
      passwordPlaceholder: "อย่างน้อย 8 ตัวอักษร",
      passwordError: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
      creating: "กำลังสร้างบัญชี...",
      create: "สร้างบัญชี",
      hasAccount: "มีบัญชีอยู่แล้ว?",
      signIn: "เข้าสู่ระบบ",
      successTitle: "ตรวจสอบอีเมลของคุณ",
      successBody1: "เราส่งลิงก์ยืนยันไปที่",
      successBody2: "คลิกลิงก์เพื่อเปิดใช้งานบัญชีและเริ่มสร้างข้อเสนอ",
      backToSignIn: "กลับไปเข้าสู่ระบบ",
    },
  },
} as const;

export type Translations = typeof translations.en;
export default translations;
