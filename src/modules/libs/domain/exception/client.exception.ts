import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictClientException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.CONFLICT);
	}
}

export class NotFoundClientException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.NOT_FOUND);
	}
}

export class BadRequestClientException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.BAD_REQUEST);
	}
}

export class UnauthorizedClientException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.UNAUTHORIZED);
	}
}
