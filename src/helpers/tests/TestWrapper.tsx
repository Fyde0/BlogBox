import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router-dom"

function TestWrapper({ children }: { children: ReactNode }) {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                placeholderData: undefined,
                retry: false
            }
        }
    })

    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </QueryClientProvider>
    )
}

export default TestWrapper