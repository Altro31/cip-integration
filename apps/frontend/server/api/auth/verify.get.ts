
export default eventHandler(async (e) => (
    $fetch(AuthAPI.toRoute("auth/verify"), {
        headers: e.headers
    })
))