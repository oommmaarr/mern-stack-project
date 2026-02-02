export default function LocaleLayout({ children, params }) {
  const { locale } = params;

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}
