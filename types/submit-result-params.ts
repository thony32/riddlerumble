// types.d.ts
import { MutableRefObject } from "react";
import { MapRef } from "react-map-gl";
import { UseMutationResult } from "@tanstack/react-query";
import { User } from "@/store/useUser";
import { Room } from "./room";

export interface TargetMarker {
    latitude: number;
    longitude: number;
}

export interface SubmitResultParams {
    startTime: number | null;
    distance: number;
    setElapsedTime: (time: string) => void;
    setShowTarget: (show: boolean) => void;
    setTotalScore: (score: number) => void;
    penalityPoints: number;
    roomData: Room;
    targetMarker: TargetMarker;
    mapRef: MutableRefObject<MapRef | null>;
    createTempRoom: UseMutationResult<void, unknown, void, unknown>;
    createPlayerStat: UseMutationResult<void, unknown, void, unknown>;
    updateUserScoreMutation: UseMutationResult<void, unknown, void, unknown>;
    user: User | null;
    setSelectedRoom: (selectedRoom: string | null) => void;
    PARTY_START_TIME_KEY: string;
}