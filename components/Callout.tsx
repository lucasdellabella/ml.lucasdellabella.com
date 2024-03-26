// Callout.js
import React, { ReactNode } from 'react'
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/20/solid'

const icons = {
  info: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
  warning: <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />,
  success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
}

interface CalloutProps {
  type?: 'info' | 'warning' | 'success'
  title: string
  children: ReactNode
}

const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  return (
    <div
      className={`p-4 border-l-4 rounded-md my-4 ${type === 'warning' ? 'bg-yellow-950 border-yellow-700' : type === 'success' ? 'bg-green-950 border-green-700' : 'bg-blue-950 border-blue-700'}`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === 'warning' ? (
            <ExclamationCircleIcon className="w-5 h-5 text-yellow-400" />
          ) : type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
          ) : (
            <InformationCircleIcon className="w-5 h-5 text-blue-400" />
          )}
        </div>
        <div className="ml-3 flex-grow">
          {title ? (
            <>
              <p
                className={`text-sm font-medium ${type === 'warning' ? 'text-yellow-200' : type === 'success' ? 'text-green-200' : 'text-blue-200'}`}
              >
                {title}
              </p>
              <div className="mt-2 text-sm text-gray-300">{children}</div>
            </>
          ) : (
            <div className="text-sm prose max-w-none text-slate-50">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Callout
