/**
 * A fake database that will generate WeatherReport
 * every time it is queried and over 30 seconds have passed since the last query.
 * 
 * @see WeatherReport
 */
class Database {
	private lastUpdate: Date;
	private reports: Map<string, WeatherReport> = new Map();

	constructor() {
		this.lastUpdate = new Date();
		this.generateReports();
	}

	generateReports() {
		this.lastUpdate = new Date();
		for (const city in Object.entries(cities)) {
			const report = WeatherReport.random(city);
			this.reports.set(city, report);
		}
	}

	getReport(city: string): WeatherReport | undefined {
		if (new Date().getTime() - this.lastUpdate.getTime() > 30000) {
			this.generateReports();
		}

		return this.reports.get(city);
	}
}
