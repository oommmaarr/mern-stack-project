'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLangStore } from '../../store/useLangStore'

export default function SyncLang() {
  const { locale } = useParams()
  const setLang = useLangStore((s) => s.setLang)

  useEffect(() => {
    if (locale) {
      setLang(locale)
    }
  }, [locale, setLang])

  return null
}
