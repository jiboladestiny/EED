'use server'
import { Data } from "@/app/context/DataProvider"
export const roleData = () => {
    const { data } = Data()
    return data?.isAdmin
}
