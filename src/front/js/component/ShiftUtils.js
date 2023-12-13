export const generateShifts = (numTeams, peoplePerTeam) => {
    const shifts = [];
    const teams = ["A", "B", "C", "D", "E", "F"];
    const leads = ["John", "Jane", "Bob", "Alice", "Tom", "Jerry"];
    const managers = ["Manager1", "Manager2", "Manager3", "Manager4", "Manager5", "Manager6"];
    const startTimes = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
    const endTimes = ["16:00", "18:00", "20:00", "22:00", "00:00", "02:00"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let t = 0; t < numTeams; t++) {
        const daysOff = [days[t], days[(t + 1) % 7]];
        for (let p = 0; p < peoplePerTeam; p++) {
            const dayOffPhone = days[(t + p + 2) % 7];
            const shift = {
                id: t * peoplePerTeam + p + 1,
                team: teams[t],
                startTime: startTimes[t],
                endTime: endTimes[t],
                lead: leads[t],
                manager: managers[t],
                daysOff: daysOff,
                dayOffPhone: dayOffPhone,
            };

            shifts.push(shift);
        }
    }

    return shifts;
};