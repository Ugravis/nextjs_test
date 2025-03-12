import axios from "axios";

export default function handleApiError(error: unknown, defaultMessage = "Unknown error occurred") {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || defaultMessage
    } else if (error instanceof Error) {
        return error.message
    }
    return defaultMessage
}