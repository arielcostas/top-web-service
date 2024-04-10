export class AppError {
    public type: ErrorType;
    public title: string;
    public details: any;

    constructor(type: ErrorType, title: string, details: any) {
        this.type = type;
        this.title = title;
        this.details = details;
    }
}

export enum ErrorType {
    CityNotFound = "tag:costas.dev:top-web-service:errors#city-not-found",
    InvalidFormat = "tag:costas.dev:top-web-service:errors#invalid-format",
}