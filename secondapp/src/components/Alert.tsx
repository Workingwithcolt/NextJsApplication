import { ReactElement } from "react"

type AlertProps = {
    message?: string,
}

export const AppAlert = ({ message }: AlertProps): ReactElement => {
    return (
        <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-gray-300 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            {
                message
            }
        </div>
    )
}