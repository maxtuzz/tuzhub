const Env = {
    getApiUrl(): string {
        if (process.env.NODE_ENV === "production") {
            return `${window.location.origin}/v1/api-entries`;
        }

        return `http://localhost:8090/v1/api-entries`
    }
};

export default Env;