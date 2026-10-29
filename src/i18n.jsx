import { createContext, useContext, useEffect, useState } from 'react'

export const translations = {
  ar: {
    dir: 'rtl',
    nav: {
      services: 'الخدمات',
      work: 'أعمالنا',
      stack: 'الأدوات',
      about: 'من نحن',
      contact: 'تواصل معنا',
    },
    header: {
      cta: 'اطلب عرض سعر',
      menuLabel: 'فتح القائمة',
    },
    hero: {
      eyebrow: 'مرحبا بك في ',
      name: 'MØN CODE',
      roleIntro: 'إحنا فريق',
      roles: ['تطوير مواقع', 'منصات الكترونية ', 'تصميم مواقع ', 'تصميم واجهات'],
      desc: 'بنستلم فكرتك من الصفر لحد مانبني موقعك بكل احتراف يهدف الي تحقيق الاستفادة للعميل مع افضل فريق عمل للتطوير و افضل الوجهات .',
      ctaWork: 'شاهد نماذج',
      ctaQuote: 'اطلب موقعك',
    },
    services: {
      heading: 'الخدمات',
      sub: 'حلول ويب متكاملة، من أول سطر كود لحد الدعم بعد الإطلاق.',
      items: [
        { title: 'تطوير مواقع الويب', desc: 'مواقع سريعة ومتجاوبة، من صفحة تعريفية لمنصة كاملة، بأداء عالي على كل الأجهزة.' },
        { title: 'مواقع ويب مخصصة', desc: 'أنظمة إدارة، لوحات تحكم، ومواقع وسيرفرات ويب مبنية حسب طبيعة شغلك وبياناتك.' },
        { title: 'متاجر إلكترونية', desc: 'متجرك أونلاين بنظام دفع وشحن متكامل، وتجربة شراء سهلة تزود مبيعاتك.' },
        { title: 'صيانة ودعم فني', desc: 'متابعة مستمرة لموقعك، تحديثات، وحل أي مشكلة تقنية بسرعة قبل ما تأثر على شغلك.' },
      ],
    },
    work: {
      heading: 'أعمالنا',
      sub: 'نماذج من المشاريع اللي اشتغلنا عليها.',
      projects: [
        { label: 'Student Platform', tag: 'WEB PLATFORM', title: 'بوابة الطلاب الإلكترونية', desc: 'نظام إلكتروني لإدارة بيانات أكتر من 1000 طالب، بحساب مستقل لكل طالب وواجهة إدارية شاملة.', stack: ['Node.js', 'Express', 'MySQL'], image: '/work-1.webp' },
        { label: 'Store', tag: 'Store', title: 'متجر إلكتروني', desc: 'واجهة متجر كاملة مع سلة شراء، صفحات منتجات، ولوحة تحكم لإدارة الطلبات والمخزون.', stack: ['HTML5', 'CSS3', 'JavaScript'], image: '/work-3.png' },
        { label: 'Clinc', tag: 'clinc', title: 'عيادة طبية متكاملة', desc: 'عيادة طبية متكاملة و حجز واختيار التخصص و الدكتور ولوحة تحكم لضبط الحجوزات ', stack: ['HTML5', 'Node.js', 'JavaScript', 'Express'], image: '/work-2.png' },
      ],
      note: 'دي أمثلة توضيحية لحد ما نحط صور ولينكات مشاريعك الحقيقية بدالها.',
    },
    stack: {
      heading: 'المهارات الخاصة بنا ',
      sub: 'تقنيات مجرّبة، تضمن موقع سريع وقابل للتطوير.',
      tools: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'React', 'HTML5', 'CSS3', 'Git'],
    },
    about: {
      quote: 'مش بس بنكتب كود — بنبني حل شغال، سريع، وسهل إنه يتطور معاك.',
      body: 'MØN CODE فريق تطوير ويب بيشتغل معاك من أول ما تشرح فكرتك، لحد ما تشوفها موقع أو نظام شغال فعليًا. بنركز إن كل مشروع يبقى مبني صح من الداخل، مش بس شكله حلو من برا.',
      points: [
        { label: 'FAST', desc: 'مواقع مبنية للأداء، مش بس للشكل — تحميل سريع من أول لحظة.' },
        { label: 'SCALABLE', desc: 'كود منظم يسهّل إنك تضيف خدمات وميزات جديدة في أي وقت.' },
        { label: 'SUPPORTED', desc: 'مش بنسلّمك الشغل ونمشي — بنفضل معاك للمتابعة والدعم.' },
      ],
    },
    contact: {
      heading: 'تواصل معنا',
      sub: 'احكيلنا عن فكرتك، ونرد عليك بخطة واضحة وسعر مناسب.',
      startHeading: 'ابدأ من هنا',
      startDesc: 'سواء عندك فكرة جاهزة أو لسه بتفكر، ابعتلنا التفاصيل وهنرجعلك بخطوات العمل والتكلفة.',
      formName: 'الاسم',
      formEmail: 'البريد الإلكتروني',
      formMessage: 'احكيلنا عن مشروعك',
      formSubmit: 'إرسال الطلب',
      formStatus: 'تم استلام طلبك، هنرجعلك بأسرع وقت.',
      whatsapp: 'WhatsApp',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
    },
  },

  en: {
    // English is a left-to-right page: elements and text sit on the LEFT
    // (Arabic is right-to-left: elements and text sit on the RIGHT).
    dir: 'ltr',
    nav: {
      services: 'Services',
      work: 'Our Work',
      stack: 'Tools',
      about: 'About Us',
      contact: 'Contact Us',
    },
    header: {
      cta: 'Request a Quote',
      menuLabel: 'Open menu',
    },
    hero: {
      eyebrow: 'Welcome to ',
      name: 'MØN CODE',
      roleIntro: "We're a team for",
      roles: ['Web Development', 'Web Platforms', 'Website Design', 'UI Design'],
      desc: 'We take your idea from scratch until we build your website with full professionalism, aiming to deliver real value to the client, with the best development team and the best interfaces.',
      ctaWork: 'View Samples',
      ctaQuote: 'Order Your Website',
    },
    services: {
      heading: 'Services',
      sub: 'Complete web solutions, from the first line of code to post-launch support.',
      items: [
        { title: 'Web Development', desc: 'Fast, responsive websites, from a landing page to a full platform, with high performance on every device.' },
        { title: 'Custom Websites', desc: 'Management systems, dashboards, and websites and web servers built around the nature of your work and your data.' },
        { title: 'Online Stores', desc: 'Your store online with a complete payment and shipping system, and an easy shopping experience that boosts your sales.' },
        { title: 'Maintenance & Support', desc: 'Continuous follow-up on your website, updates, and quick fixes for any technical problem before it affects your work.' },
      ],
    },
    work: {
      heading: 'Our Work',
      sub: 'Samples of the projects we have worked on.',
      projects: [
        { label: 'Student Platform', tag: 'WEB PLATFORM', title: 'Online Student Portal', desc: 'An electronic system managing the data of more than 1000 students, with a separate account for each student and a complete admin interface.', stack: ['Node.js', 'Express', 'MySQL'], image: '/work-1.webp' },
        { label: 'Store', tag: 'Store', title: 'Online Store', desc: 'A complete store front with a shopping cart, product pages, and a dashboard to manage orders and inventory.', stack: ['HTML5', 'CSS3', 'JavaScript'], image: '/work-3.png' },
        {label: 'Clinc', tag: 'clinc', title: 'Complete Medical Clinic', desc: 'A complete medical clinic system with booking, choosing the specialty and the doctor, and a dashboard to manage the appointments.', stack: ['HTML5', 'Node.js', 'JavaScript', 'Express'], image: '/work-2.png' },
      ],
      note: 'These are illustrative examples until we replace them with photos and links of your real projects.',
    },
    stack: {
      heading: 'Our Skills',
      sub: 'Proven technologies that ensure a fast, scalable website.',
      tools: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'React', 'HTML5', 'CSS3', 'Git'],
    },
    about: {
      quote: "We don't just write code — we build a solution that works, is fast, and is easy to grow with you.",
      body: 'MØN CODE is a web development team that works with you from the moment you explain your idea, until you see it as a working website or system. We focus on every project being built right on the inside, not just looking good on the outside.',
      points: [
        { label: 'FAST', desc: 'Websites built for performance, not just looks — fast loading from the first moment.' },
        { label: 'SCALABLE', desc: 'Organized code that makes it easy to add new services and features at any time.' },
        { label: 'SUPPORTED', desc: "We don't hand over the work and leave — we stay with you for follow-up and support." },
      ],
    },
    contact: {
      heading: 'Contact Us',
      sub: "Tell us about your idea, and we'll get back to you with a clear plan and a fair price.",
      startHeading: 'Start Here',
      startDesc: "Whether you have a ready idea or you're still thinking, send us the details and we'll get back to you with the steps and the cost.",
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Tell us about your project',
      formSubmit: 'Send Request',
      formStatus: "We've received your request, we'll get back to you as soon as possible.",
      whatsapp: 'WhatsApp',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar')

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = translations[lang].dir
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}