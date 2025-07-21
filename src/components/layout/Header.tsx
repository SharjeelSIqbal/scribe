import { ModeToggle } from '../themes/mode-toggle'
import { Button } from '@/components/ui/button'
import { SettingsIcon } from 'lucide-react'

export default function Header() {
  return (
    <div className='container mx-auto px-4 md:px-6 lg:px-8'>
      <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>
        <div className='flex gap-1'>
          <ModeToggle></ModeToggle>
          <Button variant='outline' size='icon'>
            <div className='flex flex-col items-center gap-2'>
              <SettingsIcon className='w-8 h-8' />
            </div>
          </Button>
        </div>
      </header>
    </div>
  )
}
