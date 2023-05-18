import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictTagException extends HttpException {

	constructor(response: string) {
		super(response, HttpStatus.CONFLICT);
	}
}

export class NotFoundTagException extends HttpException {

	constructor(response: string) {
		super(response, HttpStatus.NOT_FOUND);
	}
}

export class BadRequestTagException extends HttpException {

	constructor(response: string) {
		super(response, HttpStatus.BAD_REQUEST);
	}
}
