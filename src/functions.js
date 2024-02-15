const baseUrl = "https://jsonplaceholder.typicode.com";
const fn = {
    async fetchPublicApi(endPoint = "", params = "", requestType = "GET") {
        if (requestType.toUpperCase() == "POST" || "PUT" == requestType.toUpperCase()) {
            const res = await fetch(baseUrl + endPoint, {
                method: requestType.toUpperCase(),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/vnd.api+json",
                    "Content-Type": "application/vnd.api+json",
                },
                body: JSON.stringify(params),
            });

            const response = await res.json();
            return response;
        } else {
            const res = await fetch(baseUrl + endPoint, {
                method: requestType.toUpperCase(),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/vnd.api+json",
                    "Content-Type": "application/vnd.api+json",
                },
            });

            const response = await res.json();
            return response;
        }
    },
};

export default fn;