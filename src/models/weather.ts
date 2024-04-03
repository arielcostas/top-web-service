import { WeatherCondition } from "./weatherConditions";
import { createHash } from 'crypto';

export class WeatherReport {
	constructor(
		public city: string,
		public condition: WeatherCondition,
		public temperature: number,
		public windSpeed: number
	) {
	}

	static random(city: string) {
		return new WeatherReport(
			city,
			Object.values(WeatherCondition)[Math.floor(Math.random() * Object.values(WeatherCondition).length)],
			Math.trunc(Math.random() * 40 * 100) / 100,
			Math.trunc(Math.random() * 100 * 100) / 100
		);
	}

	getChecksum() {
		// Weak function, but we don't care about security here since it's just for caching
		return createHash('md5')
			.update(this.city + this.condition + this.temperature + this.windSpeed)
			.digest('hex');
	}
}
