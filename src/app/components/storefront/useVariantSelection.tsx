import { useState } from 'react'
import { Variant } from '@/app/utils/types'

type SelectedOptions = Record<string, string>

export function useVariantSelection(variants: Variant[]) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  const handleVariantSelect = (optionType: string, label: string) => {
    const updatedOptions = {
      ...selectedOptions,
      [optionType]: label,
    }

    const match = variants.find(variant =>
      Object.entries(updatedOptions).every(([key, val]) =>
        variant.options?.[key] === val
      )
    ) || null

    setSelectedOptions(updatedOptions)
    setSelectedVariant(match)
  }

  const optionTypes = Array.from(
    new Set(variants.flatMap(v => Object.keys(v.options || {})))
  )

  return {
    selectedOptions,
    selectedVariant,
    handleVariantSelect,
    optionTypes,
  }
}
