export const calculateScoreDistance = (distance: any, maxDistance = 1750) => {
    distance = Math.min(distance, maxDistance);
    let score = 100 - (distance / maxDistance) * 100;
    score = Math.max(0, Math.min(100, score));

    return Math.round(score);
};