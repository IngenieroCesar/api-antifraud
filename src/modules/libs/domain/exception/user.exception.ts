import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictUserException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.CONFLICT);
	}
}

export class NotFoundUserException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.NOT_FOUND);
	}
}

export class BadRequestUserException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.BAD_REQUEST);
	}
}
