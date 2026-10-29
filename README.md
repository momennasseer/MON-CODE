# MON CODE — نسخة React

## التشغيل عندك محليًا

1. لازم يكون عندك Node.js متثبت (نسخة 18 أو أحدث): https://nodejs.org
2. افتح التيرمنال جوه فولدر المشروع وشغّل:

   ```
   npm install
   npm run dev
   ```

3. هيديك رابط محلي (عادة `http://localhost:5173`) افتحه في المتصفح.

## البناء للنشر (Production)

```
npm run build
```

هيطلعلك فولدر `dist` جاهز ترفعه على أي استضافة (Vercel, Netlify, Hostinger... إلخ).

## هيكل المشروع

```
src/
  components/
    Preloader.jsx   # صفحة التحميل (نجوم + برق + progress bar)
    CipherButton.jsx# الزرار بتأثير الـ decrypt (matrix rain + text scramble)
    Header.jsx
    Hero.jsx
    Services.jsx
    Work.jsx
    Stack.jsx
    About.jsx
    Contact.jsx
    Footer.jsx
  hooks/
    useReveal.js    # أنيميشن الظهور عند السكرول
  App.jsx
  index.css         # كل الستايل (نفس التصميم بالظبط)
  main.jsx
```

كل التأثيرات (البرق، الـ preloader، زرار الـ decrypt) اتنقلت زي ما هي بالظبط لكن بمنطق React (hooks + state) بدل الـ DOM manipulation المباشر.
