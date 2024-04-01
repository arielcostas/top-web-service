class WeatherReport {
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
			Math.random() * 40,
			Math.random() * 100
		);
	}
}
