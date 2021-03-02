export function getStops(allStops, mode) {
    const stops = allStops.map(v => ({
        color: v.color,
        location: v.loc
    }));

    stops.toString = function(type = mode) {
        switch(type) {
            case 'linear':
            case 'radial':
                return this.map(v => `${v.color} ${v.location * 100}%`).join(',');
            case 'conic':
                return this.map(v => `${v.color} ${v.location * 360}deg`).join(',');
        }
    };

    return stops;
}