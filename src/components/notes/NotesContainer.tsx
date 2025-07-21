import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

export interface NotesContainerProps {
  title?: string
  children: React.ReactNode
}

export const NotesContainer: React.FC<NotesContainerProps> = ({ title, children }) => (
  <Card className='w-full max-w-2xl mx-auto'>
    {title && (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    )}
    <CardContent>{children}</CardContent>
  </Card>
)

export default NotesContainer
