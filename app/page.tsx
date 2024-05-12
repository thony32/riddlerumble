import Link from "next/link"
import { createClient } from "edgedb"
import e from "@/dbschema/edgeql-js"
import OAuth from "@/components/OAuth"

const client = createClient({
    instanceName: process.env.EDGEDB_INSTANCE,
    secretKey: process.env.EDGEDB_SECRET_KEY,
})

export default async function Home() {
    const selectPosts = e.select(e.Post, () => ({
        id: true,
        title: true,
        content: true,
    }))
    const posts = await selectPosts.run(client)

    return (
        <div className="container mx-auto p-4 bg-black text-white">
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <OAuth />
            <ul>
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="mb-4"
                    >
                        <Link
                            href={`/post/${post.id}`}
                            className="text-blue-500"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
