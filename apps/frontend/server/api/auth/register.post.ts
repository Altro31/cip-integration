
export default eventHandler(async (e) => (
    $fetch(AuthAPI.toRoute("auth/register"), {
        method: "POST",
        body: await readBody(e),
    })
))