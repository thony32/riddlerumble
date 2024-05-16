"use client"
import Head from "next/head"
import React, { useState } from "react"
import Map from "react-map-gl"

function Party() {
    return (
        <div className="w-full py-6 relative overflow-hidden">
            <Head>
                <link
                    href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </Head>
            <Map
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 4,
                }}
                mapboxAccessToken="pk.eyJ1IjoidGhvbnkzMiIsImEiOiJjbHc5azQ5bWQwNWhjMmtxa2Q5dTcyNWxhIn0.pXpGUWi_9wWY3zwfflmzSQ"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{ width: "100%", height: "90vh", margin: 0, padding: 0 }}
            ></Map>
        </div>
    )
}

export default Party
