import { Input } from '../ui/input'

export interface TitleInputProps extends React.ComponentProps<typeof Input> {
  label?: string
}

export const TitleInput: React.FC<TitleInputProps> = ({ label, ...props }) => {
  return (
    <div className='flex flex-col space-y-1'>
      {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
      <Input {...props} placeholder={props.placeholder ?? 'Title'} />
    </div>
  )
}

export default TitleInput
