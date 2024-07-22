import { Perfil } from "~/utils/interface/Perfil"

const url = `${process.env.QEQ_API_URL}/perfil`

export default eventHandler(async (req) => {

    const res = await $fetch<Perfil[]>(url)
    return res
})