const WHATSAPP_NUMBER = "8801749409152";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Khalid, I would like to discuss a project.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Khalid on WhatsApp"
      className="fixed bottom-7 right-7 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-8 sm:right-8"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 fill-current">
        <path d="M16.02 3C8.84 3 3 8.82 3 16c0 2.3.6 4.54 1.74 6.51L3 29l6.66-1.7A12.9 12.9 0 0 0 16.02 29C23.2 29 29 23.18 29 16S23.2 3 16.02 3Zm0 23.68a10.65 10.65 0 0 1-5.43-1.49l-.39-.23-3.95 1 1.06-3.84-.26-.4A10.63 10.63 0 1 1 16.02 26.68Zm5.84-7.98c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.05 1.27-.19.21-.39.24-.7.08-1.86-.93-3.08-1.66-4.3-3.78-.33-.57.33-.53.94-1.77.1-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.12-1.14 2.73 0 1.62 1.17 3.18 1.34 3.4.16.21 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.1 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.63-.38Z" />
      </svg>
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
