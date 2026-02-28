import SyncLang from "../components/SyncLang/SyncLang";

export default function LocaleLayout({ children, params }) {
  const { locale } = params;

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <SyncLang />
      {children}
    </div>
  );
}
