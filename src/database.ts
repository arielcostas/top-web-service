import { Cities } from "./models/cities";
import { WeatherReport } from "./models/weather";

/**
 * A fake database that will generate WeatherReport
 * every time it is queried and over 30 seconds have passed since the last query.
 * 
 * @see WeatherReport
 */
export class Database {
	private lastUpdate: Date = new Date();
	private reports: Map<string, WeatherReport> = new Map();

	constructor() {
		this.generateReports();
	}

	generateReports() {
		this.lastUpdate = new Date();
		let city: keyof typeof Cities;
		for (city in Cities) {
			const report = WeatherReport.random(city);
			this.reports.set(city, report);
		}
	}

	generateReportsIfNecessary() {
		if (new Date().getTime() - this.lastUpdate.getTime() > 30000) {
			this.generateReports();
		}
	}

	getReport(city: string): WeatherReport | undefined {
		this.generateReportsIfNecessary();

		return this.reports.get(city);
	}

	getLastUpdate(): Date {
		this.generateReportsIfNecessary();

		return this.lastUpdate;
	}
}
