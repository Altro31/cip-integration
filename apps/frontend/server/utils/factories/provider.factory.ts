export function providerFactory(url: string) {

    return {
        url,
        toRoute(route: string) {
            let extend = route ?? ""
            if (!route?.startsWith("/")) {
                extend = "/" + extend
            }

            return url + extend
        }
    }
}