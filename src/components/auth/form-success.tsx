import { CheckCheckIcon } from 'lucide-react'

interface FormSuccesProps {
    message?: string;
}
export const FormSuccess = ({message}: FormSuccesProps) => {
    if (!message) return null
    return (
        <div className="flex space-x-4 items-center p-2 rounded-lg text-emerald-500 bg-emerald-500/30">
            <CheckCheckIcon className="w-4 h-4"/>
            <p>{message}</p>
        </div>
    )
}
