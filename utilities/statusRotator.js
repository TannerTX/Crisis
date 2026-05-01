function getNextStatusIndex(currentIndex, totalStatuses) {
    if (!Number.isInteger(totalStatuses) || totalStatuses <= 0) {
        return 0;
    }

    if (!Number.isInteger(currentIndex) || currentIndex < 0) {
        return 0;
    }

    return (currentIndex + 1) % totalStatuses;
}

module.exports = { getNextStatusIndex };
