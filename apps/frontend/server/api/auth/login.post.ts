
export default eventHandler(async (e) => (
    $fetch(AuthAPI.toRoute("auth/login"), {
        method: "POST",
        body: await readBody(e),
    })
))