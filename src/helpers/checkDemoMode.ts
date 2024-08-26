import { FetchError } from "../api/FetchLib";

function checkDemoMode() {
    if (import.meta.env.VITE_DEMO_MODE === "true") {
        throw new FetchError(new Response(), "Sorry, you can't do that in demo mode!")
    }
}

export default checkDemoMode