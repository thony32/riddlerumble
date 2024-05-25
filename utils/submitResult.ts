// utils/submitResult.ts

import { socket } from "@/lib/socket-io";
import { calculateScoreDistance } from "./scoreUtils";
import { create_temp_room, create_player_stat, updateUserScore } from "@/services/party-service";
import { SubmitResultParams } from "@/types/submit-result-params";

export const submitResult = ({
    startTime,
    distance,
    setElapsedTime,
    setShowTarget,
    setTotalScore,
    penalityPoints,
    roomData,
    targetMarker,
    mapRef,
    createTempRoom,
    createPlayerStat,
    updateUserScoreMutation,
    user,
    setSelectedRoom,
    PARTY_START_TIME_KEY,
}: SubmitResultParams) => {
    const elapsedTime = Date.now() - (startTime || Date.now());
    const elapsedMinutes = Math.floor(elapsedTime / 60000);
    const elapsedSeconds = Math.floor((elapsedTime % 60000) / 1000);
    const formattedElapsedTime = `${String(elapsedMinutes).padStart(2, "0")}:${String(elapsedSeconds).padStart(2, "0")}`;
    setElapsedTime(formattedElapsedTime);

    const maxTime = 300000;
    const timePercentage = (elapsedTime / maxTime) * 100;
    const timeScore = Math.round(Math.max(0, 90 - timePercentage * 1.5));

    const scoreDistance = calculateScoreDistance(distance);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const distanceWeight = goldenRatio * 0.3;
    const timeWeight = 1 / goldenRatio;

    const totalScore = Math.round((scoreDistance * distanceWeight + timeScore * timeWeight) / (distanceWeight + timeWeight));
    setShowTarget(true);
    setTotalScore(roomData.level == "high-level" ? totalScore - penalityPoints : totalScore - penalityPoints + 10);
    mapRef.current?.flyTo({ center: [targetMarker.longitude, targetMarker.latitude], duration: 2000, zoom: 5 });
    createTempRoom.mutate();
    createPlayerStat.mutate();
    updateUserScoreMutation.mutate();
    localStorage.removeItem(PARTY_START_TIME_KEY);
    setSelectedRoom(null);
    const id_room = roomData.id;
    socket.emit('player-submit', { id_room, roomData })
};
