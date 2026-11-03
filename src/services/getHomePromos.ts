export const getHomePromos = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-promos`, {
            next: { revalidate: 60 }
        })
        if (!response.ok) throw new Error("Promolarni yuklab bo'lmadi")
        const result = await response.json()
        return result.data ?? []
    } catch (error) {
        console.error("getHomePromos xatolik:", error)
        return []
    }
}
