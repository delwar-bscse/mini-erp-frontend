import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const SubmitButton = ({ isSubmitting, title, className }: { isSubmitting: boolean, title: string, className?: string }) => {
  return (
    <button type="submit" disabled={isSubmitting} className={cn(`w-full rounded-md bg-gray-600 py-2 text-[17px] font-bold text-white transition-all hover:bg-gray-700 cursor-pointer hover:shadow-lg active:scale-[0.99]`, className)}>
      {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{isSubmitting ? "Processing..." : title}</span>
    </button>
  )
}

export default SubmitButton
