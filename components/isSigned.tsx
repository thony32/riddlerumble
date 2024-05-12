import React from 'react'
import { auth } from "@/edgedb";

const IsSigned = async () => {
    const session = await auth.getSession();

    const isSignedIn = await session.isSignedIn();
    return (
        <div>
            {isSignedIn ? (
                <>
                    <div>You are signed in</div>
                    {await session.client.queryJSON(`...`)}
                </>
            ) : (
                <>
                    <div>You are not signed in</div>
                    <a href={auth.getBuiltinUIUrl()}>Sign in with Built-in UI</a>
                </>
            )}
        </div>
    )
}

export default IsSigned