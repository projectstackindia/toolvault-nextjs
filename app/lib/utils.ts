export const copyToClipboard = async (text: string, setCopied?: (value: boolean) => void) => {
  try {
    await navigator.clipboard.writeText(text)
    if (setCopied) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      alert('Copied to clipboard!')
    }
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}